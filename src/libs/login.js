import axios from 'axios';
import GlobalConfig from '../endpoint.json';

export default function login(email, password, setUser, setMessage) {
    const url = GlobalConfig.endpoint;
    axios.post(url + '/login', {
        username: email,
        password: password
    })
        .then(response => {
            localStorage.setItem('authToken', response.data.access_token);
            setUser({ 
                userEmail: response.data.username,
            });
        })
        .catch(error => {
            console.log('Error:', error);
            if (error.response) {
                if (error.response.data) {
                    setMessage(error.response.data.message);
                }
            }
        });
}