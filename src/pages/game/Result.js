import React from 'react';
import {
    Grid,
    Box,
    makeStyles,
} from '@material-ui/core';

import { Link, Redirect } from 'react-router-dom';

import {
    Confetti,
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
        position: 'relative',
        [theme.breakpoints.down("md")]: {
            backgroundImage: "none",
        },
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: 'center center',
        },
    },

    results: {
        // width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    display: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7E1',
        borderRadius: '48px',
    },
}));

function Result({ location }) {

    const classes = useStyles();
    debugger
    if (!location.state){
        return <Redirect to="/" />
    }

    const { data } = location.state;

    let prize = null;
    if (data && data.result !== "Didn't win") {
        prize = data.result
    }

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={10} sm={7} md={4}>
                <Box className={classes.results}>
                    <Box className="text-white text-28"><b>{prize ? "CONGRATULATIONS" : "Better luck next time"}</b></Box>
                    <Box mt={5} py={4} className={classes.display}>
                        {prize ? <Box mb={2}><Confetti /></Box> : null}
                        <Box className="text-dark text-24"><b>{prize ?? "You didn't win anything"}</b></Box>
                    </Box>
                    <Box mt={5}>
                        <Link to="/" className="d-inline-block primary-button text-16 mb-5">
                            <b>Go Home</b>
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Result;