
import React, { createContext, useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export const ChatContext = createContext()


export const ChatProvider = ({ children }) => {
    
    const [user, setUser] = React.useState()
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
        user, setUser
    }}>{children}</ChatContext.Provider>)
}


