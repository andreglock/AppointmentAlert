import UserContext from '../contexts/UserContext';
import { useContext, useState } from 'react';
import CreateAlert from './CreateAlert';


export default function Home () {
  const [ user ] = useContext(UserContext);
  const [ showCreate, setShowCreate] = useState(false);


  return <div>
    <h1>
      Welcome!
    </h1>
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