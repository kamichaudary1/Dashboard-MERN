import { createContext, useContext, useState, useEffect } from "react";

export const AutoContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // JWT AUTHENTICATION, to get the Current LoggedIn user DATA
    const userAuthentication = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // console.log("USER DATA", data.userData);
                setUser(data.userData);
            } else {
                console.log("Unauthorized or failed to fetch user");
            }
        } catch (error) {
            console.log("Error Fetching USER DATA", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, []);

    useEffect(() => {
        userAuthentication();
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
        <AutoContext.Provider value={{ isLoggedIn, storeTokenLS, LogoutUser, user }}>
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

