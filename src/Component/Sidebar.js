import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import '../CSS/Sidebar.css'
import SidebarChats from './SidebarChats';
import { useStateValue } from '../Stateprovider';
import db from '../firebase';

function Sidebar() {


    const[room,setRoom] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        const unsubscribe = db.collection("rooms").onSnapshot((querySnapshot)=>
            setRoom(querySnapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),

            })))
        );
        return () =>{
            unsubscribe();
        }

    },[])
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user.photoURL} />
                <div className='sidebar_right'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>

            <div className='sidebar_search'>
                <SearchIcon />
                <div className='search'>
                <input type='text' placeholder='Search For Chats' />

                </div>
                

            </div>

            <div className='sidebar_chats'>
            <SidebarChats addNewChat/>
            {room.map((room)=>{
                return <SidebarChats key={room.id} id={room.id} name={room.data.name}/>
            })}

            </div>

        </div>
    )
}

export default Sidebar
