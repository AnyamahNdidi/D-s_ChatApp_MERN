import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Usefetch = (url, config) => {
    const [data, setData] = useState()
    const rendered = React.useRef(false)

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
                
    },[url])
   
    return {data}
}

export default Usefetch