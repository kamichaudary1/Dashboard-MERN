import { createContext, useContext, useState, useEffect } from "react";

export const AutoContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const storeTokenLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };


    const LogoutUser = () => {
        localStorage.removeItem("token");
        setToken("");
    }

    let isLoggedIn = !!token;

    return (
        <AutoContext.Provider value={{ isLoggedIn, storeTokenLS, LogoutUser }}>
            {children}
        </AutoContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AutoContext);
    if (!authContextValue) {
        throw new Error("useAuth Provider")
    }
    return authContextValue;
}

