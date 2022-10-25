import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, disconnectSocket, connectSocket,
    } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        if (auth.logged)
            connectSocket()
    }, [connectSocket, auth.logged])

    useEffect(() => {
        if (!auth.logged)
            disconnectSocket()
    }, [disconnectSocket, auth.logged])
    
    useEffect(()=>{
      socket?.on('list-users',(users)=>{
        console.log('list-users escuchado')
        console.log('Usuarios: ',{users})
      }) 
    },[])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}