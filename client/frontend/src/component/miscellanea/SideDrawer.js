import React, { useState, useContext } from 'react'
import {Box} from "@chakra-ui/layout"
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
  useToast,
  Spinner 


} from '@chakra-ui/react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatProvider, ChatContext } from "../../Context/ChatProvider"
import ProfileModel from './ProfileModel';
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios"
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';


const SideDrawer = () => {
  const { user, chats, setChats,selectedChat, setSelectedChat } = useContext(ChatContext)
  console.log("hello user",user.data.token)
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

   const navigation = useNavigate()

    
    const onLogOut = () => {
      localStorage.removeItem("userInfor")
      navigation("/")
  }
   const toast = useToast()

  const handleSearch = async () => {
    if(!search){
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
        setSearchResult(res.data)
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

  const createSingleChat =async (userID) => {
    try
    {
      setLoadingChat(true)

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`
          
        }
      }

      const { data } = await axios.post(`http://localhost:5000/api/chat`, { userID }, config)
      
      console.log("this is the data i want to see", data)
      
      if (!chats.find((el) => el._id === user._id ))
      {
        setChats([data, ...chats])
        
      }
       setSelectedChat(data)
      setLoadingChat(false)
       onClose()
    } catch (error)
    {
       toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
       });
      
      console.log(error.message)
      
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#7DA097"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat">
          <Button onClick={onOpen} >
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
          
        </Tooltip>

        <Text fontSize="2xl">
          Aj Chat
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1}/>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size="sm" cursor="pointer" name={user.data.name } src={user.data.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                 <MenuItem>My Profile</MenuItem>
              </ProfileModel>
        
              <MenuDivider/>
              <MenuItem onClick={onLogOut}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
     
      </Box>
      <Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#E2E8F0" >
          <DrawerHeader > Search User</DrawerHeader> 
          <DrawerBody>
            <Box
              display="flex"
              pb={2}
            >
              <Input
                placeholder="Search By email or Name"
                mr={2}
                value={search}
                onChange={(e) =>  setSearch(e.target.value)}
              />
              
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {
              loading ? (<ChatLoading />) : (
                searchResult.map((props) => (
                  <UserListItem
                    key={props._id}
                    user={props}
                    handleFunction = {()=> createSingleChat(props._id)}
                  />
                ))
              )
            }
            {loadingChat && <Spinner  ml="auto" d="flex"/>}
          </DrawerBody>
        </DrawerContent>
        
      </Drawer>
    
    </>
  )
}

export default SideDrawer