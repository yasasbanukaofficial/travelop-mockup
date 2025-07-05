import styles from "@/components/ui/styles/Button.module.css";
import { michroma } from "@/lib/fonts";

export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btnContainer} ${michroma.className}`}
      type="button"
    >
      <span className={styles.btnText}>{text}</span>
    </button>
  );
}
