import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/config';
import MessageBlock from '../MessageBlock';
import Message from '../Message';
import useDate from '@/hooks/useDate';

const AllMessages = () => {
    const { dateString ,day, month, year } = useDate();
    const [messages, setMessages] = useState<DocumentData>([]);

    // const userID = "jccI1Kzu7VSFhOOsxKVo";  // JohnDoe
    const userID = "lWzPWIAbIf0y43c0OdOd"; //JaneMay
    const chatID = "1X0ttXRbAcoLCHZC07X1";

    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    
    useEffect(() => {
        // const colRef = collection(db, "chatMessages", chatID, "messages");
        const colRef = query(collection(db, "chatMessages", chatID, "messages"), orderBy("messageTime"));
        onSnapshot(colRef, (snapshot) => {
            setMessages(snapshot.docs);
        });
    }, []);

    return (
        <div className={styles.messageBlock}>
            {messages.map((message:any, i:any) => {
                let messageData = message.data();
                let messageDateConverted = messageData.messageTime.toDate();
                let arrayPos = i - 1;
                let startPos = i === 0 ? true : false;
                let reversed = messageData.senderID === userID ? true : false;
                let messageBlock = i !== 0 && messages[arrayPos].data().senderID !== messageData.senderID ? true : false;
                let showDate = i !== 0 && messages[arrayPos].data().messageTime.toDate().toDateString() !== messageDateConverted.toDateString() ? true : false;
                let messageDate = dateString === messageDateConverted.toDateString() ? `Today, ${day} ${month}` : `${messageDateConverted.getDate() + 1} ${monthNames[messageDateConverted.getMonth()]} ${messageDateConverted.getFullYear()}`;
                console.log(messageDateConverted);
                console.log(messageDateConverted.getYear());
                let messageTime = messageDateConverted.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                // console.log(messageData.messageTime.toDate().toDateString());
                // console.log(messageDateConverted.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));

                return (
                    <>
                        { startPos && <div className={styles.messageDate}>{messageDate}</div> }
                        { showDate && <div className={styles.messageDate}>{messageDate}</div> }
                        { startPos && <MessageBlock key={i} reversed={reversed} messageTime={messageTime} /> }
                        { messageBlock && <MessageBlock key={i} reversed={reversed} messageTime={messageTime} /> }
                        <Message message={messageData.message} reversed={reversed} />

                    </>
                )
            })}

        </div>
    )
}

export default AllMessages;