"use client";
import styles from "./styles/SimpleVoiceAssistant.module.css";
import { Controls } from "@/components/livekit/Controls";
import { ChatVisualizer } from "@/components/livekit/ChatVisualizer";

export function SimpleVoiceAssistant() {
  return (
    <div className={styles.mainContainer}>
      <ChatVisualizer />
      <Controls />
    </div>
  );
}
