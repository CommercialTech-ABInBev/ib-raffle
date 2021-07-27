import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import Pointer from '../assets/images/pointer.png';
import Winwheel from 'winwheel';
import {
    Grid,
    IconButton,
    Box,
    makeStyles,
} from '@material-ui/core';

import {
    GreenButton,
} from '../assets/icons';

const useWheelStyles = makeStyles(theme => ({
    mainArea: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: "url('/wheel-background.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        padding: theme.spacing(8),

        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(6),
        },
    },
    starter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-50px',
        marginLeft: '-50px',
        [theme.breakpoints.down("xs")]: {
            height: 56,
            width: 56,
            marginTop: '-33px',
            marginLeft: '-33px',
        },
    },
    canvas: {

        [theme.breakpoints.down("md")]: {
            height: 320,
            width: 320,
        },
        [theme.breakpoints.down("xs")]: {
            height: 250,
            width: 250,
        },
    },
    pointer: {
        width: '60px',
        height: 'auto',
        position: 'absolute',
        left: '50%',
        marginLeft: '-30px',
        top: '-30px',

        [theme.breakpoints.down("xs")]: {
            width: 45,
            marginLeft: -22.5,
            top: -10,
        },
    },
}));

let colors = ["#7DE6EF", "#E7706F", "#89F26E", "#EAE56F", "#FFF5D6"];

function Wheel({ gifts, spinning, setSpinning, setCompleted, setPrize }) {
    const wheelClasses = useWheelStyles();
    const canvasEl = useRef(null);
    // const [audio] = useState(new Audio('/tick.mp3'));

    async function handleStart() {
        // if already spinning, quit
        if (spinning) return;

        // get indexes of unissued gifts
        let indexes = gifts.reduce((filtered, gift, index) => {
            if (!gift.issued) {
                filtered.push(index);
            }
            return filtered;
        }, []);

        if (indexes.length === 0) return;

        let index = Math.floor(Math.random() * indexes.length);
        let stopAt = canvasEl.current.getRandomForSegment(indexes[index] + 1);
        canvasEl.current.animation.stopAngle = stopAt;
        setSpinning(true);
        canvasEl.current.startAnimation();
        setPrize(gifts[indexes[index]]);
    }

    window.handleFinish = function () {
        setSpinning(false);
        setCompleted(true);
    }

    // window.playSound = function () {
    //     audio.pause();
    //     audio.currentTime = 0;
    //     audio.play();
    // }

    function setupCanvas(data) {
        canvasEl.current = new Winwheel({
            'responsive': true,
            'drawText': true,
            'numSegments': data.length,
            'fillStyle': '#ffffff',
            'lineWidth': 5,
            'segments': [...data],
            'animation':
            {
                'type': 'spinToStop',
                'duration': 15,
                'spins': 20,
                // 'callbackSound': 'window.playSound()',
                'callbackFinished': 'window.handleFinish()',
            }
        });
    }

    useEffect(() => {
        if (gifts) {
            let wheelData = gifts.map((gift, index) => ({
                // fillStyle: gift.issued ? '#CCCCCC' : colors[index % colors.length],
                fillStyle: gift.issued ? '#CCCCCC' : '#FFFFFF',
                textFillStyle: gift.issued ? '#999999' : '#000000',
                text: gift.type,
                textFontSize: 20,
                type: gift.type,
            }));

            setupCanvas(wheelData);
        }
    }, [gifts])


    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={10} md={10}>
                <Box className={clsx(wheelClasses.mainArea, 'mx-auto')}>
                    <img src={Pointer} alt="pointer" className={wheelClasses.pointer} />
                    <IconButton onClick={handleStart} className={wheelClasses.starter}>
                        <GreenButton />
                    </IconButton>
                    <canvas ref={canvasEl} id='canvas' width={400} height={400} className={wheelClasses.canvas}>
                        Canvas not supported, use another browser.
                    </canvas>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Wheel;