import axios from 'axios';
import login from './login.js';

export default function register (email, password, setUser, setMessage) {
    axios.post('/register', {
        email: email,
        password: password
    })
        .then(response => {
            if (response.data.status === 201) {
                // login if user is successfully created
                login(email, password, false, setUser, setMessage);
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