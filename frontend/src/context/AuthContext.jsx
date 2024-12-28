import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    isLoggedIn: Boolean,
    setIsLoggedIn: () => { },
    userInfo: {},
    setUserInfo: () => { },
    Logout: () => { }
})

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') || false)
    const [userInfo, setUserInfo] = useState(null)

    const Logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/')
        return
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext