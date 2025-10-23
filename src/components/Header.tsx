import { Link } from '@tanstack/react-router';

const Header = function(){
    return(
        <>
            <header className="my-header">
                <div className="my-inner-header">
                    <div className="my-logo"><Link to="/">Home</Link></div>
                    <nav className="my-nav">
                        <ul>
                            <li><Link to='/posts/new'>Create</Link></li>
                            <li><Link to="/">Logout</Link></li>
                            <li><Link to="/">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};

export default Header;