import axios from 'axios'

const API_URL = 'http://localhost:8000/api/';

export default function loginService({ email, password }) {
    return axios.post(
        API_URL + 'login',
        { email, password },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).then(response => {
        const { token } = response.data

        return token;
    });
}