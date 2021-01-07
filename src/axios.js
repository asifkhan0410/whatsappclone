import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://whatsapp-build-mern-backend.herokuapp.com',
});

export default instance;