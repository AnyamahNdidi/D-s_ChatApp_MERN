import React,{useEffect} from 'react'
import "./style.css"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Container, Box, Text,Tab, Tabs, TabList, TabPanels,TabPanel} from '@chakra-ui/react'
import Login from '../component/Authetication/Login'
import SignUp from '../component/Authetication/SignUp'
import {useNavigate} from "react-router-dom"

const Home = () => {

      const navigation= useNavigate()
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfor"))
        if (!userInfo)
        {
            navigation("/")
        }
    }, [navigation])
    
  return (
      <Container maxW='xl' centerContent>
          <Box
               d="flex"
              bg={"whitesmoke"}
              p={3}
              justifyContent="center"
              w="100%"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
             
          >
              <Text fontSize="1xl" fontFamily="Work sans">ajChat</Text>
          </Box>
          <Box bg="white" width="100%" p={3} borderRadius="lg" borderWidth="1px">
                                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab width="50%">Log In</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Login/>
                        </TabPanel>
                        <TabPanel>
                        <SignUp/>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
          </Box>
      </Container>
  )
}

export default Home