# Linux

## Useful commands

### Process Management

- `top` (Display all processes)
- `pgrep :process` (Search processes)
- `top -p :pid` (View specific process)
- `kill :pid` (Kill process)
- `pkill :process` (Kill processes by name)
- `jobs` (Display currently running jobs)

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

### Full package list

- alacritty-0.15.1_1
- alsa-plugins-pulseaudio-1.2.12_2
- base-system-0.114_2
- chromium-138.0.7204.92_1
- chrony-4.7_1
- cryptsetup-2.7.5_2
- curl-8.14.1_1
- dbus-1.16.2_2
- dmenu-5.3_1
- feh-3.10.3_1
- fff-2.2_1
- git-2.50.0_1
- go-1.24.4_1
- grub-i386-efi-2.12_2
- grub-x86_64-efi-2.12_2
- i3-4.24_1
- i3-gaps-4.24_1
- i3status-2.15_1
- j4-dmenu-desktop-3.2_1
- lazygit-0.52.0_1
- lightdm-1.32.0_7
- lightdm-gtk3-greeter-2.0.9_1
- lvm2-2.03.29_1
- mdadm-4.3_4
- neovim-0.11.2_1
- nmap-7.95_3
- nodejs-22.15.0_2
- nvidia-570.169_1
- openresolv-3.17.0_1
- openvpn-2.6.14_1
- polybar-3.7.2_2
- pulseaudio-16.1_2
- unzip-6.0_15
- void-docs-browse-2025.01.25_1
- void-live-audio-0.1.1_1
- void-repo-multilib-6_4
- void-repo-multilib-nonfree-6_4
- void-repo-nonfree-9_6
- vpm-1.3_3
- vscode-1.100.2_1
- xdg-utils-1.2.1_1
- xmirror-0.4.1_1
- xorg-7.6_6
