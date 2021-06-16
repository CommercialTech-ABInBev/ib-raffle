import React from 'react';
import clsx from 'clsx';
import {
    Grid,
    Box,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import {
    BackIconLarge,
} from '../../assets/icons';

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
        [theme.breakpoints.down("md")]: {
            backgroundImage: "url('/large-wheel.png'), none",
        },
        [theme.breakpoints.down("sm")]: {
            backgroundPosition: '-15% -20%, center center',
        },
    },
    rightArea: {
        marginTop: '8%',
        marginLeft: '10%',
        borderRadius: '30px',
        position: 'relative',

        [theme.breakpoints.down("sm")]: {
            marginTop: '30%',
            marginLeft: '0%',
            padding: '1rem',
        },
    },
    titleBar: {
        backgroundImage: "url('/title-background.png')",
        backgroundColor: '#B11F24',
        padding: theme.spacing(6, 5, 4),
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(4, 3, 2),
        },
    },
    content: {
        padding: theme.spacing(3, 5, 4),
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '30px',
    },
    parrot: {
        position: 'absolute',
        top: '-30px',
        right: '0',
        [theme.breakpoints.down('sm')]: {
            width: '50px',
            height: 'auto',
            top: '30px',
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

function Instructions() {

    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={10} md={7}>
                <Box className={classes.rightArea}>
                    <Box mb={2.5}>
                        <Link to="/" className="text-white text-28">
                            <BackIconLarge style={{
                                verticalAlign: 'middle',
                            }} fill="#FFFFFF" stroke="#FFFFFF" />
                            <b className="ml-3">Go Back</b>
                        </Link>
                    </Box>
                    <Box className={clsx(classes.titleBar, 'text-40 text-white')}>
                        <b>Instructions</b>
                    </Box>
                    <img src="/parrot.png" alt="parrot" className={classes.parrot} />
                    <Box className={clsx(classes.content, "bg-white text-red text-24")}>
                        <b>
                            A picture is worth a thousand words!
                            Except in this gallery, there are riddles on all of them.
                            ound the photos to
                            find one of the words you’ll need to unlock the answer!
                        </b>
                        <br />
                        <br />
                        <b>
                            A picture is worth a thousand words! Except in this gallery,
                            there are riddles on all of them.
                            You will need to jump around the photos.
                        </b>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Instructions;