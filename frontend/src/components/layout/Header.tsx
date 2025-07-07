import styles from "@/components/layout/styles/Header.module.css";
import { museoModerno } from "@/lib/fonts";
import Navabar from "./Navbar";

export default function Header({
  handlesPopUp,
}: {
  handlesPopUp?: () => void;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.logoText}>
        <p className={`${museoModerno.className} ${styles.travel}`}>TRAVEL</p>
        <p className={`${museoModerno.className} ${styles.op}`}>OP</p>
      </div>
      <div className={styles.navbarWrapper}>
        <Navabar handlesPopUp={handlesPopUp} />
      </div>
    </div>
  );
}
