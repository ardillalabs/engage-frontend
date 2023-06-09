import styles from "./index.module.css";

const Message = ({reversed, message}: any) => {
    return (
        <div className={ !reversed ? styles.mainDivContainer : styles.mainDivContainerReversed }>
            <div className={ !reversed ? styles.mainDiv : styles.mainDivReversed }>
                <div className="body-font">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Message;