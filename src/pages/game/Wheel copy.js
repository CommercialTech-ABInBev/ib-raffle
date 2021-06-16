import React, { useState, useEffect, useRef } from 'react';
import Winwheel from 'winwheel';
import clsx from 'clsx';
import {
    Grid,
    Box,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
    BackIconLarge,
} from '../../assets/icons';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        minHeight: "667px",
        overflowY: "auto",
        backgroundColor: '#45130F',
        backgroundImage: "url('/background-frame.png')",
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '80%',
        backgroundPosition: 'center center',
        [theme.breakpoints.down("md")]: {
            backgroundImage: "none",
        },
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: 'center center',
        },
    },
    mainArea: {
        width: '450px',
        position: 'relative',
        height: '450px',
    },
}));

function Wheel() {

    const classes = useStyles();
    const canvasEl = useRef(null);

    // const [images, setImages] = useState([]);
    
    function loadImages(sources){
        // let _images = [];
        for (let i = 0; i < sources.length; i++){
            let _image = new Image();
            _image.src = sources[i];
            _image.onload = function(){
                canvasEl.current.wheelImage = _image;
                canvasEl.current.draw();
            };
            // _images.push(_image);
        }
        // setImages(images);
    }
    
    // Set the image source, once complete this will trigger the onLoad callback (above).
    // loadedImg.src = "some_image.png";

    
    useEffect(() => {
        canvasEl.current = new Winwheel({
            // drawMode: 'image',
            numSegments: 4,
            fillStyle: '#ffffff',
            // outerRadius: 346,    
            // centerX: 200, 
            // centerY: 0,
            lineWidth: 5,
            segments:
                [
                    { text: 'Prize One' },
                    { text: 'Prize Two' },
                    { text: 'Prize Three' },
                    { text: 'Prize Four' }
                ],
            animation:
            {
                type: 'spinToStop',
                duration: 5,
                spins: 8
            }
        });
    }, []);

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={10} md={7}>
                <Box className={clsx(classes.mainArea, 'mx-auto')}>
                    <img src="/win-pointer.png" alt="pointer" style={{
                        width: '35px',
                        height: 'auto',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-17.5px',
                        top: '0',
                    }} />
                    <canvas ref={canvasEl} id='canvas' width='450' height='450'>
                        Canvas not supported, use another browser.
                    </canvas>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Wheel;