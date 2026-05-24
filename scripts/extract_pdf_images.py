"""Extract embedded images (>= 200px) from every PDF in scripts/source/.

Usage (from the bwt-uzb-site/ project root):
    pip install PyMuPDF Pillow
    python scripts/extract_pdf_images.py

Output: public/images/extracted/<pdf-stem>_p<page>_i<idx>.<ext>
"""

import os
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    raise SystemExit("PyMuPDF is not installed. Run: pip install PyMuPDF Pillow")

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "scripts" / "source"
OUTPUT_DIR = ROOT / "public" / "images" / "extracted"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

pdfs = sorted(SOURCE_DIR.glob("*.pdf"))
if not pdfs:
    raise SystemExit(f"No PDFs found in {SOURCE_DIR}. Drop the BWT PDFs there first.")

total = 0
for pdf_path in pdfs:
    doc = fitz.open(pdf_path)
    base_name = pdf_path.stem
    count = 0
    for page_num, page in enumerate(doc):
        for img_idx, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            base_image = doc.extract_image(xref)
            # Skip small images (icons / logos)
            if base_image["width"] < 200 or base_image["height"] < 200:
                continue
            ext = base_image["ext"]
            out = OUTPUT_DIR / f"{base_name}_p{page_num + 1}_i{img_idx + 1}.{ext}"
            out.write_bytes(base_image["image"])
            count += 1
    print(f"{pdf_path.name}: extracted {count} images")
    total += count
    doc.close()

print(f"\nDONE. {total} images in {OUTPUT_DIR}")
