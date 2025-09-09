// // //     // "use client";
// // //     // import { useState } from "react";
// // //     // import imageCompression from "browser-image-compression";

// // //     // export default function ExifEditor() {
// // //     // const [file, setFile] = useState(null);
// // //     // const [exifData, setExifData] = useState(null);
// // //     // const [loading, setLoading] = useState(false);
// // //     // const [error, setError] = useState(null);
// // //     // const [edits, setEdits] = useState({});
// // //     // const [editingKey, setEditingKey] = useState(null);

// // //     // const handleFileChange = async (event) => {
// // //     // const selectedFile = event.target.files?.[0];
// // //     // if (!selectedFile) return;

// // //     // setFile(selectedFile);
// // //     // setExifData(null);
// // //     // setEdits({});
// // //     // setError(null);
// // //     // setEditingKey(null);
// // //     // setLoading(true);

// // //     // try {
        
// // //     //     const compressedFile = selectedFile

// // //     //     const formData = new FormData();
// // //     //     formData.append("file", compressedFile);

// // //     //     const res = await fetch("/api/exif", { method: "POST", body: formData });
// // //     //     const data = await res.json();
// // //     //     if (!res.ok) throw new Error(data.error || "EXIF 읽기 실패");

// // //     //     setExifData(data.metadata);
// // //     // } catch (err) {
// // //     //     console.error(err);
// // //     //     setError("EXIF 읽기 실패");
// // //     // } finally {
// // //     //     setLoading(false);
// // //     // }
// // //     // };

// // //     // const handleEdit = (key) => {
// // //     // setEditingKey(key);
// // //     // setEdits({ ...edits, [key]: exifData[key] ?? "" });
// // //     // };

// // //     // const handleChange = (e, key) => {
// // //     // setEdits({ ...edits, [key]: e.target.value });
// // //     // };

// // //     // const handleSave = async () => {
// // //     // if (!file) return;
// // //     // setLoading(true);
// // //     // setEditingKey(null);

// // //     // try {
// // //     //     const compressedFile = await imageCompression(file, {
// // //     //     maxSizeMB: 2,
// // //     //     maxWidthOrHeight: 1920,
// // //     //     useWebWorker: true,
// // //     //     preserveExif: true,
// // //     //     });

// // //     //     const formData = new FormData();
// // //     //     formData.append("file", compressedFile);
// // //     //     formData.append("edits", JSON.stringify(edits));

// // //     //     const res = await fetch("/api/exif-edit", { method: "POST", body: formData });
// // //     //     const data = await res.json();
// // //     //     if (!res.ok) throw new Error(data.error || "EXIF 수정 실패");

// // //     //     setExifData(data.metadata);
// // //     //     setEdits({});
// // //     // } catch (err) {
// // //     //     console.error(err);
// // //     //     setError("EXIF 수정 실패");
// // //     // } finally {
// // //     //     setLoading(false);
// // //     // }
// // //     // };

// // //     // const renderField = (label, key) => {
// // //     // return (
// // //     //     <h1 style={{ cursor: "pointer", margin: "5px 0" }} onClick={() => handleEdit(key)}>
// // //     //     {label} :{" "}
// // //     //     {editingKey === key ? (
// // //     //         <input
// // //     //         type="text"
// // //     //         value={edits[key]}
// // //     //         onChange={(e) => handleChange(e, key)}
// // //     //         onBlur={handleSave}
// // //     //         autoFocus
// // //     //         style={{ fontSize: "inherit" }}
// // //     //         />
// // //     //     ) : (
// // //     //         exifData[key] ?? "정보 없음"
// // //     //     )}
// // //     //     </h1>
// // //     // );
// // //     // };

// // //     // return (
// // //     // <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
// // //     //     <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 편집</h1>
// // //     //     <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "15px" }} />

// // //     //     {loading && <p>📂 처리 중...</p>}
// // //     //     {error && <p style={{ color: "red" }}>{error}</p>}

