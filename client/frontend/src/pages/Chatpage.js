import React from 'react'
import "./style.css"
import axios from 'axios'
import Usefetch from '../component/Usefetch'
import "./style.css"

const Chatpage = () => {

    const { data } = Usefetch("http://localhost:5000/api/chats")
    
  return (
      <div className='checkContainer'>
      </div>
  )
}

export default Chatpage