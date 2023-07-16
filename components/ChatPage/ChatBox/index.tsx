import Image from "next/image";
import styles from "./index.module.css";

// react-icons
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import ChatInput from "../ChatInput";
import { useEffect, useState } from "react";
import AllMessages from "../AllMessages";

interface userDataArray {
  username: string;
  imageURL?: string;
}

const ChatBox = () => {
  const router = useRouter();
  const chatID = router.query.chatID;
  const [userData, setUserData] = useState<userDataArray>();

  useEffect(() => {
    let res: any;

    const userInfoFetch = async () => {
      try {
        res = await fetch("http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/support_group/2");
      } catch (error) {
        console.log("Failed to fetch user info", error);
      }

      await res.json().then((users: any) => {
        users.map((user: any) => {
          if (user.chat_id === chatID) {
            const support_user = user.support_user;
            setUserData({
              username: support_user.full_name,
              imageURL: support_user.image_url,
            });
          }
        });
      });
    };

    userInfoFetch();
  }, [chatID]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <FiChevronLeft
            className={styles.backBtn}
            onClick={() => {
              router.push("/chat");
            }}
          />
          <Image
            src={
              userData?.imageURL
                ? userData.imageURL
                : "https://source.unsplash.com/_7LbC5J-jw4"
            }
            alt="Profile Picture"
            className={styles.profilePicture}
            width={60}
            height={60}
          />
          <div className="page-subheading">{userData?.username}</div>
        </div>
      </div>
      <div className={styles.chatBox}>
        <AllMessages username={userData?.username} />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatBox;
