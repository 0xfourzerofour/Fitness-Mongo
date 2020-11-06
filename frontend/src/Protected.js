import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Context from './Context/User';

//This is the component that protects our private routes from being accessed by
//a user that is not logged in.

//we check to see if the context user data has been updated to a valid user
//if the user is valid, the requested component will render and if not they
//will be redirected to the signin page.

const Protected = ({ component: Component, ...rest }) => {
  const { userData } = useContext(Context);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userData.user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default Protected;
