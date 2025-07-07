"use client";
import Header from "@/components/layout/Header";
import { museoModerno } from "@/lib/fonts";
import styles from "@/app/styles/page.module.css";
import Button from "@/components/ui/Button";
import BlurText from "@/components/ui/BlurText";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PopUp from "@/components/layout/PopUp";
import Background from "@/components/layout/Background";

export default function Home() {
  const router = useRouter();

  const [showDisclaimerPopUpDisplay, setDisclaimerPopUpDisplay] =
    useState(false);
  const [showPermissionPopUpDisplay, setPermissionPopUpDisplay] =
    useState(false);

  const [micGranted, setMicGranted] = useState(false);

  const handlesDisclaimerPopUp = () => {
    setDisclaimerPopUpDisplay(!showDisclaimerPopUpDisplay);
  };
  const handlesPermissionPopUp = () => {
    setPermissionPopUpDisplay(!showPermissionPopUpDisplay);
  };
  const visitAgentPage = () => {
    router.push("/agent");
  };
  const handleDisclaimerContinue = () => {
    setDisclaimerPopUpDisplay(false);
    setPermissionPopUpDisplay(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => setMicGranted(true))
      .catch(() => setMicGranted(false));
  };

  const isRequestGranted = async () => {
    if (micGranted) {
      visitAgentPage();
    } else {
      alert(
        "Microphone permission was denied. Please allow it in your browser settings.",
      );
    }
  };

  return (
    <>
      <div className="absolute inset-0 flex flex-col max-w-full w-full">
        <Header handlesPopUp={handlesDisclaimerPopUp} />
        <div
          className={`flex flex-col items-center justify-center ${styles.heroContainer}`}
        >
          <BlurText
            text="Plan trips 5x faster using Artificial Intelligence"
            className={`${museoModerno.className} ${styles.heroTitle}`}
          />
          {showDisclaimerPopUpDisplay && (
            <PopUp
              handlesPopUp={handlesDisclaimerPopUp}
              popUpTitle="DISCLAIMER"
              popUpDescription="Travelop uses an AI voice agent, not a real person. The site will
                                speak aloud please check your volume. By continuing, you agree to talk with an AI."
              btnText="Continue"
              onClickAction={handleDisclaimerContinue}
            />
          )}
          {showPermissionPopUpDisplay && (
            <PopUp
              handlesPopUp={handlesPermissionPopUp}
              popUpTitle="BEFORE YOU CONTINUE"
              popUpDescription="For the best experience, please grant microphone access to continue your conversation."
              btnText="Continue"
              onClickAction={isRequestGranted}
            />
          )}
          <p className={`${museoModerno.className} ${styles.heroDescription}`}>
            Tell Travelop where, when, and why we’ll handle the how.
          </p>
          <Button onClick={handlesDisclaimerPopUp} text="Speak to Agent" />
        </div>
      </div>
    </>
  );
}
