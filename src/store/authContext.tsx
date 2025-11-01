import { createContext, useState, useContext } from 'react';

type UserData = {
    email: string
    id: string
    profilePic: string
    postsData: [any]
};

type AuthContextType = {
    loggedIn: boolean;
    userData: UserData;
    setUserData: (value: {})=> void;
    setLoggedIn: (value: boolean)=> void;
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    userData: {
        email: "",
        id: "",
        profilePic: "",
        postsData: [{}]
    },
    setUserData: function(){},
    setLoggedIn: function(){}
})

export const AuthProvider = function({children} : {children: any}){
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        email: "",
        id: "",
        profilePic: "",
        postsData: [{}]
    });

    return(
        <AuthContext.Provider value={{loggedIn, setLoggedIn, userData, setUserData: setUserData as any}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);