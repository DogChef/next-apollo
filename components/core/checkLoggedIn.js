import React from 'react';
import { UserContext } from '../../contexts/user';

function CheckLoggedIn() {
  return(
    // <Sidebar/>
    <UserContext.Consumer>
      {user => (
      	<div>
        	<h1>{JSON.stringify(user)}</h1>
        	<h2>Funciono!</h2>
      	</div>
      )}
    </UserContext.Consumer>
  );
}

export default CheckLoggedIn;
