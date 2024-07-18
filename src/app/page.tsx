import styles from "./page.module.css";
import Emotions from "@/components/Emotions/Emotions";
import Script from "next/script";

export default function Home() {
  return (
    <main className={styles.main}>
      <Emotions />
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="1603b607-4e13-402f-9bdb-d96e4ae689bc"
      />
    </main>
  );
}
