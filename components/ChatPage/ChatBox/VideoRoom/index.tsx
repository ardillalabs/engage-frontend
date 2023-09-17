import React, { useEffect, useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "../VideoPlayer";
import styles from "./index.module.css";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { BsFillMicMuteFill } from "react-icons/bs";
import { FaVideoSlash } from "react-icons/fa";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Router, useRouter } from "next/router";

const APP_ID = "98fd19afaf3248548277a8b98b20a34d";
const TOKEN =
  "007eJxTYDA+I6vGMokl5NAv/UaWWCNnNtODNxOV9mUon9S4orqA554Cg6VFWoqhZWJaYpqxkYmFqYmFkbl5okWSpUWSkUGisUnKTja21IZARoZ7W5IZGKEQxGdjSM1LT0xPZWAAAGgXHJ0=";
const CHANNEL = "engage";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const VideoRoom = ({ auth, leaveCall, recUserID }: any) => {
  const stateRef: any = useRef();
  const [users, setUsers] = useState<any>([]);
  const [engageUsers, setEngageUsers] = useState<string[]>([]);
  const [videoAccess, setVideoAccess] = useState(false);
  const [audioAccess, setAudioAccess] = useState(false);
  const router = useRouter();
  const chatID: any = router.query.chatID;
  const userID = auth.id;
  stateRef.current = users;

  const handleUserJoined = async (user: any, mediaType: any) => {
    await client.subscribe(user, mediaType);
    if (!stateRef.current.some((u: any) => u.uid === user.uid)) {
      if (mediaType === "video") {
        setUsers((prevUsers: any) => [
          ...prevUsers,
          {
            uid: user.uid,
            tracks: {
              videoTrack: user._videoTrack,
              audioTrack: user._audioTrack,
            },
          },
        ]);
      }

      if (mediaType === "audio") {
      }
    } else {
      if (mediaType === "video") {
        setUsers((prevUsers: any) => [
          ...prevUsers.filter((u: any) => u.uid !== user.uid),
          {
            uid: user.uid,
            tracks: {
              videoTrack: user._videoTrack,
              audioTrack: user._audioTrack,
            },
          },
        ]);
      }
    }
  };

  const handleUserLeft = (user: any) => {
    setUsers((prevUsers: any) =>
      prevUsers.filter((u: any) => u.uid !== user.uid)
    );
  };

  const muteVideo = async () => {
    const index = users.findIndex((user: any) => user.uid === auth.id);

    if (videoAccess) {
      await users[index].tracks.videoTrack.setEnabled(false);
      setVideoAccess(false);
    } else {
      await users[index].tracks.videoTrack.setEnabled(true);
      setVideoAccess(true);
    }
  };
  const muteAudio = () => {};

  const endVideo = async () => {
    client.leave();
    client.removeAllListeners();

    const index = users.findIndex((user: any) => user.uid === auth.id);

    users[index].tracks.videoTrack.close();
    users[index].tracks.audioTrack.close();

    setUsers((current: any) => {
      current.filter((user: any) => user.uid !== auth.id);
    });

    leaveCall();

    try {
      await addDoc(collection(db, "chatMessages", chatID, "messages"), {
        message: `${auth.username} left the video call`,
        messageType: "leave-video-call",
        messageTime: serverTimestamp(),
        senderID: auth.id,
        recieverID: recUserID,
        mediaURL: null,
      });

      await setDoc(
        doc(db, "chatMessages", chatID),
        {
          unreadCount: {
            [recUserID]: increment(1),
            [userID]: 0,
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    if (!engageUsers.includes(auth.id) && engageUsers.length < 2) {
      client
        .join(APP_ID, CHANNEL, TOKEN, auth.id)
        .then((uid: any) =>
          Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
        )
        .then(([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          setUsers((prevUsers: any) => [
            ...prevUsers,
            {
              uid,
              tracks: { videoTrack, audioTrack },
            },
          ]);
          setEngageUsers((prevUsers: any) => [...prevUsers, auth.id]);
          client.publish(tracks);
          setAudioAccess(true);
          setVideoAccess(true);
        });
    }
  }, []);

  console.log(users);

  return (
    <div>
      <div className={styles.videoGrid}>
        {users &&
          users.map((user: any) => (
            <VideoPlayer
              key={user.uid}
              user={user}
              videoAccess={videoAccess}
              audioAccess={audioAccess}
            />
          ))}

        <div className={styles.controls}>
          <div>
            <BsFillMicMuteFill />
          </div>
          <div onClick={() => muteVideo()}>
            <FaVideoSlash />
          </div>
          <div onClick={() => endVideo()}>
            <HiOutlinePhoneMissedCall />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(VideoRoom);
