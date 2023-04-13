import React, {useContext} from 'react'
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
    Text
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import {ChatProvider} from "../../Context/ChatProvider"

const UserChatProfile = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log("for checking", props.user)
   
  return (
      <>
          {props.children ? (<span onClick={onOpen}>{props.children}</span>) : (<IconButton  onClick={onOpen} display={{ base: "flex" }} icon={<ViewIcon />} />)}
          
           <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                  <ModalHeader
                      fontSize="40px"
                      display="flex"
                      justifyContent="center"
                  >{props.user.name}</ModalHeader>
          <ModalCloseButton />
                  <ModalBody
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      justifyContent="space-between"
                  >
                      <Image
              borderRadius="full"
              boxSize="70px"
              src={props.user.pic}
              alt={props.user.name}
                      />
                      <Text
                          fontSize={{base:"28", md:"15px"}}
                      >
                          {props.user.email}
                      </Text>
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}

export default UserChatProfile