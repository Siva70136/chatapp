import React, { useState, useEffect } from 'react';
import { connect, sendMessage, onMessage } from '../../services/webSocketService';
import Cookies from 'js-cookie';
import './index.css';

const ChatUi = ({ token }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = Cookies.get('user');
  useEffect(() => {
    //console.log(token);
    if (token) {
      connect(token);

      onMessage((msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [token]);

  //console.log(messages);
  const handleSend = () => {
    if (message.trim() === '') return;

    const msg = {
      text: message,
      timestamp: new Date(),
      username: user,
    };
    sendMessage(msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessage('');
  };

  return (
    <div className='chat-app-container'>
      <div className='chat-container'>
        <div className='messages'>
          {messages.length !== 0 && <div id="chat">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${index % 2 === 0 ? 'message1' : 'message2'}`}>
                {msg.username} {new Date(msg.timestamp).toLocaleTimeString()}: {msg.text}
              </div>
            ))}
          </div>}
        </div>
        <div className='message-input'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter Message'
            className='input form-control'
          />
          <div>
            <button type='button' onClick={handleSend} className='button'>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
