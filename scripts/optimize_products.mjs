// Convert product PNG cutouts → WebP (alpha preserved, no upscaling).
// Run:  node scripts/optimize_products.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const DIR = path.join("public", "images", "products");
const JOBS = [
  { src: "slim-2.png", out: "slim-2.webp", w: 800 },
  { src: "slim-3.png", out: "slim-3.webp", w: 800 },
  { src: "slim-4.png", out: "slim-4.webp", w: 1200 },
];

for (const j of JOBS) {
  await sharp(path.join(DIR, j.src))
    .resize({ width: j.w, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(path.join(DIR, j.out));
  const kb = Math.round(fs.statSync(path.join(DIR, j.out)).size / 1024);
  console.log(`${j.out}  (${kb} KB)`);
}
