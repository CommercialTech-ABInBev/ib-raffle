import React, { useState, useContext } from 'react';
import {
    Grid,
    Box,
    IconButton,
    makeStyles,
    CircularProgress,
} from '@material-ui/core';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import {
    ShowIcon,
    HideIcon,
} from '../../assets/icons';

import { post } from '../../services/api';
import { AppContext, setAlert } from '../../Provider';

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

function Signup() {

    const [, dispatch] = useContext(AppContext);
    const classes = useStyles();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [registered, setRegistered] = useState(false);

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!verifiedEmail) {
            
            const response = await post('/auth/mailCheck', { email: formData.email });
            
            if (response.status === 200) {
                setVerifiedEmail(true);
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }

        } else {
            
            const response = await post('/auth/signup', {
                email: formData.email,
                password: formData.password
            });
            
            if (response.status === 201) {
                setRegistered(true)
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }
        }
        setLoading(false);
    }

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={6}>
                <Box className={classes.rightArea}>
                    <form onSubmit={handleSubmit}>
                        {!registered ?
                            <>
                                <Box my={3} className={'text-center text-white text-48'}><b>{verifiedEmail ? "Create your password" : "Enter your email address"}</b></Box>
                                <Box mb={5}>
                                    <Box mb={4}>
                                        <label className="text-white text-16"><b>Email Address</b></label>
                                        <input
                                            className="form-control game text-16"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </Box>
                                    {verifiedEmail &&
                                        <Box position="relative">
                                            <label className="text-white text-16"><b>Password</b></label>
                                            <input
                                                className="form-control game text-16"
                                                name="password"
                                                type={show ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleChange}
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
                                    }
                                </Box>
                                <Grid container className={classes.linkArea}>
                                    <Grid item xs={12} lg={8}>
                                        <Box mt={3} mb={3} className="text-white text-16">Have an account? <Link to="/auth/login" className="text-yellow"><b><u>Log in</u></b></Link></Box>
                                    </Grid>
                                    <Grid item xs={12} lg={4} className="text-right">
                                        <Box className="text-right">
                                            <button type="submit" className="text-16 primary-button">
                                                <b>
                                                    {loading ?
                                                        <CircularProgress size="1rem" style={{ color: "#FFFFFF" }} />
                                                        :
                                                        !verifiedEmail ? "Continue" : "Finish"}
                                                </b>
                                            </button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </>
                            :
                            <Box className="text-center">
                                <Box my={4} className={'text-yellow text-28'}><b>Account successfully created!</b></Box>
                                <Box mb={8} className={'text-yellow-light text-20'}>
                                    You have succesfully created your acount, you can now proceed to your account by logging in, Cheers to spinning
                                </Box>
                                <Box>
                                    <Link to="/auth/login" className="text-16 primary-button"><b>Login</b></Link>
                                </Box>
                            </Box>
                        }
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Signup;