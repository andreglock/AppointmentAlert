import UserContext from '../contexts/UserContext';
import { useContext, useState } from 'react';
import CreateAlert from './CreateAlert';
import Header from './Header';
import Alerts from './Alerts';


export default function Home () {
  const [ user ] = useContext(UserContext);
  const [ showCreate, setShowCreate] = useState(false);

  return <div id='homeContainer'>
    <Header />
    <Alerts />
    <button className="universePageButton" onClick={() => setShowCreate(true)}>
      New alert
    </button>
    {showCreate ? 
      <CreateAlert 
        setShow={setShowCreate}
        show={showCreate}
      /> 
      : null
    }
    
  </div>
}