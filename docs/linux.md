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