// // //     //     {exifData ? (
// // //     //     <div
// // //     //         style={{
// // //     //         backgroundColor: "#f5f5f5",
// // //     //         padding: "12px",
// // //     //         borderRadius: "8px",
// // //     //         maxHeight: "500px",
// // //     //         overflow: "auto",
// // //     //         fontSize: "12px",
// // //     //         }}
// // //     //     >
// // //     //         <h2>📷 EXIF 정보 (클릭해서 수정)</h2>
// // //     //         {renderField("제조사", "Make")}
// // //     //         {renderField("카메라 모델", "Model")}
// // //     //         {renderField("렌즈", "Lens")}
// // //     //         {renderField("노출 시간", "ExposureTime")}
// // //     //         {renderField("조리개", "FNumber")}
// // //     //         {renderField("ISO", "ISO")}
// // //     //         {renderField("화각", "FocalLength")}
// // //     //     </div>
// // //     //     ) : (
// // //     //     !loading && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
// // //     //     )}
// // //     // </div>
// // //     // );
// // //     // }





// // //     // ExifEditor.js
// // // "use client";
// // // import { useState } from "react";
// // // // imageCompression은 기존 코드와 동일성을 위해 임포트만 해두었습니다.
// // // // (지금은 압축하지 않으므로 사용하지 않습니다)
// // // import imageCompression from "browser-image-compression";

// // // export default function ExifEditor() {
// // //   const [file, setFile] = useState(null); // 브라우저 File (선택한 원본 파일)
// // //   const [savedFilename, setSavedFilename] = useState(null); // 서버에 저장된 파일 이름 (식별자)
// // //   const [exifData, setExifData] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [edits, setEdits] = useState({});
// // //   const [editingKey, setEditingKey] = useState(null);

// // //   // 파일 업로드 -> 서버에 저장하고 metadata 가져오기
// // //   const handleFileChange = async (event) => {
// // //     const selectedFile = event.target.files?.[0];
// // //     if (!selectedFile) return;

// // //     setFile(selectedFile);
// // //     setSavedFilename(null);
// // //     setExifData(null);
// // //     setEdits({});
// // //     setError(null);
// // //     setEditingKey(null);
// // //     setLoading(true);

// // //     try {
// // //       // 압축 없이 원본 그대로 전송 (기존 코드 방식 유지)
// // //       const formData = new FormData();
// // //       formData.append("file", selectedFile);

// // //       // 초기 업로드 및 읽기는 /api/exif 로 (서버가 파일을 uploads/에 저장하고 savedFilename을 반환)
// // //       const res = await fetch("/api/exif", { method: "POST", body: formData });
// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error(data.error || "EXIF 읽기 실패");

// // //       // 서버가 반환한 metadata와 savedFilename 저장
// // //       setExifData(data.metadata || {});
// // //       setSavedFilename(data.savedFilename || null);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("EXIF 읽기 실패");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEdit = (key) => {
// // //     setEditingKey(key);
// // //     setEdits({ ...edits, [key]: exifData?.[key] ?? "" });
// // //   };

// // //   const handleChange = (e, key) => {
// // //     setEdits({ ...edits, [key]: e.target.value });
// // //   };

// // //   // 저장 버튼: savedFilename + edits만 서버로 전송 (파일 재전송 없음)
// // //   const handleSave = async () => {
// // //     if (!savedFilename) {
// // //       setError("먼저 파일을 업로드하세요.");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setEditingKey(null);
// // //     setError(null);

// // //     try {
// // //       const formData = new FormData();
// // //       // 서버에 저장된 파일 식별자만 보냄
// // //       formData.append("savedFilename", savedFilename);
// // //       formData.append("edits", JSON.stringify(edits || {}));

// // //       const res = await fetch("/api/exif-edit", { method: "POST", body: formData });
// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error(data.error || "EXIF 수정 실패");

// // //       // 서버가 반환한 최신 metadata로 갱신
// // //       setExifData(data.metadata || {});
// // //       // edits 초기화 (선택)
// // //       setEdits({});
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("EXIF 저장 실패");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // 다운로드: 서버에 저장된 파일을 가져옴
// // //   const handleDownload = async () => {
// // //     if (!savedFilename) {
// // //       setError("먼저 파일을 업로드하세요.");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch(`/api/download?filename=${encodeURIComponent(savedFilename)}`);
// // //       if (!res.ok) throw new Error("파일 다운로드 실패");
// // //       const blob = await res.blob();
// // //       const url = URL.createObjectURL(blob);
// // //       const a = document.createElement("a");
// // //       // 원본 File 이름이 있으면 사용, 없으면 savedFilename
// // //       a.download = file?.name || savedFilename;
// // //       a.href = url;
// // //       a.click();
// // //       URL.revokeObjectURL(url);
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("다운로드 실패");
// // //     }
// // //   };

