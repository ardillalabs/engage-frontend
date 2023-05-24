import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const ContactCard = ({path}: any) => {
    const router = useRouter();

    return (
        <div 
            className={router.query.chatID === path ? `${styles.mainDiv} ${styles.active}` : styles.mainDiv} 
            onClick={() => router.push(`/chat/${path}`)} 
        >
            <div className={styles.contactPreview}>
                <Image
                    src="https://source.unsplash.com/_7LbC5J-jw4"
                    alt="Profile Picture"
                    className={styles.profilePicture}
                    width={60}
                    height={60}
                />
                <div className={styles.contactPreviewText}>
                    <div className="body-heading">Denneal Perera</div>
                    <div className="body-font">Hi, what are you doing now ejkshfuehd djkahde hjesd</div>
                </div>
            </div>
            <div className={styles.contactRight}>
                <div className="body-font">5.36 a.m</div>
                <div className={styles.msgCounter}>6</div>
            </div>
        </div>
    )
}

export default ContactCard;