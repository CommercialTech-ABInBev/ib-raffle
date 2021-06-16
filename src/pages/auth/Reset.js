import React, { useState } from 'react';
import {
    Grid,
    Box,
    makeStyles,
} from '@material-ui/core';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        minHeight: "667px",
        overflowY: "auto",
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

function Reset() {

    const classes = useStyles();
    // const history = useHistory();
    const [sent] = useState(false);
    // const [state, setState] = React.useState({
    //     email: '',
    //     password: '',
    // });

    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.value });
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     if (state.password.length >= 8 && /\d+/.test(state.password) && /[A-Za-z]+/.test(state.password)) {
    //         localStorage.setItem("authenticated", "true");
    //         history.push("/dashboard");
    //     }
    // }

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={7} md={5}>
                <Box className={classes.rightArea}>
                    {!sent ?
                        <>
                            <Box my={3} className={'text-center text-white text-28'}><b>Enter your email address to reset password</b></Box>
                            <Box mb={5}>
                                <Box mb={4}>
                                    <label className="text-white text-16"><b>Email Address</b></label>
                                    <input
                                        className="form-control game text-16"
                                        name="email"
                                        type="email"
                                        // value={state.email}
                                        // onChange={handleChange}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box mt={5} className="text-right">
                                <button type="submit" className="text-16 primary-button"><b>Continue</b></button>
                            </Box>
                        </>
                        :
                        <Box>
                            <Box my={4} className={'text-yellow-light text-28'}><b>Check your Mailbox</b></Box>
                            <Box mb={4} className={'text-yellow-light text-20'}>
                                We just sent you an email with a link to reset your password. <br />Please click on the link to reset your password.
                            </Box>
                            <Box mt={4} mb={3} className="text-white text-16">Remember your password? <Link to="/auth/login" className="text-yellow"><b><u>Login</u></b></Link></Box>
                        </Box>
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Reset;