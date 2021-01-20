window.WebFontConfig = {
  custom: {
    families: ["Anonymous Pro Minus:n4,n7,i4,i7", "Atkinson Hyperlegible:n4,n7,i4,i7"],
    urls: ["/assets/fonts.css"],
  },
  timeout: 60000,
  active: function() {
    document.documentElement.className = document.documentElement.className.replace(/no\-webfont/, "");
  }
};

(function (d) {
  [].forEach.call(d.querySelectorAll("pre code"), function (b) {
    hljs.highlightBlock(b);
  });
  var wf = d.createElement("script"),
    s = d.scripts[0];
  wf.src = "/assets/webfontloader.js";
  wf.async = true;
  s.parentNode.insertBefore(wf, s);
  
})(document);
