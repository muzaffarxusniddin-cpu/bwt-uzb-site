// Crop the baked-in "Cho'kma(накип)…" Uzbek caption off the bottom of the
// limescale macro (used by HiddenThreat + PainPoints "Техника"). Run:
//   node scripts/crop_limescale.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const f = path.join("public", "images", "pain_points", "limescale-kettle-interior.jpg");
const input = fs.readFileSync(f); // read fully into buffer so we can overwrite the same path
const meta = await sharp(input).metadata();
const h = Math.round(meta.height * 0.8); // drop bottom 20% (caption band)
const buf = await sharp(input)
  .extract({ left: 0, top: 0, width: meta.width, height: h })
  .jpeg({ quality: 86 })
  .toBuffer();
fs.writeFileSync(f, buf);
console.log(`cropped → ${meta.width}x${h} (was ${meta.width}x${meta.height})`);
