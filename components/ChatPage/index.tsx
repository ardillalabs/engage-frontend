import React from 'react';
import styles from './index.module.css';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import useChat from '@/hooks/useChat';
import EmptyChat from './EmptyChat';
import { useRouter } from 'next/router';

const ChatPage = () => {
    const { isOpen, chatID } = useChat();

    return (
        <div className={styles.mainDiv}>

            { isOpen ? 
                    <>
                        <div className={styles.hideComponent}>
                            <ChatList />
                        </div>
                        <ChatBox />
                    </>
                :
                    <>
                        <ChatList />
                        <div className={`${styles.hideComponent} ${styles.emptyChatDiv} `}>
                            <EmptyChat />
                        </div>
                    </>
            }

        </div>
  )
}

export default ChatPage;