# Asserting Exceptions in FsUnit

::F#::FsUnit::Unit Test::

Asserting exceptions is a feature of FsUnit, but I can't do it right at first try:

```fsharp
[<Fact>]
let ``Test bool for keypath with exn`` () =
  let jdoc = JsonDocument.Parse """{ "a" : {"b": 1}}"""
  jdoc.RootElement
  |> JPath.bool "a.b"
  |> should throw typeof<InvalidOperationException>
```

The correct way, is a little tricky, you must wrap the function or method that may throw exceptions inside a function:

```fsharp
[<Fact>]
let ``Test bool for keypath with exn`` () =
  let jdoc = JsonDocument.Parse """{ "a" : {"b": 1}}"""
  (fun () -> jdoc.RootElement |> JPath.bool "a.b" |> ignore)
  |> should throw typeof<InvalidOperationException>
```
