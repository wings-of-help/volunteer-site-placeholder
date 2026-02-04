import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====== STATIC (Vite build output) ======
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// ====== SPA FALLBACK (React Router) ======
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ====== START ======
app.listen(PORT, () => {
  console.log(`🚀 Frontend running on port ${PORT}`);
});
