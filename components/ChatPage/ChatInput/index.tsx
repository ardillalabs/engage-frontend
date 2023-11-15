import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { BiMicrophone } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";

// firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { RootState } from "@/store";

const ChatInput = ({ recUserID, auth }: any) => {
  const userID = auth.id;

  const router = useRouter();
  const [chatID, setChatID] = useState<any>(router.query.chatID);

  useEffect(() => {
    //Get current chatID
    setChatID(router.query.chatID);
  }, [router.query.chatID]);

  // Update data to firestore
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = e.target[0].value;

    try {
      await addDoc(collection(db, "chatMessages", chatID, "messages"), {
        message: message,
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

      e.target[0].value = "";
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className={styles.messageFormDiv}>
      <form className={styles.messageForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          className={styles.messageInput}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={recUserID ? false : true}
        >
          <IoSend className={styles.sendIcon} />
        </button>
      </form>
    </div>
  );
};

// export default ChatInput;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ChatInput);
