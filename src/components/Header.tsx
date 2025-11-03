import { Link, useNavigate } from '@tanstack/react-router';

import { logout } from '../api/auth';

import { useAuth } from '../store/authContext';

const Header = function(){

    const authState = useAuth();
    const navigate = useNavigate();

    const logoutFn = async function(){
        const result = await logout();

        if(result.message && result.message == 'logged out'){
            authState.setLoggedIn(false);
            navigate({ to: '/logout' });
        }
    }

    return(
        <>
            <header className="my-header">
                <div className="my-inner-header">
                    <div className="my-logo"><Link to="/">Home</Link></div>
                    <nav className="my-nav">
                        <ul>
                            {
                                authState.loggedIn? (
                                    <>
                                        <li><Link to='/posts/new'>Create</Link></li>
                                        <li>
                                            <Link to={"/profile/" + authState.userData.username}>
                                                {authState.userData.username}
                                            </Link>
                                        </li>
                                        <li><button onClick={logoutFn}>Logout</button></li> 
                                    </>
                                ):<li><Link to="/login">Login</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};

export default Header;