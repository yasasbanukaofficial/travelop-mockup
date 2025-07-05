import styles from "@/components/layout/styles/DisclaimerPopUp.module.css";

const DisclaimerPopUp = ({ handlesPopUp }: { handlesPopUp: () => void }) => {
  return (
    <div className="w-full h-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md">
      <div className={styles.disclaimerContainer} onClick={handlesPopUp}>
        <p className={styles.disclaimerTitle}>DISCLAIMER</p>
        <p className={styles.disclaimerDescription}>
          Travelop uses an AI agent to talk to you not a real person. This
          website will speak to you out loud, so please make sure your volume is
          high enough. To use voice features, the website needs your permission
          to access your microphone. By continuing, you agree to talk with an AI
          system, not a human.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerPopUp;
