import React from "react";
/* import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth"; */
import { useAuth } from "../../context/AuthContext";
import "./style.css";
const Message = ({ message }) => {
  //const [user] = useAuthState(auth);
  // console.log(message.avatar);
  const { currentUser } = useAuth();
  return (
    <div
      className={`chat-bubble ${
        message.name === currentUser.email ? "right" : ""
      }`}
    >
      {/* <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      /> */}
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
