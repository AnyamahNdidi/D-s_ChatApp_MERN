import React from 'react'
import { ChatContext } from "../Context/ChatProvider"

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
   const { user, chats, setChats, selectedChat, setSelectedChat } = React.useContext(ChatContext)
  return (
    <>
      { 
        selectedChat ? (<></>) : (<></>)
       
      }
    </>
  )
}

export default SingleChat