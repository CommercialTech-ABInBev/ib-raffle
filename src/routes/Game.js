import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";

import Home from '../pages/game/Home';
import Wheel from '../pages/game/Wheel';
import Result from '../pages/game/Result';
import Instructions from '../pages/game/Instructions';

function GameRoute() {

    return (
        <Switch>
            <Route exact path="/result" component={Result} />
            <Route exact path="/spin" component={Wheel} />
            <Route exact path="/instructions" component={Instructions} />
            <Route exact path="/" component={Home} />
        </Switch>
    )
}

export default GameRoute;