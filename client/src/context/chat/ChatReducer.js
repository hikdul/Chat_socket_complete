import { types } from '../../types/types';

export const chatReducer = (state, action) =>{
    switch(action.type)
    {
        case types.usersLoad:
            return{
                ...state,
                usuarios: [...action.payload]
            }

        case types.ChatActive:
            if(state.chatActive === action.payload)
                return state
            return{
                ...state,
                chatActive: action.payload
            }
        
        case types.newMessage:
            if(state.chatActive === action.payload.to || state.chatActive === action.payload.from)
                return{
                    ...state,
                    mensegges: [...state.mensegges, action.payload]
                }
            else
               return state
        case types.upMessage:
           return {
            ...state,
            mensegges: [...action.payload]
           }
        
        case types.cleanSes:
            return{
                ...action.payload
            }
        
        default:
                return state
    }
}

    //uid: '',
    //chatActive: null, // ? id del usuario al que se le envian mensajes
    //usuarios: [], // ? usuario de base de datos
    //mensegges: [] //? el chat seleccionado??