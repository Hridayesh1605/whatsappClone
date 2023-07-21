import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import "../CSS/SidebarChats.css"
import db from '../firebase';
import { Link, useParams } from 'react-router-dom';



function SidebarChats({id,name,addNewChat}) {

    const [link,setLink] = useState("");
    const [messages, setMessages] = useState("");
    // let {roomId} = useParams;


    useEffect(() => {
        if (id) {
          db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
      }, [id]);

    useEffect(()=>{
        setLink(Math.floor((Math.random()*500))) //generate
    },[])


    const addChat = () =>{
        const creatChat = prompt("Name Your Chat")

        if(creatChat){
            db.collection("rooms").add({
                name:creatChat
            })
            
        }
    }
    return (
        

        
            !addNewChat ? (
                <Link to={`/rooms/${id}`} >
            <div className='sidebarchats'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${link}.svg`} />
                <div className='chat_info'>

                    <h1>{name}</h1>
                    <p>{messages[0]?.message}</p>
                </div>

            </div>
            </Link>
            ):<div className='add' onClick={addChat}>
                <h1>Add New Chat</h1>
            </div>
        
            


        
    )
}

export default SidebarChats
