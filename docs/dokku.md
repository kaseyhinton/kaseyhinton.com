# Dokku

### Set PORT environment variable

```
dokku config:set your_app_name PORT=5000
```

### Update Procfile Add

```
web: docsify serve docs --port $PORT to Procfile.
```

### Create new app

```
dokku apps:create mysite
git remote add dokku dokku@mydokkudomain.com:mysite
git push dokku main
dokku domains:set mysite mysite.mydomain.com
dokku letsencrypt:enable mysite
```

### Vite apps

```
dokku buildpacks:set mysite heroku-community/nginx
```

### Destroy app

```
dokku apps:destroy mysite
mysites
```

### Rebuild app

```
dokku ps:rebuild your_app_name
```

### Restart app

```
dokku ps:restart your_app_name
```

### Check app status

```
dokku ps:report your_app_name
```

### View logs

```
dokku logs your_app_name
```

### Get app URL

```
dokku url your_app_name
```
