import axios from 'axios';

axios.defaults.withCredentials = true;

const getCakes = async () => {
    try {
        const response = await axios.get('http://localhost:3000/cakes');

        return response.data
    } catch (error: any) {
        return null
    }
}

const getCake = async (id: string) => {
    try {
        const response = await axios.get('http://localhost:3000/cakes/' + id);

        return response.data
    } catch (error: any) {
        return null
    }
}

export { getCakes, getCake }