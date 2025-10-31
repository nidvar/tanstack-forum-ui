import { Link } from '@tanstack/react-router';

import { useEffect } from 'react';

import { logout, authMe } from '../api/auth';

import { useAuth } from '../store/authContext'

const Header = function(){

    const authState = useAuth();

    const logoutFn = async function(){
        const result = await logout();

        if(result.message && result.message == 'logged out'){
            authState.setLoggedIn(false);
        }
    }

    useEffect(()=>{
        async function auth(){
            const data =  await authMe();
            if(data.user == null){
                authState.setLoggedIn(false);
            }else{
                authState.setLoggedIn(true);
            }
        }
        auth();
    }, []);

    return(
        <>
            <header className="my-header">
                <div className="my-inner-header">
                    <div className="my-logo"><Link to="/">Home</Link></div>
                    <nav className="my-nav">
                        <ul>
                            <li><Link to='/posts/new'>Create</Link></li>
                            {
                                authState.loggedIn?
                                <button onClick={logoutFn}><Link to="/logout">Logout</Link></button>: 
                                <li><Link to="/login">Login</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};

export default Header;