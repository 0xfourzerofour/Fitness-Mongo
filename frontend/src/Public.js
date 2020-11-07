import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Context from './Context/User';

//This is the component that makes sure some of the pages are not accessible when we are
//logged into the applicaiton. This includes the signin, register and home page

//we check to see if the context user data has been updated to a valid user
//if the user is valid, the requested component will redirect to the user feed
//if not the component will load

const Public = ({ component: Component, ...rest }) => {
  const { userData, setUser } = useContext(Context.Consumer);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userData) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default Public;
