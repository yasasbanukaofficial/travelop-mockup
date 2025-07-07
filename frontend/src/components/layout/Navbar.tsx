import styles from "@/components/layout/styles/Navbar.module.css";
import { museoModerno } from "@/lib/fonts";
import Link from "next/link";

export default function Navabar({
  handlesPopUp,
}: {
  handlesPopUp?: () => void;
}) {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <p className={`${museoModerno.className} ${styles.links}`}>HOME</p>
      </Link>
      <Link href="/about">
        <p className={`${museoModerno.className} ${styles.links}`}>ABOUT</p>
      </Link>
      {handlesPopUp && (
        <div className={styles.btnContainer} onClick={handlesPopUp}>
          <p className={`${museoModerno.className} ${styles.btnText}`}>
            TALK NOW
          </p>
        </div>
      )}
    </div>
  );
}
