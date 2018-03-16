site_gen := mksite

all:
	ocamlfind ocamlc mksite.ml -package str,unix,tyxml.ppx,omd,markup,syndic -short-paths -linkpkg -o ${site_gen}

clean:
	rm -rf *.cmo *.cmt *.cmi ${site_gen}
