import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Chatpage from './pages/Chatpage'
import "./App.css"
import {ChatContext} from "./Context/ChatProvider"


const App = () => {
  const {setFetchAgain,fetchAgain} = React.useContext(ChatContext)
    return (
      
        <div className='App'>
              <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/chat' element={<Chatpage/>}/>
            </Routes>
        </div>
          

       
        
  )
}

export default App