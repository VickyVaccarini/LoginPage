import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ isLoggedIn = false }) => {
    return (
        <section className="page hero">
            <div className="hero-copy">
                <span className="eyebrow">Bienvenido</span>
                <h1>Gestiona tu cuenta con facilidad y seguridad</h1>
                <p>
                    Centraliza tus accesos y mantiene tus datos protegidos con una plataforma moderna,
                    accesible y lista para acompanarte en cada paso.
                </p>
                {!isLoggedIn && (
                    <div className="hero-actions">
                        <Link to="/login" className="btn btn-primary">
                            Iniciar sesion
                        </Link>
                        <Link to="/register" className="btn btn-ghost">
                            Crear cuenta
                        </Link>
                    </div>
                )}
            </div>
            <div className="glass-panel">
                <h3>Una experiencia pensada para vos</h3>
                <ul className="feature-list">
                    <li>Autenticacion segura y confiable.</li>
                    <li>Gestion de perfil en tiempo real.</li>
                    <li>Interfaz moderna y adaptable a cualquier dispositivo.</li>
                </ul>
            </div>
        </section>
    );
};

export default HomePage;
