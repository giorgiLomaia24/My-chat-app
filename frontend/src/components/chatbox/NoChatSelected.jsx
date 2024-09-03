import React from 'react';
import { LuMessagesSquare } from "react-icons/lu";
import { useAuthContext } from '../../context/AuthContext';


function NoChatSelected() {
  const { authuser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p> Wellcome 👋  {authuser?.userName}</p>
        <p>Select a chat to start messaging</p>
        <LuMessagesSquare className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}

export default NoChatSelected