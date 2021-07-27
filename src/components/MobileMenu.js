import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    IconButton,
    Box,
} from '@material-ui/core';

import { Close } from '../assets/icons';

import { Link, useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 99999,
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#ffffff',
    },
    navItem: {
        display: 'block',
        textAlign: 'center',
        color: '#9799A0',
        marginBottom: theme.spacing(3),
        fontSize: '2rem',
        cursor: 'pointer',

        '&.active': {
            color: '#B11F24',
        },
    },
    hidden: {
        display: 'none',
    },
    closeButton: {
        position: 'fixed',
        top: '16px',
        right: '16px',
    },
}));


const MobileMenu = ({ open, closeMenu, logout }) => {

    const classes = useStyles();
    const location = useLocation();

    const isActive = (url, exact = false) => {
        if (exact) {
            return location.pathname === url;
        }
        return location.pathname.startsWith(url);
    }

    return (
        <Box className={clsx(classes.root, {
            [classes.hidden]: !open
        })}>
            <Box className={classes.closeButton}>
                <IconButton onClick={closeMenu}>
                    <Close fill="#B11F24" stroke="#B11F24" />
                </IconButton>
            </Box>
            <Link to="/admin" onClick={closeMenu} className={clsx(classes.navItem, isActive("/admin", true) && "active")}>
                <span>Home</span>
            </Link>
            <Link to="/admin/gifts" onClick={closeMenu} className={clsx(classes.navItem, isActive("/admin/gifts") && "active")}>
                <span>Gifts</span>
            </Link>
            <Link to="/admin/winners" onClick={closeMenu} className={clsx(classes.navItem, isActive("/admin/winners") && "active")}>
                <span>Winners</span>
            </Link>
            {/* <Link to="/admin/spins" onClick={closeMenu} className={clsx(classes.navItem, isActive("/admin/spins") && "active")}>
                <span>Spins</span>
            </Link> */}
            <Link to="/" onClick={closeMenu} className={clsx(classes.navItem, isActive("/", true) && "active")}>
                <span>Go to user side</span>
            </Link>
            <Box textAlign="center">
                <button type="button" onClick={() => { closeMenu(); logout() }} className={clsx('d-inline text-red text-link')}>
                    Logout
                </button>
            </Box>
        </Box>
    )
}
export default MobileMenu;