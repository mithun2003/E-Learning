import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget-2';
import 'react-chat-widget-2/lib/styles.css';
import axios from '../../axios';
import { useParams } from 'react-router-dom';

const ChatWidget = () => {
    // State variables
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [course, setCourse] = useState([]);
  
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
    }, []);
  
    // Fetch messages when the course data changes
    useEffect(() => {
      console.log(course);
      fetchMessages();
    }, [course]);
  
    // Fetch messages from the API
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/chat/?room_name=${roomName}`);
        const { success, messages: message } = response.data;
  
        if (success) {
          setMessages(message);
          console.log(message);
  
          messages.forEach((msg) => {
            const { sender, message, time, senderImage } = msg;
            const image = `<img src="${senderImage}" alt="${sender}" className="avatar" />`;
            if (sender === user.name) {
              addUserMessage(message);
            } else {
                const formattedTime = new Date(time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Kolkata',
                  });
              addResponseMessage(
                `${sender}: 
              ${message}
              ${formattedTime}`);
         
            }
          });
        } else {
          console.log('Error: ', response.data.message);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
  
    // Send a new message
    const sendMessage = async (senderId, message) => {
      try {
        const response = await axios.post('/chat/', {
          room_name: roomName,
          sender_id: senderId,
          message: message,
        });
  
        const { success, message: responseMessage } = response.data;
  
        if (success) {
          console.log(responseMessage);
          setMessages((prevMessages) => [...prevMessages, responseMessage]);
        } else {
          console.log('Error: ', responseMessage);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
  
    return (
      <div>
    <Widget
  handleNewUserMessage={(newMessage) => {
    const senderId = user.id; // Replace with the actual sender ID
    sendMessage(senderId, newMessage);
  }}
  title="Group Chat"
  subtitle={`Room: ${roomName}`}
//   profileAvatar={
//     messages.map((msg) => {
//       if (msg.sender === user.name) {
//         return msg.senderImage
//       }
//       return null; // or provide a default avatar image
//     })
//   }
/>
      </div>
    );
  };
  
  export default ChatWidget;
  
