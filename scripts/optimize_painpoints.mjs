// Convert the 4 new Pain Points photos to WebP (max 800px, q84) and remove the .jpg sources.
// Run:  node scripts/optimize_painpoints.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const DIR = path.join("public", "images", "pain_points");
const NAMES = ["volosy", "vkus", "roditeli", "vremya"];

for (const name of NAMES) {
  const jpg = path.join(DIR, `${name}.jpg`);
  if (!fs.existsSync(jpg)) {
    console.log(`skip ${name} (no .jpg)`);
    continue;
  }
  const input = fs.readFileSync(jpg);
  await sharp(input)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(DIR, `${name}.webp`));
  fs.unlinkSync(jpg);
  const kb = Math.round(fs.statSync(path.join(DIR, `${name}.webp`)).size / 1024);
  console.log(`${name}.webp (${kb} KB)`);
}
