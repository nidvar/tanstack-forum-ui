import { Link } from '@tanstack/react-router';

import { logout } from '../api/auth';

const Header = function(){
    return(
        <>
            <header className="my-header">
                <div className="my-inner-header">
                    <div className="my-logo"><Link to="/">Home</Link></div>
                    <nav className="my-nav">
                        <ul>
                            <li><Link to='/posts/new'>Create</Link></li>
                            <li onClick={logout}><Link to="/logout">Logout</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};

export default Header;