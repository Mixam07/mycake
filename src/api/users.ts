import axios from 'axios';

axios.defaults.withCredentials = true;

const getAuth = async () => {
    try {
        const response = await axios.get('http://localhost:3000/getAuth');

        return response.data
    } catch (error: any) {
        return null
    }
}

const logout = async () => {
    try {
        const response = await axios.post('http://localhost:3000/logout');

        return response.data
    } catch (error: any) {
        return null
    }
}

const sendCode = async (code: string, email: string) => {
    try {
        const response = await axios.post('http://localhost:3000/code', { code, email });

        return response.data
    } catch (error: any) {
        return null
    }
}

const login = async (email: string) => {
    try {
        const response = await axios.post('http://localhost:3000/login', { email });

        return response.data
    } catch (error: any) {
        return null
    }
}

const registrateBuyer = async (email: string, name: string) => {
    try {
        const response = await axios.post('http://localhost:3000/buyers/registration', { email, name });
        
        return response.data
    } catch (error: any) {
        return null
    }
}

const registrateConfectioners = async (email: string, name: string) => {
    try {
        const response = await axios.post('http://localhost:3000/confectioners/registration', { email, name });

        return response.data
    } catch (error: any) {
        return null
    }
}

export { getAuth, logout, sendCode, login, registrateBuyer, registrateConfectioners }