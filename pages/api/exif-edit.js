// // // import { ExifTool } from "exiftool-vendored";
// // // import formidable from "formidable";
// // // import fs from "fs";
// // // import path from "path";

// // // export const config = { api: { bodyParser: false } };
// // // const exiftool = new ExifTool();

// // // // 업로드 디렉토리 경로 설정
// // // const UPLOAD_DIR = path.join(process.cwd(), "uploads");
// // // if (!fs.existsSync(UPLOAD_DIR)) {
// // //   fs.mkdirSync(UPLOAD_DIR);
// // // }

// // // export default async function handler(req, res) {
// // //   if (req.method !== "POST") {
// // //     return res.status(405).json({ error: "POST만 지원" });
// // //   }

// // //   // form.parse를 Promise로 감싸 async/await 지원
// // //   const parseForm = (req) =>
// // //     new Promise((resolve, reject) => {
// // //       const form = formidable({ multiples: false, keepExtensions: true });
// // //       form.parse(req, (err, fields, files) =>
// // //         err ? reject(err) : resolve({ fields, files })
// // //       );
// // //     });

// // //   try {
// // //     const { fields, files } = await parseForm(req);

// // //     let file = files.file;
// // //     if (Array.isArray(file)) file = file[0];

// // //     if (!file) {
// // //       console.log("파일 객체 확인:", files.file);
// // //       return res.status(500).json({ error: "파일 경로 없음" });
// // //     }

// // //     // 서버의 업로드 폴더로 원본 파일 이동
// // //     const originalName = file.originalFilename || "uploaded.jpg";
// // //     const safeFilePath = path.join(UPLOAD_DIR, originalName);
// // //     fs.copyFileSync(file.filepath, safeFilePath);

// // //     // edits 파싱
// // //     const edits = fields.edits ? JSON.parse(fields.edits) : {};

// // //     // null/undefined 건너뛰기 + 타입 안전 처리
// // //     const allowedKeys = ["Make", "Model", "Lens", "ExposureTime", "FNumber", "ISO", "FocalLength"];
// // //     const safeEdits = {};
// // //     allowedKeys.forEach((k) => {
// // //       let val = edits[k];
// // //       if (val !== undefined && val !== null && val !== "") {
// // //         if (["FNumber", "ISO", "FocalLength"].includes(k)) val = Number(val);
// // //         if (k === "ExposureTime") val = val.toString();
// // //         safeEdits[k] = val;
// // //       }
// // //     });

// // //     // EXIF 쓰기 (덮어쓰기)
// // //     try {
// // //       await exiftool.write(safeFilePath, safeEdits);
// // //     } catch (writeErr) {
// // //       console.error("EXIF 쓰기 실패:", writeErr);
// // //       return res.status(500).json({ error: "EXIF 쓰기 실패" });
// // //     }

// // //     // EXIF 읽기
// // //     let metadata;
// // //     try {
// // //       metadata = await exiftool.read(safeFilePath);
// // //     } catch (readErr) {
// // //       console.error("EXIF 읽기 실패:", readErr);
// // //       return res.status(500).json({ error: "EXIF 읽기 실패" });
// // //     }

// // //     res.status(200).json({ success: true, metadata, savedPath: safeFilePath });
// // //   } catch (err) {
// // //     console.error("폼 처리 실패:", err);
// // //     if (!res.headersSent) res.status(500).json({ error: "EXIF 수정 실패" });
// // //   }
// // // }




// // // pages/api/exif-edit.js
// // import { ExifTool } from "exiftool-vendored";
// // import formidable from "formidable";
// // import fs from "fs";
// // import path from "path";

// // export const config = { api: { bodyParser: false } };
// // const exiftool = new ExifTool();

// // const UPLOAD_DIR = path.join(process.cwd(), "uploads");
// // if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// // const parseForm = (req) =>
// //   new Promise((resolve, reject) => {
// //     const form = formidable({ multiples: false, keepExtensions: true });
// //     form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
// //   });

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") return res.status(405).json({ error: "POST만 지원" });

// //   try {
// //     const { fields, files } = await parseForm(req);

// //     // 클라이언트는 savedFilename(서버에 저장된 파일명)만 보내야 합니다.
// //     // (또는 파일을 다시 보낼 경우를 대비해 파일 처리도 지원)
// //     let savedFilename = fields.savedFilename;
// //     let fileObj = files.file;
// //     if (Array.isArray(fileObj)) fileObj = fileObj[0];

// //     let targetPath;

// //     if (savedFilename) {
// //       // 기존에 저장된 파일을 사용
// //       targetPath = path.join(UPLOAD_DIR, savedFilename);
// //       if (!fs.existsSync(targetPath)) {
// //         return res.status(404).json({ error: "서버에 저장된 파일을 찾을 수 없습니다." });
// //       }
// //     } else if (fileObj) {
// //       // (예비) 파일이 들어온 경우 새로 저장
// //       const originalName = fileObj.originalFilename || fileObj.newFilename || "upload.jpg";
// //       const ext = path.extname(originalName) || ".jpg";
// //       const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
// //       targetPath = path.join(UPLOAD_DIR, uniqueName);
// //       fs.copyFileSync(fileObj.filepath, targetPath);
// //       savedFilename = uniqueName;
// //     } else {
// //       return res.status(400).json({ error: "savedFilename 또는 file이 필요합니다." });
// //     }

// //     // edits 파싱
// //     const edits = fields.edits ? JSON.parse(fields.edits) : {};

