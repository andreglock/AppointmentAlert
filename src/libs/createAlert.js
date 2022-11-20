import axios from 'axios';
import GlobalConfig from '../endpoint.json';


export default async function createAlert (type, startDate, endDate) {
    let errorMessage;
    const token = localStorage.getItem('authToken');
    const url = GlobalConfig.endpoint;
    console.log('type, startDate, endDate :>> ', type, startDate, endDate);
    await axios.post(url + '/alerts', {
        alert: {
            type: type,
            startDate: startDate,
            endDate: endDate,
            active: true
        }
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
        })
        .catch(error => {
            errorMessage = error;
        });
    if (errorMessage) {
        console.log('errorMessage from createAlert', errorMessage)
        return { success: false, result: 'You have created an invalid alert, make sure to select the type and time frame range' }
    } else {
        return { success: true, result: `You will receive email notifications now. If you do not see the emails, check your “junk mail” folder or “spam” folder.` }
    }
}