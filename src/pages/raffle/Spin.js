import React, { useEffect, useState, useContext, useRef } from 'react';
import {
    Grid,
    IconButton,
    Box,
    Container,
    makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AppContext, setAlert } from '../../Provider';
import {
    get,
    // post
} from '../../services/api';
import Wheel from '../../components/Wheel';
import Footer from '../../components/Footer';
import SpinNotice from '../../components/SpinNotice';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(109.78deg, #FFF5D6 21.58%, #FFDDE6 63.23%)',
        minHeight: '100vh',
    },
    container: {
        height: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center'

    },
}));


function Spin() {
    const classes = useStyles();
    const [gifts, setGifts] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [started, setStarted] = useState(false);
    const [prize, setPrize] = useState(null);
    const [, dispatch] = useContext(AppContext);

    useEffect(() => {

        const fetchGifts = async () => {
            dispatch({ type: "START_LOADING" });

            const response = await get("/getGift", true);
            if (response.status === 200) {

                let _data = response.data.data["gifts"];
                setGifts(_data);
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
        }

        fetchGifts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container direction={started ? "column" : "row"} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <SpinNotice completed={completed} spinning={spinning} setStarted={setStarted} started={started} prize={prize} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {started ?
                            <Link to={{
                                pathname: "/winners",
                                state: { prize },
                            }}>
                                <img src={require(`../../assets/images/${prize.type}.png`).default} alt="gift item" className="img-fluid d-block mx-auto" style={{ width: '80%' }} />
                            </Link>
                            :
                            completed ?
                                <img src={require(`../../assets/images/Unboxed-${prize.type}.png`).default} alt="two people unwrapping gifts" className="img-fluid" />
                                :
                                <Wheel gifts={gifts} spinning={spinning} setSpinning={setSpinning} setPrize={setPrize} setCompleted={setCompleted} />
                        }
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    )
}


export default Spin;
