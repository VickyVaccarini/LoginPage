import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import NavigationBar from './components/NavigationBar';
import ProfilePage from './components/ProfilePage';
import RegisterForm from './components/RegisterForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    return (
        <Router>
            <div className="app-shell">
                <NavigationBar isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                        <Route
                            path="/profile"
                            element={<ProfilePage currentUser={currentUser} onLogout={handleLogout} />}
                        />
                    </Routes>
                </main>
                <footer className="app-footer">
                    &copy; {new Date().getFullYear()} DemoLogin. Todos los derechos reservados.
                </footer>
            </div>
        </Router>
    );
}

export default App;
