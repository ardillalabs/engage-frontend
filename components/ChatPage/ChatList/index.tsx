import { CiSearch } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import styles from "./index.module.css";
import ContactCard from "../ContactCard";
import { useState, useEffect, useRef } from "react";

import { db } from "@/firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  doc,
} from "firebase/firestore";

interface chatListArray {
  userID: string;
  chatID: string;
  username: string;
  imageURL?: string;
  lastMessage?: string;
  lastMessageTime?: any;
  unreadCount?: number;
}

//test
const userID = "lWzPWIAbIf0y43c0OdOd"; //JaneMay

const ChatList = () => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [chatList, setChatList] = useState<chatListArray[]>([]);
  const stateRef: any = useRef();
  stateRef.current = chatList;

  useEffect(() => {
    let api_res;

    const chatListFetch = async () => {
      try {
        api_res = await fetch("http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/support_group/2");
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch chat list");
      }

      await api_res.json().then((users) => {
        setChatList([]);
        users.map((user: any) => {
          const chatID = user.chat_id;
          const support_user = user.support_user;
          const colRef = query(
            collection(db, "chatMessages", chatID, "messages"),
            orderBy("messageTime", "desc"),
            limit(1)
          );

          setChatList((prevState) => [
            ...prevState,
            {
              userID: support_user.id,
              chatID,
              username: support_user.full_name,
              imageURL: support_user.image_url,
              lastMessage: "",
              lastMessageTime: "",
            },
          ]);
          // Update last message
          onSnapshot(colRef, (snapshot) => {
            const snapData: any = snapshot.docs;
            const snapLastMessage = snapData[0].data().message;
            const snapLastMessageTime = snapData[0]
              .data()
              .messageTime?.toDate()
              .toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

            const lastMessageUpdated = stateRef.current.map((obj: any) => {
              if (obj.userID === support_user.id) {
                return {
                  ...obj,
                  lastMessage: snapLastMessage,
                  lastMessageTime: snapLastMessageTime,
                };
              }
              return obj;
            });
            setChatList(() => lastMessageUpdated);
            stateRef.current = lastMessageUpdated;
          });

          // Update unread message count
          onSnapshot(doc(db, "chatMessages", chatID), (snapshot) => {
            const unreadCount = snapshot.data()?.unreadCount?.[userID];

            const unreadCountUpdated = stateRef.current.map((obj: any) => {
              if (obj.userID === support_user.id) {
                return {
                  ...obj,
                  unreadCount,
                };
              }
              return obj;
            });
            setChatList(() => unreadCountUpdated);
            stateRef.current = unreadCountUpdated;
          });
        });
      });
    };

    chatListFetch();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.header}>
        <span
          className={
            !displaySearch ? styles.headerText : styles.headerTextHidden
          }
        >
          Chatbox
        </span>

        <div
          className={
            displaySearch ? styles.userSearch : styles.userSearchHidden
          }
        >
          <div
            className={
              displaySearch ? styles.searchBarDiv : styles.searchBarDivHidden
            }
          >
            <div className={styles.headerIcon}>
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search for users"
              className={styles.searchBar}
            />
            <GrClose onClick={() => setDisplaySearch(false)} />
          </div>
        </div>

        <div
          className={
            !displaySearch ? styles.headerIcon : styles.headerIconHidden
          }
        >
          <CiSearch onClick={() => setDisplaySearch(!displaySearch)} />
        </div>
      </div>
      <div className={styles.chatList}>
        {chatList.map((user) => (
          <ContactCard
            key={user.userID}
            userID={user.userID}
            username={user.username}
            imageURL={user.imageURL}
            lastMessage={user.lastMessage}
            lastMessageTime={user.lastMessageTime}
            unreadCount={user.unreadCount}
            path={user.chatID}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
