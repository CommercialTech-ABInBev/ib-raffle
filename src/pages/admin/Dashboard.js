import React, { useContext, useState, useEffect } from 'react';

import clsx from 'clsx';

import {
    Grid,
    Box,
    Table,
    Container,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';
import {
    WheelIconLarge,
    GiftIconLarge,
    RecieveIcon,
    SpinnerIcon,
    PeopleIcon,
} from '../../assets/icons';
import { get } from '../../services/api';
import { AppContext, setAlert } from '../../Provider';
import { formatAMPM } from '../../helper/utility';


const useStyles = makeStyles((theme) => ({
    statBox: {
        padding: theme.spacing(4, 5),
        boxShadow: '0px 24px 56px -16px rgba(215, 61, 66, 0.7)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: '1rem',

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2, 4),
            fontSize: '.8rem',
        }
    },
    bgRed: {
        background: 'url(/assets/circles.png) right bottom no-repeat, linear-gradient(96.95deg, #CD2F34 1.39%, #CD2F34 4.85%, #CD2F34 4.87%, #CD2F34 28.77%, #D3373C 62.58%, #D3393E 68.15%, #D43A3F 73.71%, #D63D42 84.14%, #DE494E 99.44%, #DE494E 102.22%, #DE494E 109.87%, #DE494E 116.13%, #DE494E 121%, #DE494E 130.04%, #DE494E 130.05%)',
    },
    bgBlue: {
        background: 'url(/assets/circles.png) right bottom no-repeat, linear-gradient(96.96deg, #466AE8 -13.59%, #3256D5 75.25%)',
    },
    figure: {
        fontSize: '1.75rem',
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    breakdown: {
        marginLeft: theme.spacing(13),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(6),
        },
    },
    actionLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4, 3, 2),
        background: '#FFFFFF',
        border: '0.5px solid #1F51B1',
        borderRadius: '4px',

        '&:hover': {
            borderColor: '#1FB19F',
        },
    },
}));



function Dashboard() {
    const classes = useStyles();
    const [, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState(null);
    const [stats, setStats] = useState({
        totalGiftItems: null,
        totalGiftsIssued: null,
        totalOutstandingGifts: null,
        totalSpin: null,
        wins: null,
        loses: null,
    });



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            dispatch({ type: "START_LOADING" });
            
            const response1 = await get("/getNotification", true);
            const response2 = await get("/spinAndGiftAux", true);
            if (response1.status === 200) {
                const { notification } = response1.data;
                setNotifications(notification.slice(0, 3));
            } else {
                setAlert(dispatch, "Error", response1.data, "error");
            }

            if (response2.status === 200) {
                const { data } = response2.data;
                setStats(data);
            } else {
                setAlert(dispatch, "Error", response2.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
            setLoading(false);
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <Container maxWidth="lg">
            <Box my={3} className="text-24 text-black bold">Home</Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box className={clsx(classes.statBox, classes.bgRed)}>
                        <WheelIconLarge style={{ width: 56, height: 56 }} />
                        <Box ml={2}>
                            <Box>Total Spins</Box>
                            <Box className={classes.figure}>{stats.totalSpin ?? '-'}</Box>
                        </Box>
                        <Box className={classes.breakdown}>
                            <Box>Wins</Box>
                            <Box className={classes.figure}>{stats.wins ?? '-'}</Box>
                            <Box mt={3}>Losses</Box>
                            <Box className={classes.figure}>{stats.loses ?? '-'}</Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className={clsx(classes.statBox, classes.bgBlue)}>
                        <GiftIconLarge style={{ width: 56, height: 56 }} />
                        <Box ml={2}>
                            <Box>Total Gifts</Box>
                            <Box className={classes.figure}>{stats.totalGiftItems ?? '-'}</Box>
                        </Box>
                        <Box className={classes.breakdown}>
                            <Box>Gifts Issued</Box>
                            <Box className={classes.figure}>{stats.totalGiftsIssued ?? '-'}</Box>
                            <Box mt={3}>Gifts Outstanding</Box>
                            <Box className={classes.figure}>{stats.totalOutstandingGifts ?? '-'}</Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={5} mb={3} className="text-20 text-grey70">Quick Actions</Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Link to="/admin/gifts/create" className={clsx(classes.actionLink)}>
                        <RecieveIcon style={{ width: 40, height: 40 }} />
                        <Box mt={2}>
                            Create a gift
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Link to="/admin/spins" className={clsx(classes.actionLink)}>
                        <SpinnerIcon style={{ width: 40, height: 40 }} />
                        <Box mt={2}>
                            Check all spins
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Link to="/admin/winners" className={clsx(classes.actionLink)}>
                        <PeopleIcon fill="#7A1FB1" style={{ width: 40, height: 40 }} />
                        <Box mt={2}>
                            View winners
                        </Box>
                    </Link>
                </Grid>
            </Grid>
            <Box mt={6} mb={3} className="text-20 text-grey70">Latest Notifications</Box>
            <Box mb={10} px={3} py={1} className="table-container">
                <TableContainer>
                    <Table className="mui-table" aria-label="data table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Box className="text-14 bold text-black">Description</Box></TableCell>
                                <TableCell><Box className="text-14 bold text-black">Date</Box></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notifications && notifications.map((notification, index) => {
                                return (
                                    <TableRow key={`${notification.message}-${index}`}>
                                        <TableCell component="th" scope="row"><Box className="text-16 text-grey70">{notification.message}</Box></TableCell>
                                        <TableCell><Box className="text-16 black-2">{formatAMPM(notification.createdAt)}</Box></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
}

export default Dashboard;