import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatContext from '../context/chat/ChatContext';
import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';

export const Messages = () => {

    const {chatState} = useContext(ChatContext)
    const {auth} = useContext(AuthContext)
    console.log({chatState})
    return (
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div id='messageBox' className="msg_history">
                {
                    chatState.mensegges.map( msg => (
                         msg.from === auth.uid 
                            ? <IncomingMessage key={ msg._id } msg={msg} />
                            : <OutgoingMessage key={ msg._id } msg={msg} />
                    ))
                }

                

            </div>
            {/* <!-- Historia Fin --> */}

           <SendMessage />

        </div>
    )
}
