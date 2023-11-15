import { BiSolidPhoneCall } from "react-icons/bi";
import styles from "./index.module.css";

const Message = ({ reversed, message, messageType, joinCall }: any) => {
  return (
    <>
      <div
        className={
          !reversed ? styles.mainDivContainer : styles.mainDivContainerReversed
        }
      >
        {messageType !== "leave-video-call" &&
          messageType !== "join-video-call" && (
            <div
              className={!reversed ? styles.mainDiv : styles.mainDivReversed}
            >
              {!messageType && <div className="body-font">{message}</div>}

              {messageType === "start-video-call" && (
                <div className={styles.startCall}>
                  <span>{message}</span>
                  <button
                    className={styles.joinCall}
                    onClick={() => joinCall()}
                  >
                    <div className={styles.callIcon}>
                      <BiSolidPhoneCall />
                    </div>
                    <span>Join</span>
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
      {(messageType === "leave-video-call" ||
        messageType === "join-video-call") && (
        <div className={styles.leftCall}>
          <div className={styles.hr}></div>
          <span>{message}</span>
          <div className={styles.hr}></div>
        </div>
      )}
    </>
  );
};

export default Message;
