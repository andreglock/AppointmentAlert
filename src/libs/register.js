import axios from 'axios';
import login from './login.js';
import GlobalConfig from '../endpoint.json';

export default function register (email, password, setUser, setMessage) {
    const url = GlobalConfig.endpoint;
    axios.post(url + '/signup', {
        user: {
            username: email,
            password: password
        }
    })
        .then(response => {
            console.log("RESPONSE", response.data)
            if (response.status === 200) {
                // login if user is successfully created
                login(email, password, setUser, setMessage);
            }
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