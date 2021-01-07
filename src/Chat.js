import React, { useState,useEffect } from 'react'
import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import axios from './axios';
import {useParams} from "react-router-dom";
import Pusher from 'pusher-js';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input,setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [lastseen, setLastSeen]= useState();
    const {roomId} =useParams();
    const [roomName,setRoomName]= useState('');
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        axios.get(`/rooms/${roomId}/messages/sync`).then(res =>{
            console.log(res.data)
            setMessages(res.data);
            const lmt= res.data;
            console.log("normal" ,lmt.length);
            const lt = lmt.length; 
            if(lt > 0){ setLastSeen(lmt[lt-1].timestamp)}
        })
    },[roomId]);

    useEffect(()=>{
        if(roomId){
            axios.get('/rooms/sync').then(res =>{
                const data =res.data;
                console.log("data is here",data);
                //console.log(roomId);
                setRoomName( 
                    data.map(data=>{
                    if(data._id==roomId){
                         console.log(data._id)
                         return data.roomname
                    }
                })) 
            })
        }
    },[roomId])
    
    useEffect(()=>{
      const pusher = new Pusher('3465136c483220aa1a41', {
        cluster: 'ap2'
      });
    
      const channel = pusher.subscribe('messages');
      channel.bind('updated', function(data) {
        setMessages([...messages, data]);
      });
    
      return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
      }
    }, [messages]);
    
    console.log(messages);

    const sendMessage= async (e) => {
        e.preventDefault();

        await axios.post(`/rooms/${roomId}/messages/new`, {
            message:input,
            name: user?.displayName,
            recieved: false,
        });

        setInput("");
    };
    
    return (
        
        <div className="chat">
            <div className ="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat_headerinfo">
                    <h3>{roomName}</h3>
                    <p>last seen today at {lastseen}</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message)=>(
                    <p className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">{message.timestamp}</span>
                </p>
                ))}
                
            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange = {(e)=> setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Submit a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat
