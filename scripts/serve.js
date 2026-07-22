#!/usr/bin/env bun
// Streams docs/ over HTTP. Bun.file() is lazy - passing it to Response streams
// the bytes off disk and sets Content-Type from the extension.
//
//   bun run scripts/serve.js [port]

const root = import.meta.dir + "/../docs/";
const port = Number(Bun.argv[2] || process.env.PORT || 3000);

const server = Bun.serve({
  port,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    const name = pathname === "/" ? "index.html" : decodeURIComponent(pathname).slice(1);

    // Keep requests inside docs/.
    if (name.includes("..")) return new Response("Forbidden", { status: 403 });

    const file = Bun.file(root + name);
    if (!(await file.exists())) return new Response("Not found", { status: 404 });

    return new Response(file, {
      headers: { "Cache-Control": "no-cache" },
    });
  },
});

console.log(`Serving docs/ at ${server.url}`);
