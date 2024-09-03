import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/sound.mp3';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, messages, setMessages } = useConversation();
    
    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Check if the message belongs to the currently selected conversation
            if (newMessage.conversationId === selectedConversation?._id) {
                newMessage.shouldShake = true;  // Add any effects like shaking
                const sound = new Audio(notificationSound);
                sound.play();
                // Update the messages for the current conversation
                setMessages([...messages, newMessage]);
            }
        };

        socket?.on("newMessage", handleNewMessage);

        return () => socket?.off("newMessage", handleNewMessage);
    }, [socket, selectedConversation, setMessages, messages]);
}

export default useListenMessages;

