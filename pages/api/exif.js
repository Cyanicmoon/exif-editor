import { ExifTool } from "exiftool-vendored";
import formidable from "formidable";
import fs from "fs";

export const config = {
api: {
    bodyParser: false,
},
};



const exiftool = new ExifTool();

export default async function handler(req, res) {
if (req.method !== "POST") {
    return res.status(405).json({ error: "POST 메서드만 지원됩니다." });
}

const form = formidable({ multiples: false, keepExtensions: true });

form.parse(req, async (err, fields, files) => {
    if (err) {
    console.error("폼 파싱 에러:", err);
    return res.status(500).json({ error: "이미지 업로드 실패" });
    }

    console.log("📂 업로드된 파일:", files);

    try {
    // FormData에서 'file' 키를 썼다면 files.file 사용
    const uploadedFile = files.file;
    if (!uploadedFile) {
        return res.status(400).json({ error: "이미지가 업로드되지 않았습니다." });
    }

    // 경로 처리 (환경별 차이 해결)
    const filePath = uploadedFile.filepath || uploadedFile.path || uploadedFile[0]?.filepath || uploadedFile[0]?.path;

    if (!filePath) {
        console.error("🚨 파일 경로를 찾을 수 없음:", uploadedFile);
        return res.status(500).json({ error: "파일 경로를 찾을 수 없습니다." });
    }

    console.log("📌 파일 경로:", filePath);

    // EXIF 메타데이터 읽기
    const metadata = await exiftool.read(filePath);

    // 임시 파일 삭제 (선택)
    fs.unlink(filePath, () => {});

    return res.status(200).json({ success: true, metadata });
    } catch (error) {
    console.error("EXIF 읽기 실패:", error);
    return res.status(500).json({ error: "EXIF 메타데이터 읽기 실패" });
    }
});
}
