import React, { useContext } from 'react'
import { ChatContext } from "../Context/ChatProvider"
import { Box, Stack } from "@chakra-ui/layout"
import { AddIcon } from "@chakra-ui/icons";
import {
  Tooltip,
  Button,
  Text,
  Menu,
  TextMenu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
  Input,
  useToast


} from '@chakra-ui/react'

import Usefetch from './Usefetch'
import ChatLoading from './ChatLoading';

import axios from "axios"
import { getSender } from "../config/ChatLogic"
import GroupChatModel from "../component/miscellanea/GroupChatModel"



const Mychat = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = React.useState()
  const { user, chats, setChats, selectedChat, setSelectedChat } = useContext(ChatContext)
  const toast = useToast()
  
  
  console.log("oh god",user.data.toke)
  
  
   const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`
        }
      }
  

  const { data } = Usefetch("http://localhost:5000/api/chat", config)
  
  console.log("show chat",data)
  console.log("this is user chattttt", chats)


  // const getChat = async () => {
  //   try
  //   {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`
  //       }
  //     }

  //     const { data } = await axios.get("http://localhost:5000/api/chat", config);

  //     console.log(data)
  //     setChats(data)
    
  //   } catch (error)
  //   {
  //      toast({
  //       title: "Error Occured!",
  //       description: "Failed to Load the chats",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom-left",
  //     });
      
  //   }
    
  // }

    React.useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfor")));
    // getChat()
    if(data){
        setChats(data)
    }
  
  }, []);


  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="#E2E8F0"
      w={{ base: "100%", md: "25%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "15px" }}
        
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      
      >
        Recent Chats

        <GroupChatModel>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
          </GroupChatModel>
       
      </Box>
       <Box
          display="flex"
          flexDirection="column"
          bg="#E2E8F0"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
      >
        {
          chats ?
            (
              <Stack overflowY="scroll">
                {
                  chats.map((props) => (
                    <Box
                      onClick={() => setSelectedChat(props)}
                      bg={selectedChat === props ? "#7DA097" : "#E8E8E8"}
                      color={selectedChat === props ? "white" : "black"}
                      cursor="pointer"
                       px={3}
                py={2}
                borderRadius="lg"
                key={props._id}
                    >
                      <Text>
                        {!props.isGroupChat ?
                          (getSender(loggedUser, props.users))
                            :
                          (<>{ props.chatName
}</>)
                        }

                      </Text>
                    </Box>
                  ))
                }
              </Stack>
            )
              :
            (<ChatLoading/>)
        }
        </Box>
    </Box>
  )
}

export default Mychat