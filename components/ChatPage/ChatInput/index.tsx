import React from 'react';
import styles from "./index.module.css";
import { BiMicrophone } from 'react-icons/bi'
import { ImAttachment } from 'react-icons/im'
import { IoSend } from 'react-icons/io5'

// firebase
import { doc, setDoc, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { db } from '@/firebase/config';

const ChatInput = () => {

    // const userID = "jccI1Kzu7VSFhOOsxKVo";  // JohnDoe
    // const rec_userID = "lWzPWIAbIf0y43c0OdOd"; //JaneMay

    const rec_userID = "jccI1Kzu7VSFhOOsxKVo";  // JohnDoe
    const userID = "lWzPWIAbIf0y43c0OdOd"; //JaneMay

    const chatID = "1X0ttXRbAcoLCHZC07X1";
    
    // Update data to firestore
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const message = e.target[0].value;

        try {
            await addDoc(collection(db, "chatMessages", chatID, "messages"), {
                message: message,
                messageTime: serverTimestamp(),
                senderID: userID,
                recieverID: rec_userID,
                mediaURL: null
            });

            console.log("Done");
            e.target[0].value = '';

        } catch(error) {
            console.log("Something went wrong", error);
        }
    }

    return (
        <div className={styles.messageFormDiv}>
            <form 
                className={styles.messageForm}
                onSubmit={handleSubmit}
            >
                <BiMicrophone />
                <input type="text" placeholder="Type a message" className={styles.messageInput} />
                <ImAttachment />
                <button type="submit" className={styles.sendBtn}>
                    <IoSend className={styles.sendIcon} />
                </button>
            </form>
        </div>
    )
}

export default ChatInput