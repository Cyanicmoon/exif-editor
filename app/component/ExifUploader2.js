// "use client";
// import { useState } from "react";

// export default function ExifUploader() {
// const [exifData, setExifData] = useState(null);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);

// const handleFileChange = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setExifData(null);
//     setError(null);
//     setLoading(true);

//     try {
//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await fetch("/api/exif", {
//         method: "POST",
//         body: formData,
//     });

//     const result = await response.json();

//     if (!response.ok) {
//         throw new Error(result.error || "EXIF 읽기 실패");
//     }

//     console.log("📸 서버 응답:", result.metadata);
//     setExifData(result.metadata);
//     } catch (err) {
//     console.error("에러:", err);
//     setError("이미지를 분석하는 중 오류가 발생했습니다.");
//     } finally {
//     setLoading(false);
//     }
// };

// return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//     <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 추출</h1>
//     <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         style={{ marginBottom: "15px" }}
//     />

//     {loading && <p>📂 이미지 분석 중...</p>}
//     {error && <p style={{ color: "red" }}>{error}</p>}

//     {exifData ? (
//         <div
//         style={{
//             backgroundColor: "#f5f5f5",
//             padding: "12px",
//             borderRadius: "8px",
//             maxHeight: "500px",
//             overflow: "auto",
//             fontSize: "12px",
//         }}
//         >
//         <h2>📷 EXIF 정보</h2>
//         <pre>{JSON.stringify(exifData, null, 2)}</pre>
//         <h1>제조사 : {exifData.Make}</h1>
//         <h1>카메라 모델 : {exifData.Model}</h1>
//         <h1>렌즈 : {exifData.Lens?exifData.Lens:"정보 없음"}</h1>
//         <h1>노출 시간 : {exifData.ExposureTime}s</h1>
//         <h1>조리개 : f{exifData.FNumber}</h1>
//         <h1>ISO : {exifData.ISO}</h1>
//         <h1>화각 : {exifData.FocalLength}</h1>
//         </div>
//     ) : (
//         !loading && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
//     )}
//     </div>
// );
// }

"use client";
import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ExifUploader() {
  const [exifData, setExifData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setExifData(null);
    setError(null);
    setLoading(true);

    try {
      const options = {
        maxSizeMB: 2,        
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
        preserveExif: true,    
      };

      const compressedFile = await imageCompression(file, options);

      console.log("원본 크기:", file.size / 1024, "KB");
      console.log("압축 후 크기:", compressedFile.size / 1024, "KB");

      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await fetch("/api/exif", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "EXIF 읽기 실패");
      }

      console.log("📸 서버 응답:", result.metadata);
      setExifData(result.metadata);
    } catch (err) {
      console.error("에러:", err);
      setError("이미지를 분석하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 추출</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "15px" }}
      />

      {loading && <p>📂 이미지 분석 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {exifData ? (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "8px",
            maxHeight: "500px",
            overflow: "auto",
            fontSize: "12px",
          }}
        >
          <h2>📷 EXIF 정보</h2>
          {/* <pre>{JSON.stringify(exifData, null, 2)}</pre> */}
          <h1>제조사 : {exifData.Make}</h1>
          <h1>카메라 모델 : {exifData.Model}</h1>
          <h1>렌즈 : {exifData.Lens ? exifData.Lens : "정보 없음"}</h1>
          <h1>노출 시간 : {exifData.ExposureTime}s</h1>
          <h1>조리개 : f{exifData.FNumber}</h1>
          <h1>ISO : {exifData.ISO}</h1>
          <h1>화각 : {exifData.FocalLength}</h1>
        </div>
      ) : (
        !loading && <p></p>
      )}
    </div>
  );
}
