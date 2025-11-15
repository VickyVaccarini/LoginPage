import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../../components/RegisterForm';
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
    register: jest.fn(),
}));

const renderRegisterForm = () =>
    render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>
    );

describe('RegisterForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('muestra mensajes de error cuando los campos son invalidos', async () => {
        renderRegisterForm();

        const usernameInput = screen.getByLabelText(/Usuario/i);
        const passwordInput = screen.getByLabelText(/Contrase/i, { selector: 'input' });

        await act(async () => {
            await userEvent.type(usernameInput, 'abc1');
            await userEvent.type(passwordInput, 'abc');
            await userEvent.click(screen.getByRole('button', { name: /Registrarme/i }));
        });

        expect(
            screen.getByText(/El usuario debe contener al menos 4 letras/i, { selector: 'p' })
        ).toBeInTheDocument();
        expect(screen.getByText(/La contrase/i, { selector: 'p' })).toBeInTheDocument();
        expect(AuthService.register).not.toHaveBeenCalled();
    });

    it('registra al usuario y navega al login cuando la API responde 201', async () => {
        AuthService.register.mockResolvedValue({
            status: 201,
        });

        renderRegisterForm();

        const usernameInput = screen.getByLabelText(/Usuario/i);
        const passwordInput = screen.getByLabelText(/Contrase/i, { selector: 'input' });

        await act(async () => {
            await userEvent.type(usernameInput, 'DemoUser');
            await userEvent.type(passwordInput, 'Password!');
            await userEvent.click(screen.getByRole('button', { name: /Registrarme/i }));
        });

        await waitFor(() => {
            expect(AuthService.register).toHaveBeenCalledWith('DemoUser', 'Password!');
        });
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
