// components/Chatbot.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  autoOpen?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ autoOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Auto-open chatbot when component mounts (only if autoOpen is true)
  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Add bot response after a short delay
    setTimeout(() => {
      const isVersionQuery = inputValue.trim().toLowerCase() === 'version';
      const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

      const botMessage: Message = {
        id: Date.now() + 1,
        text: isVersionQuery
          ? `CISOtopia App Version: ${appVersion}`
          : 'Sorry, the chatbot is not currently available. Please try again later.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Chat Button */}
      <button
        data-role="chatbot_button"
        onClick={toggleChat}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#0254ec',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(2, 84, 236, 0.4)',
          zIndex: 998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease'
        }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M19.2928932,3.99989322 L20,4.707 L12.7068932,11.9998932 L20,19.2928932 L19.2928932,20 L11.9998932,12.7068932 L4.707,20 L3.99989322,19.2928932 L11.2928932,11.9998932 L3.99989322,4.707 L4.707,3.99989322 L11.9998932,11.2928932 L19.2928932,3.99989322 Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M20,2 C21.1045695,2 22,2.8954305 22,4 L22,16 C22,17.1045695 21.1045695,18 20,18 L6,18 L2,22 L2,4 C2,2.8954305 2.8954305,2 4,2 L20,2 Z M20,4 L4,4 L4,18.5857864 L5.58578644,17 L20,17 L20,4 Z M17,12 L17,13 L7,13 L7,12 L17,12 Z M17,8 L17,9 L7,9 L7,8 L17,8 Z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        data-role="chatbot_window"
        data-showing={isOpen ? 'showing' : 'not_showing'}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '450px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          zIndex: 999,
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          data-role="chatbot_header"
          style={{
            backgroundColor: '#0254ec',
            color: '#fff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M12,2 C13.1045695,2 14,2.8954305 14,4 C14,4.73977947 13.5978101,5.38489547 13.0010775,5.73219593 L13,6 L15,6 C16.1045695,6 17,6.8954305 17,8 L17,9 L18,9 C19.1045695,9 20,9.8954305 20,11 L20,13 C20,14.1045695 19.1045695,15 18,15 L17,15 L17,17 C17,18.1045695 16.1045695,19 15,19 L13,19 L13,20 L15,20 L15,22 L9,22 L9,20 L11,20 L11,19 L9,19 C7.8954305,19 7,18.1045695 7,17 L7,15 L6,15 C4.8954305,15 4,14.1045695 4,13 L4,11 C4,9.8954305 4.8954305,9 6,9 L7,9 L7,8 C7,6.8954305 7.8954305,6 9,6 L11,6 L10.9989225,5.73219593 C10.4021899,5.38489547 10,4.73977947 10,4 C10,2.8954305 10.8954305,2 12,2 Z M15,8 L9,8 L9,17 L15,17 L15,8 Z M10,11 C10.5522847,11 11,11.4477153 11,12 C11,12.5522847 10.5522847,13 10,13 C9.44771525,13 9,12.5522847 9,12 C9,11.4477153 9.44771525,11 10,11 Z M14,11 C14.5522847,11 15,11.4477153 15,12 C15,12.5522847 14.5522847,13 14,13 C13.4477153,13 13,12.5522847 13,12 C13,11.4477153 13.4477153,11 14,11 Z" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '16px' }}>CISOtopia Assistant</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>AI-Powered Support</div>
          </div>
        </div>

        {/* Messages */}
        <div
          data-role="chatbot_messages"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: '#f8f9fa'
          }}
        >
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  backgroundColor: message.sender === 'user' ? '#0254ec' : '#fff',
                  color: message.sender === 'user' ? '#fff' : '#383838',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '12px 16px',
            borderTop: '1px solid #edebf2',
            display: 'flex',
            gap: '8px',
            backgroundColor: '#fff'
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1px solid #edebf2',
              borderRadius: '20px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: inputValue.trim() ? '#0254ec' : '#ccc',
              border: 'none',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M2.01,21 L23,12 L2.01,3 L2,10 L17,12 L2,14 L2.01,21 Z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
