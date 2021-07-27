import { IconButton, Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
    Route,
    Redirect,
    Switch
} from "react-router-dom";
// import SpeakerIcon from '@material-ui/icons/Speaker';
import Spin from '../pages/raffle/Spin';
import Winners from '../pages/raffle/Winners';
import Landing from '../pages/raffle/Landing';

function RaffleRoute() {

    return (
        <>
            {/* <Box position="fixed" top="20px" left="20px">
                <IconButton onClick={() => setMuted(!muted)}>
                    <SpeakerIcon />
                </IconButton>
            </Box> */}
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