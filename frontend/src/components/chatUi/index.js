import React, { useState, useEffect } from 'react';
import { connect, sendMessage, onMessage } from '../../services/webSocketService';
import Cookies from 'js-cookie';

const ChatUi = ({token}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = Cookies.get('user');
  useEffect(() => {
    console.log(token);
    if (token) {
      connect(token);

      onMessage((msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [token]);

  console.log(messages);
  const handleSend = () => {
    if (message.trim() === '') return;

    const msg = {
      text: message,
      timestamp: new Date(),
      username: user,
    };
    
    sendMessage(msg);
    setMessage('');
  };

  return (
    <div>
      {messages.length !== 0 && <div id="chat">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.username} {new Date(msg.timestamp).toLocaleTimeString()}: {msg.text}
          </div>
        ))}
      </div>}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatUi;
