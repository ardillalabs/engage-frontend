import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";
import { FaVideoSlash } from "react-icons/fa";
import { connect } from "react-redux";
import { RootState } from "@/store";

const VideoPlayer = ({ user, videoAccess, audioAccess, auth }: any) => {
  const ref: any = useRef();

  useEffect(() => {
    user.tracks?.videoTrack.play(ref.current);

    if (auth.id !== user.uid && user.tracks.audioTrack) {
      user.tracks?.audioTrack.play();
    }
  }, [user, videoAccess, audioAccess]);

  return (
    <div className={styles.mainDiv}>
      <div ref={ref} className={styles.video}>
        <div className={styles.videoCallUserDetails}>
          <FaVideoSlash />
        </div>
      </div>
    </div>
  );
};

// export default VideoPlayer;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(VideoPlayer);
