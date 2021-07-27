import React, { useEffect, useState, useContext } from 'react';

import {
    Box,
    Table,
    Container,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

import {
    withStyles, makeStyles
} from "@material-ui/core/styles";
import {
    DownloadIcon,
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
    titleBox: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));


function Winners() {
    const classes = useStyles();
    const [, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [winners, setWinners] = useState(null);

    useEffect(() => {
        const fetchWinners = async () => {
            setLoading(true);
            dispatch({ type: "START_LOADING" });
            const response = await get("/winners", true);
            if (response.status === 200) {
                const _winners = response.data["winners"];
                setWinners(_winners);
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
            setLoading(false);
        }

        fetchWinners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <Container maxWidth="lg">
            <Box mt={5} mb={10} px={3} py={1} className="table-container">
                <Box mb={2} className={classes.titleBox}>
                    <Box className="text-28 bold text-brown mr-auto">Winners</Box>
                    <AuthenticatedLink url='/winnerDownload' filename='winner-report.csv' >
                        <DownloadIcon />
                        <Box ml={1} className="text-16 medium text-grey70">Export</Box>
                    </AuthenticatedLink>
                </Box>
                <TableContainer>
                    <Table className="mui-table" aria-label="data table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Box className="text-18 text-black">Name</Box></TableCell>
                                <TableCell><Box className="text-18 text-black">Email Address</Box></TableCell>
                                <TableCell><Box className="text-18 text-black">Gift Won</Box></TableCell>
                                <TableCell><Box className="text-18 text-black">Date of Win</Box></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {winners && winners.map((winner, index) => {
                                return (
                                    <TableRow key={`winner-${winner.id}`}>
                                        <TableCell component="th" scope="row"><Box className="text-16 text-grey70">{winner.name}</Box></TableCell>
                                        <TableCell><Box className="text-16 text-grey70">{winner.email}</Box></TableCell>
                                        <TableCell><Box className="text-16 text-grey70">{winner.itemWon}</Box></TableCell>
                                        <TableCell><Box className="text-16 text-grey70">{formatAMPM(winner.dateWon)}</Box></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {!(winners && winners.length > 0) && <Box className="text-14 text-grey70 text-center" my={3} textAlign="center">There are currently no winners</Box>}
                </TableContainer>
            </Box>
        </Container>
    )
}

export default Winners;