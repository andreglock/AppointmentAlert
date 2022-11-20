import axios from 'axios';
import GlobalConfig from '../dev.json';

export default async function getAlerts() {
    const url = GlobalConfig.endpoint;
    let alerts;
    let errorMessage;
    const token = localStorage.getItem('authToken');

    await axios.get(url + '/alerts',
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            alerts = response.data;
        })
        .catch(error => {
            if (error.response) {
                // If token is unauthorized
                if (error.response.status === 401) {
                    errorMessage = 401;
                    return;
                }
            }
            errorMessage = error;
        });
    if (alerts) {
        return { success: true, result: alerts }
    } else {
        return { success: false, result: errorMessage }
    }
}