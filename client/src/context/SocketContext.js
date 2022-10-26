import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { AuthContext } from './AuthContext';
import ChatContext from './chat/ChatContext';
import { types } from '../types/types';
import { scrollToBottomBeuty } from '../helpers/scrollToButtom';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, disconnectSocket, connectSocket,
    } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

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
        dispatch({
            type: types.usersLoad,
            payload: users,
        })
      }) 
    },[socket, dispatch])
    
    useEffect(()=>{
        socket?.on('mensaje-personal', payload =>{
            console.log('escucho mensaje-personal', payload)
            dispatch({
                type: types.newMessage,
                payload: payload
            })
            scrollToBottomBeuty('messageBox')
        })
    },[socket, dispatch])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}