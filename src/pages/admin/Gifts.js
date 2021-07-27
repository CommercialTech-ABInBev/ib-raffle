import React, { useEffect, useState, useContext } from 'react';

import clsx from 'clsx';

import {
    IconButton,
    Grid,
    Hidden,
    Box,
    Table,
    Container,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ButtonBase,
    Popover,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';
import {
    GiftIconLarge,
    ShareIconLarge,
    DownloadIcon,
    PlusIcon,
    Share,
    Discovery,
    ListIcon,
    GridIcon,
} from '../../assets/icons';

import { get, del } from '../../services/api';
import { AppContext, setAlert } from '../../Provider';
import { formatAMPM } from '../../helper/utility';
import AuthenticatedLink from '../../components/AuthenticatedLink';

const MoreIcon = withStyles({
    root: {
        color: '#B11F24',
    },
})(MoreVertIcon);

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
    giftBox: {
        textAlign: 'center',
        width: '88px',
    },
    titleBox: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        flexWrap: 'wrap',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            '& > div, & > a': {
                margin: theme.spacing(1, 0),
                textAlign: 'center',
            },
        },
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2.5, 3, 2.5, 4),
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        boxShadow: '0px 4px 22px rgba(0, 0, 0, 0.05)',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            '& > div': {
                margin: theme.spacing(0, 0, 2),
                width: '100%',
                textAlign: 'left',
            }
        },
    },
}));


