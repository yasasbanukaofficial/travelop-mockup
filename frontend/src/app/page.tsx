"use client";
import Header from "@/components/layout/Header";
import LiquidChrome from "@/components/ui/LiquidChrome";
import { museoModerno } from "@/lib/fonts";
import styles from "@/app/styles/page.module.css";
import Button from "@/components/ui/Button";
import BlurText from "@/components/ui/BlurText";
import { useState } from "react";
import PopUp from "@/components/layout/PopUp";

export default function Home() {
  const [showDisclaimerPopUpDisplay, setDisclaimerPopUpDisplay] =
    useState(false);
  const [showPermissionPopUpDisplay, setPermissionPopUpDisplay] =
    useState(false);
  const handlesDisclaimerPopUp = () => {
    setDisclaimerPopUpDisplay(!showDisclaimerPopUpDisplay);
  };
  const handlesPermissionPopUp = () => {
    setPermissionPopUpDisplay(!showPermissionPopUpDisplay);
  };

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <LiquidChrome
          baseColor={[0.0, 0.1, 0.1]}
          speed={0.3}
          amplitude={0.3}
          interactive={false}
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
      </div>
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
                                speak aloud please check your volume. Voice features need your
                                microphone permission. By continuing, you agree to talk with an AI."
              btnText="Continue"
              onClickAction={handlesPermissionPopUp}
            />
          )}
          {showPermissionPopUpDisplay && (
            <PopUp
              handlesPopUp={handlesPermissionPopUp}
              popUpTitle="BEFORE YOU CONTINUE"
              popUpDescription="For the best experience, please grant microphone access to continue your conversation."
              btnText="Continue"
              onClickAction={handlesPermissionPopUp}
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
