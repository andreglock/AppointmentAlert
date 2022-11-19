import UserContext from '../contexts/UserContext';
import { useContext, useState } from 'react';

export default function Header () {
  const [ user, setUser ] = useContext(UserContext);
  const [ showCreate, setShowCreate] = useState(false);

  return <header>
    <div>
      Logged in as {user.userEmail}
    </div>
    <div id="itemPageLogout" onClick={() => {
      localStorage.clear();
      setUser(null);
    }}>
      Logout
    </div>
</header>
}