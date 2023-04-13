import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ChatContext } from "../Context/ChatProvider"

const Usefetch = (url, config) => {
    const [data, setData] = useState()
    const rendered = React.useRef(false)
    const {user,setFetchAgain,fetchAgain} = React.useContext(ChatContext)

    useEffect(() => {
            axios.get(url,config).then((res) => {
            setData(res.data)
            console.log("this is data", data)
        }).catch((error) => {
            console.log(error)
        })
       
        // return () => {
        //     rendered.current = true
        // }
                
    },[url,fetchAgain])
   
    return {data}
}

export default Usefetch