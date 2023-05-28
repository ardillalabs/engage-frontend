import Image from "next/image";
import styles from "./index.module.css";

// external components
import Message from "../Message";
import MessageBlock from "../MessageBlock";

// react-icons
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import ChatInput from "../ChatInput";

// firebase
import { db } from "@/firebase/config";
import { DocumentData, collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const ChatBox  = () => {
    const router = useRouter();

    const [messages, setMessages] = useState<DocumentData>([]);

    // const userID = "jccI1Kzu7VSFhOOsxKVo";  // JohnDoe
    const userID = "lWzPWIAbIf0y43c0OdOd"; //JaneMay
    const chatID = "1X0ttXRbAcoLCHZC07X1";
    
    useEffect(() => {
        // const colRef = collection(db, "chatMessages", chatID, "messages");
        const colRef = query(collection(db, "chatMessages", chatID, "messages"), orderBy("messageTime"));
        onSnapshot(colRef, (snapshot) => {
            setMessages(snapshot.docs);
        });
    }, []);
    
    return (
        <div className={styles.mainDiv}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <FiChevronLeft 
                        className={styles.backBtn}
                        onClick={() => {router.push('/chat')}}
                    />
                    <Image
                        src="https://source.unsplash.com/_7LbC5J-jw4"
                        alt="Profile Picture"
                        className={styles.profilePicture}
                        width={60}
                        height={60}
                    />
                    <div className="page-subheading">{router.query.chatID}</div>
                </div>
                <div className={styles.headerActionIcons}>
                    <FaVideo />
                    <IoCall />
                </div>
            </div>
            <div className={styles.chatBox}>
                
                <div className={styles.messageBlock}>
                    {messages.map((message:any, i:any) => {
                        let messageData = message.data();
                        let arrayPos = i - 1;
                        let startPos = i === 0 ? true : false;
                        let reversed = messageData.senderID === userID ? true : false;
                        let messageBlock = i !== 0 && messages[arrayPos].data().senderID !== messageData.senderID ? true : false;

                        return (
                            <>
                                {startPos && <MessageBlock key={i} reversed={reversed} />}
                                {messageBlock && <MessageBlock key={i} reversed={reversed} />}
                                <Message message={messageData.message} reversed={reversed} />

                            </>
                        )
                    })}

                </div>
                <div className={styles.messageDate}>Today, 15 May</div>
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatBox;