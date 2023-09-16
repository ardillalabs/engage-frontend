import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "../VideoPlayer";
import styles from "./index.module.css";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { BsFillMicMuteFill } from "react-icons/bs";
import { FaVideoSlash } from "react-icons/fa";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";

const APP_ID = "98fd19afaf3248548277a8b98b20a34d";
const TOKEN =
  "007eJxTYNjRv2PqduNLfz0mKp3aseYLQ9kX3u1TGL6zWv25NCX20SE1BQZLi7QUQ8vEtMQ0YyMTC1MTCyNz80SLJEuLJCODRGOTlIitLKkNgYwM381aGRihEMRnY0jNS09MT2VgAABLMSIK";
const CHANNEL = "engage";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const VideoRoom = ({ auth, leaveCall }: any) => {
  const [users, setUsers] = useState<any>([]);
  const [engageUsers, setEngageUsers] = useState<string[]>([]);

  const handleUserJoined = async (user: any, mediaType: any) => {
    await client.subscribe(user, mediaType);

    if (!engageUsers.includes(auth.id) && engageUsers.length < 2) {
      if (mediaType === "video") {
        setUsers((prevUsers: any) => [...prevUsers, user]);
      }

      if (mediaType === "audio") {
      }
    }
  };

  const handleUserLeft = (user: any) => {
    setUsers((prevUsers: any) =>
      prevUsers.filter((u: any) => u.uid !== user.uid)
    );
  };

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
        });
    }
  }, []);

  console.log(users);

  return (
    <div>
      <div className={styles.videoGrid}>
        {users &&
          users.map((user: any) => <VideoPlayer key={user.uid} user={user} />)}

        <div className={styles.controls}>
          <div>
            <BsFillMicMuteFill />
          </div>
          <div>
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
