import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import ChatProvider from './context/chat/ChatProvider';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './router/AppRouter';

// !? con esta configuracion se cambia el idioma del moment para toda la appp.. o para cualquier uso que sea de este nivel o inferior
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')
// -- fin de la configuracion

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
