import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('Token'));
    const authenticationToken = `Bearer ${token}`;

    const storeInLS = async (newToken) => {
        setToken(newToken);
        if (newToken) {
            try {
                localStorage.setItem("Token", newToken);
            } catch (error) {
                console.log("Error saving token to localStorage:", error);
            }
        }
    };

    const userData = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`http://localhost:3000/auth/user`, {
                headers: {
                    Authorization: authenticationToken,
                },
            });
            if (response.status === 200) {
                setUser(response.data);
                console.log("User data:", response.data);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        userData();
    }, [token]);

    return (
        <AuthContext.Provider value={{ storeInLS, authenticationToken, user, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
