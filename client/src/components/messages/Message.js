import "./Message.css";
import React from "react";
const Message = (props) => {
  console.log(props);

  return (
    <div className={props.own ? "messageIsOwned message" : "message"}>
      <div className="messageTop">
        {!props.own && (
          <img
            src="https://via.placeholder.com/40"
            alt="userImage"
            className="messageImage"
          ></img>
        )}
        <p
          className={
            props.own ? "messageIsOwnedText messageText" : "messageText"
          }
        >
          {props.message.text}
        </p>
      </div>
      <div className="messageBottom">
        <p>
          {props.message.createdAt === props.message.updatedAt
            ? props.message.createdAt
            : props.message.updatedAt}
        </p>
      </div>
    </div>
  );
};

export default Message;
