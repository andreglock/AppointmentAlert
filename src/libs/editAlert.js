import axios from "axios";
import GlobalConfig from '../endpoint.json';

export default async function editItem(params) {
    const url = GlobalConfig.endpoint;
    let message = '';
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },
        body: params.body
    };
    
    await axios.put(url + '/alerts/' + params.id, request)
        .then(response => { 
            if ( response.status === 200 ) {
                message = response.data.message;
                return;
            }
        })
        .catch(error => message = error);

    return message;
}