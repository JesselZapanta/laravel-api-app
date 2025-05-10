import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const res = await axios.get('/api/user', {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        if(res.status === 200){
            setUser(res.data);
        }
    }
    useEffect(() => {
        if(token){
            getUser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}
