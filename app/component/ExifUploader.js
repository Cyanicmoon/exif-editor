"use client";
import { useState } from "react";
import exifr from "exifr";

export default function ExifUploader() {
  const [exifData, setExifData] = useState(null);
  const [error, setError] = useState(null);

  // 파일 업로드 이벤트 핸들러
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setExifData(null);
    setError(null);

    try {
      // EXIF 파싱 (강화 옵션 적용)
      const exif = await exifr.parse(file, {
        tiff: true,                 // TIFF 태그까지 읽기
        mergeOutput: false,         // EXIF + TIFF 분리 → 더 많은 데이터 확보
        reviveValues: true,         // 값 변환 보정
        xmp: true,                  // XMP 메타데이터 포함
        icc: true,                  // 색상 프로필 정보 포함
        pick: [                     // 필요한 항목 우선 추출
          "Make",                  // 카메라 제조사
          "Model",                 // 카메라 모델명
          "LensMake",              // 렌즈 제조사
          "LensModel",             // 렌즈 모델명
          "LensSpecification",     // 렌즈 스펙 (초점거리, 조리개)
          "FocalLength",           // 초점 거리
          "FNumber",               // 조리개 값
          "ISO",                   // ISO 감도
          "ExposureTime",          // 노출 시간
          "DateTimeOriginal",      // 촬영 날짜
          "GPSLatitude",           // GPS 위도
          "GPSLongitude"           // GPS 경도
        ]
      });

      console.log("📸 EXIF 데이터:", exif);

      if (!exif || Object.keys(exif).length === 0) {
        setError("⚠️ EXIF 메타데이터를 찾을 수 없습니다. 원본 이미지를 확인하세요.");
        return;
      }

      setExifData(exif);
    } catch (err) {
      console.error("EXIF 읽기 실패:", err);
      setError("EXIF 데이터를 읽는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 읽기 (강화 버전)</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "15px" }}
      />

      {/* 오류 메시지 */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {/* EXIF 데이터 표시 */}
      {exifData ? (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "8px",
            maxHeight: "500px",
            overflow: "auto",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>📷 추출된 EXIF 정보</h2>
          <pre>{JSON.stringify(exifData, null, 2)}</pre>
        </div>
      ) : (
        !error && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
      )}
    </div>
  );
}
