import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthuser} = useAuthContext();
    const signup = async ({fullName, userName, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, userName, password, confirmPassword, gender});
        if (!success) {
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
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

    return { loading, signup };
}

export default useSignup;


function handleInputErrors({fullName, userName, password, confirmPassword, gender}) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("missing fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("password must be grater than 6 charachter");
        return false;
    }

    return true;
    
}