import { createContext, useState, useContext, useEffect } from 'react';

import { authMe } from '../api/auth';

type UserData = {
    email: string
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
        profilePic: "",
        postsData: [{}]
    });

    useEffect(()=>{
        async function auth(){
            const response =  await authMe();
            if(response.loggedIn == null){
                setLoggedIn(false);
            }else{
                setLoggedIn(true);
                setUserData(response.data);
            }
        }
        auth();
    }, []);

    return(
        <AuthContext.Provider value={{loggedIn, setLoggedIn, userData, setUserData: setUserData as any}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);