import React,{useState} from 'react'
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
const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setconfirmPassword] = useState()
    const [pix, setPix] = useState()
    const [picloading, setpicLoading] = useState(false)
    const navigation = useNavigate()
  

    const handleClick = () => {
        setShow(!show)
    }

    const toast = useToast()

    const postImageFile = (pics) => {
        setpicLoading(true)
        if (pics === undefined)
        {
        toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png")
        {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset", "ajchat")
            data.append("cloud_name", "ndtech")
            fetch("https://api.cloudinary.com/v1_1/ndtech/image/upload", {
                method: "post",
                body:data
            }).then((res) => res.json()).then((data) => {
               setPix(data.url.toString());
               console.log(data.url.toString());
                setpicLoading(false)
            }).catch((err) => {
                console.log(err)
                 setpicLoading(false)
            })
        } else
        {
              toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
        setpicLoading(false);
           return;
        }

    }
    const submitHandler = async () => {
        setpicLoading(false);
        if (!name || !email || !password || !confirmPassword)
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
        if (password !== confirmPassword)
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

            const { data } = await axios.post(`http://localhost:5000/api/user`, { name, email, password, pic:pix }, config)
               toast({
          title: 'registration sucessful.',
          status: 'success',
          duration: 9000,
          isClosable: true,
               })
            localStorage.setItem("userInfor", JSON.stringify(data))
            setpicLoading(false);
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
      setpicLoading(false);
            
        }

    }
  return (
   <VStack spacing='10px'>
          <FormControl id="first-name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                  placeholder='please enter your name'
                  onChange={(e)=> setName(e.target.value)}
              />
          </FormControl>
          <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                  placeholder='please enter your email'
                  onChange={(e)=> setEmail(e.target.value)}
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
          <FormControl id="password" isRequired>
              <FormLabel>confirm password</FormLabel>
              <InputGroup>
                    <Input
                  type={
                      show ? "text" : "password"
                  }
                  placeholder='confirm password'
                  onChange={(e)=> setconfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                                </Button>
                  </InputRightElement>
              </InputGroup>
            
          </FormControl>
          <FormControl id="pic" isRequired>
              <FormLabel>please upload your pix</FormLabel>
                    <Input
                  type="file"
                  accept="image/*"
                //    onChange={(e) => postDetails(e.target.files[0])}
                    onChange={(e) => postImageFile(e.target.files[0])}
                  />
                 
              
            
          </FormControl>

           <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading = {picloading}
        
      >
        Sign Up
      </Button>
</VStack>
  )
}

export default SignUp