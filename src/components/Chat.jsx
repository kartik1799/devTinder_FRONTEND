import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, createSocketConnection } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const fetchChat = async () => {
    try {
      const chat = await axios.get(BASE_URL + `/chat/${id}`, {
        withCredentials: true,
      });

      console.log(chat);

      const chatMessages = chat?.data[0]?.messages.map((i) => {
        return {
          firstName: i.senderId.firstName,
          photoUrl: i.senderId.photoUrl,
          text: i.text,
          createdAt: i.createdAt,
          userId: i.senderId._id,
        };
      });

      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { firstName: user?.firstName, userId, id });

    socket.on(
      "messageReceived",
      ({ firstName, photoUrl, userId, text, createdAt }) => {
        console.log(firstName + "send: " + text);
        setMessages((prev) => [
          ...prev,
          { firstName, photoUrl, userId, text, createdAt },
        ]);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      photoUrl:user?.photoUrl,
      id,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 h-[70vh] mx-auto border border-gray-600 p-4 m-4 flex flex-col">
      <h1 className="text-xl">Chat</h1>
      <div className="flex-1 border border-gray-600 p-2 mt-2 rounded-t-lg overflow-y-auto">
        {messages.map((message) => (
          <>
            {message.userId !== userId && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message?.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName}
                  <time className="text-xs opacity-50">
                    {" "}
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            )}
            {message.userId === userId && (
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={message.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.firstName}
                  <time className="text-xs opacity-50">
                    {" "}
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            )}
          </>
        ))}
      </div>
      <div className="flex justify-between border border-gray-600 p-2 rounded-b-lg">
        <input
          className="flex-1 mr-2 outline-none"
          placeholder="Enter your message"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-outline" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
