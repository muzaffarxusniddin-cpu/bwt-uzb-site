const sharp = require("sharp");
const fs   = require("fs");
const path = require("path");

const dir = "D:/BWT ERP/bwt-uzb-site/public/images/residences";

async function inspect(f) {
  const p = path.join(dir, f);
  const meta = await sharp(p).metadata();
  const st   = await sharp(p).stats();
  const ch   = st.channels;
  const r = Math.round(ch[0].mean), g = Math.round(ch[1].mean), b = Math.round(ch[2].mean);
  const a = meta.hasAlpha ? Math.round(ch[3].mean) : "n/a";
  console.log(`${f}: ${meta.width}x${meta.height} hasAlpha=${meta.hasAlpha} avg_rgb=(${r},${g},${b}) avg_a=${a}`);
}

async function toWebp(srcPath, slug, srcBuf) {
  const src = srcBuf ? sharp(srcBuf) : sharp(srcPath);
  const meta = await (srcBuf ? sharp(srcBuf) : sharp(srcPath)).metadata();
  const src2 = srcBuf ? sharp(srcBuf) : sharp(srcPath);
  const ar = meta.width / meta.height;
  const h = 120, maxW = 240;
  const w = Math.round(h * ar);
  const resize = w > maxW ? { width: maxW } : { height: h };
  const out = path.join(dir, slug + ".webp");
  await src2.resize(resize).webp({ quality: 90 }).toFile(out);
  console.log(`-> ${slug}.webp (${fs.statSync(out).size}B)`);
}

async function main() {
  console.log("=== INSPECT RAW PNGs ===");
  for (const f of ["piramit-raw.png","nrg-raw.png","modera-towers-raw.png","golden-house-raw.png"])
    await inspect(f);

  console.log("\n=== NESTONE SVG → PNG extraction ===");
  const svg = fs.readFileSync(path.join(dir,"nestone.svg"),"utf8");
  const m = svg.match(/xlink:href="data:image\/png;base64,([\s\S]+?)"/);
  if (m) {
    const buf = Buffer.from(m[1].replace(/\s/g,""),"base64");
    console.log("extracted PNG buffer:", buf.length, "bytes");
    // inspect it
    const meta2 = await sharp(buf).metadata();
    const st2   = await sharp(buf).stats();
    const ch2   = st2.channels;
    const r2 = Math.round(ch2[0].mean), g2 = Math.round(ch2[1].mean), b2 = Math.round(ch2[2].mean);
    const a2 = meta2.hasAlpha ? Math.round(ch2[3].mean) : "n/a";
    console.log(`nestone-extracted: ${meta2.width}x${meta2.height} hasAlpha=${meta2.hasAlpha} avg_rgb=(${r2},${g2},${b2}) avg_a=${a2}`);
    await toWebp(null, "nestone", buf);
  } else {
    console.log("No embedded PNG found — will use SVG as-is");
  }

  console.log("\n=== PROCESS PNGs → WebP ===");
  await toWebp(path.join(dir,"piramit-raw.png"),      "piramit");
  await toWebp(path.join(dir,"nrg-raw.png"),           "nrg");
  await toWebp(path.join(dir,"modera-towers-raw.png"), "modera-towers");
  await toWebp(path.join(dir,"golden-house-raw.png"),  "golden-house");

  console.log("\n=== COPY SVGs ===");
  fs.copyFileSync(path.join(dir,"mbc-raw.svg"), path.join(dir,"kislorod-murad.svg"));
  console.log("kislorod-murad.svg copied");
  console.log("mirabad-avenue.svg already in place");

  console.log("\nAll done.");
}
main().catch(e => { console.error(e); process.exit(1); });
