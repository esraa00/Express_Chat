import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./conversation.css";
import { fetchUserRoute } from "../../utils/RestAPIRoutes";

const Conversation = ({ conversation }) => {
  const { name, id } = useSelector((state) => state.userSlice);
  const [reciever, setReciever] = useState({});

  useEffect(() => {
    const recieverId = conversation.members.find((userId) => userId !== id);
    console.log(recieverId);
    const getSenderDetails = async () => {
      try {
        const reciever = await axios.get(`${fetchUserRoute}/${recieverId}`, {
          withCredentials: true,
          credentials: "include",
        });
        setReciever({ ...reciever.data });
      } catch (error) {
        console.log("error in getSenderDetails");
        console.log(error);
      }
    };
    getSenderDetails();
  }, [conversation.members, id]);

  return (
    <div className="conversation">
      <img
        src="https://via.placeholder.com/40"
        alt="userPhoto"
        className="conversationImage"
      ></img>
      <span className="conversationName">{reciever.username}</span>
    </div>
  );
};

export default Conversation;