// //     // 안전한 키만 골라서 적용 (null/"" 건너뜀, 타입 처리)
// //     const allowedKeys = ["Make", "Model", "Lens", "ExposureTime", "FNumber", "ISO", "FocalLength", "Artist", "DateTimeOriginal"];
// //     const safeEdits = {};
// //     allowedKeys.forEach((k) => {
// //       let val = edits[k];
// //       if (val !== undefined && val !== null && val !== "") {
// //         if (["FNumber", "ISO", "FocalLength"].includes(k)) val = Number(val);
// //         if (k === "ExposureTime") val = val.toString();
// //         safeEdits[k] = val;
// //       }
// //     });

// //     // safeEdits가 비어있지 않으면 쓰기
// //     if (Object.keys(safeEdits).length > 0) {
// //       try {
// //         await exiftool.write(targetPath, safeEdits);
// //       } catch (writeErr) {
// //         console.error("EXIF 쓰기 실패:", writeErr);
// //         return res.status(500).json({ error: "EXIF 쓰기 실패" });
// //       }
// //     }

// //     // 최신 metadata 읽기
// //     let metadata;
// //     try {
// //       metadata = await exiftool.read(targetPath);
// //     } catch (readErr) {
// //       console.error("EXIF 읽기 실패:", readErr);
// //       return res.status(500).json({ error: "EXIF 읽기 실패" });
// //     }

// //     // 응답: metadata + savedFilename (클라이언트는 이 savedFilename을 계속 사용)
// //     return res.status(200).json({ success: true, metadata, savedFilename });
// //   } catch (err) {
// //     console.error("폼 처리 실패:", err);
// //     if (!res.headersSent) return res.status(500).json({ error: "EXIF 수정 실패" });
// //   }
// // }


// import { ExifTool } from "exiftool-vendored";
// import formidable from "formidable";
// import fs from "fs";
// import path from "path";

// export const config = { api: { bodyParser: false } };
// const exiftool = new ExifTool();
// const uploadDir = path.join(process.cwd(), "public", "uploads");

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).json({ error: "POST만 지원" });

//   const parseForm = (req) =>
//     new Promise((resolve, reject) => {
//       const form = formidable({ multiples: false, keepExtensions: true });
//       form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
//     });

//   try {
//     const { fields } = await parseForm(req);
//     const fileName = fields.fileName;
//     if (!fileName) return res.status(400).json({ error: "파일 이름 없음" });

//     const targetPath = path.join(uploadDir, fileName);

//     // edits 파싱
//     const edits = fields.edits ? JSON.parse(fields.edits) : {};
//     const allowedKeys = ["Make", "Model", "Lens", "ExposureTime", "FNumber", "ISO", "FocalLength"];
//     const safeEdits = {};

//     allowedKeys.forEach((k) => {
//       let val = edits[k];
//       if (val !== undefined && val !== null && val !== "") {
//         if (["FNumber", "ISO", "FocalLength"].includes(k)) val = Number(val);
//         if (k === "ExposureTime") val = val.toString();
//         safeEdits[k] = val;
//       }
//     });

//     if (Object.keys(safeEdits).length > 0) {
//       await exiftool.write(targetPath, safeEdits);
//     }

//     const metadata = await exiftool.read(targetPath);

//     res.status(200).json({ success: true, metadata });
//   } catch (err) {
//     console.error("EXIF 수정 실패:", err);
//     res.status(500).json({ error: "EXIF 수정 실패" });
//   }
// }



import { ExifTool } from "exiftool-vendored";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };
const exiftool = new ExifTool();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST만 지원" });

  const parseForm = (req) =>
    new Promise((resolve, reject) => {
      const form = formidable({ multiples: false, keepExtensions: true });
      form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
    });

  try {
    const { fields, files } = await parseForm(req);

    let file = files.file;
    if (Array.isArray(file)) file = file[0];
    if (!file) return res.status(500).json({ error: "파일 경로 없음" });

    const targetPath = file.filepath || file.path;
    const edits = fields.edits ? JSON.parse(fields.edits) : {};

    const allowedKeys = ["Make", "Model", "Lens", "ExposureTime", "FNumber", "ISO", "FocalLength"];
    const safeEdits = {};
    allowedKeys.forEach((k) => {
      let val = edits[k];
      if (val !== undefined && val !== null && val !== "") {
        if (["FNumber", "ISO", "FocalLength"].includes(k)) val = Number(val);
        if (k === "ExposureTime") val = val.toString();
        safeEdits[k] = val;
      }
    });

    if (Object.keys(safeEdits).length > 0) {
      try {
        await exiftool.write(targetPath, safeEdits);
      } catch (err) {
        console.error("EXIF 쓰기 실패:", err);
        return res.status(500).json({ error: "EXIF 쓰기 실패" });
      }
    }

    let metadata;
    try {
      metadata = await exiftool.read(targetPath);
    } catch (readErr) {
      console.error("EXIF 읽기 실패:", readErr);
      return res.status(500).json({ error: "EXIF 읽기 실패" });
    }

    // 편집된 파일 읽어서 Base64 전송
    const fileData = fs.readFileSync(targetPath);
    fs.unlink(targetPath, () => {}); // 임시 파일 삭제

    res.status(200).json({ success: true, metadata, fileData });
  } catch (err) {
    console.error("폼 처리 실패:", err);
    if (!res.headersSent) res.status(500).json({ error: "EXIF 수정 실패" });
  }
}
