import React from 'react'
import { ChatContext } from "../Context/ChatProvider"
import { Box } from "@chakra-ui/layout"
import {
  Tooltip,
  Button,
  Text,
  IconButton, Spinner, useToast 

} from '@chakra-ui/react'
import { ArrowBackIcon } from "@chakra-ui/icons";
import {getSender, getSenderFull} from "../config/ChatLogic"
import UserChatProvider from "../component/miscellanea/UserChatProfile"
import UpdateGroupChatModel from './miscellanea/UpdateGroupChatModel';

const SingleChat = () => {
  const { user, chats, setChats, selectedChat, setSelectedChat } = React.useContext(ChatContext)
  console.log("selected my chat", selectedChat, user )
  return (
    <>
      { 
        selectedChat ? (
          <>
            <Text
              display="flex"
              alignItems="center"
              justifyContent={{ base: "space-between" }}
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"

            >
               <IconButton
              display={{ base: "flex", md: "none" }}  
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              />
              {
                !selectedChat.isGroupChat
                  ? (
                    <>
                      {getSender(user, selectedChat.users)}
                      <UserChatProvider user={getSenderFull(user, selectedChat.users) } />
                    </>
                  )
                  :
                  (
                    <>
                      {selectedChat.chatName.toLowerCase()}
                      <UpdateGroupChatModel
                     
                      />
                    </>
                  )
              }
            </Text>
            <Box
              display='flex'
              flexDirection="column"
                justifyContent="flex-end"
              p={3}
              bg="white"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            
            >
              message Here
              
            </Box>
          </>
        ) :
          (
          <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} >
            Click on a user to start chatting
          </Text>
        </Box>
          )
       
      }
    </>
  )
}

export default SingleChat