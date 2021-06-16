import React, { useEffect, useState, useContext, useRef } from 'react';
import Winwheel from 'winwheel';
import clsx from 'clsx';
import {
    Grid,
    IconButton,
    Box,
    Slide,
    Modal,
    makeStyles,
    Backdrop,
} from '@material-ui/core';

import { useHistory } from 'react-router';
import {
    GreenButton,
} from '../../assets/icons';

import { get, post } from '../../services/api';
import { AppContext, setAlert } from '../../Provider';

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
        position: 'relative',
        [theme.breakpoints.down("md")]: {
            backgroundImage: "none",
        },
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: 'center center',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none !important',
    },
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
    instructions: {
        textAlign: 'center',
        // position: 'absolute',
        // left: '16%',
        // top: '15%',
        // [theme.breakpoints.down("md")]: {
        // left: '10px',
        // top: '10px',
        // },
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

function Wheel() {

    const classes = useStyles();
    const history = useHistory();
    const canvasEl = useRef(null);
    const [, dispatch] = useContext(AppContext);
    const [gifts, setGifts] = useState(null);
    const [prize, setPrize] = useState(null);
    const [introSlide, setIntroSlide] = useState(true);


    // const [images, setImages] = useState([]);

    // function loadImages(sources){
    //     for (let i = 0; i < sources.length; i++){
    //         let _image = new Image();
    //         _image.src = sources[i];
    //         _image.onload = function(){
    //             canvasEl.current.wheelImage = _image;
    //             canvasEl.current.draw();
    //         };
    //     }
    // }
    const createSpin = async () => {
        // dispatch({ type: "START_LOADING" });
        const response = await post("/createSpin", null, true);
        if (response.status === 201) {
            const giftItem = response.data.giftItem;
            setPrize(giftItem);
            if (!giftItem) {
                calculatePrize(gifts.length + 1);
            } else {
                calculatePrize(1);
            }
        } else {
            setAlert(dispatch, "Error", response.data, "error");
        }
        // dispatch({ type: "STOP_LOADING" });
    }

    async function handleStart() {
        // send the spin request at this point.
        await createSpin();
        canvasEl.current.startAnimation();
    }

    window.handleFinish = function () {
        history.push({
            pathname: '/result',
            state: {
                data: prize,
            }
        });
    }

    function setupCanvas(data) {
        canvasEl.current = new Winwheel({
            'responsive': true,
            'drawText': true,
            'numSegments': data.length + 1,
            'fillStyle': '#ffffff',
            'lineWidth': 5,
            'imageDirection': 'S',
            'segments':
                [
                    ...data,
                    {
                        'textFontSize': '20',
                        'image': 'http://unsplash.it/120/160?gravity=center',
                        'text': 'Nothing'
                    }
                ],
            'animation':
            {
                'type': 'spinToStop',
                'duration': 15,
                'spins': 20,
                'callbackFinished': 'window.handleFinish()',
            }
        });
    }

    function calculatePrize(index) {
        let stopAt = canvasEl.current.getRandomForSegment(index);
        canvasEl.current.animation.stopAngle = stopAt;
    }

    useEffect(() => {

        const fetchGifts = async () => {
            dispatch({ type: "START_LOADING" });

            const response = await get("/getGift", true);
            if (response.status === 200) {

                const giftItems = response.data["giftItems"];
                let wheelData = giftItems.map(giftItem => ({ 
                    text: giftItem.type,
                    textFontSize: 20,
                    image: giftItem.image_url,
                }))
                setGifts(wheelData);
                setupCanvas(wheelData);
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
        }

        fetchGifts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={10} md={7}>
                <Box className={clsx(classes.mainArea, 'mx-auto')}>
                    <img src="/win-pointer.png" alt="pointer" className={classes.pointer} />
                    <IconButton onClick={handleStart} className={classes.starter}>
                        <GreenButton />
                    </IconButton>
                    <canvas ref={canvasEl} id='canvas' width={400} height={400} className={classes.canvas}>
                        Canvas not supported, use another browser.
                    </canvas>
                </Box>
            </Grid>
            <Modal
                disableAutoFocus={true}
                className={classes.modal}
                open={introSlide}
                onClose={() => setIntroSlide(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Slide direction="up" in={introSlide} mountOnEnter unmountOnExit>
                    <Box minWidth="320px" px={2} py={2} style={{
                        boxShadow: "0px 2px 8px rgba(49, 45, 44, 0.2)",
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                    }}>
                        <Box className={classes.instructions}>
                            <img src="/spin-to-win.png" alt="spin to win logo" width="82" />
                            <Box my={2} className="text-14"><b>Click the Green button at the centre of the <br /> spin wheel to spin</b></Box>
                            <Box onClick={() => setIntroSlide(false)} p={1} className="text-link text-red">Got it</Box>
                        </Box>
                    </Box>
                </Slide>
            </Modal>
        </Grid>
    )
}

export default Wheel;

// https://medium.com/techno101/crud-using-node-js-express-and-sequelize-82c10ef3b346