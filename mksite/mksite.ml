open Tyxml
open Omd

let title_placeholder = "__TITLE_PLACEHOLDER__"
let content_placeholder = "__CONTENT_PLACEHOLDER__"
let title_prefix = "# "
let tags_mark = "::"
let cnums = [|"〇";"一";"二";"三";"四";"五";"六";"七";"八";"九"|]
let intro = "我是陈贤安，喜欢钻研构建程序介面的技术，偏好静态类型函数式编程。常用编程语言有 JavaScript，会使 Swift、Objective-C、F# 和 OCaml。能看懂 C。realazy, 意取「真懒」，因为我相信，懒，对程序员来说，是一种美德。"

type ('a, 'b) result = Ok of 'a | Error of 'b

let has_prefix prefix str =
  let plen = String.length prefix in
  String.length str >= plen &&
    compare (String.sub str 0 plen) prefix == 0

let has_suffix suffix str =
  let slen = String.length suffix in
  let total_len = String.length str in
  total_len >= slen &&
    compare (String.sub str (total_len - slen) slen) suffix == 0

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
  let comps = Str.split (Str.regexp "\\-") date_str in
  let mapi i c = match i with
    | 0 -> to_chinese_year c ^ "年"
    | 1 -> to_chinese_md   c ^ "月"
    | 2 -> to_chinese_md   c ^ "日"
    | _ -> ""
  in
  let strs = List.mapi mapi comps in
  String.concat "" strs

let site_template title body_id footer_extra =
  let open Unix in
  let time = Unix.time () |> Unix.localtime in
  let year = (time.tm_year + 1900) |> string_of_int |> Html.txt in
  [%html {|
  <html class='no-webfont'>
    <head>
      <title>|} (Html.txt title) {|</title>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
      <link rel='alternate' type='application/atom+xml' title='Realazy' href='https://feeds.feedburner.com/realazy' />
      <link rel='stylesheet' href='/assets/style.min.css' />
    </head>
    <body id='|}body_id{|'>
      |} [ Html.txt content_placeholder ] {|
      <footer>
      |}
      footer_extra
      {|<p>2005 ～ |} [ year ] {| &copy;
        <span><a href='/'>realazy</a></span>
        <span><a href="https://github.com/cxa/cxa.github.com.git">本站源码</a></span>
       </p>
       </footer>
       <script src='/assets/highlight.js'> </script>
       <script src='/assets/script.js'> </script>
    </body>
  </html>
  |}]

let mkpage title body_id body_content ft_extra oc =
  site_template title body_id ft_extra
  |> Format.asprintf "%a" (Html.pp ())
  |> Str.replace_first (Str.regexp_string content_placeholder) body_content
  |> Markup.string
  |> Markup.to_channel oc

;;


