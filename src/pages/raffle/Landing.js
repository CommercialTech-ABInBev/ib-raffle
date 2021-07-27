import React from 'react';
import {
    Grid,
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';
import Hero from '../../assets/images/hero-image.png';
// import AbInbevLogo from '../../assets/images/AB-Inbev-Logo.png';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

// const { REACT_APP_API_URL } = process.env;

const useStyles = makeStyles(theme => ({
    root: {
        background: 'url(/confetti.png) top left no-repeat, url(/confetti-faded.png) bottom left no-repeat, linear-gradient(109.78deg, #FFF5D6 21.58%, #FFDDE6 63.23%)',
        minHeight: '100vh',
    },
    container: {
        height: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
    },
    leftArea: {
        paddingLeft: '6rem',
    },
}));

function Landing() {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.root}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container item justifyContent="center" alignItems="center">
                        <Grid item xs={12} className="text-right">
                            <Link to="/admin" className="text-24 text-dark-brown">
                                Go to admin page
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.leftArea}>
                            <Box className={'text-dark-brown text-48'}><b>Welcome to the Draw</b></Box>
                            <Box component="p" mt={3} className="text-dark-brown-2 text-20">
                                Your chance to win juicy gifts lies on the big wheel.
                                <br />
                                Feeling lucky? Let's give the wheel a spin.
                                <br />
                                <ul>
                                    <li>The wheel will be spinned for each gift</li>
                                    <li>Names of lucky winner would appear immediately</li>
                                </ul>
                            </Box>
                            <Box component="p" mt={4} mb={4} className="text-dark-brown-2 text-24">Goodluck!</Box>
                            {/* <Box mt={4}><a href={`${REACT_APP_API_URL}/v1.0/api/auth/login`} className="text-16 primary-button"><b>Let’s get started</b></a></Box> */}
                            <Link to="/spin" className="text-16 primary-button">
                                <b>Let’s get started</b>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img src={Hero} alt="two people unwrapping gifts" className="img-fluid" />
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </Box>
        </>
    )
}

export default Landing;