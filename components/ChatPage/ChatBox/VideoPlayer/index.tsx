import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";

const VideoPlayer = ({ user }: any) => {
  const ref: any = useRef();

  useEffect(() => {
    if (user.tracks) {
      user.tracks.videoTrack.play(ref.current);
    } else {
      user._videoTrack.play(ref.current);
    }
    console.log(user);
  }, [user]);

  return (
    <div className={styles.mainDiv}>
      <div ref={ref} className={styles.video}></div>
    </div>
  );
};

export default VideoPlayer;
