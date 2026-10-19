// Turns the built site (dist/) into a staging copy (.staging/) that can be
// published as a private Claude artifact, to preview changes before going live.
//
//   pnpm staging
//
// An artifact serves files relative to the page and blocks images from other
// sites, so this script:
//   - flattens the pages to index.html and blog.html
//   - rewrites root paths ("/logos/x.png") to relative ones ("logos/x.png")
//   - downloads the Credly badge images so they load inside the artifact
//   - adds a small "Staging" label so the preview is never mistaken for the live site
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const DIST = "dist";
const OUT = ".staging";

if (!existsSync(join(DIST, "index.html"))) {
  console.error("No build found. Run `pnpm build` first (or use `pnpm staging`).");
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
// Artifacts reserve names starting with "_", so Astro's _astro/ folder becomes assets/.
const FOLDERS = { _astro: "assets", logos: "logos", projects: "projects" };
for (const [from, to] of Object.entries(FOLDERS)) {
  if (existsSync(join(DIST, from))) cpSync(join(DIST, from), join(OUT, to), { recursive: true });
}
for (const file of ["favicon.svg", "picofme.png", "og_image.png", "apple-touch-icon.png", "resume.pdf"]) {
  if (existsSync(join(DIST, file))) cpSync(join(DIST, file), join(OUT, file));
}

// Root-relative paths used by the site, and what they become in the staging copy.
const ASSET_PREFIXES = ["_astro/", "logos/", "projects/", "photos/", "picofme.png", "og_image.png", "favicon.svg", "apple-touch-icon.png", "resume.pdf"];
// In script bundles a bare "/" is often library code (path joins), so there
// only `href:"/"` is treated as a link to the home page.
function relativize(text, { isScript = false } = {}) {
  if (isScript) text = text.replaceAll('href:"/"', 'href:"index.html"');
  for (const quote of ['"', "&quot;", "'"]) {
    text = text
      .replaceAll(`${quote}/blog/${quote}`, `${quote}blog.html${quote}`)
      .replaceAll(`${quote}/blog${quote}`, `${quote}blog.html${quote}`);
    if (!isScript) text = text.replaceAll(`${quote}/${quote}`, `${quote}index.html${quote}`);
    for (const prefix of ASSET_PREFIXES) {
      text = text.replaceAll(`${quote}/${prefix}`, `${quote}${prefix}`);
    }
    text = text.replaceAll(`${quote}_astro/`, `${quote}assets/`);
  }
  return text;
}

const STAGING_LABEL = `<div style="position:fixed;top:calc(8px + env(safe-area-inset-top,0px));left:calc(8px + env(safe-area-inset-left,0px));z-index:60;font:600 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;padding:6px 10px;border-radius:999px;background:#f59e0b;color:#1c1917;pointer-events:none">Staging</div>`;

async function localizeBadges(html) {
  const urls = [...new Set(html.match(/https:\/\/images\.credly\.com\/[^"&\s]+/g) ?? [])];
  if (urls.length === 0) return html;
  mkdirSync(join(OUT, "badges"), { recursive: true });
  for (const url of urls) {
    const name = createHash("sha1").update(url).digest("hex").slice(0, 12) + ".png";
    const target = join(OUT, "badges", name);
    if (!existsSync(target)) {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`[staging] Could not download ${url} (HTTP ${res.status})`);
        continue;
      }
      writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    }
    html = html.replaceAll(url, `badges/${name}`);
  }
  return html;
}

async function stagePage(from, to) {
  let html = readFileSync(join(DIST, from), "utf8");
  html = relativize(html);
  html = await localizeBadges(html);
  html = html.replace(/<title>[\s\S]*?<\/title>/, "<title>Portfolio Staging</title>");
  html = html.replace("<body", "<body data-staging").replace(/(<body[^>]*>)/, `$1${STAGING_LABEL}`);
  writeFileSync(join(OUT, to), html);
}

await stagePage("index.html", "index.html");
if (existsSync(join(DIST, "blog", "index.html"))) await stagePage("blog/index.html", "blog.html");

// Fonts in the stylesheet resolve relative to the stylesheet itself.
// Script bundles hold a few site links ("/blog", "/") that resolve against the page.
for (const file of readdirSync(join(OUT, "assets"))) {
  const path = join(OUT, "assets", file);
  if (file.endsWith(".css")) {
    writeFileSync(path, readFileSync(path, "utf8").replaceAll("url(/_astro/", "url(./"));
  } else if (file.endsWith(".js")) {
    // The artifact service rejects a literal U+FFFD; libraries use it inside
    // strings, where the \uFFFD escape means exactly the same thing.
    const js = relativize(readFileSync(path, "utf8"), { isScript: true }).replaceAll("\uFFFD", "\\uFFFD");
    writeFileSync(path, js);
  }
}

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (path !== join(OUT, "index.html")) files.push(path.slice(OUT.length + 1));
  }
};
walk(OUT);
writeFileSync(join(OUT, "files.json"), JSON.stringify(files, null, 2));
console.log(`[staging] ${OUT}/index.html + ${files.length} files ready to publish.`);
