import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AbInbevLogo from '../assets/images/AB-Inbev-Logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    width: '100%',
    position: 'sticky',
    bottom: '40px',
    zIndex: 9,
    // padding: theme.spacing(1, 0),
  },
}));

function Footer() {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className="text-center">
        <Box component="p" mb={.5} className="text-white">&copy;2021</Box>
        <img src={AbInbevLogo} alt="ab-inbev" />
      </Box>
    </Box>
  );
}

export default Footer;