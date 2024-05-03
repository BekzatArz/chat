import React, { useEffect, useState } from 'react'
import { v4 } from "uuid"
import io from "socket.io-client"
import { useLocation, useNavigate } from "react-router-dom"
import { LuSmilePlus } from "react-icons/lu"
import { IoSend } from "react-icons/io5"
import EmojiPicker from "emoji-picker-react"

import styles from "../styles/Chat.module.css"
import Messages from './Messages'

const socket = io.connect('https://chatserver-6yzt.onrender.com')

const Chat = () => {
  const { search } = useLocation();

  const navigate = useNavigate();
  const [params, setParams] = useState({room: "", user: ""});
  const [ users, setUsers ] = useState(0);
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setParams(searchParams)
    socket.emit("join", searchParams)
  }, [search])
  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data])
    })
  }, [])

  useEffect(() => {
    socket.on('room', ({ data: {users}}) => {
      setUsers(users.length)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false)


    if (!message) return;

    socket.emit('sendMessage', {message, params});

    setMessage('')

  } 
  
  const handleChange = ({target: { value }}) => {
    setMessage(value)
    setIsOpen(false)
  }
  
  const leftRoom = () => {
    socket.emit('leftroom', { params })
    navigate('/')
    
  }
  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`)
  
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>
          ROOM NAME: {params.room}
        </div>
        <div className={styles.users}>
          {users} online
        </div>
        <button className={styles.left} onClick={leftRoom}>Leave room</button>
      </div>
      <Messages messages={state} name={params.name}/>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input}>
          <input
          type="text"
          name="message"
          value={message} 
          onChange={handleChange}
          placeholder='Type'
          autoComplete='off' 
          required/>
          <div className={styles.emoji}>
            <LuSmilePlus onClick={() => setIsOpen(!isOpen)} size={30} />
          </div>
          {isOpen && (
             <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick}/>
            </div>
          )}
          <div className={styles.btn}>
            <IoSend size={30} onClick={handleSubmit}/>        
          </div>
        </div>
      </form>
    </div>
  ) 
}

export default Chat