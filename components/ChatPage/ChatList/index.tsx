import { CiSearch } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import styles from "./index.module.css";
import ContactCard from "../ContactCard";
import { useState } from "react";
import Link from "next/link";

const ChatList = () => {
    const [displaySearch, setDisplaySearch] = useState(false);

    return (
        <div className={styles.mainDiv}>
            <div className={styles.header}>
                
                <span className={ !displaySearch ? styles.headerText : styles.headerTextHidden }>Chatbox</span>

                <div className={ displaySearch ? styles.userSearch : styles.userSearchHidden }>
                    <div className={displaySearch ? styles.searchBarDiv : styles.searchBarDivHidden}>
                        <div className={styles.headerIcon}>
                            <CiSearch />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search for users" 
                            className={styles.searchBar} 

                        />
                        <GrClose onClick={ () => setDisplaySearch(false) } />
                    </div>

                </div>


                <div className={ !displaySearch ? styles.headerIcon : styles.headerIconHidden }>
                    <CiSearch onClick={ () => setDisplaySearch(!displaySearch) } />
                </div>
            </div>
            <div className={styles.chatList}>
                <ContactCard path="JohnDoe" />
                <ContactCard path="AliceCane" />
            </div>
        </div>
    )
}

export default ChatList;