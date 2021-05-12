import React from 'react';

import {
    Grid,
    Box,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
} from '@material-ui/core';

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Pagination from '../../components/Pagination';
import { cflew } from '../../helper/utility';
import { query } from '../../services/api';

const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
    mainArea: {
        backgroundColor: '#F6F6F6',
    },
    statBox: {
        padding: theme.spacing(2.5, 3.5, 5),
    },
    table: {
        minWidth: 650,
        border: 'none',
    },
    iconBox: {
        borderRadius: '11px',
        width: '41px',
        height: '43px',
        padding: theme.spacing(1),
        display: 'inline-block',
        verticalAlign: 'middle',
        '& > img': {
            width: '100%',
            height: 'auto',
        }
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        backgroundColor: '#DDDBDB',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
    },
}));


function Species() {
    const classes = useStyles();

    const [data, setData] = React.useState({
        results: [],
        next: "",
        prev: "",
        count: 0,
    });

    React.useEffect(() => {
        async function getData() {
            let { payload } = await query("species");
            setData(payload);
        };

        getData();
    }, []);

    const { results, next, prev, count } = data;

    return (
        <>
            <Pagination
                count={results.length}
                total={count}
                next={next}
                prev={prev}
                title="species"
            />
            <Box mt={3.5} px={3.5}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box px={3} py={5} className="table-container">
                            <TableContainer>
                                <Table className={classes.table} aria-label="data table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Box className="text-16 medium grey"></Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Name</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Classification</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Designation</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Avergae Height</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Average Lifespan</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Eye colors</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Hair colors</Box></TableCell>
                                            <TableCell><Box className="text-16 medium grey">Language</Box></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {results && results.map((specie, index) => {
                                            return (
                                                <TableRow key={`${specie.name}-${index}`}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={false}
                                                            icon={<span className={classes.icon} />}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row"><Box className="text-16 black-2">{cflew(specie.name)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.classification)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.designation)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.average_height)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.average_lifespan)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.eye_colors)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.hair_colors)}</Box></TableCell>
                                                    <TableCell><Box className="text-16 black-2">{cflew(specie.language)}</Box></TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default Species;