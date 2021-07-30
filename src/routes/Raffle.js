import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import Spin from '../pages/raffle/Spin';
import Winners from '../pages/raffle/Winners';
import Landing from '../pages/raffle/Landing';

function RaffleRoute() {

    return (
        <>
            <Switch>
                <Route path="/winners" component={Winners} />
                <Route path="/spin" component={Spin} />
                <Route path="/" component={Landing} />
                <Redirect to="/" />
            </Switch>
        </>
    )
}

export default RaffleRoute;