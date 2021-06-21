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

    // createdAt: "2021-06-17T09:18:25.000Z"
    // email: "bud@ng.ab-inbev.com"
    // id: 65
    // name: null
    // result: "Won a $100 Gift Card"
    // spin_date: "2021-06-17T09:18:25.000Z"
    // updatedAt: "2021-06-17T09:18:26.000Z"

    if (!location.state) {
        return <Redirect to="/" />
    }

    const { data } = location.state;



    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={10} sm={7} md={4}>
                <Box className={classes.results}>
                    <Box className="text-white text-28"><b>{data ? "CONGRATULATIONS" : "Better luck next time"}</b></Box>
                    <Box mt={5} py={4} className={classes.display}>
                        {data ? <Box mb={2}><Confetti /></Box> : null}
                        <Box className="text-dark text-24"><b>{data ? `You've won a ${data.type}` : "You didn't win anything"}</b></Box>
                        {data && <img alt="gift" src={data.image_url} style={{ width: 150, height: 'auto' }} />}
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