import { museoModerno } from "@/lib/fonts";
import styles from "@/components/ui/styles/LogoText.module.css";

export default function LogoText() {
  return (
    <div className={styles.logoText}>
      <p className={`${museoModerno.className} ${styles.travel}`}>TRAVEL</p>
      <p className={`${museoModerno.className} ${styles.op}`}>OP</p>
    </div>
  );
}
