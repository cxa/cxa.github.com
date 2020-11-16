# F# Implicit yields

::F#::

看到类似以下的一段 [F# 代码][0]：

```fsharp
let opt = Some "C"
let lst =
  [
    "A"
    "B"
    match opt with
    | Some v -> v
    | None -> ()
  ]
```

直觉这是错的，一眼看上去，如果这个列表是 `string list` 类型，`opt` 为 `None` 时值是 `unit`，类型匹配不上。但是到 `fsi` 里一跑，竟然通过了。一番研究，发现这其实等同于：

```fsharp
let lst =
  [
    yield "A"
    yield "B"
    match opt with
    | Some v -> yield v
    | None -> ()
  ]
```

这是 implicit yields，[F# 4.7 新增的特性][1]，[初衷][2]是让 Fable, Fabulous 等框架的模版写法更简洁。

[0]: https://www.compositional-it.com/news-blog/yielding-options-in-list-comprehension-expressions
[1]: https://docs.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-47#implicit-yields
[2]: https://github.com/fsharp/fslang-design/blob/master/FSharp-4.7/FS-1069-implicit-yields.md
