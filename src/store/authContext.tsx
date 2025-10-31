import { createContext, useState, useContext } from 'react';

type AuthContextType = {
    loggedIn: boolean
    setLoggedIn: (value: boolean)=> void;
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    setLoggedIn: function(){}
})

export const AuthProvider = function({children} : {children: any}){
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <AuthContext.Provider value={{loggedIn, setLoggedIn}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);