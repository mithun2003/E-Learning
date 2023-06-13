import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TextField,
  Box,
  InputAdornment
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import SendIcon from "@mui/icons-material/Send";
import { baseUrl, wsUrl } from "../../constants/baseUrl";

const Chat = () => {
  const [open, setOpen] = useState(false);
  // State variables
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketOpen, setSocketOpen] = useState(false);
  const [socket, setSocket] = useState(false);

  // Fetch course data from the API when the component mounts
  useEffect(() => {
    axios
      .get(`/course/course-detail/${id}`)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
        setRoomName(response.data.course?.title);
      })
      .catch((error) => console.log(error));
    console.log(course);
  }, [id]);



  // Fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/chat/?room_name=${roomName}`);
      const { success, messages: message } = response.data;

      if (success) {
        setMessages(message);
        console.log(message);
      } else {
        console.log("Error: ", response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  useEffect(() => {
    if (roomName) {
      const room_id = course.course?.chat_room
      console.log(room_id)
      const newSocket = new WebSocket(`${wsUrl}/ws/chat/${room_id}/`);
      console.log(newSocket)
      newSocket.onopen = (event) => {
        console.log('WebSocket connection opened');
        setSocketOpen(true);
        fetchMessages();
      };
  
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data.message]);
      };
  
      newSocket.onclose = (event) => {
        console.log('WebSocket connection closed',event);
        setSocketOpen(false);
      };
  
      setSocket(newSocket);
  
      return () => {
        newSocket.close();
      };
    }
  }, [roomName]);
  


  const sendMessage = (senderId, message) => {
    const messageObject = {
      sender_id: senderId,
      message: message,
      room_name: roomName,
    };
  
    socket.send(JSON.stringify(messageObject));
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSend = () => {
    if (newMessage.trim() !== "") {
      sendMessage(user.id, newMessage);
    }
    setNewMessage("");
  };
  const buttonStyle = {
    marginBottom: "16px",
    borderRadius:'50%',
    width:'4vw',
    height:'7vh'

  };

  return (
    <div>
      <Button variant="contained" color="primary" style={buttonStyle}>
        {open ? (
          <IconButton onClick={handleClose} style={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleClickOpen} style={{ color: "white" }}>
            <ChatBubbleIcon />
          </IconButton>
        )}
      </Button>

      <Dialog
        open={open}
        PaperProps={{ style: { width: "50vw", height: "100vh" } }}
      >
        <DialogTitle>Chat - {course.course?.title}</DialogTitle>
        <DialogContent>
          <div style={{ maxHeight: "calc(100% - 136px)", overflowY: "scroll" }}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender.name === user.name ? "flex-end" : "flex-start",
                  marginBottom: "4px"
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      msg.sender.name === user.name ? "#e2e2e2" : "#f0f0f0",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    maxWidth: "55%"
                  }}
                >
                  {msg.sender.name === user.name ? (
                    <>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "4vh", fontWeight: "bold" }}>
                          {msg.sender.name}
                        </div>
                        <div>
                          <img
                            src={`${baseUrl}${msg.sender.image}`}
                            alt="Sender"
                            style={{
                              borderRadius: "50%",
                              height: "3rem",
                              width: "3rem"
                            }}
                          />
                        </div>
                      </div>
                      <div>{msg.message}</div>
                      <div>
                        {new Date(msg.time).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row-reverse",
                          justifyContent: 'space-between',
                        
                        }}
                      >
                        <div style={{ marginLeft: "3vh", fontWeight: "bold" }}>
                          {msg.sender.name}
                        </div>
                        <div>
                          <img
                            src={`${baseUrl}${msg.sender.image}`}
                            alt="Sender"
                            style={{
                              borderRadius: "50%",
                              height: "3rem",
                              width: "3rem"
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>{msg.message}</div>
                        <div>
                          {new Date(msg.time).toLocaleString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </div>
          <TextField
            variant="outlined"
            label="Type your message"
            fullWidth
            style={{ marginTop: "16px" }}
            value={newMessage}
            onChange={handleInputChange}
            sx={{
              position: "sticky",
              top: "77vh"
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Chat;
