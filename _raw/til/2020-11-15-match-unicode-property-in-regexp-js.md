# Unicode 字符属性正则匹配

::RegExp::JavaScript::

## 格式

```js
// 必须使用 u flag
/\p{UnicodePropertyName}/u
/\p{UnicodePropertyName=UnicodePropertyValue}/u
/\p{UnicodeBinaryPropertyName}/u


// 大写 P 则反向匹配
/\P{UnicodePropertyValue}/u
```

### `UnicodePropertyName`/`UnicodePropertyValue` 取值参考：

- <https://unicode.org/reports/tr18/#General_Category_Property>
- <https://unicode.org/reports/tr24/#Script>
- <https://tc39.es/ecma262/#table-binary-unicode-properties>

## 备忘

- 匹配中日韩越表意字符（汉字）：`/\p{Ideo}/u`