// // //   const renderField = (label, key) => {
// // //     return (
// // //       <h1 style={{ cursor: "pointer", margin: "5px 0" }} onClick={() => handleEdit(key)}>
// // //         {label} :{" "}
// // //         {editingKey === key ? (
// // //           <input
// // //             type="text"
// // //             value={edits[key] ?? ""}
// // //             onChange={(e) => handleChange(e, key)}
// // //             onBlur={() => setEditingKey(null)} // 포커스 아웃만 하면 편집 모드 종료 (저장은 버튼으로)
// // //             autoFocus
// // //             style={{ fontSize: "inherit" }}
// // //           />
// // //         ) : (
// // //           (exifData && (exifData[key] ?? "정보 없음")) || "정보 없음"
// // //         )}
// // //       </h1>
// // //     );
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
// // //       <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 편집</h1>

// // //       <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "15px" }} />

// // //       {loading && <p>📂 처리 중...</p>}
// // //       {error && <p style={{ color: "red" }}>{error}</p>}

// // //       {exifData ? (
// // //         <div
// // //           style={{
// // //             backgroundColor: "#f5f5f5",
// // //             padding: "12px",
// // //             borderRadius: "8px",
// // //             maxHeight: "500px",
// // //             overflow: "auto",
// // //             fontSize: "12px",
// // //           }}
// // //         >
// // //           <h2>📷 EXIF 정보 (클릭해서 수정)</h2>
// // //           {renderField("제조사", "Make")}
// // //           {renderField("카메라 모델", "Model")}
// // //           {renderField("렌즈", "Lens")}
// // //           {renderField("노출 시간", "ExposureTime")}
// // //           {renderField("조리개", "FNumber")}
// // //           {renderField("ISO", "ISO")}
// // //           {renderField("화각", "FocalLength")}
// // //         </div>
// // //       ) : (
// // //         !loading && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
// // //       )}

// // //       {/* 저장 / 다운로드 버튼 */}
// // //       <div style={{ marginTop: 12 }}>
// // //         <button
// // //           onClick={handleSave}
// // //           disabled={!savedFilename}
// // //           style={{ marginRight: 8, padding: "8px 12px", fontWeight: "bold" }}
// // //         >
// // //           💾 저장 (서버에 적용)
// // //         </button>
// // //         <button
// // //           onClick={handleDownload}
// // //           disabled={!savedFilename}
// // //           style={{ padding: "8px 12px", fontWeight: "bold" }}
// // //         >
// // //           ⬇️ 다운로드
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }






// // "use client";
// // import { useState } from "react";

// // export default function ExifEditor() {
// //   const [file, setFile] = useState(null);
// //   const [exifData, setExifData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [edits, setEdits] = useState({});
// //   const [editingKey, setEditingKey] = useState(null);

// //   const handleFileChange = async (event) => {
// //     const selectedFile = event.target.files?.[0];
// //     if (!selectedFile) return;

// //     setFile(selectedFile);
// //     setExifData(null);
// //     setEdits({});
// //     setError(null);
// //     setEditingKey(null);
// //     setLoading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", selectedFile);

// //       const res = await fetch("/api/exif", { method: "POST", body: formData });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "EXIF 읽기 실패");

// //       setExifData(data.metadata);
// //     } catch (err) {
// //       console.error(err);
// //       setError("EXIF 읽기 실패");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (key) => {
// //     setEditingKey(key);
// //     setEdits({ ...edits, [key]: exifData[key] ?? "" });
// //   };

// //   const handleChange = (e, key) => {
// //     setEdits({ ...edits, [key]: e.target.value });
// //   };

// //   const handleSave = async () => {
// //     if (!file) return;
// //     setLoading(true);
// //     setEditingKey(null);

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);
// //       formData.append("edits", JSON.stringify(edits));

// //       const res = await fetch("/api/exif-edit", { method: "POST", body: formData });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || "EXIF 수정 실패");

// //       // 🔹 최신 메타데이터 갱신
// //       setExifData(data.metadata);

