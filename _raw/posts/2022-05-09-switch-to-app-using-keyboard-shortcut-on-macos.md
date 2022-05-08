# macOS: Quickly Switch to App Using Keyboard Shortcut

Quickly switch to specific app on macOS, I'm not meaning using app switcher (that one triggered by "`⌘ - tab`") which may require looping the app list.

I'll show you a technique, by which you can quick-switch to specific app by only one shortcut, even if that app hasn't launched yet, and no app switcher shown. This is powered by open-source software tools, you'll find it's easier if you have some command-line skills.

## Prerequisite

- Follow <https://brew.sh> to install "`brew`" if you have never done that before
- Install "`skhd`" by the guide on <https://github.com/koekeishiya/skhd>, and make sure the "`skhd`" service running on your system

## Craft some shell scripts

Creat a file using below content, and save it as "`activate-app.sh`", place under the same directory where you store "`skhdrc`", I assume your directory is "`~/.config/skhd`".

```sh
#!/usr/bin/env sh

/usr/bin/env osascript <<SCRIPT
-------------------------------------
tell application "$1"
  activate
  if (count windows) is 0 then
    do shell script "open -a '$1'"
  end if
end tell
-------------------------------------
SCRIPT
```

Open "`Terminal.app`" or other terminal simulator you favorite, make our new shine script executable:

```sh
chmod +x ~/.config/skhd/activate-app.sh
```

The last step, is write your own shortcuts, open "`~/.config/skhd/skhdrc`", add some lines like:

```sh
cmd - return : $HOME/.config/skhd/activate-app.sh iTerm
alt - return : $HOME/.config/skhd/activate-app.sh "Google Chrome"
```

The only points for attention,  make app name quoted if it contains spaces.

Now, restart "`skhd`" by "`brew services restart skhd`", you can press "`⌘ - return`" to switch to "`iTerm`", without any glitches.
