import { useEffect, useState } from 'react';
import getItems from '../libs/getItems.js';
import CreateAlert from './CreateAlert';
import UniverseCard from './UniverseCard';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import '../scss/UserMenu.scss';

export default function UserMenu (props) {
    const [ universes, setUniverses] = useState(false);
    console.log('Universes:', universes);
    // This state controls the modal "CreatePage":
    const [ showCreatePage, setShowCreatePage] = useState(false);
  
    const [ user, setUser ] = useContext(UserContext);

    useEffect(() => {
        let rootRequest;
        async function fetchData () {
            rootRequest = await getItems({ isRoot: true });
            if (rootRequest.success) {
                setUniverses(rootRequest.result);
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
        {universes ? <>
            <div className="universesContainer">
            {universes.length ? <h2>My universes</h2> : null}
            {showCreatePage ?
                <CreateAlert 
                    setShow={setShowCreatePage}
                    show={showCreatePage}
                    isRoot={true}
                    items={universes}
                    setItems={setUniverses}
                /> :
                <button className="universePageButton" onClick={() => setShowCreatePage(true)}>
                    New universe
                </button>
            }
            </div>
            {/* check if length is not 0 */}
            {universes.length ? 
                    universes.map(universe => <UniverseCard key={universe._id}
                        universe={universe} universes={universes} setUniverses={setUniverses}
                    />)
                 :
            /* If request goes through and it's an empty array */
            <p>You don't have any universes</p>}
            </> : <div>Loading universes...</div>
        }
    </div>;
}