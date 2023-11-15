import Image from "next/image";
import styles from "./index.module.css";

// react-icons
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import ChatInput from "../ChatInput";
import { useEffect, useRef, useState } from "react";
import AllMessages from "../AllMessages";
import { connect } from "react-redux";
import { RootState } from "@/store";
import { HiVideoCamera } from "react-icons/hi";
import { db } from "@/firebase/config";
// import VideoRoom from "./VideoRoom";
import dynamic from "next/dynamic";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  increment,
  setDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { CiMenuKebab } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";

interface userDataArray {
  userID: string;
  username: string;
  imageURL?: string;
}

const BASE_URL = process.env.BASE_URL;

const MeetingContainer: any = dynamic(() => import("./VideoRoom"), {
  ssr: false,
});

const ChatBox = ({ auth }: any) => {
  const userID = auth.id;
  const router = useRouter();
  const chatID: any = router.query.chatID;
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [userData, setUserData] = useState<userDataArray>();
  const [allUserData, setAllUserData] = useState<any>();
  const [joined, setJoined] = useState(false);
  const recUserID: any = userData?.userID;

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSubMenu(false);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  async function deleteCollection() {
    const collectionRef = collection(db, "chatMessages", chatID, "messages");
    const query = collectionRef;
    setShowSubMenu(false);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }

  async function deleteQueryBatch(db: any, query: any, resolve: any) {
    const snapshot = await getDocs(query);

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = writeBatch(db);
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }

  useEffect(() => {
    console.log("changed");
  }, [chatID]);

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
        users?.map((user: any) => {
          if (user.chat_id === chatID) {
            let chat_user;
            if (user.support_user.id === userID) {
              chat_user = user.patient_user;
            } else if (user.patient_user.id === userID) {
              chat_user = user.support_user;
            }
            setUserData({
              userID: chat_user.id,
              username: chat_user.full_name,
              imageURL: chat_user.image_url,
            });
          }
        });
      });
    };

    userInfoFetch();
  }, []);

  useEffect(() => {
    const userInfoFetch = () => {
      console.log(allUserData);
      if (allUserData) {
        allUserData.map((user: any) => {
          if (user.chat_id === chatID) {
            let chat_user;
            if (user.support_user.id === userID) {
              chat_user = user.patient_user;
            } else if (user.patient_user.id === userID) {
              chat_user = user.support_user;
            }
            setUserData({
              userID: chat_user.id,
              username: chat_user.full_name,
              imageURL: chat_user.image_url,
            });
          }
        });
      }
    };

    userInfoFetch();
  }, [chatID]);

  const leaveCall = () => {
    setJoined(false);
  };

  const joinCall = async () => {
    setJoined(true);

    try {
      await addDoc(collection(db, "chatMessages", chatID, "messages"), {
        message: `${auth.username} joined the video call`,
        messageType: "join-video-call",
        messageTime: serverTimestamp(),
        senderID: auth.id,
        recieverID: recUserID,
        mediaURL: null,
      });

      await setDoc(
        doc(db, "chatMessages", chatID),
        {
          unreadCount: {
            [recUserID]: increment(1),
            [userID]: 0,
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleJoin = async () => {
    setJoined(true);

    try {
      await addDoc(collection(db, "chatMessages", chatID, "messages"), {
        message: `${auth.username} started a video call`,
        messageType: "start-video-call",
        messageTime: serverTimestamp(),
        senderID: userID,
        recieverID: recUserID,
        mediaURL: null,
      });

      await setDoc(
        doc(db, "chatMessages", chatID),
        {
          unreadCount: {
            [recUserID]: increment(1),
            [userID]: 0,
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <>
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
              src={userData?.imageURL ? userData.imageURL : "/dummy450x450.jpg"}
              alt="Profile Picture"
              className={styles.profilePicture}
              width={60}
              height={60}
            />
            <div className={`page-subheading ${styles.chatUsername}`}>
              {userData?.username}
            </div>
          </div>
          <div className={styles.chatTopLeft}>
            <div className={styles.videoIcon} onClick={() => handleJoin()}>
              <HiVideoCamera />
            </div>
            <div className={styles.chatSubMenu}>
              <div
                className={styles.menuIcon}
                onClick={() => setShowSubMenu(!showSubMenu)}
              >
                <CiMenuKebab />
              </div>
              <div
                className={`${styles.chatSubMenuItems} ${
                  showSubMenu ? "" : styles.hideSubMenu
                }`}
                ref={showSubMenu ? wrapperRef : null}
              >
                <div
                  className={styles.chatSubMenuItem}
                  onClick={() => deleteCollection()}
                >
                  <AiTwotoneDelete />
                  <span>Clear chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chatBox}>
          <AllMessages
            username={userData?.username}
            imageURL={userData?.imageURL}
            joinCall={joinCall}
          />
        </div>
        <ChatInput recUserID={userData?.userID} />
      </div>

      <div
        className={`${styles.videoCallSection} ${
          joined ? styles.callScreenOpen : ""
        }`}
      >
        {joined && (
          <MeetingContainer leaveCall={leaveCall} recUserID={recUserID} />
        )}
      </div>
    </>
  );
};

// export default ChatBox;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ChatBox);
