'use client';
import React, { useState, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'BullDawg-Wiser', text: 'Hi, how can I help you today?' },
    { sender: 'User', text: 'whatup' },
    { sender: 'BullDawg-Wiser', text: 'Sorry, I couldn\'t find any information in the documentation about that.' },
  ]);

  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  }

  const handleSendMessage = (e) => {    // must handle with api and include the file
    e.preventDefault();
    if (inputText.trim()) {
      const newMessages = [...messages, { sender: 'User', text: inputText }];
      setMessages(newMessages);
      setInputText('');
    }
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium">
      {/* Button to toggle chat window */}
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen} // Update aria-expanded based on state
        onClick={toggleChatWindow}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
        </svg>
      </button>

      <div
        className={`fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
      >
        {/* Heading */}
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
        </div>

        {/* Chat Container */}
        <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
          {messages.map((message, index) => (
            <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className={`rounded-full bg-gray-100 border p-1 ml-0  ${message.sender === 'BullDawg-Wiser' ? 'text-black' : ''}`}>
                  <svg stroke="none" fill="black" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d={message.sender === 'BullDawg-Wiser' 
                      ? 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z' 
                      : 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'}></path>
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed">
                <span className="block font-bold text-gray-700 text-left">{message.sender === 'BullDawg-Wiser' ? 'BullDawg-Wiser' : 'You'} </span>
                <span className="block text-left font-normal">{message.text}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-6">
          <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSendMessage}>
          <div className="relative w-full">
            <div>
              <input type="file" ref={inputRef} hidden onChange={handleFileChange}/>
              <button 
                type="button" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                onClick={() => inputRef.current?.click()}
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/>
              </svg>
              </button>
            </div>
            <div className="relative">
            {selectedFile && (
              <div className="absolute left-10 bottom-1/4 transform -translate-y-1/2 flex items-center bg-gray-200 text-gray-700 rounded-full px-2 py-1">
                <span className="text-xs mr-2">{selectedFile.name}</span>
                <button 
                  type="button" 
                  onClick={handleFileRemove} 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  &#x2715; {/* "X" icon */}
                </button>
              </div>
            )}    
            </div>
            <input
              className="pl-10 h-10 w-full rounded-md border border-[#e5e7eb] text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>

            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
