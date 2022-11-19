import axios from 'axios';
import GlobalConfig from '../dev.json';

export default async function createAlert (type, startDate, endDate) {
    let errorMessage;
    let alerts;
    const token = localStorage.getItem('authToken');
    const url = GlobalConfig.endpoint;
    await axios.post(url + '/alerts', {
        type: type,
        startDate: startDate,
        endDate: endDate,
    },
    {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status !== 201 ) {
                errorMessage = response.message;
            }
            //TODO alerts = response.data._id;
            alert("Created successfully");
        })
        .catch(error => {
            errorMessage = error;
        });
    if (errorMessage) {
        return { success: false, result: errorMessage }
    } else {
        return { success: true, id: alerts }
    }
}