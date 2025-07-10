"use client";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import { SimpleVoiceAssistant } from "@/components/livekit/SimpleVoiceAssistant";
import Header from "@/components/layout/Header";
import styles from "@/app/agent/styles/Agent.module.css";
import LogoText from "@/components/ui/LogoText";

export default function Agent() {
  const router = useRouter();

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL;
  const token = process.env.NEXT_PUBLIC_LIVEKIT_TOKEN;

  return (
    <div className="absolute backdrop-filter backdrop-brightness-30 inset-0 flex flex-col max-w-full w-full">
      <div className={`${styles.logoContainer}`}>
        <LogoText />
      </div>
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
