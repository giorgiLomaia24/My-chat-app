import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    const sendMessage = async (message,img) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({message,img})
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }


    return { sendMessage, loading };
}

export default useSendMessage
