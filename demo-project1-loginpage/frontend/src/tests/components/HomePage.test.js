import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../components/HomePage';

const renderHomePage = (props) =>
    render(
        <MemoryRouter>
            <HomePage {...props} />
        </MemoryRouter>
    );

describe('HomePage', () => {
    it('muestra los llamados a la acción cuando no hay usuario logueado', () => {
        renderHomePage();

        expect(
            screen.getByRole('heading', { name: /Gestiona tu cuenta con facilidad y seguridad/i })
        ).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Iniciar sesion/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Crear cuenta/i })).toBeInTheDocument();
    });

    it('oculta las acciones de login/registro cuando el usuario ya inició sesión', () => {
        renderHomePage({ isLoggedIn: true });

        expect(screen.queryByRole('link', { name: /Iniciar sesion/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Crear cuenta/i })).not.toBeInTheDocument();
    });
});
