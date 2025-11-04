import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProfilePage = ({ currentUser, onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleDeleteAccount = useCallback(async () => {
        if (!currentUser) {
            return;
        }

        try {
            const response = await AuthService.deleteUser(currentUser.username);
            if (response.status === 200) {
                onLogout();
                navigate('/login');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    }, [currentUser, navigate, onLogout]);

    if (!currentUser) {
        return null;
    }

    return (
        <section className="page">
            <div className="card profile-card">
                <h1>Mi perfil</h1>
                <p className="card-subtitle">
                    Administra tu informacion personal cuando lo necesites.
                </p>
                <dl className="profile-details">
                    <div>
                        <dt>Usuario</dt>
                        <dd>@{currentUser.username}</dd>
                    </div>
                </dl>
                <button type="button" className="btn btn-danger full-width" onClick={handleDeleteAccount}>
                    Eliminar mi cuenta
                </button>
            </div>
        </section>
    );
};

export default ProfilePage;
