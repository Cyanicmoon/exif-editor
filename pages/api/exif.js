// // import { ExifTool } from "exiftool-vendored";
// // import formidable from "formidable";
// // import fs from "fs";

// // export const config = {
// // api: {
// //     bodyParser: false,
// // },
// // };



// // const exiftool = new ExifTool();

// // export default async function handler(req, res) {
// // if (req.method !== "POST") {
// //     return res.status(405).json({ error: "POST 메서드만 지원됩니다." });
// // }

// // const form = formidable({ multiples: false, keepExtensions: true });

// // form.parse(req, async (err, fields, files) => {
// //     if (err) {
// //     console.error("폼 파싱 에러:", err);
// //     return res.status(500).json({ error: "이미지 업로드 실패" });
// //     }

// //     console.log("📂 업로드된 파일:", files);

// //     try {
// //     const uploadedFile = files.file;
// //     if (!uploadedFile) {
// //         return res.status(400).json({ error: "이미지가 업로드되지 않았습니다." });
// //     }

// //     const filePath = uploadedFile.filepath || uploadedFile.path || uploadedFile[0]?.filepath || uploadedFile[0]?.path;

// //     if (!filePath) {
// //         console.error("🚨 파일 경로를 찾을 수 없음:", uploadedFile);
// //         return res.status(500).json({ error: "파일 경로를 찾을 수 없습니다." });
// //     }

// //     console.log("📌 파일 경로:", filePath);

// //     const metadata = await exiftool.read(filePath);

// //     fs.unlink(filePath, () => {});

// //     return res.status(200).json({ success: true, metadata });
// //     } catch (error) {
// //     console.error("EXIF 읽기 실패:", error);
// //     return res.status(500).json({ error: "EXIF 메타데이터 읽기 실패" });
// //     }
// // });
// // }




// // pages/api/exif.js
// import { ExifTool } from "exiftool-vendored";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = { api: { bodyParser: false } };
// const exiftool = new ExifTool();

// const UPLOAD_DIR = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// const parseForm = (req) =>
//   new Promise((resolve, reject) => {
//     const form = formidable({ multiples: false, keepExtensions: true });
//     form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
//   });

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).json({ error: "POST만 지원" });

//   try {
//     const { fields, files } = await parseForm(req);
//     let file = files.file;
//     if (Array.isArray(file)) file = file[0];
//     if (!file) return res.status(400).json({ error: "파일 없음" });

//     // 유니크 파일명 생성 (타임스탬프 + 랜덤)
//     const originalName = file.originalFilename || file.newFilename || "upload.jpg";
//     const ext = path.extname(originalName) || ".jpg";
//     const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
//     const savedPath = path.join(UPLOAD_DIR, uniqueName);

//     // temp -> uploads 폴더로 복사
//     fs.copyFileSync(file.filepath, savedPath);

//     // EXIF 읽기
//     let metadata;
//     try {
//       metadata = await exiftool.read(savedPath);
//     } catch (err) {
//       console.error("EXIF 읽기 실패:", err);
//       return res.status(500).json({ error: "EXIF 읽기 실패" });
//     }

//     // 반환: metadata + savedFilename (클라이언트는 이를 가지고 이후 수정 요청)
//     return res.status(200).json({ success: true, metadata, savedFilename: uniqueName });
//   } catch (err) {
//     console.error("폼 처리 실패:", err);
//     return res.status(500).json({ error: "파일 업로드 실패" });
//   }
// }



import { ExifTool } from "exiftool-vendored";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } };
const exiftool = new ExifTool();
const uploadDir = path.join(process.cwd(), "public", "uploads");

// 업로드 폴더 생성
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST만 지원" });

  const parseForm = (req) =>
    new Promise((resolve, reject) => {
      const form = formidable({ multiples: false, keepExtensions: true });
      form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
    });

  try {
    const { files } = await parseForm(req);
    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (!file) return res.status(400).json({ error: "파일 없음" });

    const fileName = Date.now() + "-" + file.originalFilename;
    const savePath = path.join(uploadDir, fileName);
    fs.copyFileSync(file.filepath, savePath);

    const metadata = await exiftool.read(savePath);

    res.status(200).json({ success: true, metadata, fileName });
  } catch (err) {
    console.error("EXIF 읽기 실패:", err);
    res.status(500).json({ error: "EXIF 읽기 실패" });
  }
}
