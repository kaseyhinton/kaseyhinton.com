#!/usr/bin/env node
// Renders every docs/*.md through the exact markdown pipeline embedded in
// docs/index.html and flags output that looks wrong.
//
//   node scripts/check-render.js
//   node scripts/check-render.js --dump piku.md

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const docs = path.join(__dirname, "..", "docs");
const html = fs.readFileSync(path.join(docs, "index.html"), "utf8");

function section(re, what) {
  const m = html.match(re);
  if (!m) throw new Error(`could not extract ${what} from docs/index.html`);
  return m[1];
}

const sandbox = vm.createContext({});
vm.runInContext(section(/\/\* prettier-ignore \*\/\s*(![\s\S]*?)\n\s*<\/script>/, "snarkdown"), sandbox);
vm.runInContext(section(/(\/\/ --- markdown -[\s\S]*?)\/\/ --- data -/, "markdown pipeline"), sandbox);
const toHtml = sandbox.toHtml;

const dump = process.argv.includes("--dump") && process.argv[process.argv.indexOf("--dump") + 1];
if (dump) {
  console.log(toHtml(fs.readFileSync(path.join(docs, dump), "utf8")));
  process.exit(0);
}

// loadNav() dedents the sidebar before rendering it, so test the same input
const asApp = (name, text) =>
  name === "_sidebar.md" ? text.replace(/^[ \t]+/gm, "") : text;

let failures = 0;
for (const f of fs.readdirSync(docs).filter((f) => f.endsWith(".md"))) {
  const src = asApp(f, fs.readFileSync(path.join(docs, f), "utf8"));
  const out = toHtml(src);
  const fences = (src.match(/^``` *\w*\r?$/gm) || []).length / 2;

  const flags = [];
  if (/```/.test(out)) flags.push("UNPARSED-FENCE");
  if (/<a>/.test(out)) flags.push("UNRESOLVED-LINK");
  if (/[\u0001\u0002]/.test(out)) flags.push("LEAKED-SENTINEL");
  // these docs use no italics, so any <em> means a stray _ or * was eaten
  if (/<em>/.test(out)) flags.push("SPURIOUS-EM");
  if (/href="[^"]*\.md"/.test(out)) flags.push("UNREWRITTEN-LINK");
  if (!out.trim()) flags.push("EMPTY");
  if (fences && (out.match(/<pre/g) || []).length < fences) flags.push("MISSING-PRE");

  if (flags.length) failures++;
  console.log(
    `${flags.length ? "FAIL" : "ok  "} ${f.padEnd(15)} ` +
      `pre=${String((out.match(/<pre/g) || []).length).padStart(2)}/${String(fences).padStart(2)} ` +
      `h=${String((out.match(/<h[1-6] /g) || []).length).padStart(2)} ` +
      `a=${String((out.match(/<a href/g) || []).length).padStart(2)} ${flags.join(" ")}`
  );
}

console.log(failures ? `\n${failures} file(s) with problems` : "\nall files rendered cleanly");
process.exit(failures ? 1 : 0);
