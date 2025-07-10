"use client";
import { michroma } from "@/lib/fonts";
import styles from "./styles/Controls.module.css";
import { TrackToggle, DisconnectButton } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState } from "react";

export function Controls() {
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  return (
    <div className={styles.bar}>
      <TrackToggle
        source={Track.Source.Microphone}
        onClick={() => setMicActive(!micActive)}
      />
    </div>
  );
}
