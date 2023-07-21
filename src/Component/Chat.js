import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MicNoneIcon from '@mui/icons-material/MicNone';
import React, { useEffect, useState } from 'react'
import '../CSS/Chat.css'
import { Link, useParams } from 'react-router-dom';
import db from '../firebase';
import { serverTimestamp } from "firebase/firestore";
import { useStateValue } from '../Stateprovider';

function Chat() {

  const [input, setInput] = useState("");
  let {roomId} = useParams();

  const [room ,setRoom] = useState("");
  const [messages,setMsg] = useState([]);
  const [{user},dispatch] = useStateValue();

  useEffect(()=>{
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot=>(
        setRoom(snapshot.data().name)
  
      )
  
      )

      db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(
        setMsg(snapshot.docs.map((doc)=>doc.data()))

      ))

    }
   

  },[roomId])
 

  const inputChange = (event) => {
    setInput(event.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you Typed>>" + input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message:input,
      name:user.displayName,
      timestamp:serverTimestamp(),
      

    });
    // db.collection("rooms").doc(roomId).collection("messages").add({
    //   message: input,
    //   name: user.displayName,
    //   timestamp: serverTimestamp(),
    // });
    setInput("");

  }
  return (
    <>
      <div className='chat'>
        

          <div className='chat-header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor((Math.random()*500))}.svg`}/>
            <div className='chat-headerinfo'>
              <h3>{room}</h3>
              <p>Last seen ...{" "}
              
                {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
              
              </p>
            </div>
            <div className='chat-header-right'>


              <IconButton>
                <SearchIcon />
              </IconButton>

              <IconButton>
                <MoreVertIcon />
              </IconButton>

            </div>

          </div>


          


          <div className='chat-body'>
          {messages.map((message) => (
            <div className='chat-message'>


              <div className={`msg ${message.name==user.displayName && "chat-recive"}`}>
                <div className='avatar'>
                  <Avatar className='icon' src={`https://avatars.dicebear.com/api/human/${Math.floor((Math.random()*500))}.svg`}/>
                </div>

                <div className={`chat-name ${message.name==user.displayName && "nam"}`}>
                  <p className='rev'>{message.name}</p>
                </div>
                <p >{message.message}</p>
                <span>
                {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </div>
              </div>
          ))}

            



          </div>
          <div className='chat-footer'>
            <IconButton>
              <AddIcon />
            </IconButton>
            <form>
              <input type='text' placeholder='Type your msg' onChange={inputChange} value={input} />
              <button onClick={sendMessage} type='submit'>Send</button>
            </form>
            <IconButton className='face'>
              <TagFacesIcon />
            </IconButton>

            <IconButton className='mic'>
              <MicNoneIcon />
            </IconButton>
          </div>
      </div>

    </>
  )
}

export default Chat
