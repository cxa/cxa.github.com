# Load once with `lazy`

::F#::lazy::

In ObjC, [`+load`](https://developer.apple.com/documentation/objectivec/nsobject/1418815-load?language=objc) or [`+initiliaze`](https://developer.apple.com/documentation/objectivec/nsobject/1418639-initialize?language=objc) of `NSObject` is a nice place to put some code that executes only once, e.g. register some dependency injections.

There is no such concept in F#, but can be archived with the [`lazy` expressions](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/lazy-expressions):

```fsharp
module Service =
  let private _getDef = lazy (
    DicService.registerHttpMessageHandler (new NSUrlSessionHandler ())
    (fun word -> DicService.getDefinition word platformSpecFunc))

  let getDef = _getDef.Force()
```

By using `lazy`, our `_getDef` will execute at the first time when `getDef` being called, and only once.
