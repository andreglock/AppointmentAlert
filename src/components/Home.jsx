import UserContext from '../contexts/UserContext';
import { useContext, useState } from 'react';
import CreateAlert from './CreateAlert';
import Header from './Header';
import Alerts from './Alerts';


export default function Home () {
  const [ user ] = useContext(UserContext);
  const [ showCreate, setShowCreate] = useState(false);
  const [isCreateAlertSuccess, setIsCreateAlertSuccess] = useState(false)

  return <div id='homeContainer'>
    <Header />
    <Alerts isCreateAlertSuccess={isCreateAlertSuccess}/>
    <button className="universePageButton" onClick={() => setShowCreate(true)}>
      New alert
    </button>
    {showCreate ? 
      <CreateAlert 
        setShow={setShowCreate}
        show={showCreate}
        isCreateAlertSuccess={isCreateAlertSuccess}
        setIsCreateAlertSuccess={setIsCreateAlertSuccess}
      /> 
      : null
    }
    
  </div>
}