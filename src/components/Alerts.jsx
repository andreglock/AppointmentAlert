import { useEffect, useState } from 'react';
import getAlerts from '../libs/getAlerts.js';
import CreateAlert from './CreateAlert';
import Alert from './Alert';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import '../scss/Alerts.scss';

export default function Alerts (props) {
    const [ alerts, setAlerts] = useState(false);
    console.log('Universes:', alerts);
    // This state controls the modal "CreatePage":
    const [ showCreatePage, setShowCreatePage] = useState(false);
  
    const [ user, setUser ] = useContext(UserContext);

    useEffect(() => {
        let rootRequest;
        async function fetchData () {
            rootRequest = await getAlerts({ isRoot: true });
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

    return <div className="universePageContainer">
        <header>
            <h1>Welcome {user.userName}</h1>
        </header>
        {alerts ? <>
            <div className="universesContainer">
            {alerts.length ? <h2>My universes</h2> : null}
            {showCreatePage ?
                <CreateAlert 
                    setShow={setShowCreatePage}
                    show={showCreatePage}
                    isRoot={true}
                    items={alerts}
                    setItems={setAlerts}
                /> :
                <button className="universePageButton" onClick={() => setShowCreatePage(true)}>
                    New universe
                </button>
            }
            </div>
            {/* check if length is not 0 */}
            {alerts.length ? 
                    alerts.map(universe => <Alert key={universe._id}
                        universe={universe} universes={alerts} setUniverses={setAlerts}
                    />)
                 :
            /* If request goes through and it's an empty array */
            <p>You don't have any universes</p>}
            </> : <div>Loading universes...</div>
        }
    </div>;
}