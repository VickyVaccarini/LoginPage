import axios from 'axios';

const hostPatterns = [
  { includes: 'loginpage-frontend-qa',   api: 'https://loginpage-backend-qa-arczbfdkbrf7bdg2.brazilsouth-01.azurewebsites.net/api' },
  { includes: 'loginpage-frontend-prod', api: 'https://loginpage-backend-prod-ffdmg4bwfjatg0bd.brazilsouth-01.azurewebsites.net/api' },
];

const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : '';
const matchedHost = hostPatterns.find(({ includes }) => runtimeHost.includes(includes));
const API_URL =
    process.env.REACT_APP_API_URL ??
    matchedHost?.api ??
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
