---
title: form 元素内的字段 name 不要跟 form 属性名称一致
---
长话短说，看这个 `form` 元素：

```html
<form method="post" action="_some_action_uri_" id="_form_id_">
    <input type="hidden" name="method" value="1" />
</form>
```

试想一下，使用 `document.getElementById('_form_id_').getAttribute('method')` 会出现什么情况。Firefox 3, Safari 3, Opera 9.5 都会得到预期 "post", 但是IE 6 和 7 就没有那么幸运了，得到的是一个 object: 其实就是 `<input type="hidden" name="method" value="1" />` 这个元素。

因此，为避免混淆和挽救IE，最好是，as the title.