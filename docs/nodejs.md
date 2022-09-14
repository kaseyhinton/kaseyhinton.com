# Nodejs

## How to compile a NodeJS application to a binary file

Makes portable, obscures source code, bundles node runtime and dependencies

[package source](https://github.com/vercel/pkg)

```bash
npm install -g pkg
pkg index.js -o mybinary # assumes target from current OS
./mybinary

# pkg index.js -o mybinary --targets node-16-win-x64 --compress GZip
```

## Find and kill orphaned node cli apps by port

Use an elevated command prompt

```bash
netstat -ano | find "LISTENING" | find "8000"

# TCP    0.0.0.0:8000           0.0.0.0:0              LISTENING       4048

taskkill /pid 4048 /f

```
