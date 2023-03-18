import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Usefetch = (url) => {
    const [chat, setChat] = useState([])
    const rendered = React.useRef(false)

    useEffect( () => {
        if (rendered.current === true)
        {
            axios.get(url).then((res) => {
            setChat(res.data)
            console.log("this is data", chat)
        }).catch((error) => {
            console.log(error)
        })
        }

        return () => {
            rendered.current = true
        }
        


        
    },[url])
   
    return {chat}
}

export default Usefetch