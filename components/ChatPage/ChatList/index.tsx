import { CiSearch } from "react-icons/ci";
import { VscEdit } from "react-icons/vsc";
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
                <span className="page-heading">Chatbox</span>
                <div className={styles.headerIcons}>
                    <div className={styles.headerIcon}>
                        <CiSearch onClick={ () => setDisplaySearch(!displaySearch) } />
                    </div>
                </div>
            </div>
            <div className={styles.chatList}>

                {/* Search bar with Search items --design-not-finalized */}
                {/* <div className={styles.userSearch}>
                    <div className={displaySearch ? styles.searchBarDiv : styles.searchBarDivHidden}>
                        <input 
                            type="text" 
                            placeholder="Search for users" 
                            className={styles.searchBar} 

                        />
                        <GrClose onClick={ () => setDisplaySearch(false) } />
                    </div>

                    <div className={styles.userSearchResults}>
                        <ContactCard />
                    </div>
                </div> */}

                <ContactCard path="JohnDoe" />
                <ContactCard path="AliceCane" />
            </div>
        </div>
    )
}

export default ChatList;