function Gifts() {
    const classes = useStyles();
    const [, dispatch] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [gridView, setGridView] = useState(false);
    const [gifts, setGifts] = useState(null);
    const [stats, setStats] = useState({
        totalGifts: null,
        totalGiftsIssued: null,
        totalOutstandingGifts: null,
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElConfirm, setAnchorElConfirm] = React.useState(null);
    const [selectedGift, setSelectedGift] = React.useState(null);

    const handleOpen = (event, gift) => {
        setSelectedGift(gift);
        setAnchorEl(event.currentTarget);
    }

    const handleDelete = async () => {
        dispatch({ type: "START_LOADING" });
        const response = await del(`/giftBulkDelete?type=${selectedGift.type}`, true);
        if (response.status === 200) {
            let _gifts = [...gifts].filter(gift => gift.type !== selectedGift.type);
            setGifts(_gifts);
        } else {
            setAlert(dispatch, "Error", response.data, "error");
        }
        dispatch({ type: "STOP_LOADING" });
        setAnchorEl(null);
        setAnchorElConfirm(null);
    }

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const fetchGifts = async () => {
            setLoading(true);
            dispatch({ type: "START_LOADING" });

            const response = await get("/getGift", true);
            if (response.status === 200) {
                const { data } = response.data;
                const {
                    gifts: giftItems,
                    totalGifts,
                    totalGiftsIssued,
                    totalOutstandingGifts
                } = data;

                setGifts(giftItems);
                setStats({ totalGifts, totalGiftsIssued, totalOutstandingGifts });
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
            <Box mt={5} display="inline-block" className="ml-auto">
                <Link to="/admin/gifts/create" className="btn action-button">
                    <PlusIcon />
                    <Box ml={1} className="text-16 medium text-white">Create a gift</Box>
                </Link>
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Box className={clsx(classes.statBox, classes.bgBrown)}>
                            <GiftIconLarge />
                            <Box mt={2}>Total Gifts</Box>
                            <Box mt={1} className={classes.figure}>{stats.totalGifts ?? '-'}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={clsx(classes.statBox, classes.bgRed)}>
                            <ShareIconLarge />
                            <Box mt={2}>Issued</Box>
                            <Box mt={1} className={classes.figure}>{stats.totalGiftsIssued ?? '-'}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box className={clsx(classes.statBox, classes.bgBlue)}>
                            <ShareIconLarge />
                            <Box mt={2}>Outstanding</Box>
                            <Box mt={1} className={classes.figure}>{stats.totalOutstandingGifts ?? '-'}</Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box mt={4} mb={10} px={3} py={1} className={clsx(!gridView && "table-container")}>
                <Box mb={2} className={classes.titleBox}>
                    <Box className="text-28 bold text-brown mr-auto">Gifts</Box>
                    <Box mr={2} className="btn text-14 text-link" onClick={() => setGridView(!gridView)}>
                        {gridView ? <ListIcon /> : <GridIcon />}
                        <Box ml={1} className="text-16 medium text-grey70">View as {gridView ? "List" : "Grid"}</Box>
                    </Box>
                    <AuthenticatedLink url='/giftDownload' filename='gift-report.csv' >
                        <DownloadIcon />
                        <Box ml={1} className="text-16 medium text-grey70">Export</Box>
                    </AuthenticatedLink>
                </Box>
                {gridView ?
                    <Grid container spacing={3}>
                        {gifts && gifts.map((gift, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} key={`gift-${gift.type}-${gift.totalSum}-${index}`}>
                                    <Box className={classes.card}>
                                        <Box className="text-center" width={.3} mt={2}>
                                            <img alt="gift" src={gift.image_url} style={{ width: 88, height: 48 }} />
                                            {/* <img src='https://placehold.it/88x48?text=image' alt='' /> */}
                                            <Box component="p" mt={3} className="semi-bold">{gift.type}</Box>
                                        </Box>
                                        <Box ml="auto" mr={2}>
                                            <Box className="center-y">
                                                <Share /><Box className="text-brown-light text-14" ml={.5}>Issued</Box>
                                            </Box>
                                            <Box mt={1} className="text-24 text-brown"><b>{gift.issued? "YES" : "NO"}</b></Box>
                                            {/* <Box mt={2} className="center-y">
                                                <Discovery /><Box className="text-brown-light text-14" ml={.5}>Outstanding</Box>
                                            </Box> */}
                                            <Box mt={1} className="text-24 text-brown"><b>{gift.outstanding}</b></Box>
                                        </Box>
                                        <Hidden xsDown>
                                            <MoreIcon className="text-link" onClick={(e) => handleOpen(e, gift)} />
                                        </Hidden>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                    :
                    <TableContainer>
                        <Table className="mui-table" aria-label="data table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><Box className="text-18 text-black">Gift Type</Box></TableCell>
                                    <TableCell><Box className="text-18 text-black">Starting Quantity</Box></TableCell>
                                    <TableCell><Box className="text-18 text-black">Issued</Box></TableCell>
                                    {/* <TableCell><Box className="text-18 text-black">Outstanding</Box></TableCell> */}
                                    <TableCell><Box className="text-18 text-black">Date Last Issued</Box></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gifts && gifts.map((gift, index) => {
                                    return (
                                        <TableRow key={`gift-${gift.type}-${gift.quantity}-${index}`}>
                                            <TableCell component="th" scope="row">
                                                <Box className={classes.giftBox}>
                                                    <img alt="gift" src={gift.image_url} style={{ width: 88, height: 48, objectFit: 'cover' }} />
                                                    {/* <img src='https://placehold.it/88x48?text=image' alt='' /> */}
                                                    <Box className="text-16 text-brown">{gift.type}</Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell><Box className="text-16 text-grey70">{gift.quantity}</Box></TableCell>
                                            <TableCell><Box className="text-16 text-grey70">{gift.issued? "YES" : "NO"}</Box></TableCell>
                                            {/* <TableCell><Box className="text-16 text-grey70">{gift.outstanding}</Box></TableCell> */}
                                            <TableCell><Box className="text-16 text-grey70">{formatAMPM(gift.updatedAt)}</Box></TableCell>
                                            <TableCell><IconButton onClick={(e) => handleOpen(e, gift)}><MoreIcon /> </IconButton></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        {!(gifts && gifts.length > 0) && <Box className="text-14 text-grey70 text-center" my={3} textAlign="center">There are currently no gifts</Box>}
                    </TableContainer>
                }
            </Box>
            <Popover
                id={Boolean(anchorEl) ? 'simple-popover' : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null)
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Box py={1} px={2} width={'120px'}>
                    {/* <Box p={1} className="text-14 medium text-link">Edit</Box> */}
                    <Box p={1} className="text-14 medium text-link" onClick={(e) => setAnchorElConfirm(e.currentTarget)}>Delete</Box>
                </Box>
            </Popover>
            <Popover
                id={Boolean(anchorElConfirm) ? 'confirm-popover' : undefined}
                open={Boolean(anchorElConfirm)}
                anchorEl={anchorElConfirm}
                onClose={() => {
                    setAnchorElConfirm(null)
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Box p={2} width="300px">
                    <Box mb={2} textAlign="center" className="text-14">
                        Are you sure you want to
                        Delete this Gift?
                    </Box>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item>
                            <ButtonBase onClick={() => handleDelete()}>
                                <Box p={1} className="text-link">
                                    Confirm
                                </Box>
                            </ButtonBase>
                        </Grid>
                        <Grid item>
                            <ButtonBase onClick={() => setAnchorElConfirm(null)}>
                                <Box p={1} className="text-link">
                                    Cancel
                                </Box>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </Container>
    )
}

export default Gifts;