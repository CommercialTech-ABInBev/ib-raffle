import React, { useState, useEffect, useContext } from 'react';

import {
    Box,
    Table,
    Container,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

import { BellIconLarge } from '../../assets/icons';
import { AppContext, setAlert } from '../../Provider';
import { formatAMPM } from '../../helper/utility';
import { get } from '../../services/api';

function Notifications() {
    const [, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const fetchGifts = async () => {
            setLoading(true);
            dispatch({ type: "START_LOADING" });
            
            const response = await get("/getNotification", true);
            if (response.status === 200) {
                const { notification } = response.data;
                setNotifications(notification);
            } else {
                setAlert(dispatch, "Error", response.data, "error");
            }
            dispatch({ type: "STOP_LOADING" });
            setLoading(false);
        }

        fetchGifts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <Container maxWidth="lg">
            <Box mt={6} mb={3} className="text-24 text-brown bold">Notifications</Box>
            <Box mb={10} px={3} py={1} className="table-container">
                {notifications ?
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
                    :
                    <Box py={7} textAlign="center">
                        <BellIconLarge />
                        <Box my={3}>
                            You have no notification, when you do they will appear here
                        </Box>
                    </Box>
                }
            </Box>
        </Container>
    )
}

export default Notifications;