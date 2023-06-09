import styles from "./index.module.css";

const Message = ({reversed}: any) => {
    return (
        <div className={ !reversed ? styles.mainDiv : styles.mainDivReversed }>
            <div className="body-font">
                lorem ipsum doler imet
            </div>
        </div>
    )
}

export default Message;