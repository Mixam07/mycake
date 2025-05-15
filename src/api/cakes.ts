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

const createCake = async (data: object, images: File[]) => {
    try {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        images.forEach((img) => {
            formData.append("photos", img);
        });

        const response = await axios.post("http://localhost:3000/cakes", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        });

        return response.data
    } catch (error: any) {
        return null
    }
}

export { getCakes, getCake, createCake }