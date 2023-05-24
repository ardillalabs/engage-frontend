import Image from "next/image";
import styles from "./index.module.css";

// external components
import Message from "../Message";
import MessageBlock from "../MessageBlock";

// react-icons
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { BiMicrophone } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { HiOutlineCamera } from "react-icons/hi";
import { BsEmojiLaughing } from "react-icons/bs";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";

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
                <div className={styles.messageDate}>Today, 15 May</div>
                <div className={styles.messageBlock}>
                    <MessageBlock>
                        <Message />
                        <Message />
                        <Message />
                    </MessageBlock>

                    <MessageBlock reversed={true}>
                        <Message reversed={true} />
                        <Message reversed={true} />
                        <Message reversed={true} />
                    </MessageBlock>
                </div>
            </div>
            <div className={styles.messageFormDiv}>
                <form className={styles.messageForm}>
                    <BiMicrophone />
                    <input type="text" placeholder="Type a message" className={styles.messageInput} />
                    <ImAttachment />
                    <HiOutlineCamera />
                    <BsEmojiLaughing />
                    <button type="submit" className={styles.sendBtn}>
                        <IoSend className={styles.sendIcon} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox;