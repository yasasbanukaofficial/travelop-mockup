import styles from "@/components/layout/styles/Header.module.css";
import { museoModerno } from "@/lib/fonts";
import Navabar from "./Navbar";
import LogoText from "../ui/LogoText";

export default function Header({
  handlesPopUp,
}: {
  handlesPopUp?: () => void;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <LogoText />
      </div>
      <div className={styles.navbarWrapper}>
        <Navabar handlesPopUp={handlesPopUp} />
      </div>
    </div>
  );
}
