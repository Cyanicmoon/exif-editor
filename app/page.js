import Image from "next/image";
import styles from "./page.module.css";
import ExifUploader from "./component/ExifUploader";
import ExifUploader2 from "./component/ExifUploader2";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <ExifUploader></ExifUploader> */}
      <ExifUploader2></ExifUploader2>
    </div>
  );
}
