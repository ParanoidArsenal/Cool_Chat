import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import "./TextContainer.css";

const TextContainer = ({users}) => {
    // console.log(users);
    // console.log("- current users");
    return (
        // <ScrollToBottom className="textContainer">
        <div className = "outertextContainer">
        {users.map((user, i)=>{
            return (
            <div key = {i} className = "textContainerUser backgroundRed">
                <p className = "textContainerText colorWhite">{user.name}</p>
            </div>
        )})}
        </div>
    // </ScrollToBottom>
    );
};

export default TextContainer;