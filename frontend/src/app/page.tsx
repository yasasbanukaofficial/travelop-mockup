"use client";
import Header from "@/components/layout/Header";
import LiquidChrome from "@/components/ui/LiquidChrome";
import { museoModerno } from "@/lib/fonts";
import styles from "@/app/styles/page.module.css";
import Button from "@/components/ui/Button";
import BlurText from "@/components/ui/BlurText";
import { useState } from "react";
import DisclaimerPopUp from "@/components/layout/DisclaimerPopUp";

export default function Home() {
  const [showPopUpDisplay, setPopUpDisplay] = useState(false);
  const handlesPopUp = () => {
    setPopUpDisplay(!showPopUpDisplay);
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
        <Header />
        <div
          className={`flex flex-col items-center justify-center ${styles.heroContainer}`}
        >
          <BlurText
            text="Plan trips 5x faster using Artificial Intelligence"
            className={`${museoModerno.className} ${styles.heroTitle}`}
          />
          {showPopUpDisplay && <DisclaimerPopUp handlesPopUp={handlesPopUp} />}
          <p className={`${museoModerno.className} ${styles.heroDescription}`}>
            Tell Travelop where, when, and why we’ll handle the how.
          </p>
          <Button onClick={handlesPopUp} text="Speak to Agent" />
        </div>
      </div>
    </>
  );
}
