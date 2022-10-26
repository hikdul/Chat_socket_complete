import { useCallback, useContext, useState } from "react"
import { initialStateReducer } from "../constants/initState"
import { fetchNoToken, fetchToken } from "../helpers/fetch"
import { types } from "../types/types"
import { EMPTYSTATE, INITIALSTATE } from "./Authconstants"
import { AuthContext } from "./AuthContext"
import ChatContext from "./chat/ChatContext"

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(INITIALSTATE)
    const {dispatch} = useContext(ChatContext)
    const login = async (email, password) => {

        const resp = await fetchNoToken('users/login', { email, password }, 'POST')
        const { token, user } = resp

        if (token) {
            localStorage.setItem('token', token)
            setAuth({
                uid: user.id,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email
            })
        }

        return user !== null && user !== undefined
    }

    const register = async (email, password, name) => {
        const resp = await fetchNoToken('users/new', { email, password, name }, 'POST')
        const { token, user } = resp
        if (token) {
            localStorage.setItem('token', token)
            setAuth({
                uid: user.id,
                logged: true,
                name: user.name,
                email: user.email
            })
        }

        return user !== null && user !== undefined
    }

    const verifyToken = useCallback(async () => {
        const tk = localStorage.getItem('token')
        if (!tk) {
            setAuth(EMPTYSTATE)
            return false
        }

        const resp = await fetchToken('users/renew')
        const { token, user } = resp
        if (token) {
            localStorage.setItem('token', token)
            setAuth({
                uid: user.id,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email
            })
            return true
        }
        else
        {
            setAuth(EMPTYSTATE)
            return false
        }


    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({
            types: types.cleanSes,
            payload: initialStateReducer
        })
        setAuth(EMPTYSTATE)
    }


    return (
        <AuthContext.Provider value={{
            auth,
            login,
            logout,
            register,
            verifyToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}