import styles from "@/components/layout/styles/DisclaimerPopUp.module.css";
import { michroma, museoModerno } from "@/lib/fonts";
import Button from "../ui/Button";

const DisclaimerPopUp = ({ handlesPopUp }: { handlesPopUp: () => void }) => {
  return (
    <div
      className="w-full h-full flex inset-0 absolute top-0 backdrop-filter backdrop-brightness-60 backdrop-blur-md"
      onClick={handlesPopUp}
    >
      <div className={`${styles.disclaimerContainer}`} onClick={handlesPopUp}>
        <p className={`${styles.disclaimerTitle} ${michroma.className}`}>
          DISCLAIMER
        </p>
        <hr className="mb-3"></hr>
        <span
          className={`${styles.disclaimerDescription} ${museoModerno.className}`}
        >
          Travelop uses an AI voice agent, not a real person. The site will
          speak aloud please check your volume. Voice features need your
          microphone permission. By continuing, you agree to talk with an AI.
        </span>
        <Button text={"Continue"} />
      </div>
    </div>
  );
};

export default DisclaimerPopUp;