module Post = struct
  type t =
    { title       : string
    ; tags        : string list
    ; date        : string
    ; title_html  : string
    ; content_html: string
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
          let title = substring_from (String.length title_prefix) line |> String.trim in
          let title_html =
            Omd.of_string title
            |> Omd.to_html
            |> Str.replace_first (Str.regexp_string "<p>") ""
            |> Str.replace_first (Str.regexp_string "</p>") ""
            |> String.trim
          in
          let tags, content_line =
            let tags_line = input_line ic in
            match has_prefix tags_mark tags_line && has_suffix tags_mark tags_line with
            | true ->
              Str.split (Str.regexp "::") tags_line, ""
            | false -> [], tags_line ^ "\n"
          in
          let len = in_channel_length ic - pos_in ic in
          let rawcontent = String.concat "" [content_line; really_input_string ic len] in
          let content_html = Omd.of_string rawcontent |> Omd.to_html in
          close_in ic;
          post := Ok { title; tags; date; title_html; content_html; }
        end
      done;
      !post
    with
    | End_of_file -> close_in ic; !post
    | _ -> close_in_noerr ic; !post

  let to_html post =
    let cdt = [ Html.txt @@ to_chinese_date post.date ] in
    let subtitle = [%html "<time datetime="post.date">"cdt"</time>"] in
    let tags =
      if List.length post.tags > 0 then
        let t = post.tags |> List.map (fun tag -> [%html "<li>"[Html.txt tag]"</li> "]) in
        [%html "<ul class='tags'>"t"</ul>"]
      else
        Html.txt ""
    in
    let to_tyxml = [%html {|
      <header>
        <h1><a href='/'>真・懒</a></h1>
        <section>
          <span><a href='/feed.atom'>订阅</a></span>
          <span><a href='https://twitter.com/_cxa'>Twitter</a></span>
          <span><a href='https://github.com/cxa'>GitHub</a></span>
          <span><a href='mailto:xianan.chen@gmail.com'>联系</a></span>
        </section>
      </header>
      <main>
        <h1>|} [Html.txt title_placeholder] {|</h1>
        <section class="meta">
          |} [subtitle; tags] {|
        </section>
        |}
        [(Html.txt content_placeholder)]
        {|
      </main>
    |}]
    in
    let elt_to_html elt =
      elt
      |> Format.asprintf "%a" (Html.pp_elt ())
      |> Str.replace_first (Str.regexp_string title_placeholder) post.title_html
      |> Str.replace_first (Str.regexp_string content_placeholder) post.content_html
    in
    to_tyxml
    |> List.map elt_to_html
    |> String.concat ""

  let to_page post ft_extra oc =
    mkpage ("realazy: " ^ post.title) "post" (to_html post) ft_extra oc

end

;;

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
       let file = (Filename.basename rp |> Filename.chop_extension) ^ ".html" in
       let out_filepath = Filename.concat to_dir file in
       let oc = open_out out_filepath in
       let%html extra = "<div class='intro'><img src='/assets/avatar.png' width='128' alt='头像' /><p>" [(Html.txt intro)] "</p></div>" in
       Post.to_page post [extra] oc;
       close_out oc
    | Error e -> print_endline e
  in
  Array.iter mkpost_write_file rawposts

let mkhome raw_posts_dir raw_til_dir =
  let mkpost_items typ dir acc rp =
    let post_result = Post.of_file @@ Filename.concat dir rp in
    match post_result with
    | Ok post ->
       let file = (Filename.basename rp |> Filename.chop_extension) ^ ".html" in
       let item =
         Printf.sprintf
           "<li><a href='/%s/%s'><span>%s</span><span>%s</span></a></li>"
           typ file post.title_html post.date
       in
       acc ^ item
    | Error _ -> acc
  in
  let rawtil = raw_posts_from raw_til_dir in
  let rawposts = raw_posts_from raw_posts_dir in
  let items =
    "<header>
       <h1>真・懒</h1>
       <p>懒是一种美德</p>
       <section>
        <span><a href='/feed.atom'>订阅</a></span>
        <span><a href='https://twitter.com/_cxa'>Twitter</a></span>
        <span><a href='https://github.com/cxa'>GitHub</a></span>
        <span><a href='mailto:xianan.chen@gmail.com'>联系</a></span>
       </section>
     </header>
     <main>
       <h2>Today I Learned</h2>
       <ul id='til'>"
         ^ (Array.fold_left (mkpost_items "til" raw_til_dir) "" rawtil) ^ "
       </ul>
       <h2>Blog</h2>
       <ul id='blog'>"
         ^ (Array.fold_left (mkpost_items "posts" raw_posts_dir) "" rawposts) ^ "
       </ul>
     </main>"
  in
  let oc = open_out "../index.html" in
  mkpage "realazy" "toc" items [] oc;
  close_out oc

let mk404 () =
  let oc = open_out "../404.html" in
  mkpage "realazy: 404" "four04" "
  <header>
    <h1>真・找不到</h1>
  </header>
  <main>
    <p>您进入了无人之境，a.k.a 404.</p>
  </main>
  " [] oc;
  close_out oc

let mkatom posts_dir til_dir =
  let open Syndic.Atom in
  let aut =
    { name = "Realazy"
    ; uri = Some (Uri.of_string "https://realazy.com")
    ; email = None
    }
  in
  let fold_post typ dir acc rp =
    let post_result = Post.of_file @@ Filename.concat dir rp in
    match post_result with
    | Ok post ->
      (* Syndic doesn't provide tz option, will repalce -00:00 to +08:00 later *)
      let entry_dt =
        post.date ^ "T10:00:00-00:00"
        |> Syndic.Date.of_rfc3339
      in
      let content:content = Html (None, post.content_html)  in
      let link =
        let uri =
          let path = (Filename.basename rp |> Filename.chop_extension) ^ ".html" in
          Printf.sprintf "https://realazy.com/%s/%s" typ path
          |> Uri.of_string
        in
        link uri
      in
      let e =
        entry
          ~links: [link]
          ~content
          ~id:(Digest.string rp |> Uri.of_string)
          ~authors:(aut, [])
          ~title:(Text post.title)
          ~updated:entry_dt
          ()
      in
      e :: acc
    | Error e ->
      print_endline e;
      acc
  in
  let f =
    let entries =
      let rawtil = raw_posts_from til_dir in
      let rawposts = raw_posts_from posts_dir in
      List.concat [
        (rawposts |> Array.to_list |> List.fold_left (fold_post "posts" posts_dir) [] |> List.rev)
      ; (rawtil |> Array.to_list |> List.fold_left (fold_post "til" til_dir) [] |> List.rev)
      ]
    in
    let updated =
      let latest = List.nth entries 0 in
      latest.updated
    in
    feed
      ~authors:[aut]
      ~icon:(Uri.of_string "https://realazy.com/favicon.ico")
      ~id:(Uri.of_string "realazy.com")
      ~title:(Text "Realazy")
      ~updated
      entries
  in
  let out_file = "../feed.atom" in
  write f out_file;
  let ic = open_in out_file in
  let replace_tz inp =
    Str.global_replace (Str.regexp_string "-00:00") "+08:00" inp
  in
  let lines = ref [] in
  begin
    try
      while true do
        lines := (input_line ic) :: !lines;
      done
    with
      End_of_file -> close_in ic
  end;
  let str = String.concat "" (List.rev !lines) |> replace_tz in
  let oc = open_out out_file in
  output_string oc str;
  close_out oc

let () =
  let raw_posts_dir =  "../_raw/posts" in
  mkposts raw_posts_dir "../posts";
  let raw_til_dir = "../_raw/til" in
  mkposts raw_til_dir "../til";
  mkhome raw_posts_dir raw_til_dir;
  mk404 ();
  mkatom raw_posts_dir raw_til_dir