// //       // 🔹 edits 유지 → 누적 수정 가능
// //       setEdits((prev) => ({ ...prev, ...edits }));
// //     } catch (err) {
// //       console.error(err);
// //       setError("EXIF 수정 실패");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderField = (label, key) => {
// //     return (
// //       <h1 style={{ cursor: "pointer", margin: "5px 0" }} onClick={() => handleEdit(key)}>
// //         {label} :{" "}
// //         {editingKey === key ? (
// //           <input
// //             type="text"
// //             value={edits[key]}
// //             onChange={(e) => handleChange(e, key)}
// //             autoFocus
// //             style={{ fontSize: "inherit" }}
// //           />
// //         ) : (
// //           edits[key] ?? exifData[key] ?? "정보 없음"
// //         )}
// //       </h1>
// //     );
// //   };

// //   return (
// //     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
// //       <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 편집</h1>
// //       <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "15px" }} />

// //       {loading && <p>📂 처리 중...</p>}
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {exifData ? (
// //         <div
// //           style={{
// //             backgroundColor: "#f5f5f5",
// //             padding: "12px",
// //             borderRadius: "8px",
// //             maxHeight: "500px",
// //             overflow: "auto",
// //             fontSize: "12px",
// //           }}
// //         >
// //           <h2>📷 EXIF 정보 (수정 후 저장 버튼을 누르세요)</h2>
// //           {renderField("제조사", "Make")}
// //           {renderField("카메라 모델", "Model")}
// //           {renderField("렌즈", "Lens")}
// //           {renderField("노출 시간", "ExposureTime")}
// //           {renderField("조리개", "FNumber")}
// //           {renderField("ISO", "ISO")}
// //           {renderField("화각", "FocalLength")}
// //           <button
// //             onClick={handleSave}
// //             style={{
// //               marginTop: "10px",
// //               padding: "6px 12px",
// //               backgroundColor: "#0070f3",
// //               color: "#fff",
// //               border: "none",
// //               borderRadius: "4px",
// //               cursor: "pointer",
// //             }}
// //           >
// //             저장하기
// //           </button>
// //         </div>
// //       ) : (
// //         !loading && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
// //       )}
// //     </div>
// //   );
// // }




// "use client";
// import { useState } from "react";

// export default function ExifEditor() {
//   const [file, setFile] = useState(null);
//   const [savedFileName, setSavedFileName] = useState(null);
//   const [exifData, setExifData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [edits, setEdits] = useState({});
//   const [editingKey, setEditingKey] = useState(null);

//   // 이미지 업로드 및 EXIF 읽기
//   const handleFileChange = async (event) => {
//     const selectedFile = event.target.files?.[0];
//     if (!selectedFile) return;

//     setFile(selectedFile);
//     setExifData(null);
//     setEdits({});
//     setError(null);
//     setEditingKey(null);
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const res = await fetch("/api/exif", { method: "POST", body: formData });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "EXIF 읽기 실패");

//       setSavedFileName(data.fileName); // 서버에 저장된 파일 이름
//       setExifData(data.metadata);
//     } catch (err) {
//       console.error(err);
//       setError("EXIF 읽기 실패");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 편집 시작
//   const handleEdit = (key) => {
//     setEditingKey(key);
//     setEdits({ ...edits, [key]: exifData[key] ?? "" });
//   };

//   // 값 변경
//   const handleChange = (e, key) => {
//     setEdits({ ...edits, [key]: e.target.value });
//   };

//   // EXIF 저장
//   const handleSave = async () => {
//     if (!savedFileName) return;
//     setLoading(true);
//     setEditingKey(null);

//     try {
//       const formData = new FormData();
//       formData.append("fileName", savedFileName);
//       formData.append("edits", JSON.stringify(edits));

//       const res = await fetch("/api/exif-edit", { method: "POST", body: formData });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "EXIF 수정 실패");

//       setExifData(data.metadata);
//       setEdits({});
//     } catch (err) {
//       console.error(err);
//       setError("EXIF 수정 실패");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 다운로드
//   const handleDownload = async () => {
//     if (!savedFileName) return;

//     const res = await fetch(`/api/download?file=${encodeURIComponent(savedFileName)}`);
//     if (!res.ok) {
//       alert("다운로드 실패");
//       return;
//     }

//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = savedFileName;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();

//     window.URL.revokeObjectURL(url);
//   };

//   const renderField = (label, key) => (
//     <h1 style={{ cursor: "pointer", margin: "5px 0" }} onClick={() => handleEdit(key)}>
//       {label} :{" "}
//       {editingKey === key ? (
//         <input
//           type="text"
//           value={edits[key]}
//           onChange={(e) => handleChange(e, key)}
//           autoFocus
//           style={{ fontSize: "inherit" }}
//         />
//       ) : (
//         exifData[key] ?? "정보 없음"
//       )}
//     </h1>
//   );

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 편집</h1>
//       <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "15px" }} />

//       {loading && <p>📂 처리 중...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {exifData ? (
//         <div
//           style={{
//             backgroundColor: "#f5f5f5",
//             padding: "12px",
//             borderRadius: "8px",
//             maxHeight: "500px",
//             overflow: "auto",
//             fontSize: "12px",
//           }}
//         >
//           <h2>📷 EXIF 정보 (클릭해서 수정)</h2>
//           {renderField("제조사", "Make")}
//           {renderField("카메라 모델", "Model")}
//           {renderField("렌즈", "Lens")}
//           {renderField("노출 시간", "ExposureTime")}
//           {renderField("조리개", "FNumber")}
//           {renderField("ISO", "ISO")}
//           {renderField("화각", "FocalLength")}
//         </div>
//       ) : (
//         !loading && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
//       )}

//       {savedFileName && (
//         <div style={{ marginTop: "20px" }}>
//           <button onClick={handleSave} style={{ marginRight: "10px", padding: "8px 16px" }}>
//             💾 저장하기
//           </button>
//           <button onClick={handleDownload} style={{ padding: "8px 16px" }}>
//             ⬇ 다운로드
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }






