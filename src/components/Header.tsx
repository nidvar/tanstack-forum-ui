import { Link } from '@tanstack/react-router';

import { useAuth } from '../store/authContext';

const Header = function(){

    const authState = useAuth();

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
                                        <div className='profile-icon-header'>
                                            <Link to={"/profile/" + authState.userData.username}>
                                                <img src={authState.userData.profilePic} />
                                            </Link>
                                        </div>
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