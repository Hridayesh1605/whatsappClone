import React, { useState } from 'react'
import './App.css'
import Sidebar from './Component/Sidebar'
import Chat from './Component/Chat'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import { useStateValue } from './Stateprovider';


function App() {

  const [{user},dispatch] = useStateValue();
  return (
    <>


      <div className='app'>
      {!user?(
        <Login/>
      ):(
        <div className='app-body'>

          <Router>
          <Sidebar/>
          
            <Routes>
              
              <Route path="/rooms/:roomId" element={<Chat/>}/>
              
              
              <Route path="/">
              
              </Route>
            </Routes>
          </Router>


        </div>

      )}
        
      </div>


    </>
  )
}

export default App
