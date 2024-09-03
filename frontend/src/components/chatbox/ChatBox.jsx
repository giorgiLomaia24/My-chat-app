import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';
import useConversation from '../../zustand/useConversation';
import { FaArrowLeft } from "react-icons/fa";



function ChatBox() {
    const { selectedConversation, setSelectedConversation } = useConversation();
    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div     className={`md:min-w-[550px] flex flex-col ${selectedConversation ? 'block w-[90%] overflow-hidden' : 'hidden'} md:flex md:w-auto`}
>
            {!selectedConversation ? <NoChatSelected /> :
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
                        <span> <span className="label-text">To:</span><span className="text-gray-900 font-bold ml-2">{selectedConversation ? selectedConversation?.fullName : ''}</span></span>
                        <span className="label-text text-white block md:hidden cursor-pointer" onClick={() => setSelectedConversation(null)}><FaArrowLeft /></span>

                    </div>
                    <Messages />
                    <MessageInput />
                </>
            }
        </div>
    )
}

export default ChatBox