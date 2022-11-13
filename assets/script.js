window.WebFontConfig = {
  custom: {
    families: ["Huiwen-mincho:n4", "zai Remington Deluxe Typewriter 1938:n4"],
    urls: ["/assets/fonts.css"],
  },
  timeout: 90 * 1000,
  active: function () {
    document.documentElement.className =
      document.documentElement.className.replace(/no\-webfont/, "");
  },
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

  var post = d.getElementById("post");
  if (post) {
    var ut = d.createElement("script");
    ut.setAttribute("src", "https://utteranc.es/client.js");
    ut.setAttribute("repo", "cxa/cxa.github.com");
    ut.setAttribute("issue-term", "pathname");
    ut.setAttribute("theme", "preferred-color-scheme");
    ut.setAttribute("crossorigin", "anonymous");
    ut.setAttribute("async", "async");
    post.getElementsByTagName("main")[0].appendChild(ut);
  }
})(document);
