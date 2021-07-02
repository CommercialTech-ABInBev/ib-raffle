import React from 'react';
import {
    Grid,
    Box,
    makeStyles,
} from '@material-ui/core';

const {REACT_APP_API_URL} = process.env;

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        minHeight: "667px",
        overflowY: "auto",
        backgroundColor: '#45130F',
        backgroundImage: "url('/large-wheel.png'), url('/background-frame.png')",
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '25%, 80%',
        backgroundPosition: 'left center, center center',
        [theme.breakpoints.down("sm")]: {
            backgroundImage: "url('/large-wheel.png'), none",
            backgroundPosition: '-15% -20%, center center',
        },
    },
    rightArea: {
        marginBottom: '15%',
        textAlign: 'center',

        [theme.breakpoints.down("sm")]: {
            padding: '1rem',
        },
    },
}));

function Login() {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={5}>
                <Box className={classes.rightArea}>
                    <Box my={3} className={'text-center text-white text-40'}><b>Login to Play</b></Box>
                    <Box mt={8}><a href={`${REACT_APP_API_URL}/v1.0/api/auth/login`} className="text-16 primary-button"><b>Login with Magic</b></a></Box>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Login;