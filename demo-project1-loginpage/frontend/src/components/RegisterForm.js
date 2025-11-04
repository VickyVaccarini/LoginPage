import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateFields = () => {
        const letters = username.match(/[A-Za-z]/g) || [];
        const errors = {
            username: letters.length >= 4 ? '' : 'El usuario debe contener al menos 4 letras.',
            password: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(password)
                ? ''
                : 'La contraseña debe tener minimo 8 caracteres, una mayuscula y un caracter especial.',
        };
        setFieldErrors(errors);
        return !errors.username && !errors.password;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        if (!validateFields()) {
            return;
        }

        try {
            const response = await AuthService.register(username, password);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError('El usuario ya existe. Proba con otro nombre.');
        }
    };

    return (
        <section className="page">
            <div className="card form-card">
                <h2>Crear cuenta</h2>
                <p className="card-subtitle">
                    Solo necesitas un usuario y una contraseña para comenzar.
                </p>
                <form className="form-grid" onSubmit={handleSubmit} noValidate>
                    <div className="form-field">
                        <label htmlFor="register-username">Usuario</label>
                        <input
                            id="register-username"
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setFieldErrors((prev) => ({ ...prev, username: '' }));
                            }}
                            placeholder="usuario123"
                            autoComplete="username"
                            required
                        />
                        {fieldErrors.username && (
                            <p className="form-field-error" role="alert">
                                {fieldErrors.username}
                            </p>
                        )}
                    </div>
                    <div className="form-field">
                        <label htmlFor="register-password">Contraseña</label>
                        <div className="form-input-wrapper">
                            <input
                                id="register-password"
                                type={showPassword ? 'text' : 'password'}
                                className="form-input"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setFieldErrors((prev) => ({ ...prev, password: '' }));
                                }}
                                placeholder="********"
                                autoComplete="new-password"
                                required
                            />
                            <IconButton
                                className="password-toggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </div>
                        {fieldErrors.password && (
                            <p className="form-field-error" role="alert">
                                {fieldErrors.password}
                            </p>
                        )}
                    </div>
                    {error && (
                        <div className="form-error" role="alert">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary full-width">
                        Registrarme
                    </button>
                </form>
                <p className="form-footer">
                    Ya tienes una cuenta?{' '}
                    <Link to="/login" className="link-accent">
                        Ingresa aqui
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterForm;
