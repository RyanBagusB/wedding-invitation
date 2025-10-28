// convert.js
import sharp from "sharp";

const input = "public/pengantin.jpg";
const output = "public/pengantin.webp";

sharp(input)
  .resize(1200, 630)
  .toFormat("webp", { quality: 90 })
  .toFile(output)
  .then(() => console.log("✅ Gambar berhasil dikonversi ke WEBP:", output))
  .catch((err) => console.error("❌ Gagal konversi:", err));
