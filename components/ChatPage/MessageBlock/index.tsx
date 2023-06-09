import Image from "next/image";
import styles from "./index.module.css";

const MessageBlock = ({ children, reversed }: any) => {
    return (
        <div className={styles.mainDiv}>
            <div className={ !reversed ? styles.profileInfo : styles.profileInfoReversed }>
                <Image
                        src="https://source.unsplash.com/_7LbC5J-jw4"
                        alt="Profile Picture"
                        className={styles.profilePicture}
                        width={60}
                        height={60}
                />
                <div className={styles.profileInfoText}>
                    { !reversed && <div className="body-heading">Denneal Perera</div> }
                    <div className={ !reversed ? styles.time : styles.timeReversed }>5.36 a.m</div>
                </div>
            </div>
            <div className={ !reversed ? styles.messagesContainer : styles.messagesContainerReversed }>
                <div className={ !reversed ? styles.messages : styles.messagesReversed }>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MessageBlock;