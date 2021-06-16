import React, { useContext } from "react";
import clsx from 'clsx';
import { Box, Hidden, IconButton } from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

import MobileMenu from './MobileMenu';

import { AppContext } from '../Provider';
import {
GiftIcon,
  HomeIcon,
  PeopleIcon,
  BellIcon,
  WheelIcon,
  Hamburger,
} from '../assets/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0px 4px 16px rgba(89, 85, 84, 0.15)',
    backgroundColor: '#FFFFFF',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 9,
    padding: theme.spacing(1, 5),
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(5),
    color: '#9799A0',
    fontSize: '.875rem',
    cursor: 'pointer',

    '&.active': {
      color: '#B11F24',
    },

    '& > span': {
      marginLeft: theme.spacing(1),
    },

    '&:last-child': {
      marginLeft: 'auto',
    },

  },
}));

function Header() {

  const classes = useStyles();
  const location = useLocation();
  const [, dispatch] = useContext(AppContext);

  const isActive = (url, exact = false) => {
    if (exact) {
      return location.pathname === url;
    }
    return location.pathname.startsWith(url);
  }

  const getColor = (url, exact = false) => {
    return isActive(url, exact) ? "#B11F24" : "#9799A0";
  }

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setMobileMenuOpen(true);
  }

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  }

  const handleLogout = () => {
    localStorage.clear("token");
    dispatch({ type: "LOGOUT" });
  }


  return (
    <Box className={classes.root}>
      <Box mr={6} className="text-link text-20 text-red bold">
        <Link to="/admin">
          <img src={'/spin-to-win-logo.png'} alt="spin to win logo" style={{
            width: '48px',
            height: 'auto',
          }} />
        </Link>
      </Box>
      <Hidden smDown>
        <Link to="/admin" className={clsx(classes.navItem, isActive("/admin", true) && "active")}>
          <HomeIcon fill={getColor("/admin", true)} />
          <span>Home</span>
        </Link>
        <Link to="/admin/gifts" className={clsx(classes.navItem, isActive("/admin/gifts") && "active")}>
          <GiftIcon fill={getColor("/admin/gifts")} />
          <span>Gifts</span>
        </Link>
        <Link to="/admin/winners" className={clsx(classes.navItem, isActive("/admin/winners") && "active")}>
          <PeopleIcon fill={getColor("/admin/winners")} />
          <span>Winners</span>
        </Link>
        <Link to="/admin/spins" className={clsx(classes.navItem, isActive("/admin/spins") && "active")}>
          <WheelIcon stroke={getColor("/admin/spins")} />
          <span>Spins</span>
        </Link>
        <Link to="/admin/notifications" className={clsx(classes.navItem, 'ml-auto', isActive("/admin/notifications") && "active")}>
          <BellIcon fill={getColor("/admin/notifications")} />
          <span>Notifications</span>
        </Link>
        <button type="button" onClick={handleLogout} className={clsx(classes.navItem)}>
          Logout
        </button>
      </Hidden>
      <Hidden mdUp>
        <Box ml="auto">
          <IconButton onClick={handleMenuOpen}>
            <Hamburger />
          </IconButton>
        </Box>
      </Hidden>
      <MobileMenu open={mobileMenuOpen} logout={handleLogout} closeMenu={handleMenuClose} />
    </Box>
  );
}

export default Header;