import { createContext, useEffect, useState , useContext} from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';


const SocketContext = createContext();


export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authuser } = useAuthContext();
    useEffect(() => {
        if (authuser) {
            const socket = io("http://localhost:8000", {
                query: {
                    userId : authuser?._id
                }
            });
            setSocket(socket);


            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })
            return () =>  socket.close()
        } else {
            socket?.close();
            setSocket(null);
         }
    },[authuser])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
};
