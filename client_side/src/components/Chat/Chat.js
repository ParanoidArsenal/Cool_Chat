import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import "./Chat.css"
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    // const ENDPOINT = 'localhost:5000';
    const ENDPOINT = 'https://git.heroku.com/cool-chat-react-express-app.git';
    const [users, setUsers] = useState([]); //current users in chats

    useEffect(()=>{
        const {name='', room=''} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        
        socket = io(ENDPOINT);

        socket.emit('join', { name, room }, (data)=>console.log(data))

        return () =>{
            socket.emit('disconnect');
            socket.off();
        };

    }, [ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
        console.log(`updating current array of messages!`);
     }, [messages]);

     useEffect(()=>{
        socket.on('roomData', (roomData) => {
            // console.log(roomData.room);
            // console.log(` - room`);
            // console.log(room);
            // console.log(` - room`);
            if(room == roomData.room){
                setUsers(roomData.users);
                console.log("rooms are equal!");
            }
        });
        console.log(users);
        // console.log(`updating users state!`);

     }, [users, room]);


    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        };
    };

    console.log({message, messages});

    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room = {room}/>
                <Messages messages = {messages} name = {name}/>
                <Input message = {message} setMessage = {setMessage}  sendMessage = {sendMessage} />
            </div>
            <TextContainer users = {users} />
        </div>
    );
};

export default Chat;