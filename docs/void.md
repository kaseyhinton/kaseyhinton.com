# Void

### chmod

script.sh

```
#!/bin/bash

```

Command Line

```bash
 chmod u+x script.sh
```

### Void Linux

#### View local docs

- `void-docs`

#### Set up with i3

- `sudo xbps-install -Su`
- `sudo xbps-install vpm`
- `sudo vpm install void-repo-nonfree`
- `sudo vpm install xorg xterm i3 i3status dmenu`
- `echo "exec i3" >> ~/.xinitrc`
- `startx`

##### Modify config file

- `echo "parcellite" >> ~/.configs/i3/config` (autostart clipboard manager)

##### Add gaps

- `sudo vpm install i3-gaps`
- `sudo nvim ~/.config/i3/config`

```
# Define gaps between windows
gaps inner 24
```

#### Packages

- vpm - predictable package management
- git
- neofetch
- curl
- Parcellite (clipboard)
- micro (text editor)
- chromium (browser)
- alacritty (terminal)
- vscode (ide)
- nvidia (graphics)
- alsa-utils (audio)
- pipewire (audio)
- alsa-pipewire (audio)
- nodejs

#### Commands

##### Install a package

`vpm install git`

##### Search for a package

`vpm query -Rs git`

##### Remove a package

`vpm remove git`

##### Search installed packages

`vpm query -m`

##### Remove orphan packages

`vpm remove --remove-orphans`

##### Remove outdated packages from cache

`vpm remove --clean-cache`

##### Common query options

`vpm query -x git` (show package dependencies)
`vpm query -f git` (show package files)
`vpm query -S git` (show package information)
`vpm query -x git` (show package dependencies)

#### Void Services

`ls /var/services` (List all the services)
`sudo sv status /var/service/*` (list all the service statuses/pids)
`sudo ln -s /etc/sv/alsa /var/service` (Add a service)
``

#### Audio Setup

- `usermod -a -G audio :user` (Add user to audio group)

##### ALSA

- `cat /proc/asound/modules` (list sound modules)
- `nvim ~/.asoundrc` (Set default sound module - per user)
- `nvim /etc/asound.conf` (Set default sound module - globally)

```
defaults.ctl.card 2;
defaults.pcm.card 2;
```

###### Plugins

####### APULSE

- `sudo vpm install apulse` (install pulse audio emulation for ALSA)

####### ALSA-UTILS (optional)
Persist volume settings

- `sudo vpm install alsa-utils` (install util pkg for service setup)
- `sudo ln -s /etc/sv/alsa /var/service` (link and start service)

##### PulseAudio

- `sudo vpm install pulseaudio` (install Pulse Audio package)
- `sudo vpm install alsa-plugins-pulseaudio` (install alsa support for pulse audio)

#### WiFi Setup

```
wpa_cli
scan
scan_results
add_network
set_network 0 ssid "my_ssid"
set_network 0 psk "my_password"
enable_network 0
save config
```

###### WiFi Troubleshooting

You can try deleting the wpa_supplicant service/files/etc
and reinstalling with `vpm install wpa_supplicant -f` which will reinstall it

run `ip link` to see what interface are available

After an update a different wireless interface appeared
for me that I needed to switch to.

```
sudo wpa_supplicant -B -i wlo1 -c /etc/wpa_supplicant/wpa_supplicant.conf
```

After deleting my old wpa_supplicant config, re-installing, and re-initializing wpa_supplicant with the new interface I was able to follow the wpa_cli instructions above to make a new connection.

### i3

##### Common key commands

- `MOD+Arrow` (Switch Window)
- `MOD+Enter` (Launch Terminal)
- `MOD+R` (Resize Window)
- `MOD+SHIFT+Q` (Kill Window)
- `MOD+D` (Launch DMENU)
- `MOD+1` (Change Workspace)
- `MOD+SHIFT+R` (Reload config) (~/.config/i3/config)
- `MOD+W` (Tab)
- `MOD+H` (Tile Horizontal)
- `MOD+V` (Tile Vertical)
- `MOD+SHIFT+Arrow` (Move window)
- `MOD+F` (Toggle Fullscreen)

