open Tyxml
open Omd

let content_placeholder = "__CONTENT_PLACEHOLDER__"
let title_prefix = "title: "
let cnums = [|"〇";"一";"二";"三";"四";"五";"六";"七";"八";"九"|]

let has_prefix prefix str =
  let plen = String.length prefix in
  String.length str >= plen
  && compare (String.sub str 0 plen) prefix == 0

let substring_from pos str =
  let len = String.length str in
  String.sub str pos (len-pos)

let to_cnum anum =
  let idx = (int_of_char anum) - (int_of_char '0') in
  Array.get cnums idx
    
let to_chinese_year year_str =  
  let clist = ref [] in
  String.iter (fun c -> clist := !clist @ [to_cnum c]) year_str;
  String.concat "" !clist

let to_chinese_md md_str =
  let atens = String.get md_str 0 in
  let ctens = match atens with
    | '0' -> ""
    | '1' -> "十"
    | _ as i -> (to_cnum i) ^ "十"
  in
  let aones = String.get md_str 1 in
  let cones = match aones with
    | '0' -> ""
    | _ as i -> to_cnum i
  in
  ctens ^ cones

let to_chinese_date date_str =
  let comps = String.split_on_char '-' date_str in
  let mapi i c = match i with
    | 0 -> to_chinese_year c ^ "年"
    | 1 -> to_chinese_md   c ^ "月"
    | 2 -> to_chinese_md   c ^ "日"
    | _ -> ""
  in
  let strs = List.mapi mapi comps in
  String.concat "" strs
  
let site_template title body_id =
  let open Unix in
  let time = Unix.time () |> Unix.localtime in
  let year = (time.tm_year + 1900) |> string_of_int |> Html.pcdata in
  [%html {|
   <html>
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>|} (Html.pcdata title) {|</title>
       <link rel="stylesheet" type="text/css" href="/assets/style.css" />
       <link rel="stylesheet" type="text/css" href="/assets/fonts.css" media="none" onload="if(media!='all') media='all'">
     </head>
     <body id="|}body_id{|">
       |} [ Html.pcdata content_placeholder ] {|
       <footer>
         <p>2005 ～ |} [ year ] {| &copy; <span><a href='/'>realazy</a></span> <span><a href='https://twitter.com/_cxa'>Twitter</a></span> <span><a href='https://github.com/cxa'>GitHub</a></span></p>
       </footer>
     </body>
   </html>
  |}]

let mkpage title body_id content =
  site_template title body_id
  |> Format.asprintf "%a" (Html.pp ())
  |> Str.replace_first (Str.regexp_string content_placeholder) content

  
module Post = struct
  type t =
    { title  : string;
      date   : string;
      content: string;
    }

  let of_file filepath =
    let ic = open_in filepath in
    let filename = Filename.basename filepath in
    let date = String.sub filename 0 (4+1+2+1+2) in (* yyyy-mm-dd *)
    let quit_loop = ref false in
    (* TODO: make it lazy *)
    let post = ref (Error (Format.sprintf "Could not convert %s to post" filepath)) in
    try
      while not !quit_loop do
        let line = input_line ic in
        if has_prefix title_prefix line then begin
            quit_loop := true;
            input_line ic |> ignore; (* skip next line *)
            let title = substring_from (String.length title_prefix) line in
            let len = in_channel_length ic - pos_in ic in
            let rawcontent = really_input_string ic len in
            let content = Omd.of_string rawcontent |> Omd.to_html in
            close_in ic;
            post := Ok { title; date; content; }
          end
      done;
      !post
    with
    | End_of_file -> close_in ic; !post
    | _ -> close_in_noerr ic; !post
    
  let to_html post =
    let cdt = [ Html.pcdata @@ to_chinese_date post.date ] in 
    let subtitle = [
        [%html "<a href='/'>真・懒</a>"];
        [%html "写于"];
        [%html "<time datetime="post.date">"cdt"</time>"]]
    in
    let to_tyxml = [%html {|
      <header>
        <h1>|} [(Html.pcdata post.title)] {|</h1>
        <p>
          |} subtitle {|
        </p>
      </header>
      <main> 
        |} [(Html.pcdata content_placeholder)] {|
      </main>
    |}]
    in
    let elt_to_html elt =
      elt
      |> Format.asprintf "%a" (Html.pp_elt ())
      |> Str.replace_first (Str.regexp_string content_placeholder) post.content
    in
    to_tyxml
    |> List.map elt_to_html
    |> String.concat ""

  let to_page post =
    mkpage ("realazy: " ^ post.title) "post" (to_html post)
    
end


open Post

let raw_posts_from dir =
  let filter acc item =
    if Filename.check_suffix item ".md"
    then Array.append acc [|item|]
    else acc
  in
  let posts = Sys.readdir dir |> Array.fold_left filter [||] in
  Array.sort (fun a b -> -(String.compare a b)) posts;
  posts
          
let mkposts from_dir to_dir =
  let rawposts = raw_posts_from from_dir in
  let mkpost_write_file rp =
    let post_result = Post.of_file @@ Filename.concat from_dir rp in
    match post_result with
    | Ok post ->
       let page = Post.to_page post in
       let file = (Filename.basename rp |> Filename.chop_extension) ^ ".html" in
       let out_filepath = Filename.concat to_dir file in
       let oc = open_out out_filepath in
       output_string oc page;
       close_out oc
    | Error e -> print_endline e
  in
  Array.iter mkpost_write_file rawposts

let mkhome raw_posts_dir =
  let mkpost_items acc rp =
    let post_result = Post.of_file @@ Filename.concat raw_posts_dir rp in
    match post_result with
    | Ok post ->
       let file = (Filename.basename rp |> Filename.chop_extension) ^ ".html" in
       let item = Printf.sprintf "<li><a href='/posts/%s'><span>%s</span> <span>%s</span></a></li>" file post.title post.date in
       acc ^ item
    | Error _ -> acc
  in
  let rawposts = raw_posts_from raw_posts_dir in
  let items =
    "<header>
       <h1>真・懒</h1>
       <p>欢迎光临。我是陈贤安，喜欢钻研构建程序介面的技术。realazy, 意取“真懒”，因为我相信，懒，对程序员来说，是一种美德。</p>
     </header>
     <main>
       <ul>"
         ^ (Array.fold_left mkpost_items "" rawposts) ^ "
       </ul>
     </main>"
  in
  let page = mkpage "realazy" "toc" items in
  let oc = open_out "index.html" in
  output_string oc page;
  close_out oc

let mk404 () =
  let page = mkpage "realazy: 404" "four04" "
  <header>
    <h1>真・找不到</h1>
  </header>
  <main>
    <p>您进入了无人之境，a.k.a 404.</p>
  </main>
  "
  in
  let oc = open_out "404.html" in
  output_string oc page;
  close_out oc
  
let () =
  let raw_posts_dir =  "_raw/posts" in
  mkposts raw_posts_dir "posts";
  mkhome raw_posts_dir;
  mk404 ()
