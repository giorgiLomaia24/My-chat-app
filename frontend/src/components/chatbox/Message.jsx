import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'

function Message({ message }) {
  const { authuser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === authuser?._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authuser?.profilePicture : selectedConversation?.profilePicture;
  const bubbleColor = fromMe ? 'bg-blue-500' : '';
  const time = extractTime(message?.createdAt);
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className="chat-header">
        {fromMe ? authuser?.username : selectedConversation?.username}
        <time className="text-xs opacity-50 text-white">{time}</time>
      </div>
      {message?.img ? (
        <div className={`chat-bubble ${bubbleColor} ${shakeClass} ` } >
        <img
          src={message?.img}
          alt="Attached"
          style={{ width: '180px', height:'180px', borderRadius:'12px' }}
          
          />
          </div>
      ) : (
        <div className={`chat-bubble ${bubbleColor} ${shakeClass} max-w-[300px]`}>
          {message?.message}
        </div>
      )}
    </div>
  )
}

export default Message
