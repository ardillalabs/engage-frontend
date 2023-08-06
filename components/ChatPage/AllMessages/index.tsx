import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import MessageBlock from "../MessageBlock";
import Message from "../Message";
import useDate from "@/hooks/useDate";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { RootState } from "@/store";

const AllMessages = ({ username, auth, imageURL }: any) => {
  const { dateString, day, month, year } = useDate();
  const [messages, setMessages] = useState<DocumentData>([]);

  const userID = auth.id;
  const router = useRouter();
  const [chatID, setChatID] = useState<any>(router.query.chatID);
  useEffect(() => {
    setChatID(router.query.chatID);
  }, [router.query.chatID]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const colRef = query(
      collection(db, "chatMessages", chatID, "messages"),
      orderBy("messageTime")
    );

    // Reset unread counter
    onSnapshot(colRef, (snapshot) => {
      setMessages(snapshot.docs);

      setDoc(
        doc(db, "chatMessages", chatID),
        {
          unreadCount: {
            [userID]: 0,
          },
        },
        { merge: true }
      );
    });
  }, [chatID]);

  return (
    <div className={styles.messageBlock}>
      {messages?.map((message: any, i: any) => {
        let messageData = message.data();
        let messageDateConverted = messageData.messageTime?.toDate();
        let arrayPos = i - 1;
        let startPos = i === 0 ? true : false;
        let reversed = messageData.senderID === userID ? true : false;
        let messageBlock =
          i !== 0 && messages[arrayPos].data().senderID !== messageData.senderID
            ? true
            : false;
        let showDate =
          i !== 0 &&
          messages[arrayPos].data().messageTime?.toDate().toDateString() !==
            messageDateConverted?.toDateString()
            ? true
            : false;
        let messageDate =
          dateString === messageDateConverted?.toDateString()
            ? `Today, ${day} ${month}`
            : `${messageDateConverted?.getDate() + 1} ${
                monthNames[messageDateConverted?.getMonth()]
              } ${messageDateConverted?.getFullYear()}`;
        let messageTime = messageDateConverted?.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={i}>
            {startPos && (
              <div className={styles.messageDate}>{messageDate}</div>
            )}
            {showDate && (
              <div className={styles.messageDate}>{messageDate}</div>
            )}
            {startPos && (
              <MessageBlock
                reversed={reversed}
                messageTime={messageTime}
                username={username}
                imageURL={reversed ? auth?.image_url : imageURL}
              />
            )}
            {messageBlock && (
              <MessageBlock
                reversed={reversed}
                messageTime={messageTime}
                username={username}
                imageURL={reversed ? auth?.image_url : imageURL}
              />
            )}
            <Message message={messageData.message} reversed={reversed} />
          </div>
        );
      })}
    </div>
  );
};

// export default AllMessages;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllMessages);
