import "./Chat.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/messages/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
const Chat = () => {
  return (
    <div className="chatPage">
      <div className="chatMenu">
        <input
          placeholder="search for a friend!"
          className="chatMenuInput"
        ></input>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
      <div className="chatBox">
        <div className="chatBoxTop">
          <Message></Message>
          <Message own={true}></Message>
          <Message></Message>
          <Message></Message>
          <Message own={true}></Message>
          <Message></Message>
        </div>
        <div className="chatBoxBottom">
          <textarea
            placeholder="say hello!"
            className="chatMessageInput"
          ></textarea>
          <button className="chatSubmitButton">send</button>
        </div>
      </div>
      <div className="chatOnlineWrapper">
        <ChatOnline></ChatOnline>
      </div>
    </div>
  );
};

export default Chat;
