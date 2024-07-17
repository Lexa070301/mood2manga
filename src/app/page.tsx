import Image from "next/image";
import styles from "./page.module.css";
import { ThreeDCardDemo } from "@/components/MangaCard/MangaCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <ThreeDCardDemo />
    </main>
  );
}
