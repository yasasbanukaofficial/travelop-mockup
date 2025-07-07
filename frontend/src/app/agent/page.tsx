"use client";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import { SimpleVoiceAssistant } from "@/components/livekit/SimpleVoiceAssistant";
import Header from "@/components/layout/Header";
import styles from "@/app/agent/styles/Agent.module.css";

export default function Agent() {
  const router = useRouter();

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL;
  const token = process.env.NEXT_PUBLIC_LIVEKIT_TOKEN;

  return (
    <div className="absolute inset-0 flex flex-col max-w-full w-full">
      <Header />
      <div className={`${styles.sectionContainer}`}>
        <div
          className={`${styles.leftSection} w-full h-full backdrop-filter backdrop-brightness-60 backdrop-blur-md`}
        ></div>
        <div
          className={`${styles.rightSection} w-full h-full backdrop-filter backdrop-brightness-60 backdrop-blur-md`}
        ></div>
      </div>
    </div>
  );
}
