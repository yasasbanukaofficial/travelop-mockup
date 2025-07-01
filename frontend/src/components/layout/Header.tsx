import styles from "@/components/layout/styles/Header.module.css";
import { MuseoModerno } from "next/font/google";

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoText}>
        <p className={`${museoModerno.className} ${styles.travel}`}>TRAVEL</p>
        <p className={`${museoModerno.className} ${styles.op}`}>OP</p>
      </div>
    </div>
  );
}
