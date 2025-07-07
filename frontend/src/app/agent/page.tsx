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
        <LiveKitRoom
          serverUrl={serverUrl}
          token={token}
          connect={true}
          video={false}
          audio={false}
          onDisconnected={() => router.push("/")}
        >
          <RoomAudioRenderer />
          <SimpleVoiceAssistant />
        </LiveKitRoom>
      </div>
    </div>
  );
}
