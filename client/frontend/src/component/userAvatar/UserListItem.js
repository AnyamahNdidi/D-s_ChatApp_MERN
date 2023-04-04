import React from 'react'
import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";

const UserListItem = (props) => {
  return (
      <Box
          cursor="pointer"
          width="100%"
          display="flex"
          color="black"
          _hover={{
              background: "#307966",
              color: "white",
          }}
           px={3}
            py={2}
            mb={2}
            borderRadius="lg"
          alignItems="center"
          onClick={props.handleFunction}
      >
          <Avatar
            mr={2}
        size="sm"
        cursor="pointer"
        name={props.user.name}
        src={props.user.pic}
          />

           <Box>
        <Text>{props.user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {props.user.email}
        </Text>
      </Box>
          
      </Box>
  )
}

export default UserListItem