import React,{useContext} from 'react'
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatContext } from "../../Context/ChatProvider"
import axios from "axios"
import SelectedUserCon from "../userAvatar/SelectedUserCon"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Lorem,
  useToast,
  FormControl,
  Input,
  Box
} from '@chakra-ui/react'
import UserListItem from '../userAvatar/UserListItem';


const GroupChatModel = (props) => {

  const [groupChatName, setGroupChatName] = React.useState()
  const [selectGroupName, setSelectGroupName] = React.useState([])
   const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [search, setSearch] = React.useState("")
  const [searchResult, setSearchResult] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const toast = useToast()

  const {user, chats, setChats} = useContext(ChatContext)

  const { isOpen, onOpen, onClose } = useDisclosure()


    const onHandleGroup = (userAdded) => {
    if (selectedUsers.includes(userAdded)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userAdded])

  
    
  }
    // console.log("user that need to be added to the gruoup chat", selectedUsers)
  
  const removeSelected = (selectId) => {
    setSelectedUsers((previouseSelected) => {
      const userReturn= previouseSelected.filter((el) => el._id !== selectId)
      return userReturn
     })
  }

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query)
    {
      return
    }

    try
    {
      setLoading(true)

      const config = {
          headers: {
              Authorization:`Bearer ${user.data.token}`
            }
      }
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config)
      console.log(data)
      setLoading(false);
      setSearchResult(data);
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

  const handleSubmit = async () => {

    if (!groupChatName || !selectedUsers)
    {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
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
      const { data } = await axios.post(
        `http://localhost:5000/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user )=> user._id)),
        },
        config
      );
      
      setChats([data, ...chats])
       onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      
    } catch (error)
    {
        toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }


  return (
      <>
      <span onClick={onOpen}>{props.children} </span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            
            fontSize="35px"
      
            display="flex"
            justifyContent="center"
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center" 
          >
           
            <FormControl>
               <Input
                placeholder="Chat user"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value) }
            />
            </FormControl>
            <FormControl>
               <Input
               placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)} 
            />
            </FormControl>

            <Box w="100%" display="flex" flexWrap="wrap">
              
             { selectedUsers.map((props) =>(
              <div>
                 <SelectedUserCon
                  key={props._id}
                   user={props}
                   handleDelete = {() => removeSelected(props._id)}
                 />
              </div>
              ))}
            
            </Box>
            {
              loading ? (<div>loading....</div>) : 
                (<>
                {  searchResult?.slice(0,4).map((props) => (
                  <UserListItem
                     key={props._id}
                    user={props}
                    handleFunction={() => onHandleGroup(props)}
                  />
                  ))}
                </>)
            }
          
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Create Chat
            </Button>
         
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModel

  // <Lorem count={2} />