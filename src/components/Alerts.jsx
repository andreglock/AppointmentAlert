import { useEffect, useState } from 'react';
import getAlerts from '../libs/getAlerts.js';
import CreateAlert from './CreateAlert';
import Alert from './Alert';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import '../scss/Alerts.scss';

export default function Alerts (props) {
    const [ alerts, setAlerts] = useState(false);
    const setUser = useContext(UserContext)[1];

    useEffect(() => {
        let rootRequest;
        async function fetchData () {
            rootRequest = await getAlerts();
            if (rootRequest.success) {
                setAlerts(rootRequest.result);
            } else if (rootRequest.result === 401 ) {
                // token is unauthorized => log out
                localStorage.clear();
                setUser(null);
            } else {
                console.log(rootRequest.result);
            }
        };
        fetchData();
    }, [setUser]);

    return <div>
        {alerts ? <>
            <div className="universesContainer">
            {alerts.length ? <h2>My Alerts</h2> : null}
            </div>
            {/* check if length is not 0 */}
            {alerts.length ? 
                    alerts.map(alert => <Alert key={alert.id}
                        alert={alert} alerts={alerts} setAlerts={setAlerts}
                    />)
                 :
            /* If request goes through and it's an empty array */
            <p>You don't have any alerts set yet.</p>}
            </> : <div>Loading alerts...</div>
        }
    </div>;
}