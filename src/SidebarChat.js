import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import axios from './axios'
import {useParams} from "react-router-dom";
import { Link } from 'react-router-dom';


function SidebarChat({roomname, id, addNewChat}) {
    const[lastmessage, SetLastMessage] = useState('');
    const {roomId} =useParams();

    useEffect(()=> { 
        if(id) {   
            axios.get(`/rooms/${id}/messages/sync`).then(res =>{
            const lmessage= res.data;
            console.log("normal" ,lmessage.length);
            const l = lmessage.length; 
            if(l > 0){           
                SetLastMessage(
                 lmessage[l-1].message
                )}
        })
    }
    },[id])

    const createChat =() => {
        const roomName =prompt("please enter name for chat");

    if(roomName) {
            //some claever stuff
            axios.post('/rooms/new' , {
                roomname : roomName,

            });
        } 
    };

    return !addNewChat ?(
        <Link to= {`/rooms/${id}`}>
        <div className="sidebarchat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
            <div className="sidebarchat_info">
                <h2>{roomname}</h2>
                <p>{lastmessage}</p>
            </div>            
        </div>
        </Link>
    ): (
        <div onClick={createChat}
        className="sidebarchat">
            <h3>Start a new chat</h3>
        </div>
    );
}

export default SidebarChat
