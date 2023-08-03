import Image from "next/image";
import styles from "./index.module.css";

const MessageBlock = ({ reversed, messageTime, username, imageURL }: any) => {
  return (
    <div className={styles.mainDiv}>
      <div
        className={!reversed ? styles.profileInfo : styles.profileInfoReversed}
      >
        <Image
          src={imageURL ? imageURL : "https://source.unsplash.com/_7LbC5J-jw4"}
          alt="Profile Picture"
          className={styles.profilePicture}
          width={60}
          height={60}
        />
        <div className={styles.profileInfoText}>
          {!reversed && <div className="body-heading">{username}</div>}
          <div className={!reversed ? styles.time : styles.timeReversed}>
            {messageTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
