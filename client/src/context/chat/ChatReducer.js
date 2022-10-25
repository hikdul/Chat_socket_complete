
import { types } from '../../types/types';

export const chatReducer = (state, action) =>{
    
    switch(action.type){
        
        case types.usersLoad:
            return{
                ...state,
                usuarios: [...action.payload]
            }
        
        default:
                return state
    }
}