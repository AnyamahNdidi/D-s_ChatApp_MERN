import React, {useContext} from 'react'
import "./style.css"
import axios from 'axios'
import Usefetch from '../component/Usefetch'
import "./style.css"
import { ChatContext} from "../Context/ChatProvider"
import { Box } from "@chakra-ui/react";
import SideDrawer from '../component/miscellanea/SideDrawer'
import ChatBox from '../component/ChatBox'
import Mychat from '../component/Mychat'
const Chatpage = () => {

  const { data } = Usefetch("http://localhost:5000/api/chats")
  const {user,setFetchAgain,fetchAgain} = useContext(ChatContext)
    
  return (
    <div style={{ width: "100%", }}>
      {user && <SideDrawer />}
    
      <Box
       display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px"
       
      >
          {user && <Mychat fetchAgain={fetchAgain}/>}
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      
       
      </Box> 
      </div>
  )
}

export default Chatpage