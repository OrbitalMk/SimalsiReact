import { useContext, useCallback } from 'react';
import axios from 'axios';
import Context from '../context/UserContext'
import loginService from '../services/login'

export default function useUser() {
    const {token, setToken} = useContext(Context);

    const login = useCallback(({ email, password }) => {
        loginService({ email, password })
            .then(token => {
                setToken(token)
                sessionStorage.setItem('token', token)
            }).catch(error => {
                sessionStorage.removeItem('token')
                console.error(error)
            })
    }, [setToken])

    const logout = useCallback(() => {
        sessionStorage.removeItem('token')
        setToken(null)
        axios.post(
            API_URL + 'logout',
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }).then(response => {
            const { token } = response.data
    
            return token;
        });
    }, [setToken])

    return {
        isLogged: Boolean(token),
        login,
        logout,
    }
}