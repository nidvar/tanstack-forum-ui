import { createContext, useState, useContext, useEffect } from 'react';

import { authMe } from '../api/auth';

type UserData = {
    username: string
    email: string
    profilePic: string
    posts: [any]
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
        username: "",
        email: "",
        profilePic: "",
        posts: [{}]
    },
    setUserData: function(){},
    setLoggedIn: function(){}
})

export const AuthProvider = function({children} : {children: any}){
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        username: "",
        email: "",
        profilePic: "",
        posts: [{}]
    });

    useEffect(()=>{
        async function auth(){
            const response =  await authMe();
            if(response.loggedIn == null){
                setLoggedIn(false);
            }else{
                setLoggedIn(true);
                setUserData(response.data);
                setUserData(prev => ({
                    ...prev,
                    profilePic: response.data.profilePic
                }));
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