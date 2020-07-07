import React, {useRef} from "react";
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

    const usersContainerRef = useRef(null);

    const showUserSidebar = (event) => {
        const container = usersContainerRef.current;
        container.classList.toggle('is-open');
    };

    return (
        <>
        <div className = "outertextContainer" ref = {usersContainerRef}>
        {users.map((user, i)=>{
            return (
            <div key = {i} className = "textContainerUser backgroundRed">
                <p className = "textContainerText colorWhite">{user.name}</p>
            </div>
        )})}
        </div>
        <div className = "openTextContainer" onClick = {(event) => showUserSidebar(event)}>
                <span className = "textContainerText"> ❯ </span>
        </div>
        </>
    );
};

export default TextContainer;