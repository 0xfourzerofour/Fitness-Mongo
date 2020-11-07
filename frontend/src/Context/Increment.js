import React, {useContext} from 'react'; 

import Context from './User'; 



function Increment(){
  const {userData, setUser } = useContext(Context); 

  setUser(userData.user.sessions + 1 );

}

export default Increment()