import { Link } from '@tanstack/react-router';

import { useState, useEffect } from 'react';

import { logout, authMe } from '../api/auth';

const Header = function(){

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        async function auth(){
            const data =  await authMe();
            if(data.user != null){
                setLoggedIn(true);
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
                                loggedIn?
                                <li onClick={logout}><Link to="/logout">Logout</Link></li>: 
                                <li><Link to="/login">Login</Link></li>
                            }
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};

export default Header;