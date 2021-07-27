import React from 'react';
import {
    Grid,
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';
import LargeWheel from '../assets/images/large-wheel.png';
import Footer from '../components/Footer';

const { REACT_APP_API_URL } = process.env;

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(109.78deg, #FFF5D6 21.58%, #FFDDE6 63.23%)',
        minHeight: "100vh",
    },
    container: {
        height: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center'
    },
    leftArea: {
        paddingLeft: '6rem',
    },
}));

function Login() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.leftArea}>
                            <Box><a href={`${REACT_APP_API_URL}/v1.0/api/auth/login`} className="text-16 primary-button"><b>Login with Magic</b></a></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} className="text-right">
                        <img src={LargeWheel} alt="Large spinning wheel" className="img-fluid spinner-anim" style={{
                            width: '80%',
                        }} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    )
}

export default Login;