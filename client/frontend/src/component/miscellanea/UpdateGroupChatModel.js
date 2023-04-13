import React, {useContext, useState} from 'react'
import { useDisclosure } from "@chakra-ui/hooks";
import {useNavigate} from "react-router-dom"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
    ModalBody,
  Button,
    ModalCloseButton,
    Image,
    IconButton,
    Text,
    useToast,
    Box,
       FormControl,
    FormLabel,
    InputGroup,
    Input,
    Spinner
   
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import { ChatProvider, ChatContext } from "../../Context/ChatProvider"
import SelectedUserCon from "../userAvatar/SelectedUserCon"
import UserListItem from "../userAvatar/UserListItem"
import axios from 'axios';

const UpdateGroupChatModel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSeacrh] = useState("")
    const [searchResault, setSeacrhResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameloading, setRenameLoading] = useState(false);
    const { user, chats, setChats, selectedChat, setSelectedChat,fetchAgain, setFetchAgain  } = useContext(ChatContext)
    const toast = useToast()


    console.log("goshman", user.data._id)

    const handleRemove =async (userdat) => {

         if (selectedChat.groupAdmin._id !== user.data._id && userdat._id !== user.data._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

        try
        {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`
                }
            }
            const {data} = await axios.put("http://localhost:5000/api/chat/groupremove",
              {
                    chatID: selectedChat._id,
                    userID:userdat._id
                },
                config
            )

             userdat._id === user.data._id  ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
     
      setLoading(false);
        } catch (error)
        {
            
            
      }
    }

    const handleRename = async () => {
        if (!groupChatName)
        {
            return;
        }

        try
        {
            setRenameLoading(true)
              const config = {
                    headers: {
                    Authorization:`Bearer ${user.data.token}`
                    }
                }

            const data = await axios.put("http://localhost:5000/api/chat/rename", {
                chatID: selectedChat._id,
                chatName:groupChatName
          }, config)
            
            setSelectedChat(data)
            setFetchAgain(!fetchAgain);
            setRenameLoading(false)
        } catch (error)
        {
            console.log("rename error", error)
             toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
        }
        setGroupChatName("")
         console.log("goshman", fetchAgain)
    }

//search user
    const handleSearch = async (query) => {
         setSeacrh(query)
          if(!query){
       toast({
          title: 'please fill all the field.',
          
          status: "warning",
          duration: 5000,
         isClosable: true,
          position:"top-left"
             })
            
            return;
    }
    try
    {
      setLoading(true)
      
      const config = {
        headers: {
          Authorization:`Bearer ${user.data.token}`
        }
      }

      await axios.get(`http://localhost:5000/api/user?search=${search}`, config).then((res) => {
        console.log("i want to see this ", res.data)
        setLoading(false);
        setSeacrhResult(res.data)
      })
       
      
      
    } catch (error)
    {
       toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      
    }  
    }

// add user on the group chat
    const handleAddUser = async (userdat) => {
         if (selectedChat.users.find((el) => el._id === userdat._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user.data._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
        }
        
        try
        {
             const config = {
        headers: {
          Authorization:`Bearer ${user.data.token}`
        }
      }

            const { data } = await axios.put("http://localhost:5000/api/chat/addnew",
                {
                    chatID: selectedChat._id,
                    userID:userdat._id
                },
                config)
            
            setSelectedChat(data)
            setFetchAgain(!fetchAgain);
            setRenameLoading(false)

            
        } catch (error)
        {
        toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
       });
      setLoading(false);
        }
        
    }
  return (
     <>
      <IconButton  display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen}/>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                  <ModalHeader
                      display="flex"
                      justifyContent="center"
                      fontSize="35px"
                  >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
             {" "}
            </Text>
         
                  </ModalBody>
                  <Box  w="100%" display="flex" flexWrap="wrap" pb={3}>
                      {
                          selectedChat.users.map((data) => (
                              <SelectedUserCon
                                  key={data._id}
                                  user={data}
                                  handleDelete={()=> handleRemove(data)}

                              />
                          ))
                      }
                  </Box>
                  
                   <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
                <br/>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

                   {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResault?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}

          <ModalFooter>
            <Button onClick={() => handleRemove(user.data)} colorScheme="red">
              Leave Group
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModel