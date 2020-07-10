import axios from 'axios';

export default axios.create({
    baseURL: 'http://dev-bookmenow.zubariev-dmytro.com:3090',
    mode: 'CORS',
    headers: {
        'Content-Type': 'application/json'
    }
})