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

### Webmin and Nginx setup on Alpine linux

```
apk update
apk upgrade

sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/ssh
sudo ufw allow 10000

apk add neovim perl perl-net-ssleay perl-html-parser nginx certbot certbot-nginx


cd /opt
wget -O - https://www.webmin/download/webmin-current.tar.gz | tar -xzf -
mv webmin-2.302 webmin
cd webmin
./setup.sh /usr/local/webmin
```

Config file directory [/etc/webmin]: enter
Log file directory [/var/webmin]: /var/log/webmin
Full path to perl: enter
Operating system: 84 // 84 must be Gentoo
Version: ES4.0
Web server port (default 10000): enter (or other port number)
Login name (default admin): admin
Login password: admin-password
Password again: admin-password
Use SSL (y/n): n
Start Webmin at boot time (y/n): y

```

sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled
sudo nvim /etc/nginx/nginx.conf
```

Add
`include /etc/nginx/sites-enabled/*; `

```
sudo certbot --nginx -d mydomain.com www.mydomain.com
```

#### Installing bun on Alpine

```bash
    curl -fsSL https://bun.sh/install | bash
    sudo nvim ~/.profile
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    source ~/.profile
```

### Running a back-end service on Alpine

#### Run the back-end with OpenRC (Alpine Linux)

Create the OpenRC service at `/etc/init.d/my-backend`:

```sh
#!/sbin/openrc-run

name="My Back-end"
description="back-end for mywebsite.com"

command="/usr/local/bin/bun" # wherever this is the service user needs permission to run it see section below
command_args="server.js"
directory="/var/www/mywebsite.com/back-end"
pidfile="/run/my-backend.pid"

command_user="nobody:nogroup"

supervisor="supervise-daemon"
respawn_delay=3
respawn_max=0

output_log="/var/log/my-backend/output.log"
error_log="/var/log/my-backend/error.log"

depend() {
    need net
}

start_pre() {
    # Ensure runtime and log paths exist with safe permissions
    checkpath --directory --mode 0755 /run
    checkpath --directory --owner nobody:nogroup --mode 0755 /var/log/my-backend
}
```

Make it executable, add to default runlevel, and start it:

```bash
sudo chmod +x /etc/init.d/my-backend
sudo rc-update add my-backend default
sudo rc-service my-backend start
sudo rc-service my-backend status
```

#### Make bun accessible for OpenRc user

```bash
# 1) Put bun in a public path (copy, not symlink from /root)

sudo install -m 0755 -o root -g root /root/.bun/bin/bun /usr/local/bin/bun
sudo rm -f /usr/bin/bun  # remove any bad symlink

# 3) Sanity check as the service user
sudo -u nobody /usr/local/bin/bun --version

# 4) Restart service and verify
sudo rc-service hftv-backend start
sudo rc-service hftv-backend status
curl -sS http://127.0.0.1:3002/health
```

#### Deploying nginx Basic Auth (Alpine Linux example)

1. Install apache2-utils to manage htpasswd:

```bash
sudo apk add --no-cache apache2-utils
```

2. Create/update credentials (interactive password prompt):

```bash
sudo htpasswd -c /etc/nginx/.htpasswd admin
```

3. Configure nginx site (snippet):

```
server {
  listen 443 ssl http2;
  server_name mywebsite.com;

  # ... ssl certs ...

  location /api/ {
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_set_header X-Remote-User $remote_user;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:3002/;
  }
}
```

4. Test config and reload:

```bash
sudo nginx -t && sudo rc-service nginx reload
```

5. Verify:

```bash
curl -u admin:password https://mywebsite.com/api/health -i
```

### Alpine linux SQLite DB file not writable

```bash
sudo chown nobody:nogroup /var/www/mywebsite.com/back-end/db.sqlite
sudo chmod 660 /var/www/mywebsite.com/back-end/db.sqlite
```

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



### Complete Setup Guide: Cryptgeon with Caddy on Alpine Linux
#### Prerequisites
- Fresh Alpine Linux VPS/VM

- Root or sudo access

- Domain name pointed to your server IP


#### Step 1: Initial Alpine Linux Setup
##### Update the system
```bash
# Update package list and upgrade system
apk update && apk upgrade
```


#### Step 2: Install Docker & Docker Compose
##### Install Docker
```bash
# Install Docker
sudo apk add docker

# Start Docker service
sudo rc-service docker start
sudo rc-update add docker boot
```

##### Install Docker Compose
```bash
# Install docker-compose
sudo apk add docker-compose

# Verify installation
docker --version
docker-compose --version
```

#### Step 3: Firewall Setup
##### Alpine uses iptables by default. Here's how to set it up:
```bash
# Install iptables if not present
sudo apk add iptables

# Allow SSH (port 22) - VERY IMPORTANT!
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP and HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Set default policies
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A OUTPUT -o lo -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Save iptables rules (if using persistent iptables)
sudo apk add iptables-legacy
sudo rc-service iptables save
sudo rc-update add iptables
```

#### UFW setup
```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status verbose
```

#### Step 4: Create Project Directory
```bash
# Create project directory
mkdir ~/cryptgeon && cd ~/cryptgeon
```

#### Step 5: Create Docker Compose File
##### Create docker-compose.yml:
```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    command: redis-server --save "" --appendonly no
    tmpfs:
      - /data
    networks:
      - app-network

  app:
    image: cupcakearmy/cryptgeon:latest
    depends_on:
      - redis
    environment:
      SIZE_LIMIT: 4 MiB
    networks:
      - app-network

  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge

volumes:
  caddy_data:
  caddy_config:
```

#### Step 6: Create Caddyfile
##### Create Caddyfile (no extension):
```text
myapp.com {
    reverse_proxy app:8000
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=63072000"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
        -Server
    }
}
```

#### Step 7: Deploy the Application
```bash
# Deploy the stack
docker compose up -d

# Check if all services are running
docker compose ps

# View logs to ensure everything started correctly
docker compose logs -f
```

#### Step 8: Verify Installation

##### Check services are running
```bash
docker compose ps
```


#### Step 9: Maintenance Commands

```bash
# Stop the application
docker compose down

# Start the application
docker compose up -d

# Update the application
docker compose pull
docker compose up -d

# View logs
# All services
docker compose logs

# Specific service
docker compose logs caddy
docker compose logs app



```