"use client";
import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ExifEditor() {
  const [file, setFile] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [edits, setEdits] = useState({});
  const [editingKey, setEditingKey] = useState(null);

  // 파일 업로드 → EXIF 읽기
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setExifData(null);
    setEdits({});
    setError(null);
    setEditingKey(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/exif", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "EXIF 읽기 실패");

      setExifData(data.metadata);
    } catch (err) {
      console.error(err);
      setError("EXIF 읽기 실패");
    } finally {
      setLoading(false);
    }
  };

  // 편집 시작
  const handleEdit = (key) => {
    setEditingKey(key);
    setEdits({ ...edits, [key]: exifData[key] ?? "" });
  };

  // 편집 값 변경
  const handleChange = (e, key) => {
    setEdits({ ...edits, [key]: e.target.value });
  };

  // 저장 버튼 클릭 시 → 서버로 수정 요청 + 파일 다운로드
  const handleSave = async () => {
    if (!file) return;
    setLoading(true);
    setEditingKey(null);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        preserveExif: true,
      });

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("edits", JSON.stringify(edits));

      const res = await fetch("/api/exif-edit", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "EXIF 수정 실패");

      setExifData(data.metadata);
      setEdits({});

      // 파일 다운로드
      const blob = new Blob([new Uint8Array(data.fileData.data)], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "edited_" + file.name;
      link.click();
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      setError("EXIF 수정 실패");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, key) => (
    <h1 style={{ cursor: "pointer", margin: "5px 0" }} onClick={() => handleEdit(key)}>
      {label} :{" "}
      {editingKey === key ? (
        <input
          type="text"
          value={edits[key]}
          onChange={(e) => handleChange(e, key)}
          autoFocus
          style={{ fontSize: "inherit" }}
        />
      ) : (
        edits[key] ?? exifData[key] ?? "정보 없음"
      )}
    </h1>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>EXIF 메타데이터 편집</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "15px" }} />

      {loading && <p>📂 처리 중...</p>}
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
          <h2>📷 EXIF 정보 (클릭해서 수정)</h2>
          {renderField("제조사", "Make")}
          {renderField("카메라 모델", "Model")}
          {renderField("렌즈", "Lens")}
          {renderField("노출 시간", "ExposureTime")}
          {renderField("조리개", "FNumber")}
          {renderField("ISO", "ISO")}
          {renderField("화각", "FocalLength")}

          <button
            onClick={handleSave}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "#4cafef",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            저장 & 다운로드
          </button>
        </div>
      ) : (
        !loading && <p>이미지를 업로드하면 EXIF 메타데이터를 볼 수 있습니다.</p>
      )}
    </div>
  );
}
