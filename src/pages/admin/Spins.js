import React, { useEffect, useState, useContext } from 'react';
import clsx from 'clsx';

import {
    Grid,
    Box,
    Table,
    Container,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    WheelIconLarge,
    DownloadIcon,
    TrophyIconLarge,
    LossesIconLarge,
} from '../../assets/icons';

import { get } from '../../services/api';
import { AppContext, setAlert } from '../../Provider';
import { formatAMPM } from '../../helper/utility';
import AuthenticatedLink from '../../components/AuthenticatedLink';

const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
    statBox: {
        padding: theme.spacing(4, 3, 2),
        boxShadow: '0px 24px 56px -16px rgba(215, 61, 66, 0.7)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: '1rem',
    },
    bgRed: {
        background: 'url(/assets/circles.png) right bottom no-repeat, linear-gradient(96.95deg, #CD2F34 1.39%, #CD2F34 4.85%, #CD2F34 4.87%, #CD2F34 28.77%, #D3373C 62.58%, #D3393E 68.15%, #D43A3F 73.71%, #D63D42 84.14%, #DE494E 99.44%, #DE494E 102.22%, #DE494E 109.87%, #DE494E 116.13%, #DE494E 121%, #DE494E 130.04%, #DE494E 130.05%)',
    },
    bgBlue: {
        background: 'url(/assets/circles.png) right bottom no-repeat, linear-gradient(96.96deg, #466AE8 -13.59%, #3256D5 75.25%)',
    },
    bgBrown: {
        background: 'url(/assets/circles.png) right bottom no-repeat, #610457',
    },
    figure: {
        fontSize: '1.75rem',
        fontWeight: 700,
    },
    tag: {
        padding: theme.spacing(1, 2),
        width: 200,
        borderRadius: '24px',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: '.875rem',
    },
    redTag: {
        background: '#A11007',
    },
    greenTag: {
        background: '#07A129',
    },
    titleBox: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
}));


function Spins() {
    const classes = useStyles();
    const [, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [spinData, setSpinData] = useState(null);

    useEffect(() => {
        const fetchSpinData = async () => {
            setLoading(true);
            dispatch({ type: "START_LOADING" });
            const response = await get("/getSpin", true);
            if (response.status === 200) {
                const spinData = response.data["spinData"];
                setSpinData(spinData);
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
            setLoading(false);
        }

        fetchSpinData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <></>;
    }

    const totalSpins = spinData?.totalSpin;
    const totalWins = spinData?.wins;
    const totalLosses = spinData?.loses;
    const spins = spinData?.spins;

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Box className={clsx(classes.statBox, classes.bgBrown)}>
                            <WheelIconLarge />
                            <Box mt={2}>Total Spins</Box>
                            <Box mt={1} className={classes.figure}>{totalSpins??"-"}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={clsx(classes.statBox, classes.bgRed)}>
                            <TrophyIconLarge />
                            <Box mt={2}>Wins</Box>
                            <Box mt={1} className={classes.figure}>{totalWins ?? "-"}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={clsx(classes.statBox, classes.bgBlue)}>
                            <LossesIconLarge />
                            <Box mt={2}>Losses</Box>
                            <Box mt={1} className={classes.figure}>{totalLosses ?? "-"}</Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={12} mb={10} px={3} py={1} className="table-container">
                <Box mb={2} className={classes.titleBox}>
                    <Box className="text-28 bold text-brown mr-auto">People that spinned</Box>
                    <AuthenticatedLink url='/spinDownload' filename='spin-report.csv' >
                        <DownloadIcon />
                        <Box ml={1} className="text-16 medium text-grey70">Export</Box>
                    </AuthenticatedLink>
                </Box>
                <TableContainer>
                    <Table className="mui-table" aria-label="data table">
                        <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell><Box className="text-18 text-black">Name</Box></TableCell>
                                <TableCell><Box className="text-18 text-black">Email Address</Box></TableCell>
                                <TableCell><Box className="text-18 text-black">Spin Result</Box></TableCell>
                                <TableCell><Box className="text-18 text-black">Date of Spin</Box></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {spins && spins.map((spin, index) => {
                                let successSpin = spin.result !== "Didn't win";
                                return (
                                    <TableRow key={`spin-${spin.id}`}>
                                        <TableCell component="th" scope="row"><Box className="text-16 text-grey70">{spin.name}</Box></TableCell>
                                        <TableCell><Box className="text-16 text-grey70">{spin.email}</Box></TableCell>
                                        <TableCell><Box className={clsx(classes.tag, successSpin ? classes.greenTag : classes.redTag)}>{spin.result}</Box></TableCell>
                                        <TableCell><Box className="text-16 text-grey70">{formatAMPM(spin.spin_date)}</Box></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {spins && spins.length === 0 && <Box className="text-14 text-grey70 text-center" my={3} textAlign="center">There are currently no spins</Box>}
                </TableContainer>
            </Box>
        </Container>
    )
}

export default Spins;