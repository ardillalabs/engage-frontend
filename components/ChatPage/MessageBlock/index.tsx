import Image from "next/image";
import styles from "./index.module.css";

const MessageBlock = ({reversed, messageTime}: any) => {
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
                    <div className={ !reversed ? styles.time : styles.timeReversed }>{messageTime}</div>
                </div>
            </div>

        </div>
    )
}

export default MessageBlock;