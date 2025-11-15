import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProfilePage from '../../components/ProfilePage';
import AuthService from '../../services/auth.service';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

jest.mock('../../services/auth.service', () => ({
    deleteUser: jest.fn(),
}));

const renderProfilePage = (props = {}) =>
    render(
        <MemoryRouter>
            <ProfilePage onLogout={jest.fn()} {...props} />
        </MemoryRouter>
    );

describe('ProfilePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('redirige al login cuando no existe un usuario autenticado', async () => {
        renderProfilePage({ currentUser: null });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });

        expect(screen.queryByRole('heading', { name: /Mi perfil/i })).not.toBeInTheDocument();
    });

    it('elimina la cuenta del usuario cuando la API responde correctamente', async () => {
        const onLogout = jest.fn();
        AuthService.deleteUser.mockResolvedValue({ status: 200 });

        renderProfilePage({ currentUser: { username: 'demo' }, onLogout });

        await act(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Eliminar mi cuenta/i }));
        });

        await waitFor(() => {
            expect(AuthService.deleteUser).toHaveBeenCalledWith('demo');
        });
        expect(onLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
