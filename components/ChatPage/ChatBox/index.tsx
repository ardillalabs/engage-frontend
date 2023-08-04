import Image from "next/image";
import styles from "./index.module.css";

// react-icons
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import ChatInput from "../ChatInput";
import { useEffect, useState } from "react";
import AllMessages from "../AllMessages";
import { connect } from "react-redux";
import { RootState } from "@/store";

interface userDataArray {
  userID: string;
  username: string;
  imageURL?: string;
}

const BASE_URL = process.env.BASE_URL;

const ChatBox = ({ auth }: any) => {
  const userID = auth.id;
  const router = useRouter();
  const chatID = router.query.chatID;
  const [userData, setUserData] = useState<userDataArray>();
  const [allUserData, setAllUserData] = useState<any>();

  useEffect(() => {
    let res: any;

    const userInfoFetch = async () => {
      try {
        res = await fetch(`${BASE_URL}/support_group/for-chat/${userID}`);
      } catch (error) {
        // console.log("Failed to fetch user info", error);
        throw new Error("failed to fetch userInfo");
      }

      await res.json().then((users: any) => {
        setAllUserData(users);
        users.map((user: any) => {
          if (user.chat_id === chatID) {
            const support_user = user.support_user;
            setUserData({
              userID: support_user.id,
              username: support_user.full_name,
              imageURL: support_user.image_url,
            });
          }
        });
      });
    };

    userInfoFetch();
  }, []);

  useEffect(() => {
    const userInfoFetch = () => {
      if (allUserData) {
        allUserData.map((user: any) => {
          if (user.chat_id === chatID) {
            const support_user = user.support_user;
            setUserData({
              userID: support_user.id,
              username: support_user.full_name,
              imageURL: support_user.image_url,
            });
          }
        });
      }
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
        <AllMessages
          username={userData?.username}
          imageURL={userData?.imageURL}
        />
      </div>
      <ChatInput recUserID={userData?.userID} />
    </div>
  );
};

// export default ChatBox;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ChatBox);
