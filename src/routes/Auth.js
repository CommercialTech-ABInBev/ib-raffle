import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Login from '../pages/auth/Login';
import Reset from '../pages/auth/Reset';
import Signup from '../pages/auth/Signup';
import SetPassword from '../pages/auth/SetPassword';

function AuthRoute() {

    return (
        <Switch>
            <Route exact path="/auth/set-password" component={SetPassword} />
            <Route exact path="/auth/reset" component={Reset} />
            <Route exact path="/auth/signup" component={Signup} />
            <Route exact path="/auth/login" component={Login} />
            <Redirect to="/auth/login" />
        </Switch>
    )
}

export default AuthRoute;