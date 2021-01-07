import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons';
import {Avatar, IconButton} from "@material-ui/core";
import SidebarChat from './SidebarChat';
import axios from './axios';
import Pusher from 'pusher-js';
import { useStateValue } from './StateProvider';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    axios.get('/rooms/sync').then(res =>{
      console.log(res.data);
      setRooms(res.data);
    });
  },[]);

useEffect(()=>{
  const pusher = new Pusher('3465136c483220aa1a41', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('rooms');
  channel.bind('inserted', function(data) {
    setRooms([...rooms, data]);
  });

  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  }
}, [rooms]);

console.log(rooms);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                <SearchOutlined/>
                <input placeholder="Search a chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(roomname => (
                    <SidebarChat key={roomname._id} id={roomname._id} roomname={roomname.roomname} />
                ))}
            </div>
        </div>
    )
}


export default Sidebar
