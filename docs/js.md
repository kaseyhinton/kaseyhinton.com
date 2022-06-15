# JavaScript

## Simple server watch program

[C# Alternate Example](csharp.md#simple-server-watch-program)

index.js

```javascript
const polka = require("polka");
const cors = require("cors");
var tcpp = require("tcp-ping");

const app = polka();

const ONE_MINUTE = 60 * 1000;
const serverCache = {};

app.use(cors());

app.get("/server/:ip", async (req, res) => {
  const { ip } = req.params;

  if (serverCache?.[ip]) {
    const lastPing = serverCache?.[ip];
    if (new Date() - new Date(lastPing?.date) < ONE_MINUTE) {
      res.end(lastPing?.status ?? "Error");
    }
  }

  tcpp.ping({ address: ip, attempts: 1 }, function (err, data) {
    const status = Boolean(data?.results?.[0]?.time);
    serverCache[ip] = {
      status: status,
      date: new Date(),
    };
    res.end(status ? "Online" : "Offline");
  });
});

const port = process.env["PORT"] || 3000;
app.listen(port, () => {
  console.log(`> Running on localhost:${port}`);
});
```

package.json

```json
{
  "scripts": {
    "start": "node index.js",
    "build": "esbuild index.js --bundle --minify --platform=node --outdir=build",
    "deploy": "npm run build && node ./build/index.js"
  },
  "dependencies": {
    "cors": "2.8.5",
    "polka": "^0.5.2",
    "tcp-ping": "^0.1.1"
  },
  "devDependencies": {
    "esbuild": "^0.14.43"
  }
}
```
