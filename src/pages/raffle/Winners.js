import React, { useState, useEffect, useContext } from 'react';
import { AppContext, setAlert } from '../../Provider';
import clsx from 'clsx';
import { 
    Grid,
    Box,
    Container, 
    makeStyles,
} from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom';
import Typing from 'react-typing-animation';
import { get } from '../../services/api';

// const soundFile = require('../../assets/music/Stand_Up_For_The_Champions.mp3').default;

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(109.78deg, #FFF5D6 21.58%, #FFDDE6 63.23%)',
    minHeight: '100vh',
  },
  confetti: {
    background: 'url(/confetti.png) top left repeat-x, linear-gradient(109.78deg, #FFF5D6 21.58%, #FFDDE6 63.23%)',
  },
  main: {
    flexWrap: 'wrap',
  },
  fixed: {
    padding: theme.spacing(2, 2),
    boxShadow: '0px 4px 22px rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    overflowY: "auto",
  }

}));

function Winners({ location }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [winners, setWinners] = useState([]);
  const [prize, setPrize] = useState(null);
  const [, dispatch] = useContext(AppContext);

  // const [muted] = useState(false);
  // const [isChrome, setChrome] = useState(false);

  // useEffect(() => {
  //     let check = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  //     setChrome(check);
  // }, []);

  const fetchWinners = async (id) => {
    dispatch({ type: "START_LOADING" });
    const response = await get(`/shareGift?id=${id}`, true);
    if (response.status === 200) {
      const _data = response.data["winners"];
      let _winners = _data.map(winner => winner.name);
      setLoading(false);
      setWinners(_winners);
    } else {
      setAlert(dispatch, "Error", response.data, "error");
    }
    dispatch({ type: "STOP_LOADING" });
  }


  useEffect(() => {
    if (!location.state) {
      return <Redirect to="/" />
    } else {
      setPrize(location.state.prize);
      fetchWinners(location.state.prize.id);
    }
  }, [])

  let delay = 5000;

  if (prize && prize.type.includes("Voucher")) {
    delay = 1000;
  }

  return (
    <Box className={clsx({ [classes.confetti]: finished }, classes.root)}>
      {/* {isChrome ?
                (!muted && <iframe title="audio-player-hidden" src={soundFile} allow="autoplay" style={{ display: 'none' }}></iframe>)
                :
                <audio autoPlay={true} loop muted={muted}>
                    <source src={soundFile} type="audio/ogg" />
                    <source src={soundFile} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            } */}
      <Container maxWidth="lg" className={classes.container}>
        <br />
        <br />
        <br />
        <br />
        {!loading && (
          <>
            <Box mb={3} className="text-center">
              <Box className="text-40 text-dark-brown">
                <b>{finished ?
                    <span>Congratulations to all winners of <span className="text-red">{prize.type}</span></span> : 'Winners'}
                </b>
              </Box>
            </Box>
            <Grid container alignItems="center" justifyContent={finished ? "space-evenly" : "space-between"} className={classes.main}>
              {!finished ?
                <>
                  <Grid item xs={12} sm={3}>
                    <img src={require(`../../assets/images/${prize.type}.png`).default} alt={prize.type} className="img-fluid" />
                    <Box mt={3} className={'text-red text-center text-32'}><b>{prize.type}</b></Box>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Box className="d-inline-block text-48 tag tag-large">
                      <b>
                        <Typing onFinishedTyping={() => setFinished(true)}>
                          {winners.map((name, index) => (
                            <Box key={`typing-${name}`}>
                              <span>{name}</span>
                              <Typing.Delay ms={delay} />
                              <Typing.Reset count={1} />
                            </Box>
                          ))}
                        </Typing>
                      </b>
                    </Box>
                  </Grid>
                </>
                :
                <>
                  <Grid className={classes.fixed}>
                    {winners.map(name => (<Box key={`key-${name}`} mb={1} mr={1} className="d-inline-block text-16 tag"><b>{name}</b></Box>))}
                  </Grid>
                  <Grid item xs={12} className="text-center">
                    <a href="/spin">
                      <Box mt={4} mb={6} className="d-inline-block text-16 primary-button"><b>Play again</b></Box>
                    </a>
                  </Grid>
                </>
              }
            </Grid>
          </>
        )}
      </Container>
    </Box>
  )
}

export default Winners;