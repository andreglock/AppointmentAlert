import axios from 'axios';

export default async function createItem (type, startDate, endDate) {
    let errorMessage;
    let alerts;
    const token = localStorage.getItem('authToken');

    await axios.post('/createAlert', {
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