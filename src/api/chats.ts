import axios from 'axios';

axios.defaults.withCredentials = true;

const getChats = async () => {
    try {
        const response = await axios.get('http://localhost:3000/chats');

        return response.data
    } catch (error: any) {
        return null
    }
}

const getChatUser = async (id: string) => {
    try {
        const response = await axios.get('http://localhost:3000/user/' + id);

        return response.data
    } catch (error: any) {
        return null
    }
}

export { getChats, getChatUser }