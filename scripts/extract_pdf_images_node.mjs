// Extract embedded images (>= 300px) from every PDF in scripts/source/ using MuPDF (WASM).
// Run from project root:  node scripts/extract_pdf_images_node.mjs
import * as mupdf from "mupdf";
import fs from "fs";
import path from "path";

const SOURCE = path.join("scripts", "source");
const OUT = path.join("public", "images", "extracted");
fs.mkdirSync(OUT, { recursive: true });

const pdfs = fs.readdirSync(SOURCE).filter((f) => f.toLowerCase().endsWith(".pdf"));
let total = 0;

for (const pdf of pdfs) {
  const data = new Uint8Array(fs.readFileSync(path.join(SOURCE, pdf)));
  const doc = mupdf.Document.openDocument(data, "application/pdf");
  const stem = path.basename(pdf, ".pdf");
  const n = doc.countPages();
  let c = 0;
  for (let i = 0; i < n; i++) {
    const page = doc.loadPage(i);
    const st = page.toStructuredText("preserve-images");
    st.walk({
      onImageBlock(_bbox, _transform, image) {
        try {
          const w = image.getWidth();
          const h = image.getHeight();
          if (w < 300 || h < 300) return;
          const pix = image.toPixmap();
          const png = pix.asPNG();
          fs.writeFileSync(path.join(OUT, `${stem}_p${i + 1}_${c}_${w}x${h}.png`), Buffer.from(png));
          c++;
          total++;
        } catch (e) {
          // skip un-extractable image
        }
      },
    });
  }
  console.log(`${pdf}: ${c} images (>=300px)`);
}
console.log(`TOTAL ${total} images -> ${OUT}`);
