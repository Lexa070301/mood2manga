import styles from "./page.module.css";
import MangaList from "@/components/Manga/MangaList";

export default function EmotionItem() {
  return (
    <main className={styles.main}>
      <MangaList />
    </main>
  );
}
