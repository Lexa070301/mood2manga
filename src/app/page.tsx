import styles from "./page.module.css";
import Emotions from "@/components/Emotions/Emotions";

export default function Home() {
  return (
    <main className={styles.main}>
      <Emotions />
    </main>
  );
}
