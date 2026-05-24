// Crop the leftover "References" catalog text off the top of the hero splash,
// producing a clean derivative. Run:  node scripts/crop_hero.mjs
import sharp from "sharp";
import path from "path";

const SRC = path.join("public", "images", "hero", "water-splash-fullbleed.jpg");
const OUT = path.join("public", "images", "hero", "water-splash-hero.jpg");

const meta = await sharp(SRC).metadata();
const top = Math.round(meta.height * 0.31); // removes the "References" text band
await sharp(SRC)
  .extract({ left: 0, top, width: meta.width, height: meta.height - top })
  .jpeg({ quality: 86 })
  .toFile(OUT);

console.log(`water-splash-hero.jpg ← cropped top ${top}px of ${meta.height} (${meta.width}x${meta.height - top})`);
