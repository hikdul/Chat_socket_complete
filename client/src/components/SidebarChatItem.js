import { useContext } from "react"
import ChatContext from "../context/chat/ChatContext"
import { fetchToken } from "../helpers/fetch"
import { scrollToBottom } from "../helpers/scrollToButtom"
import { types } from "../types/types"

export const SidebarChatItem = (user) => {
    
    const {chatState, dispatch} = useContext(ChatContext)
    const {name, online, uid} = user.user
    const {chatActive} = chatState

    const onClick = async () => {
        dispatch({
            type: types.ChatActive,
            payload: uid
        })
        
        const resp = await fetchToken(`messages/${uid}`)
        dispatch({
            type: types.upMessage,
            payload: resp.messages
        })
        scrollToBottom('messageBox')
    }
    
    return (
        <div
        className={ `chat_list ${uid === chatActive && 'active_chat'} `}
        onClick={onClick}>
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{name}</h5>
                    {online 
                    ? <span className="text-success">Online</span>
                    : <span className="text-danger">Offline</span>}
                </div>
            </div>
        </div>
    )
}
