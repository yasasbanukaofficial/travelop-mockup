import {
  BarVisualizer,
  useLocalParticipant,
  useTrackTranscription,
  useVoiceAssistant,
} from "@livekit/components-react";
import styles from "./styles/ChatVisualizer.module.css";
import { useEffect, useRef, useState } from "react";
import { LocalAudioTrack, Track } from "livekit-client";
import { Limelight } from "next/font/google";
import { michroma, museoModerno } from "@/lib/fonts";
import SplitText from "../ui/SplitText";

export function ChatVisualizer() {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const { microphoneTrack } = useLocalParticipant();
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

  const [travelDetails, setTravelDetails] = useState({
    name: "",
    age: "",
    gender: "",
    interest: "",
    mobility: "",
    location: "",
    budget: "",
  });

  async function fetchDetails() {
    const res = await fetch(`/api`);
    const data = await res.json();
    setTravelDetails(data);
  }

  useEffect(() => {
    if (!userSegments || userSegments.length === 0) return;

    const timer = setTimeout(() => {
      fetchDetails();
    }, 3000);

    return () => clearTimeout(timer);
  }, [userSegments]);

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
            barCount={4}
          />
          <BarVisualizer
            state={state}
            trackRef={microphoneTrack?.track}
            className={`${styles.visualizer} ${styles.userVisualizer}`}
            barCount={4}
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
      >
        <p className={`${museoModerno.className} ${styles.detailSectionTitle}`}>
          TRAVEL DETAILS
        </p>
        <hr />
        <div className={styles.userDetailSection}>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Name:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.name || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Age:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.age || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Gender:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.gender || ""}
            </p>
          </div>
          <hr className="mt-4 mb-4" />
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Travel type:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.interest || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Mobility:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.mobility || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Destination:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.location || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Budget:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {travelDetails?.budget || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
