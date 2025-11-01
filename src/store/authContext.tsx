import { createContext, useState, useContext } from 'react';

type AuthContextType = {
    loggedIn: boolean;
    userData: {};
    setLoggedIn: (value: boolean)=> void;
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    userData: {},
    setLoggedIn: function(){}
})

export const AuthProvider = function({children} : {children: any}){
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    return(
        <AuthContext.Provider value={{loggedIn, setLoggedIn, userData}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);