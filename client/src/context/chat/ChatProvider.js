import { useReducer } from "react"
import { initialStateReducer } from "../../constants/initState"
import ChatContext  from "./ChatContext"
import { chatReducer } from "./ChatReducer"

//const initialState = {
//    uid: '',
//    chatActive: null, // ? id del usuario al que se le envian mensajes
//    usuarios: [], // ? usuario de base de datos
//    mensegges: [] //? el chat seleccionado??
//}

const ChatProvider = ({ children }) => {
    const [chatState, dispatch] = useReducer(chatReducer, initialStateReducer)
    return (
        <ChatContext.Provider value={{chatState, dispatch}}>
            {children}
        </ChatContext.Provider>
    )

}

export default ChatProvider