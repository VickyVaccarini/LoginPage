import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./services/auth.service', () => ({
    __esModule: true,
    default: {
        register: jest.fn(),
        login: jest.fn(),
        deleteUser: jest.fn(),
    },
}));

test('muestra la pagina de inicio por defecto', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Gestiona tu cuenta con facilidad y seguridad/i })).toBeInTheDocument();
});
