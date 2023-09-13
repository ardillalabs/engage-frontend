import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";

const VideoPlayer = ({ user }: any) => {
  const ref: any = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div ref={ref} className={styles.video}></div>
    </div>
  );
};

export default VideoPlayer;
