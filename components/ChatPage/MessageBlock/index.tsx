import Image from "next/image";
import styles from "./index.module.css";

const MessageBlock = ({ children }: any) => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.profileInfo}>
                <Image
                        src="/placeholder.jpg"
                        alt="Profile Picture"
                        className={styles.profilePicture}
                        width={60}
                        height={60}
                />
                <div className={styles.profileInfoText}>
                    <div className="body-heading">Denneal Perera</div>
                    <div className="body-font">5.36 a.m</div>
                </div>
            </div>
            <div className={styles.messages}>
                {children}
            </div>
        </div>
    )
}

export default MessageBlock;