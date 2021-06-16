import React, { useState } from 'react';
import {
    Grid,
    Box,
    IconButton,
    makeStyles,
} from '@material-ui/core';
// import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';

import {
    ShowIcon,
    HideIcon,
} from '../../assets/icons';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        minHeight: "667px",
        overflow: "hidden",
        backgroundColor: '#45130F',
        backgroundImage: "url('/large-wheel.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '25%',
        backgroundPosition: 'left center',
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: '-15% -20%',
        },
    },
    rightArea: {
        marginTop: '18%',
        marginLeft: '10%',

        [theme.breakpoints.down("sm")]: {
            marginLeft: '0%',
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

function SetPassword() {

    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [resetCompleted] = useState(true);


    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={6}>
                <Box className={classes.rightArea}>
                    {!resetCompleted ?
                        <>
                            <Box my={3} className={'text-center text-white text-48'}><b>Create your password</b></Box>
                            <Box mb={5}>
                                <Box mb={4} position="relative">
                                    <label className="text-white text-16"><b>Enter new password</b></label>
                                    <input
                                        className="form-control game text-16"
                                        name="password"
                                        type={show ? "text" : "password"}
                                        // value={state.email}
                                        // onChange={handleChange}
                                        placeholder="Enter password"
                                        required
                                    />
                                    <IconButton onClick={() => setShow(!show)} style={{
                                        position: 'absolute',
                                        right: '10px',
                                        bottom: '0px',
                                    }}>
                                        {!show ? <ShowIcon /> : <HideIcon />}
                                    </IconButton>
                                </Box>
                                <Box position="relative">
                                    <label className="text-white text-16"><b>Confirm new password</b></label>
                                    <input
                                        className="form-control game text-16"
                                        name="confirm-password"
                                        type={show2 ? "text" : "password"}
                                        // value={state.password}
                                        // onChange={handleChange}
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <IconButton onClick={() => setShow2(!show2)} style={{
                                        position: 'absolute',
                                        right: '10px',
                                        bottom: '0px',
                                    }}>
                                        {!show2 ? <ShowIcon /> : <HideIcon />}
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box mt={5} className="text-right">
                                <button type="submit" className="text-16 primary-button"><b>Create password</b></button>
                            </Box>
                        </>
                        :
                        <Box className="text-center">
                            <Box my={4} className={'text-white text-28'}>
                                <b>
                                    Your password has been <br />
                                    successfully reset!
                                </b>
                            </Box>
                            <Box>
                                <button type="submit" className="text-16 primary-button"><b>Continue</b></button>
                            </Box>
                        </Box>
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default SetPassword;