### Set Background Wallpaper

- `sudo vpm install feh`
- `feh --bg-scale ~/Pictures/wallpaper.jpeg`

### Use OpenVPN on void linux

- Download VPN configuration file from vpn provider
- `sudo vpm install openvpn openresolv`
- `sudo nvim ./openvpnconf.ovpn` Change /etc/resolv.conf -> /usr/bin/resolvconf
- `sudo openvpn --config ./openvpnconf.ovpn`

  }
  }

# Helpful permission script

sudo chown -R username:username /path/to/directory

## 2026 Updated Void Fresh Install Guide

Note during installation when prompted to select services select Alsa
for easier sound setup.

### Void install

```bash
# Default config
sudo xbps-install -Su
sudo xbps-install vpm
sudo vpm install void-repo-nonfree
sudo vpm install xorg xterm i3 dmenu vis

#Additional packages
sudo vpm install mesa-vulcan-nouveau vscode i3-gaps feh firefox bash-completion curl git unzip
```

```bash
# Change default shell
sudo chsh -s /bin/bash
```

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Update .bashrc
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
export TERM=xterm-256color
```

```bash
# Start xorg & i3
startx
```

```bash
# .xinitrc

feh --bg-fill ~/Downloads/bg.png
exec i3
```

```bash
# i3 config ~/.config/i3/config
# Comment that status bar out
# bar {
#  command i3status
# }
xterm -bg "#303446" -fg "#c6d0f5" -cr "#99d1db" -bd "#303446" -ms "#99d1db"
dmenu -nb "#c6d0f5" -nf "#303446" -sb "#303446" -sf "#99d1db"
gaps inner 12

set $rosewater #f2d5cf
set $flamingo #eebebe
set $pink #f4b8e4
set $mauve #ca9ee6
set $red #e78284
set $maroon #ea999c
set $peach #ef9f76
set $yellow #e5c890
set $green #a6d189
set $teal #81c8be
set $sky #99d1db
set $sapphire #85c1dc
set $blue #8caaee
set $lavender #babbf1
set $text #c6d0f5
set $subtext1 #b5bfe2
set $subtext0 #a5adce
set $overlay2 #949cbb
set $overlay1 #838ba7
set $overlay0 #737994
set $surface2 #626880
set $surface1 #51576d
set $surface0 #414559
set $base #303446
set $mantle #292c3c
set $crust #232634

# target                 title     bg    text   indicator  border
client.focused           $lavender $base $text  $rosewater $lavender
client.focused_inactive  $overlay0 $base $text  $rosewater $overlay0
client.unfocused         $overlay0 $base $text  $rosewater $overlay0
client.urgent            $peach    $base $peach $overlay0  $peach
client.placeholder       $overlay0 $base $text  $overlay0  $overlay0
client.background        $base

# bar
bar {
  colors {
    background         $base
    statusline         $text
    focused_statusline $text
    focused_separator  $base

    # target           border bg        text
    focused_workspace  $base  $mauve    $crust
    active_workspace   $base  $surface2 $text
    inactive_workspace $base  $base     $text
    urgent_workspace   $base  $red      $crust
  }
}
```


### Install theme to vis
- clone this repo https://github.com/scaramacai/vis-themes
- copy files to /usr/share/vis/themes
- manually set theme in editor `set theme almostnord`
- OPTIONAL(follow instructions to add to default vis config)

### /usr/share/vis/visrc.lua
```lua
-- load standard vis module, providing parts of the Lua API
require('vis')

vis.events.subscribe(vis.events.INIT, function()
        -- Your global configuration options
end)

vis.events.subscribe(vis.events.WIN_OPEN, function(win) -- luacheck: no unused args
        vis:command('set theme almostnord')
        -- Your per window configuration options e.g.
        -- vis:command('set number')
end)
```