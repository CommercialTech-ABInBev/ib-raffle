
import React, { useContext } from 'react';
import { AppContext } from '../Provider';
import { Redirect, Route } from 'react-router-dom'


const CustomRoute = ({ component: Component, isPrivate, ...rest }) => {

    const [state] = useContext(AppContext);
    
    // for users trying to visit a private route when not logged in
    // send them to the login screen
    if (!state.isAuthenticated && isPrivate) {
        if (!document.cookie) {
            let token = window.location.search.split("=")[1];
            if (token) {
                let date = (new Date()).getTime() + 604800000;
                document.cookie = `token=${token}; expires=${date}`;
                return <Redirect to={"/"} />;
            }
        }
        return <Redirect to={"/login"} />;
    }
    
    // for users trying to visit a public route when logged in
    // send them to their respective homepages
    if (state.isAuthenticated && !isPrivate) {
        return <Redirect to={"/"} />;
    }
    
    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
}

export default CustomRoute;
