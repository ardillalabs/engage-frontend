import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import styles from "./index.module.css";

const ChatPage = () => {
    return (
        <div className={styles.mainDiv}>
            <ChatList />
            <ChatBox />
        </div>
    )
}

export default ChatPage;