import { api }  from './api';
import Cookies from 'js-cookie';

export interface LoginCredentials {
    email: string,
    password: string,
}

export const login = async (credenticals: LoginCredentials) => {
    try{
        const response = await api.post('api/user/login', credenticals);
        const { token } = response.data;

        Cookies.set('token', token, {expires: 7});
        return token;
    }catch (error: any){
        throw new Error(error.response?.data?.message);
    }
}

export const logout = () => {
    Cookies.remove('token');
    window.location.href = '/login';
  };
