import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { BiMicrophone } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";

// firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/router";

const ChatInput = () => {
  // const userID = "jccI1Kzu7VSFhOOsxKVo";  // JohnDoe
  const userID = "lWzPWIAbIf0y43c0OdOd"; //JaneMay

  const router = useRouter();
  const [chatID, setChatID] = useState<any>(router.query.chatID);
  const [recUserID, setRecUserID] = useState("");
  useEffect(() => {
    //Get current chatID
    setChatID(router.query.chatID);

    //Get current reciever user ID
    let res;
    setRecUserID("");
    const fetchRecieverID = async () => {
      try {
        res = await fetch("http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/support_group/2");
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch chat list");
      }

      await res.json().then((users: any) => {
        users.map((user: any) => {
          if (user.chat_id === chatID) {
            const support_user = user.support_user;
            setRecUserID(() => support_user.id);
          }
        });
      });
    };

    fetchRecieverID();
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

      e.target[0].value = "";
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className={styles.messageFormDiv}>
      <form className={styles.messageForm} onSubmit={handleSubmit}>
        <BiMicrophone />
        <input
          type="text"
          placeholder="Type a message"
          className={styles.messageInput}
        />
        <ImAttachment />
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

export default ChatInput;
