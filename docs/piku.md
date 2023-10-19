# Piku PaaS Setup

### Helpful Links

[Piku Github Page](https://github.com/piku/piku)

[Youtube Video by Chris McCormick](https://www.youtube.com/watch?v=ec-GoDukHWk)

### Configure New VPS

```bash
ssh root@myserverip
curl https://piku.github.io/get | sh
./piku-bootstrap install
```

### Configure SSH

After generating your private key via the `ssh-keygen` (name the file id_rsa in the C:/Users/username/.ssh directory) command
if you open the private key and it says OPEN-SSH instead of RSA you need to convert it via this command.

```bash
ssh-keygen -p -m PEM -f ~/.ssh/id_rsa
```

SSH to your VPS and create a file in /tmp called id_rsa.pub `touch /tmp/id_rsa.pub` Take the id_rsa.pub and put it in there
can `nano` into the file `Shift-ins` to paste. To select all and delete in case your public key is messed up `Ctrl+A Ctrl+K` will delete
everything in the file. `Ctrl+X` to quit `Y` to save `N` to discard changes.

Then run these commands

```bash
sudo su - piku
python3 piku.py setup:ssh /tmp/id_rsa.pub
```

### Configure Domain Records

A Record

```bash
Hostname: @ or blank
Type: A
TTL: 3600
Data: myserverip
```

CNAME Record

```bash
Hostname: www
Type: CNAME
TTL: 3600
Data: myserverip
```

### Additional Project Files

These are files that will be added to the root of your web application or service.

ENV

```bash
NGINX_SERVER_NAME=domain.com
NGINX_HTTPS_ONLY=1
NODE_VERSION=16.14.0
```

Procfile

```bash
web: node server.js
```

server.js

```javascript
const path = require("path");
const express = require("express");
const app = express(); // create express app

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start express server on port 5000
var port = process.env["PORT"] || 8000;
app.listen(port, () => {
  console.log("server started on port", port);
});
```

### Publishing

```bash
git remote add piku piku@myserverip:myappname
git push piku main
```

### Troubleshooting

if you have trouble provisioning a certificate with a timeout error ensure the firewall rules are allowing traffic to port 80

```bash
sudo ufw allow 80/tcp
```

if you have everything set up but cannot see your deployed application on your custom domain allow nginx port 80 and 443 through the firewall

```bash
sudo ufw allow "Nginx FULL"
```

### Useful commands

To find the files actually under the hood that Piku uses (Nginx configs etc)

```bash
ls /home/piku/.piku

acme  apps  envs  logs  nginx  repos  uwsgi  uwsgi-available  uwsgi-enabled
```

To clear out NGINX logs - full explanation [here](https://stackoverflow.com/questions/32410053/clean-var-log-nginx-logs-file)

```bash
cd /var/log/nginx
mv access.log access.log.old
mv error.log error.log.old
kill -USR1 `cat /var/run/nginx.pid`
```

SSH Commands

```bash
ssh piku@myserverip

Commands:
  apps              List apps, e.g.: piku apps
  config            Show config, e.g.: piku config <app>
  config:get        e.g.: piku config:get <app> FOO
  config:live       e.g.: piku config:live <app>
  config:set        e.g.: piku config:set <app> FOO=bar BAZ=quux
  config:unset      e.g.: piku config:unset <app> FOO
  deploy            e.g.: piku deploy <app>
  destroy           e.g.: piku destroy <app>
  git-hook          INTERNAL: Post-receive git hook
  git-receive-pack  INTERNAL: Handle git pushes for an app
  git-upload-pack   INTERNAL: Handle git upload pack for an app
  help              display help for piku
  logs              Tail running logs, e.g: piku logs <app> [<process>]
  ps                Show process count, e.g: piku ps <app>
  ps:scale          e.g.: piku ps:scale <app> <proc>=<count>
  restart           Restart an app: piku restart <app>
  run               e.g.: piku run <app> ls -- -al
  setup             Initialize environment
  setup:ssh         Set up a new SSH key (use - for stdin)
  stop              Stop an app, e.g: piku stop <app>
  update            Update the piku cli

```

### Nginx override. Redirect to https

Override nginx to add a www. redirect to https

```bash
nano /home/piku/.piku/nginx/mysite.conf
```

```
server {
        listen 80;
        server_name www.mysite.com;
        return 301 $scheme://mysite.com$request_uri;
}

server {
        listen 80;
        server_name domain.example;
}
```

Test and Reload nginx

```bash
nginx -t
nginx -s reload
```

### DNS entries for piku sites

A Record @ serverip
A Record www serverip