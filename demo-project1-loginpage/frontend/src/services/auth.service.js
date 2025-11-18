import axios from 'axios';

const hostToApiUrl = {
    'loginpage-frontend-qa.azurewebsites.net': 'https://loginpage-backend-qa.azurewebsites.net/api',
    'loginpage-frontend-prod.azurewebsites.net': 'https://loginpage-backend-prod.azurewebsites.net/api',
};

const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : '';
const API_URL =
    process.env.REACT_APP_API_URL ??
    hostToApiUrl[runtimeHost] ??
    'http://localhost:8080/api';

class AuthService {
    async register(username, password) {
        const response = await axios.post(API_URL + '/register', {
            username,
            password,
        });
        return response;
    }

    async login(username, password) {
        const response = await axios.post(API_URL + '/login', {
            username,
            password,
        });
        return response;
    }
    async deleteUser(username) {
        const response = await axios.delete(API_URL + '/delete', { data: { username } });
        return response;
    }
}

export default new AuthService();
