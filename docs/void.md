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
sudo vpm install mesa-vulcan-nouveau vscode i3-gaps feh firefox bash-completion curl git
```

# Change default shell

```bash
sudo chsh -s /bin/bash
```

launch system with this

```bash
startx
```

```bash
# .xinitrc

feh --bg-fill ~/Downloads/bg.png
exec i3
```

```bash
# i3 config ~/.config/i3/config
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


## Setup script
```bash
curl void-setup.sh
chmod +x void-setup.sh
./void-setup.sh
```


```bash
#!/bin/bash

# Void Linux Quick Setup Script
# This script automates the setup of a fresh Void Linux installation

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Void Linux Quick Setup Script${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if running as root
if [[ $EUID -eq 0 ]]; then
    echo -e "${RED}Error: Do not run this script as root${NC}"
    echo -e "${YELLOW}Run as your regular user and use sudo when prompted${NC}"
    exit 1
fi

# Update and install base packages
echo -e "\n${GREEN}[1/7] Updating system and installing base packages...${NC}"
sudo xbps-install -Syu
sudo xbps-install -S vpm
sudo vpm install void-repo-nonfree

# Install Xorg and window manager
echo -e "\n${GREEN}[2/7] Installing Xorg and window manager...${NC}"
sudo vpm install xorg xterm i3 i3-gaps dmenu vis mesa-vulcan-nouveau

# Install additional packages
echo -e "\n${GREEN}[3/7] Installing additional packages...${NC}"
sudo vpm install vscode feh firefox bash-completion curl git

# Change default shell to bash
echo -e "\n${GREEN}[4/7] Changing default shell to bash...${NC}"
sudo chsh -s /bin/bash $(whoami)

# Create necessary directories
echo -e "\n${GREEN}[5/7] Creating configuration directories...${NC}"
mkdir -p ~/.config/i3
mkdir -p ~/Downloads

# Download Catppuccin Void wallpaper
echo -e "\n${GREEN}[6/7] Downloading Catppuccin Void wallpaper...${NC}"
WALLPAPER_URL="https://github.com/zhichaoh/catppuccin-wallpapers/raw/main/os/void-magenta-blue-1920x1080.png"
WALLPAPER_PATH="$HOME/Downloads/bg.png"

echo -e "${YELLOW}Downloading wallpaper from GitHub...${NC}"
if command -v curl &> /dev/null; then
    curl -L -o "$WALLPAPER_PATH" "$WALLPAPER_URL" && \
    echo -e "${GREEN}Wallpaper downloaded successfully!${NC}" || \
    echo -e "${RED}Failed to download wallpaper via curl${NC}"
elif command -v wget &> /dev/null; then
    wget -O "$WALLPAPER_PATH" "$WALLPAPER_URL" && \
    echo -e "${GREEN}Wallpaper downloaded successfully!${NC}" || \
    echo -e "${RED}Failed to download wallpaper via wget${NC}"
else
    echo -e "${YELLOW}Installing curl to download wallpaper...${NC}"
    sudo vpm install curl
    curl -L -o "$WALLPAPER_PATH" "$WALLPAPER_URL" && \
    echo -e "${GREEN}Wallpaper downloaded successfully!${NC}" || \
    echo -e "${RED}Failed to download wallpaper${NC}"
fi

# Check if wallpaper was downloaded
if [ ! -f "$WALLPAPER_PATH" ]; then
    echo -e "${YELLOW}Warning: Could not download wallpaper${NC}"
    echo -e "${YELLOW}You can manually download it from:${NC}"
    echo -e "${BLUE}https://github.com/zhichaoh/catppuccin-wallpapers/blob/main/os/void-magenta-blue-1920x1080.png${NC}"
    echo -e "${YELLOW}And save it as ~/Downloads/bg.png${NC}"
fi

# Create .xinitrc
echo -e "\n${GREEN}[7/7] Creating .xinitrc and i3 config...${NC}"
cat > ~/.xinitrc << 'EOF'
#!/bin/sh

# Set background (Catppuccin Void wallpaper)
if [ -f ~/Downloads/bg.png ]; then
    feh --bg-fill ~/Downloads/bg.png
else
    # Fallback: solid color background
    xsetroot -solid "#303446"
fi

# Set keyboard rate
xset r rate 200 40

# Start i3
exec i3
EOF

chmod +x ~/.xinitrc

# Create i3 config
cat > ~/.config/i3/config << 'EOF'
# i3 configuration file with Catppuccin Macchiato theme
# Void Linux setup with matching wallpaper

# Set terminal with catppuccin colors matching the wallpaper
exec xterm -bg "#303446" -fg "#c6d0f5" -cr "#99d1db" -bd "#303446" -ms "#99d1db"
exec dmenu -nb "#c6d0f5" -nf "#303446" -sb "#303446" -sf "#99d1db"

# Gaps
gaps inner 12
gaps outer 5

# Catppuccin Macchiato colors
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

# Window colors
# target                 title     bg    text   indicator  border
client.focused           $lavender $base $text  $rosewater $lavender
client.focused_inactive  $overlay0 $base $text  $rosewater $overlay0
client.unfocused         $overlay0 $base $text  $rosewater $overlay0
client.urgent            $peach    $base $peach $overlay0  $peach
client.placeholder       $overlay0 $base $text  $overlay0  $overlay0
client.background        $base

# Font
font pango:monospace 10

# Keybindings
set $mod Mod4

# Launch terminal
bindsym $mod+Return exec xterm -bg "#303446" -fg "#c6d0f5" -cr "#99d1db" -bd "#303446" -ms "#99d1db"

# Launch dmenu
bindsym $mod+d exec dmenu -nb "#c6d0f5" -nf "#303446" -sb "#303446" -sf "#99d1db"

# Launch Firefox
bindsym $mod+Shift+f exec firefox

# Launch VSCode
bindsym $mod+Shift+v exec code

# Screenshot (requires scrot - install with: vpm install scrot)
# bindsym $mod+s exec scrot '%Y-%m-%d-%H%M%S_$wx$h.png' -e 'mv $f ~/Downloads/'

# Kill focused window
bindsym $mod+Shift+q kill

# Change focus
bindsym $mod+h focus left
bindsym $mod+j focus down
bindsym $mod+k focus up
bindsym $mod+l focus right

# Move focused window
bindsym $mod+Shift+h move left
bindsym $mod+Shift+j move down
bindsym $mod+Shift+k move up
bindsym $mod+Shift+l move right

# Split in horizontal orientation
bindsym $mod+Shift+v split h

# Split in vertical orientation
bindsym $mod+v split v

# Enter fullscreen mode for the focused container
bindsym $mod+f fullscreen toggle

# Change container layout
bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split

# Toggle tiling / floating
bindsym $mod+Shift+space floating toggle

# Change focus between tiling / floating windows
bindsym $mod+space focus mode_toggle

# Focus the parent container
bindsym $mod+a focus parent

# Workspaces
set $ws1 "1"
set $ws2 "2"
set $ws3 "3"
set $ws4 "4"
set $ws5 "5"
set $ws6 "6"
set $ws7 "7"
set $ws8 "8"
set $ws9 "9"
set $ws10 "10"

# Switch to workspace
bindsym $mod+1 workspace number $ws1
bindsym $mod+2 workspace number $ws2
bindsym $mod+3 workspace number $ws3
bindsym $mod+4 workspace number $ws4
bindsym $mod+5 workspace number $ws5
bindsym $mod+6 workspace number $ws6
bindsym $mod+7 workspace number $ws7
bindsym $mod+8 workspace number $ws8
bindsym $mod+9 workspace number $ws9
bindsym $mod+0 workspace number $ws10

# Move focused container to workspace
bindsym $mod+Shift+1 move container to workspace number $ws1
bindsym $mod+Shift+2 move container to workspace number $ws2
bindsym $mod+Shift+3 move container to workspace number $ws3
bindsym $mod+Shift+4 move container to workspace number $ws4
bindsym $mod+Shift+5 move container to workspace number $ws5
bindsym $mod+Shift+6 move container to workspace number $ws6
bindsym $mod+Shift+7 move container to workspace number $ws7
bindsym $mod+Shift+8 move container to workspace number $ws8
bindsym $mod+Shift+9 move container to workspace number $ws9
bindsym $mod+Shift+0 move container to workspace number $ws10

# Reload the configuration file
bindsym $mod+Shift+c reload

# Restart i3 inplace (preserves your layout/session)
bindsym $mod+Shift+r restart

# Exit i3
bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'Exit i3?' -b 'Yes' 'i3-msg exit'"

# Resize window
bindsym $mod+r mode "resize"
mode "resize" {
    bindsym h resize shrink width 10 px or 10 ppt
    bindsym j resize grow height 10 px or 10 ppt
    bindsym k resize shrink height 10 px or 10 ppt
    bindsym l resize grow width 10 px or 10 ppt
    
    bindsym Return mode "default"
    bindsym Escape mode "default"
}

# Lock screen (requires i3lock - install with: vpm install i3lock)
# bindsym $mod+Shift+x exec i3lock -c 303446

# Volume control (requires alsa-utils - install with: vpm install alsa-utils)
# bindsym XF86AudioRaiseVolume exec amixer -q set Master 5%+ unmute
# bindsym XF86AudioLowerVolume exec amixer -q set Master 5%- unmute
# bindsym XF86AudioMute exec amixer -q set Master toggle

# Brightness control (requires acpilight - install with: vpm install acpilight)
# bindsym XF86MonBrightnessUp exec xbacklight -inc 10
# bindsym XF86MonBrightnessDown exec xbacklight -dec 10

# Bar configuration
bar {
    position top
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
    
    # Show workspace numbers
    workspace_buttons yes
    
    # Disable workspace names, just show numbers
    strip_workspace_numbers no
    
    # Status command (uncomment to enable i3status)
    # status_command i3status
    
    # Custom status command example:
    # status_command while true; do echo "$(date '+%Y-%m-%d %H:%M:%S')"; sleep 1; done
}
EOF

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\n${YELLOW}Summary of what was installed:${NC}"
echo -e "• Base system updates and non-free repos"
echo -e "• Xorg, i3-gaps, dmenu, xterm"
echo -e "• Catppuccin Void wallpaper"
echo -e "• Firefox, VSCode, git, curl"
echo -e "• i3 config with matching Catppuccin colors"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Log out and log back in to apply shell change"
echo -e "2. Run ${BLUE}startx${NC} to start the graphical environment"
echo -e "\n${YELLOW}Optional packages you might want:${NC}"
echo -e "• Screenshot: ${BLUE}sudo vpm install scrot${NC}"
echo -e "• Screen lock: ${BLUE}sudo vpm install i3lock${NC}"
echo -e "• Volume control: ${BLUE}sudo vpm install alsa-utils${NC}"
echo -e "• Brightness control: ${BLUE}sudo vpm install acpilight${NC}"
echo -e "\n${YELLOW}Customization:${NC}"
echo -e "- Wallpaper: ${BLUE}~/Downloads/bg.png${NC}"
echo -e "- i3 config: ${BLUE}~/.config/i3/config${NC}"
echo -e "- Edit keybindings in the config file"
```