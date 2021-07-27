import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Typing from 'react-typing-animation';

function SpinNotice({ spinning, completed, started, prize, setStarted }) {
    let component = null;

    if (started) {
        component = <Box mb={4} className={'text-dark-brown text-center text-48'}><b>Click the <span className="text-red">{prize.type}</span> to <br /> start the draw</b></Box>
    } else if (completed) {
        component = (
            <Box pl={6}>
                <Box className={'text-dark-brown text-48'}><b>The draw for <span className="text-red">{prize.type}</span> is up!</b></Box>
                <Box mt={5}><button onClick={() => setStarted(true)} className="text-16 primary-button"><b>Start Now!</b></button></Box>
            </Box>
        )
    } else if (spinning) {
        component = (
            <Box display="flex" pl={6} className={'text-dark-brown text-48'}>
                <b>
                    Selecting gift.
                </b>
                <Typing hideCursor loop speed={1000}>
                    <b>...</b><Typing.Reset count={1} delay={0} />
                </Typing>
            </Box>
        );
    } else {
        component = (
            <Box pl={6}>
                <Box className={'text-dark-brown text-48'}><b>Spin to select the raffle category</b></Box>
                <Box component="p" mt={3} className="text-dark-brown-2 text-20">
                    Click on the green button
                    in the middle to randomly choose a category
                </Box>
            </Box>
        )
    }

    return component;
}

export default SpinNotice;