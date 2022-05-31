import "./Chat.css";
import { useEffect, useState, useRef } from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/messages/Message";
import { useSelector } from "react-redux";
import {
  getConversationRoute,
  getMessagesRoute,
  postNewMessageRoute,
  findSearchedUser,
  createNewConversation,
} from "../../utils/RestAPIRoutes";
import axios from "axios";
import io from "socket.io-client";
import SearchResult from "../../components/searchResult/SearchResult";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const socket = useRef();

  const { name, id } = useSelector((state) => state.userSlice);

  useEffect(() => {
    openSocketConnection();
  }, [id]);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.senderId) &&
      setMessages((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  console.log(arrivalMessage);
  useEffect(() => {
    getConversations();
  }, [id]);

  useEffect(() => {
    getMessages();
  }, [currentConversation]);

  const handleMessageChange = (event) => {
    const { value } = event.target;
    setNewMessage(value);
  };

  const findRecieverId = () => {
    return currentConversation.members.find((member) => member !== id);
  };

  const openSocketConnection = () => {
    //save the socket in the socket state
    socket.current = io("http://localhost:5000", {
      withCredentials: true,
      credentials: "include",
    });
    socket.current.on("connect", () => {
      console.log("socket is connected");
    });
    //emit an event to save the user in database
    socket.current.emit("addUser", id);
    // assign an event handler to the socket when the user recieve message
    socket.current.on("message", ({ senderId, text }) => {
      setArrivalMessage({
        senderId,
        text,
        createdAt: Date.now(),
      });
      console.log("recieved");
    });
  };

  console.log(currentConversation);

  const getConversations = async () => {
    try {
      const res = await axios.get(`${getConversationRoute}/${id}`, {
        withCredentials: true,
        credentials: "include",
      });
      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `${getMessagesRoute}/${currentConversation?._id}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(socket.current);
  const handleMessageSubmit = async () => {
    try {
      const message = {
        senderId: id,
        text: newMessage,
        conversationId: currentConversation._id,
      };
      const res = await axios.post(`${postNewMessageRoute}`, message, {
        withCredentials: true,
        credentials: "include",
      });
      setMessages([...messages, res.data]);
      socket.current.emit("message", {
        senderId: id,
        text: newMessage,
        recieverId: findRecieverId(),
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleClickingSearchResult = async (recieverId, senderId) => {
    await axios
      .post(
        `${createNewConversation}`,
        { recieverId, senderId },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const handleSearchSubmit = async (event) => {
    const { data } = await axios.get(`${findSearchedUser}/${search}`, {
      withCredentials: true,
      credentials: "include",
    });
    setSearchResult(data);
  };

  return (
    <div className="chatPage">
      <div className="chatMenu">
        <div className="chatMenuSearchBar">
          <input
            placeholder="search for a friend!"
            className="chatMenuInput"
            value={search}
            onChange={handleSearchChange}
          ></input>
          <button className="chatMenuSearchButton" onClick={handleSearchSubmit}>
            search
          </button>
        </div>

        {searchResult && (
          <div>
            <SearchResult
              searchResult={searchResult.username}
              click={() => {
                handleClickingSearchResult(searchResult._id, id);
              }}
            ></SearchResult>
          </div>
        )}

        {conversations.map((conversation) => (
          <div
            onClick={() => {
              setCurrentConversation(conversation);
            }}
          >
            <Conversation conversation={conversation}></Conversation>
          </div>
        ))}
      </div>
      <div className="chatBox">
        {currentConversation ? (
          <>
            <div className="chatBoxTop">
              {messages.map((message) => (
                <Message
                  message={message}
                  own={message.senderId === id ? true : false}
                ></Message>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="say hello!"
                className="chatMessageInput"
                value={newMessage}
                onChange={handleMessageChange}
              ></textarea>
              <button
                className="chatSubmitButton"
                onClick={handleMessageSubmit}
              >
                send
              </button>
            </div>
          </>
        ) : (
          <span>find someone to chat</span>
        )}
      </div>
      <div className="chatOnlineWrapper">{/* <ChatOnline></ChatOnline> */}</div>
    </div>
  );
};

export default Chat;
