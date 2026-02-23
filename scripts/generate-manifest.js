/**
 * Generates a static content manifest (site-manifest.json) from image data.
 * This makes the site's content readable by AI agents without rendering JavaScript.
 *
 * Usage: node scripts/generate-manifest.js
 */
import { homeImages, ftprtuImages, aorImages, iycsmmImages, sotsImages } from "../src/images/index.js";

const manifest = {
  generated: new Date().toISOString(),
  site: "https://fhwrdh.net",
  routing: "hash-based (e.g. https://fhwrdh.net/#/work/ftprtu)",
  pages: [
    {
      name: "Home",
      route: "/",
      description: "Landing page with masonry grid of selected images",
      images: homeImages,
    },
    {
      name: "First They Passed Right Through Us",
      route: "/work/ftprtu",
      description: "Spring 2024 series. B&W film photography paired with music from Steve Roden's discography. Each image is named for and linked to a corresponding piece of music.",
      images: ftprtuImages,
    },
    {
      name: "Angle of Repose",
      route: "/work/angleofrepose",
      description: "Photo series",
      images: aorImages,
    },
    {
      name: "If You Can't See My Mirrors",
      route: "/work/iycsmm",
      description: "Photo series",
      images: iycsmmImages,
    },
    {
      name: "Sound of the Sea",
      route: "/work/soundofthesea",
      description: "Photo series",
      images: sotsImages,
    },
    {
      name: "About",
      route: "/about",
      description: "Artist statement and exhibition history",
      images: [],
    },
  ],
};

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "site-manifest.json");

writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${outPath}`);
