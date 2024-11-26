import React, { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "./chat.css";
import {
  FaRocketchat,
  FaPowerOff,
  FaUserCog,
  FaPaperclip,
  FaBug,
} from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";

// import Avatar from "../../components/Avatar";
import DataContext from "../context/DataContext";
import { unionBy } from "lodash";
import api from "../api/api";
import Contact from "../pages/Contact";
import { Link } from "react-router-dom";

const Chat = () => {
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedContact, setSelectedContact] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [messages, setMessages] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { username, id, handleLogout, ws, setWs, fetchProfile } =
    useContext(DataContext);
  const messageBoxRef = useRef();

  console.log(import.meta.env.VITE_SERVICE);

  function connectToWS() {
    const ws = new WebSocket(import.meta.env.VITE_SERVICE);
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnected, trying to reconnect...");
        connectToWS();
        console.log("back to online");
      }, 1000);
    });
  }

  const savePicture = async () => {
    try {
      // Handle Image upload
      let imageURL;
      if (
        attachment &&
        (attachment.type === "image/jpeg" ||
          attachment.type === "image/jpg" ||
          attachment.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", attachment);
        image.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        image.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        // First save image to cloudinary
        const response = await fetch(`${import.meta.env.VITE_URL}`, {
          method: "post",
          body: image,
        });
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        return imageURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  function showOnlinePeople(data) {
    const people = {};
    data.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  function handleMessage(e) {
    const messageData = JSON.parse(e.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      setMessages((prev) => [...prev, { ...messageData }]);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (attachment === null && newMessageText === "") {
      toast.warning("please add data to send");
    } else {
      let file = null;
      if (attachment) {
        file = await savePicture(attachment);
      }
      ws.send(
        JSON.stringify({
          recipient: selectedContact,
          text: newMessageText,
          file,
        })
      );
      setMessages((prev) => [
        ...prev,
        {
          text: newMessageText,
          file,
          sender: id,
          recipient: selectedContact,
          _id: Date.now(),
        },
      ]);
      setNewMessageText("");
      setAttachment(null);
    }
  }

  useEffect(() => {
    const div = messageBoxRef.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetchMessages = async () => {
    if (selectedContact) {
      const response = await api.get(`/api/messages/${selectedContact}`);
      setMessages(response.data);
    }
  };

  const fetchOfflinePeople = async () => {
    const response = await api.get("/api/users/people");
    const offlinePeopleArr = response.data
      .filter((p) => p._id !== id)
      .filter((p) => !Object.keys(onlinePeople).includes(p._id));
    const offlinePeople = {};
    offlinePeopleArr.forEach((p) => {
      offlinePeople[p._id] = p;
    });
    setOfflinePeople(offlinePeople);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedContact]);

  useEffect(() => {
    fetchProfile();
    connectToWS();
  }, []);

  useEffect(() => {
    fetchOfflinePeople();
  }, [onlinePeople]);

  const messageWithoutDuplicate = unionBy(messages, "_id");

  return (
    <section className='d-flex bg-primary'>
      <div className={`contact p-2 ${toggle && "active"}`}>
        <div className=' text-white d-flex flex-column gap-3'>
          <div className='app__name'>
            <FaRocketchat /> ChatBuddy
          </div>
          <div className='text-center'>welcome {username} !!!</div>
          {Object.keys(onlinePeople).map((userId) => {
            if (onlinePeople[userId] !== username) {
              return (
                <Contact
                  userId={userId}
                  selectedContact={selectedContact}
                  setSelectedContact={setSelectedContact}
                  username={onlinePeople[userId]}
                  key={userId}
                  online={true}
                />
              );
            }
          })}
          {Object.keys(offlinePeople).map((userId) => {
            return (
              <Contact
                userId={userId}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                username={offlinePeople[userId].username}
                key={userId}
                online={false}
              />
            );
          })}
        </div>
        <div className='control d-flex text-white p-2 justify-content-between'>
          <Link
            to={"/profile"}
            className='btn__control'
          >
            <FaUserCog />
          </Link>
          <Link
            to={"/supportdev"}
            className='btn__control'
          >
            <BiSolidDonateHeart />
          </Link>
          <Link
            to={"/reportbug"}
            className='btn__control'
          >
            <FaBug />
          </Link>
          <button
            className='btn__control'
            onClick={handleLogout}
          >
            <FaPowerOff />
          </button>
        </div>
        <div
          className={`toggle ${!toggle && "active"}`}
          onClick={() => setToggle(!toggle)}
        >
          <span></span>
        </div>
      </div>
      <div className='message__area'>
        <div className='messages rounded'>
          {!selectedContact && (
            <div className='no__contact h-100 d-flex align-items-center justify-content-center'>
              No Contact Selected
            </div>
          )}
          {!!selectedContact &&
            messageWithoutDuplicate.map((message) => (
              <div
                className={`${message.sender === id ? "text-end" : ""}`}
                key={message._id}
              >
                <div
                  className={`${
                    message.sender === id ? "sendMsg" : "receivedMsg"
                  }`}
                >
                  {message.text}
                  {message.file && (
                    <div className='message__img'>
                      <a
                        href={message.file}
                        target='_blank'
                      >
                        <img
                          src={message.file}
                          alt='...'
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          <div ref={messageBoxRef}></div>
        </div>
        {!!selectedContact && (
          <form
            className='message__send d-flex gap-2'
            onSubmit={sendMessage}
          >
            <input
              type='text'
              className='form-control message__input'
              placeholder='Enter Message Here'
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
            />
            <label className='btn btn-secondary text-white'>
              <input
                type='file'
                className='d-none'
                multiple={false}
                accept='image/*'
                onChange={(e) => setAttachment(e.target.files[0])}
              />
              <FaPaperclip />
            </label>
            <button
              type='submit'
              className='btn btn-success'
            >
              send
            </button>
          </form>
        )}
      </div>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </section>
  );
};

export default Chat;