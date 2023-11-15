import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { BsFillTriangleFill } from "react-icons/bs";

const ContactCard = ({
  path,
  userID,
  username,
  email,
  phoneNumber,
  imageURL,
  lastMessage,
  lastMessageTime,
  unreadCount,
}: {
  path: string;
  userID: string;
  username: string;
  email: string;
  phoneNumber: string;
  imageURL?: string;
  lastMessage?: string;
  lastMessageTime?: any;
  unreadCount?: number;
}) => {
  const router = useRouter();

  return (
    <div
      className={
        router.query.chatID === path
          ? `${styles.mainDiv} ${styles.active}`
          : styles.mainDiv
      }
      onClick={() => router.push(`/chat/${path}`)}
    >
      <div className={styles.contactPreview}>
        <Image
          src={imageURL ? imageURL : "https://source.unsplash.com/_7LbC5J-jw4"}
          alt="Profile Picture"
          className={styles.profilePicture}
          width={60}
          height={60}
        />
        <div className={styles.hoverPreview}>
          <BsFillTriangleFill className={styles.leftChev} />
          <span>{email}</span>
          <span>{phoneNumber}</span>
        </div>
        <div className={styles.contactPreviewText}>
          <div className="body-heading">{username}</div>
          <div className="body-font">{lastMessage}</div>
        </div>
      </div>
      <div className={styles.contactRight}>
        <div className="body-font">{lastMessageTime}</div>

        {unreadCount ? (
          <div className={styles.msgCounter}>{unreadCount}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContactCard;
