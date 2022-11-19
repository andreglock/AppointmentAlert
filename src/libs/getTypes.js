import axios from "axios";
import GlobalConfig from '../dev.json';


export default async function getTypes (params) {
    let types;
    let errorMessage;
    const token = localStorage.getItem('authToken');
    const url = GlobalConfig.endpoint;

    await axios.get(url + '/types',
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: params
    })
        .then(response => {
            console.log('response :>> ', response);
            types = response.data;
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
    if (types) {
        return types
    } else {
        return { success: false, result: errorMessage }
    }
}