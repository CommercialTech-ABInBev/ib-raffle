
import React, { useContext } from 'react';
import { AppContext } from '../Provider';
import { Redirect, Route } from 'react-router-dom'


const CustomRoute = ({ component: Component, adminOnly, userOnly, isPrivate, ...rest }) => {
    const [state] = useContext(AppContext);

    // for users trying to visit a private route when not logged in
    // send them to the login screen
    if (!state.isAuthenticated && isPrivate) {
        return <Redirect to={"/auth"} />;
    }  
    
    // for users trying to visit a public route when logged in
    // send them to their respective homepages
    if (state.isAuthenticated && !isPrivate){
        if (state.isAdmin){
            return <Redirect to={"/admin"} />;
        } else {
            return <Redirect to={"/"} />;
        }
    }

    // you are authenticated at this point.
    // you are trying to access a normal page at this point
    // if you are not an admin, but you're trying to access an admin endpoint
    // we'll send you home
    if (!state.isAdmin && adminOnly){
        return <Redirect to={"/"} />;
    }

    if (state.isAdmin && userOnly) {
        return <Redirect to={"/admin"} />;
    }

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
}

export default CustomRoute;
