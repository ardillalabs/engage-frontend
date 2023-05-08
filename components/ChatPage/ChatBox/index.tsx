import Image from "next/image";
import styles from "./index.module.css";
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import MessageBlock from "../MessageBlock";
import Message from "../Message";

const ChatBox  = () => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <Image
                        src="/placeholder.jpg"
                        alt="Profile Picture"
                        className={styles.profilePicture}
                        width={60}
                        height={60}
                    />
                    <div className="page-subheading">Hello Group</div>
                </div>
                <div className={styles.headerActionIcons}>
                    <FaVideo />
                    <IoCall />
                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.messageDate}>Today, 15 May</div>
                <div className={styles.messageBlock}>
                    <MessageBlock>
                        <Message />
                        <Message />
                        <Message />
                    </MessageBlock>
                </div>
                <div className={styles.messageInput}>
                    <input type="text" placeholder="message" name="message" />
                </div>
            </div>
        </div>
    )
}

export default ChatBox;