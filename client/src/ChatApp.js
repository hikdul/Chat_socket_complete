import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import ChatProvider from './context/chat/ChatProvider';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './router/AppRouter';

export const ChatApp = () => {
    return (
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
    )
}
