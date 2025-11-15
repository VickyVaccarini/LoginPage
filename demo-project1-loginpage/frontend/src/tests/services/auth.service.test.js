import axios from 'axios';
import AuthService from '../../services/auth.service';

jest.mock('axios', () => ({
    post: jest.fn(),
    delete: jest.fn(),
}));

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('envia los datos correctos al registrar un usuario', async () => {
        const response = { status: 201 };
        axios.post.mockResolvedValue(response);

        const result = await AuthService.register('demo', 'Password!');

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/register', {
            username: 'demo',
            password: 'Password!',
        });
        expect(result).toBe(response);
    });

    it('envia las credenciales correctas al hacer login', async () => {
        const response = { status: 200 };
        axios.post.mockResolvedValue(response);

        const result = await AuthService.login('demo', 'Password!');

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/login', {
            username: 'demo',
            password: 'Password!',
        });
        expect(result).toBe(response);
    });

    it('envia el nombre de usuario correcto cuando se elimina una cuenta', async () => {
        const response = { status: 200 };
        axios.delete.mockResolvedValue(response);

        const result = await AuthService.deleteUser('demo');

        expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/delete', {
            data: { username: 'demo' },
        });
        expect(result).toBe(response);
    });
});
