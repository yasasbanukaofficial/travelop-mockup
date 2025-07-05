import styles from "@/components/ui/styles/Button.module.css";
import Link from "next/link";
import { michroma } from "@/lib/fonts";

interface ButtonProps {
  text: string;
  href: string;
}

export default function Button({ text, href }: ButtonProps) {
  return (
    <Link href={href}>
      <div className={styles.btnContainer}>
        <p className={`${michroma.className} ${styles.btnText}`}>{text}</p>
      </div>
    </Link>
  );
}
