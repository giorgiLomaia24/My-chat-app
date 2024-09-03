import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import ChatBox from '../../components/chatbox/ChatBox'

function Home() {
  return (
    <div className='flex justify-center h-[100%] rounded-lg overflow-hidden shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 w-[100%] '>
      <Sidebar />
      <ChatBox />
    </div>
  )
}

export default Home