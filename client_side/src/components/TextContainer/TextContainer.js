import React, {useRef, useState, useEffect} from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import "./TextContainer.css";

const TextContainer = ({users}) => {
    // return (
    //     <div className = "outertextContainer">
    //     {users.map((user, i)=>{
    //         return (
    //         <div key = {i} className = "textContainerUser backgroundRed">
    //             <p className = "textContainerText colorWhite">{user.name}</p>
    //         </div>
    //     )})}
    //     </div>
    // );
    const [spanElement, setspanElement] = useState('❱');

    const changeOpenElement = () => {
        // return ((spanElement === '❱')?'❰' : '❱');
        spanElement === '❱' ? setspanElement('❰') : setspanElement('❱');
        // spanElement === '❱ Show users in chat' ? setspanElement('❰ Hide users in chat') : setspanElement('❱ Show users in chat');
    }; 

    const usersContainerRef = useRef(null);
    
    const showUserSidebar = (event) => {
        const container = usersContainerRef.current;
        container.classList.toggle('is-open');
        changeOpenElement();
    };

    return (
        <>
        <div className = "outertextContainer" ref = {usersContainerRef}>
            <div  className = "usersInfo">
                <p className = "textContainerText colorWhite">Users in chat:</p>
            </div>
            {users.map((user, i)=>{
                return (
                <div key = {i} className = "textContainerUser">
                    <p className = "textContainerText colorWhite">{user.name}</p>
                </div>
            )})}
        </div>
        <div className = "openTextContainer" onClick = {(event) => showUserSidebar(event)}>
                <span className = "textContainerText"> {spanElement} </span>
        </div>
        </>
    );
};

export default TextContainer;