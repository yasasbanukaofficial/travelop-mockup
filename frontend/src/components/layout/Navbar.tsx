import styles from "@/components/layout/styles/Navbar.module.css";
import { museoModerno } from "@/lib/fonts";
import Link from "next/link";

export default function Navabar() {
  return (
    <div className={styles.navbar}>
      <Link href="">
        <p className={`${museoModerno.className} ${styles.links}`}>HOME</p>
      </Link>
      <Link href="/about">
        <p className={`${museoModerno.className} ${styles.links}`}>ABOUT</p>
      </Link>
      <Link href="">
        <div className={styles.btnContainer}>
          <p className={`${museoModerno.className} ${styles.btnText}`}>
            TALK NOW
          </p>
        </div>
      </Link>
    </div>
  );
}
