
import React, { createContext, useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export const ChatContext = createContext()


export const ChatProvider = ({ children }) => {
    
    const [user, setUser] = React.useState()
    const [chats, setChats] = React.useState([])
    const [selectedChat, setSelectedChat] = React.useState()
    const [fetchAgain, setFetchAgain] = React.useState(false)
    const navigation= useNavigate()
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfor"))
        setUser(userInfo)

        if (!userInfo)
        {
            navigation("/")
        }
    },[navigation])
    
    return (<ChatContext.Provider value={{
        user, setUser, chats, setChats,selectedChat, setSelectedChat,setFetchAgain,fetchAgain
    }}>{children}</ChatContext.Provider>)
}


