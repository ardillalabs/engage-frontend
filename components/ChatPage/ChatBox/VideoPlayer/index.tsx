import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";

const VideoPlayer = ({ user, videoAccess, audioAccess }: any) => {
  const ref: any = useRef();

  useEffect(() => {
    user.tracks?.videoTrack.play(ref.current);
  }, [user, videoAccess, audioAccess]);

  return (
    <div className={styles.mainDiv}>
      <div ref={ref} className={styles.video}></div>
    </div>
  );
};

export default VideoPlayer;
