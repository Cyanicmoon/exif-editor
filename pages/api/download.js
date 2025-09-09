// // pages/api/download.js
// import fs from "fs";
// import path from "path";

// export default function handler(req, res) {
//   const { filename } = req.query;
//   if (!filename) return res.status(400).json({ error: "filename 필요" });

//   const UPLOAD_DIR = path.join(process.cwd(), "uploads");
//   const filePath = path.join(UPLOAD_DIR, filename);

//   if (!fs.existsSync(filePath)) return res.status(404).json({ error: "파일 없음" });

//   const stat = fs.statSync(filePath);
//   const fileBuffer = fs.readFileSync(filePath);
//   res.setHeader("Content-Length", stat.size);
//   res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
//   res.setHeader("Content-Type", "application/octet-stream");
//   res.send(fileBuffer);
// }


import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { file } = req.query;
  if (!file) return res.status(400).json({ error: "파일 이름 없음" });

  const filePath = path.join(process.cwd(), "public", "uploads", file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "파일을 찾을 수 없음" });
  }

  res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
  res.setHeader("Content-Type", "application/octet-stream");

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
}
