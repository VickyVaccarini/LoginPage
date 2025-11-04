import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavigationBar = ({ isLoggedIn, currentUser, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const getLinkClass = (path) => (location.pathname === path ? 'nav-link active' : 'nav-link');

    const getInitials = () => {
        if (currentUser?.username) {
            return currentUser.username.slice(0, 2).toUpperCase();
        }
        return 'DL';
    };

    const handleLogoutClick = () => {
        onLogout();
        navigate('/login');
    };

    const headerClassName = `app-header${isLoggedIn ? '' : ' app-header--solo'}`;

    return (
        <header className={headerClassName}>
            <div className="brand-group">
                <Link to="/" className="brand" aria-label="Inicio DemoLogin">
                    Demo<span>Login</span>
                </Link>
                <p className="brand-tagline">Tu acceso seguro en un solo lugar.</p>
            </div>
            <div className="nav-center">
                <nav className="nav-links" aria-label="Navegacion principal">
                    <Link to="/" className={getLinkClass('/')}>
                        Inicio
                    </Link>
                    {!isLoggedIn && (
                        <Link to="/register" className={getLinkClass('/register')}>
                            Registrarse
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <Link to="/login" className={getLinkClass('/login')}>
                            Ingresar
                        </Link>
                    )}
                    {isLoggedIn && (
                        <Link to="/profile" className={getLinkClass('/profile')}>
                            Mi perfil
                        </Link>
                    )}
                </nav>
            </div>
            {isLoggedIn && (
                <div className="nav-actions">
                    <div className="nav-profile" role="status" aria-live="polite">
                        <span className="nav-avatar" aria-hidden="true">
                            {getInitials()}
                        </span>
                        {currentUser?.username && <span className="nav-username">@{currentUser.username}</span>}
                    </div>
                    <button type="button" className="btn btn-ghost" onClick={handleLogoutClick}>
                        Cerrar sesion
                    </button>
                </div>
            )}
        </header>
    );
};

export default NavigationBar;
