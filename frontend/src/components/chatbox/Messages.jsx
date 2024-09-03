import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const { loading, messages } = useGetMessages();
  const latsMessage = useRef();  
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      latsMessage?.current?.scrollIntoView({ behavior: "smooth" });

    }, 100);
  }, [messages]);
  
  
  return (
    <div className='px-4 flex-1 overflow-auto' >
       {!loading && messages.length > 0 && messages.map((message) => {
         return <div  key={message?._id} ref={latsMessage}><Message message={ message}/> </div> 
      })}
      {loading && [...Array(3)].map((_, id) => { return <MessageSkeleton key={id} /> })}
      {!loading && messages.length === 0 && (<p className='text-center text-white'>Send A message to start a conversation.</p>)}
     
    </div>
  )
}

export default Messages