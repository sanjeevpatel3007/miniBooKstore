import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const initialAuthUser = localStorage.getItem("Users");
    const [authUser, setAuthUser] = useState(
        initialAuthUser ? JSON.parse(initialAuthUser) : undefined
    );

    useEffect(() => {
        if (authUser) {
            axios.get(`http://localhost:3000/user/${authUser._id}`)
                .then(response => {
                    setAuthUser(response.data);
                    localStorage.setItem('Users', JSON.stringify(response.data));
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
