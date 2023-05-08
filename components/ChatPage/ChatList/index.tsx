import { CiSearch } from "react-icons/ci";
import { VscEdit } from "react-icons/vsc";
import styles from "./index.module.css";
import ContactCard from "../ContactCard";

const ChatList = () => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.header}>
                <span className="page-heading">Chatbox</span>
                <div className={styles.headerIcons}>
                    <div className={styles.headerIcon}>
                        <CiSearch />
                    </div>
                    <div className={styles.headerIcon}>
                        <VscEdit />
                    </div>
                </div>
            </div>
            <div className={styles.chatList}>
                <ContactCard />
                <ContactCard />
            </div>
        </div>
    )
}

export default ChatList;