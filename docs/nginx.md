# Nginx

### Commands

#### Reload Config
hot reload of NGINX config without downtime

```bash
service nginx reload
```

or

```bash
/etc/init.d/nginx reload
```

### HTTP Basic Auth

#### User Setup

```bash
sudo apt install apache2-utils
mkdir /etc/apache2
sudo htpasswd -c /etc/apache2/.htpasswd user1
sudo htpasswd /etc/apache2/.htpasswd user2
cat /etc/apache2/.htpasswd
```

#### NGINX Setup

```conf
auth_basic “Admin Section”;
auth_basic_user_file /etc/apache2/.htpasswd;
```

#### More Docs

[NGINX Basic Auth Documentation](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)
