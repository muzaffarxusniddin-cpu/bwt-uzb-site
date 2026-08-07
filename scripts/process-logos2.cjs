const sharp = require("sharp");
const path = require("path");
const fs   = require("fs");
const dir  = "D:/BWT ERP/bwt-uzb-site/public/images/residences";

async function toWebp(src, slug) {
  const srcPath = path.join(dir, src);
  const meta = await sharp(srcPath).metadata();
  console.log(`${src}: ${meta.width}x${meta.height} format=${meta.format} hasAlpha=${meta.hasAlpha}`);
  const ar = meta.width / meta.height;
  const h = 120, maxW = 240;
  const resize = Math.round(h * ar) > maxW ? { width: maxW } : { height: h };
  const out = path.join(dir, slug + ".webp");
  await sharp(srcPath).resize(resize).webp({ quality: 90 }).toFile(out);
  console.log(`-> ${slug}.webp (${fs.statSync(out).size}B)`);
}

async function main() {
  await toWebp("mirabad-input.png.jpg", "mirabad-avenue");
  await toWebp("piramit-input.png.jpg", "piramit");
  console.log("Done.");
}
main().catch(e => { console.error(e); process.exit(1); });
