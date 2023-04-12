import React, { useContext } from 'react'
import { ChatContext } from "../Context/ChatProvider"
import { Box, Stack } from "@chakra-ui/layout"
import SingleChat from './SingleChat'

const ChatBox = ({setFetchAgain, fetchAgain}) => {
   const { user, chats, setChats, selectedChat, setSelectedChat } = useContext(ChatContext)
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      w={{ base: "100%", md: "70%" }}
      p={3}
      flexDirection="column"
      borderRadius="lg"
      borderWidth="1px"
      alignItems="center"
      bg="#E2E8F0"
    
    >
      <SingleChat fetchAgain={fetchAgain } setFetchAgain={setFetchAgain} />
    
    </Box>
  )
}

export default ChatBox