import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogOutButton from './LogOutButton'
import useConversation from '../../zustand/useConversation'

function Sidebar() {
  const { selectedConversation } = useConversation();
  return (
      <div  className={`border-r  border-slate-500 p-4 flex flex-col ${selectedConversation ? 'hidden' : 'block w-[90%]'} md:flex md:w-auto`}>
          <SearchInput />
          <div className="divider px-3"></div>
          <Conversations />
          <LogOutButton/>
    </div>
  )
}

export default Sidebar