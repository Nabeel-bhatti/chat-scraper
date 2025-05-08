import { api } from '../lib/apiRoute';

export const registration = (data) => {
    return api.post('register/', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
    });
};
export const login = (data) => {
    return api.post('login/', {
        email: data.email,
        password: data.password,
    });
};

export const googleAuth = (credential) => {
    return axios.post('/api/auth/google', { credential });
};