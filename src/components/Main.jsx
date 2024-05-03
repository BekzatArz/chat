import React, { useState } from 'react'
import styles from '../styles/Main.module.css'
import { Link } from 'react-router-dom'

const FIELDS = {
  NAME: "name",
  ROOM: "room",
}

const Main = () => {
  const { NAME, ROOM } = FIELDS

  const [values, setValues] = useState({[NAME]: "", [ROOM]: ""});

  const handlechange = ({target: { value, name }}) => {
    setValues({...values, [name]: value})
  }
  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v)
    if (isDisabled) e.preventDefault();
  }

  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <h1 className={styles.heading}>Join</h1>
            <form className={styles.form}> 
              <div className={styles.group}>
                <input required type="text" name="name" value={values[NAME]} className={styles.input} onChange={handlechange} placeholder='username' autoComplete='off'/>
              </div>
              <div className={styles.group}>
                <input required type="text" name="room" value={values[ROOM]} className={styles.input} onChange={handlechange} placeholder='room' autoComplete='off'/>
              </div>
              <Link className={styles.group} to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
                <button type='submit' className={styles.button} onClick={handleClick}>
                  Sign in
                </button>
              </Link>
            </form>
        </div>
    </div>
  )
}

export default Main