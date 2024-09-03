import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthuser } = useAuthContext();
    
    const login = async ({ userName, password }) => {
        const success = handleInputErrors({userName,password});
        if (!success) {
            return;
            
        }
        try {
            setLoading(true);
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ userName,password})
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('chat-app-user', JSON.stringify(data));
            setAuthuser(data);
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

function handleInputErrors({ userName, password }) {
    if (!userName || !password) {
        toast.error("missing fields");
        return false;
    }

    return true
}

export default useLogin;