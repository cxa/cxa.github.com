# VS Mac with Fantomas

::F#::Fantomas::VSMac::

[Fantomas](https://github.com/fsprojects/fantomas) is a code formator for F#, just like the [prettier](https://prettier.io) for JavaScript if you have known about it.

You can use Fantomas with your favorite editors by following the official guide. But what about VS Mac? The guide shows nothing.

VS Mac provides an option for using external tools, just setup Fantomas as follow:

[![Fantomas Setup](/assets/til/2021-04-19-fantomas.gif)](/assets/til/2021-04-19-fantomas.png)

(Click to view high resolution)

Notice, you need to fill full path for the `Command` due to VS Mac refuses `$PATH`. And make sure `Save current file` is checked, to avoid VS Mac asking you to reload the file each time you formated.