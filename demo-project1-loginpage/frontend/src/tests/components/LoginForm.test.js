import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/LoginForm';
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
    login: jest.fn(),
}));

const renderLoginForm = (props = {}) =>
    render(
        <MemoryRouter>
            <LoginForm onLogin={jest.fn()} {...props} />
        </MemoryRouter>
    );

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('muestra errores de validacion cuando los campos no cumplen los requisitos', async () => {
        renderLoginForm();

        const usernameInput = screen.getByLabelText(/Usuario/i);
        const passwordInput = screen.getByLabelText(/Contrase/i, { selector: 'input' });

        await act(async () => {
            await userEvent.type(usernameInput, 'abc1');
            await userEvent.type(passwordInput, 'abc');
            await userEvent.click(screen.getByRole('button', { name: /Ingresar/i }));
        });

        expect(
            screen.getByText(/El usuario debe contener al menos 4 letras/i, { selector: 'p' })
        ).toBeInTheDocument();
        expect(screen.getByText(/La contrase/i, { selector: 'p' })).toBeInTheDocument();
        expect(AuthService.login).not.toHaveBeenCalled();
    });

    it('inicia sesion correctamente y navega al perfil', async () => {
        const onLogin = jest.fn();
        AuthService.login.mockResolvedValue({
            status: 200,
            data: { username: 'DemoUser' },
        });

        renderLoginForm({ onLogin });

        const usernameInput = screen.getByLabelText(/Usuario/i);
        const passwordInput = screen.getByLabelText(/Contrase/i, { selector: 'input' });

        await act(async () => {
            await userEvent.type(usernameInput, 'DemoUser');
            await userEvent.type(passwordInput, 'Password!');
            await userEvent.click(screen.getByRole('button', { name: /Ingresar/i }));
        });

        await waitFor(() => {
            expect(AuthService.login).toHaveBeenCalledWith('DemoUser', 'Password!');
        });

        expect(onLogin).toHaveBeenCalledWith({ username: 'DemoUser' });
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });
});
