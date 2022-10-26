import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import ChatContext from '../context/chat/ChatContext'
import { SocketContext } from '../context/SocketContext'

export const SendMessage = () => {

    const [message, setMessage] = useState('')
    const {socket} = useContext(SocketContext)
    const {auth} = useContext(AuthContext)
    const {chatState} = useContext(ChatContext)

    const onChange = ({target})=>{
        setMessage(target.value)
    }
    
    const onSumit = (ev) =>{
        ev.preventDefault()
        if(message.length === 0)
            return
        socket.emit('mensaje-personal', {
            to: auth.uid, 
            from: chatState.chatActive , 
            message
        })
        setMessage('')
    }
    
    return (
        <form onSubmit={onSumit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input value={message} onChange={onChange} type="text" className="write_msg" placeholder="Mensaje..." />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
}
