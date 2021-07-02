import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    Grid,
    Box,
    makeStyles,
} from '@material-ui/core';
import { AppContext, setAlert } from '../../Provider';
import { Link } from 'react-router-dom';

import {
    AbILogo,
} from '../../assets/icons';
import { get } from '../../services/api';


const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        minHeight: "667px",
        overflowY: "auto",
        backgroundColor: '#45130F',

        [theme.breakpoints.up("lg")]: {
            backgroundImage: "url('/background-frame.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '80%',
        },
    },
    rightArea: {
        [theme.breakpoints.down("sm")]: {
            padding: '1rem',
        },
    },
    linkArea: {
        flexDirection: 'reverse',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
        },
    },
    titleText: {
        color: 'rgba(43, 45, 66, 1)',
        fontWeight: "bold",
        fontSize: "1.5em",
    },
    customFormControl: {
        background: 'rgba(250, 250, 250, 1) 0% 0% no-repeat padding-box',
        border: '1px solid rgba(141, 153, 174, 1)',
        borderRadius: '4px',
    }
}));

function Home() {

    const classes = useStyles();
    const [state, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [spinData, setSpinData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            dispatch({ type: "START_LOADING" });

            const response = await get("/userSpinCheck", true);
            if (response.status === 200) {
                setSpinData(response.data);
            } else {
                setError(response.data);
                setAlert(dispatch, "Error", response.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
            setLoading(false);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    if (loading) {
        return <></>;
    }

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={5}>
                <Box className={clsx(classes.rightArea, 'text-center')}>
                    <Box my={3} className={'text-white text-48'}>
                        <img src="/spin-to-win.png" alt="spin to win logo" width="240" />
                    </Box>
                    <Box className="text-yellow text-28 heavy mb-5">{state.username}</Box>
                    <>
                        {error ?
                            <p className="text-white"><b>{error === "Network Error" ? "Are you connected to the internet?" : error}</b></p>
                            :
                            spinData?.haveSpunned ?
                                <Link to={{
                                    pathname: '/result',
                                    state: {
                                        data: spinData.item,
                                    },
                                }} className="d-inline-block primary-button text-16 mb-5">
                                    <b>MY PRIZE</b>
                                </Link>
                                :
                                <Link to="/spin" className="d-inline-block primary-button text-16 mb-5">
                                    <b>PLAY NOW</b>
                                </Link>
                        }
                        <br />
                    </>
                    <Link to="/instructions" className="d-inline-block primary-button text-16 mb-5">
                        <b>SEE INSTRUCTIONS</b>
                    </Link>
                    <br />
                    <button type="button" onClick={handleLogout} className="primary-button text-16 mb-5">
                        <b>LOGOUT</b>
                    </button>
                    <br />
                    <Box mb={.5} className="medium text-white text-14">©2021</Box>
                    <AbILogo />
                </Box>
            </Grid>
        </Grid >
    )
}

export default Home;