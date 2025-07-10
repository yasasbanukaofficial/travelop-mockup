import {
  BarVisualizer,
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from "@livekit/components-react";
import styles from "./styles/ChatVisualizer.module.css";
import { useEffect, useRef, useState } from "react";
import { Track } from "livekit-client";
import { Limelight } from "next/font/google";

export function ChatVisualizer() {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();

  const { segments: userSegments } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState([]);
  const scroller = useRef(null);
  useEffect(() => {
    scroller.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });

  useEffect(() => {
    const msgs = [];

    userSegments?.forEach((seg) => {
      msgs.push({
        message: seg.text,
        from: {
          name: "You",
          identity: "user",
          isLocal: true,
        },
        timestamp: seg.firstReceivedTime ?? Date.now(),
      });
    });

    agentTranscriptions?.forEach((seg) => {
      msgs.push({
        message: seg.text,
        from: {
          name: "Agent",
          identity: "agent",
          isLocal: false,
        },
        timestamp: seg.firstReceivedTime ?? Date.now(),
      });
    });

    msgs.sort((a, b) => a.timestamp - b.timestamp);
    setMessages(msgs);
  }, [userSegments, agentTranscriptions]);

  return (
    <div className={styles.mainContainer}>
      <div
        className={`w-full h-full backdrop-filter backdrop-brightness-60 backdrop-blur-md ${styles.section} ${styles.messageSection}`}
      >
        <div className={`${styles.visualizerContainer}`}>
          <BarVisualizer
            data-role="agent"
            state={state}
            trackRef={audioTrack}
            className={`${styles.visualizer} ${styles.agentVisualizer}`}
            barCount={5}
          />
          <BarVisualizer
            state={state}
            trackRef={audioTrack}
            className={`${styles.visualizer} ${styles.userVisualizer}`}
            barCount={5}
            style={{ color: "lime" }}
          />
        </div>

        <div className={`${styles.msgSection}`}>
          {messages.map((msg, index) => {
            const isAgent = msg.from.identity === "agent";
            return (
              <div
                key={index}
                className={`${styles.chatContainer} ${
                  isAgent ? styles.userContainer : styles.agentContainer
                }`}
              >
                <div
                  className={`${styles.chatBubble} ${
                    isAgent ? styles.agentBubble : styles.userBubble
                  }`}
                >
                  <div
                    className={`${styles.chatHeader} ${isAgent ? styles.agentHeader : styles.userHeader}`}
                  >
                    <span className={styles.name}>{msg.from.name}</span>
                    <span className={styles.time}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p
                    className={`${styles.chatMessage} ${isAgent ? styles.agentMsg : styles.userMsg}`}
                  >
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={scroller} className="pb-2 md:pb-0"></div>
        </div>
      </div>

      <div
        className={`w-full h-full backdrop-filter backdrop-brightness-60 backdrop-blur-md ${styles.section} ${styles.detailDisplaySection}`}
      ></div>
    </div>
  );
}
