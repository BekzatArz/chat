import React from 'react'
import { v4 } from "uuid"

import styles from "../styles/Chat.module.css"


const Messages = ({ messages, name}) => {
  return (
    <div className={styles.messages}>
        {messages.map(({user, message}) => {
            const itsMe = user.name.toLowerCase().trim() === name.trim().toLowerCase();
            const className = `${itsMe ? styles.me: styles.user}`;

            return (
                <div key={v4()} className={`${styles.message} ${className}`}>
                    <span className={styles.user_name}>
                        {user.name}
                    </span>
                    <div className={styles.text}>
                        {message}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Messages