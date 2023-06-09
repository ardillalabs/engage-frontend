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
import AllMessages from "../AllMessages";

const ChatBox  = () => {
    const router = useRouter();
    
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
                <AllMessages />
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatBox;