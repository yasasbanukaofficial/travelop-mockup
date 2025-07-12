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
import api from "@/app/api/route";

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

  const [userDetails, setUserDetails] = useState({});
  const [travelDetails, setTravelDetails] = useState({});
  const fetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:8000/context");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched data:", data);

      setUserDetails(data.user_details || {});
      setTravelDetails(data.travel_details || {});
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchDetails, 5000);
    return () => clearInterval(interval);
  }, []);

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
              {userDetails?.name || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Age:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {userDetails?.age || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Gender:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {userDetails?.gender || ""}
            </p>
          </div>
          <hr className="mt-4 mb-4" />
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Travel type:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {userDetails?.interests || ""}
            </p>
          </div>
          <div className={`${styles.dataFieldContainer}`}>
            <p className={`${museoModerno.className} ${styles.labelText}`}>
              Mobility:
            </p>
            <p className={`${michroma.className} ${styles.valueText}`}>
              {userDetails?.mobility || ""}
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
