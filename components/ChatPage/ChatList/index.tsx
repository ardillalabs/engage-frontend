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
import { RootState } from "@/store";
import { connect } from "react-redux";
import { getCurrentUserDetails } from "@/actions/Auth";
import PropTypes from "prop-types";
import { getCookie } from "cookies-next";

interface chatListArray {
  userID: string;
  chatID: string;
  username: string;
  email: string;
  phoneNumber: string;
  imageURL?: string;
  lastMessage?: string;
  lastMessageTime?: any;
  unreadCount?: number;
}

interface Props {
  getCurrentUserDetails: (...args: any[]) => any;
  auth: any;
}

const BASE_URL = process.env.BASE_URL;

const ChatList = ({ auth, getCurrentUserDetails }: Props) => {
  const cookie = getCookie("access_token");
  useEffect(() => {
    getCurrentUserDetails(cookie);
  }, [getCurrentUserDetails]);

  const userID = auth.id;
  console.log(userID);

  const [displaySearch, setDisplaySearch] = useState(false);
  const [chatList, setChatList] = useState<chatListArray[]>([]);
  const stateRef: any = useRef();
  stateRef.current = chatList;

  useEffect(() => {
    let api_res;

    if (userID) {
      const chatListFetch = async () => {
        try {
          api_res = await fetch(`${BASE_URL}/support_group/for-chat/${userID}`);
        } catch (error) {
          console.log(error);
          throw new Error("Failed to fetch chat list");
        }

        await api_res.json().then((users) => {
          setChatList([]);
          users.map((user: any) => {
            const chatID = user.chat_id;

            if (user.support_user && user.chat_id != null) {
              const support_user = user.support_user;
              const patient_user = user.patient_user;

              setChatList((prevState) => [
                ...prevState,
                {
                  userID:
                    support_user.id != auth.id
                      ? support_user.id
                      : patient_user.id,
                  chatID,
                  username:
                    support_user.id != auth.id
                      ? support_user.full_name
                      : patient_user.full_name,
                  imageURL:
                    support_user.id != auth.id
                      ? support_user.image_url
                      : patient_user.image_url,
                  email:
                    support_user.id != auth.id
                      ? support_user.email
                      : patient_user.email,
                  phoneNumber:
                    support_user.id != auth.id
                      ? support_user.phone_number
                      : patient_user.phone_number,
                  lastMessage: "",
                  lastMessageTime: "",
                },
              ]);

              // Update last message
              try {
                const colRef = query(
                  collection(db, "chatMessages", chatID, "messages"),
                  orderBy("messageTime", "desc"),
                  limit(1)
                );

                onSnapshot(colRef, (snapshot) => {
                  const snapData: any = snapshot.docs;
                  const snapLastMessage = snapData[0]?.data().message;
                  const snapLastMessageTime = snapData[0]
                    ?.data()
                    .messageTime?.toDate()
                    .toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                  const lastMessageUpdated = stateRef.current.map(
                    (obj: any) => {
                      if (obj.userID === support_user.id) {
                        return {
                          ...obj,
                          lastMessage: snapLastMessage,
                          lastMessageTime: snapLastMessageTime,
                        };
                      }
                      return obj;
                    }
                  );
                  setChatList(() => lastMessageUpdated);
                  stateRef.current = lastMessageUpdated;
                });
              } catch (error) {}

              // Update unread message count
              try {
                onSnapshot(doc(db, "chatMessages", chatID), (snapshot) => {
                  const unreadCount = snapshot.data()?.unreadCount?.[userID];

                  const unreadCountUpdated = stateRef.current.map(
                    (obj: any) => {
                      if (obj.userID === support_user.id) {
                        return {
                          ...obj,
                          unreadCount,
                        };
                      }
                      return obj;
                    }
                  );
                  setChatList(() => unreadCountUpdated);
                  stateRef.current = unreadCountUpdated;
                });
              } catch (error) {}
            }
          });
        });
      };

      chatListFetch();
    }
  }, [auth.id]);

  console.log("chatList", chatList);

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
            email={user.email}
            phoneNumber={user.phoneNumber}
            imageURL={user.imageURL}
            lastMessage={user.lastMessage}
            lastMessageTime={user.lastMessageTime}
            unreadCount={user.unreadCount}
            path={user.chatID}
          />
        ))}
        <div className={styles.chatEnd}></div>
      </div>
    </div>
  );
};

// export default ChatList;
ChatList.propTypes = {
  getCurrentUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentUserDetails,
})(ChatList);
