import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {
    Container,
    Box,
    Input,
    Text,
    TagLabel,
    VStack,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
  InputRightElement,
     useToast
} from "@chakra-ui/react"

const Login = () => {
      const [show, setShow] = useState(false)
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
      const navigation = useNavigate()
      const toast = useToast()
    
     const handleClick = () => {
        setShow(!show)
  }
  
    const submitHandler = async () => {
        setLoading(false);
        if ( !email || !password )
        {
             toast({
          title: 'please fill all the field.',
          description: "warnings",
          status: 'success',
          duration: 9000,
          isClosable: true,
             })
            
            return;
        }
        if (password !== password )
        {
             toast({
          title: 'password did not match.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
             })
            
            return;
        }

        try
        {
            const config = {
                headers: {
                    "content-type": "application/json"
                }
            }

            const { data } = await axios.post(`http://localhost:5000/api/user/login`, { email, password, }, config)
               toast({
          title: 'registration sucessful.',
          status: 'success',
          duration: 9000,
          isClosable: true,
               })
            localStorage.setItem("userInfor", JSON.stringify(data))
            setLoading(false);
             navigation("/chat")
            
        } catch (error)
        {
              toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
            
        }

    }
  return (
     <VStack spacing='10px'>
         
          <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                  placeholder='please enter your email'
                  onChange={(e)=>setEmail(e.target.value)}
              />
          </FormControl>
          <FormControl id="password" isRequired>
              <FormLabel>password</FormLabel>
              <InputGroup>
                    <Input
                  type={
                      show ? "text" : "password"
                  }
                  placeholder='password'
                  onChange={(e)=> setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                                </Button>
                  </InputRightElement>
              </InputGroup>
            
          </FormControl>
          

           <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        
      >
    Log In
      </Button>
           <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        
      >
get User credential
      </Button>
</VStack>
  )
}

export default Login