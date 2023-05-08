import Image from "next/image";
import styles from "./index.module.css";

const ContactCard = () => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.contactPreview}>
                <Image
                    src="/placeholder.jpg"
                    alt="Profile Picture"
                    className={styles.profilePicture}
                    width={60}
                    height={60}
                />
                <div>
                    <div className="body-heading">Denneal Perera</div>
                    <div className="body-font">Hi, what are you doing now</div>
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