# Linux

## Useful commands

### Process Management

- `top` (Display all processes)
- `pgrep :process` (Search processes)
- `top -p :pid` (View specific process)
- `kill :pid` (Kill process)
- `pkill :process` (Kill processes by name)
- `jobs` (Display currently running jobs)
- `fg` (Bring job into the foreground to Ctrl+c)

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
