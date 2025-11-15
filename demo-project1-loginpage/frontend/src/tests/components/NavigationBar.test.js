import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavigationBar from '../../components/NavigationBar';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderNavigationBar = (props, initialPath = '/') =>
    render(
        <MemoryRouter initialEntries={[initialPath]}>
            <NavigationBar onLogout={jest.fn()} {...props} />
        </MemoryRouter>
    );

describe('NavigationBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('muestra enlaces de inicio de sesion y registro cuando no hay usuario autenticado', () => {
        renderNavigationBar({ isLoggedIn: false }, '/register');

        expect(screen.getByRole('link', { name: /Registrarse/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Ingresar/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Mi perfil/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Cerrar sesion/i })).not.toBeInTheDocument();
    });

    it('muestra la informacion del usuario y permite cerrar sesion', async () => {
        const onLogout = jest.fn();

        renderNavigationBar(
            {
                isLoggedIn: true,
                currentUser: { username: 'demo' },
                onLogout,
            },
            '/profile'
        );

        expect(screen.getByRole('link', { name: /Mi perfil/i })).toHaveClass('active', { exact: false });
        expect(screen.getByText(/@demo/i)).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Cerrar sesion/i }));
        });

        expect(onLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
