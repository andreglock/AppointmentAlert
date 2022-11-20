import axios from "axios";
import GlobalConfig from '../dev.json';

export default async function deleteAlert(id) {
    const url = GlobalConfig.endpoint;
    let result = { 
        message: '',
        success: false
    };
    const token = localStorage.getItem('authToken');
    const request = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        }
    };
    
    await axios.delete(url + '/alerts/' + id, request)
        .then(response => { 
            if ( response.status === 200 ) {
                result.message = response.data.message;
                result.success = true;
            }
        })
        .catch(error => result.message = error);

    return result;
}