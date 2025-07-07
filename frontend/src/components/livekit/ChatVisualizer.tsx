import {
  BarVisualizer,
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from "@livekit/components-react";
import styles from "./styles/ChatVisualizer.module.css";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";

export function ChatVisualizer() {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();

  const { segments: userSegments } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState([]);

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
      <div className={`${styles.section} ${styles.messageSection}`}>
        <h1 className="text-[24px] mt-1 mb-8">Chat</h1>
        <div className={styles.msgSection}>
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
        </div>
      </div>

      <div className={`${styles.section} ${styles.visualizerSection}`}>
        <h1 className="text-[24px] mt-1">Visualizer</h1>
        <BarVisualizer
          state={state}
          trackRef={audioTrack}
          className={styles.visualizer}
          barCount={5}
        />
      </div>
    </div>
  );
}
