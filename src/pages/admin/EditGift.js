import React from 'react';
import {
    Box,
    ButtonBase,
    Container,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';
import {
    BackIconLarge,
    UploadIcon,
} from '../../assets/icons';


const useStyles = makeStyles((theme) => ({
    inputBox: {
        borderRadius: '4px',
        width: '100%',
        border: '1px solid rgba(49, 45, 44, 0.6)',
        backgroundColor: 'transparent',
        outline: 'none !important',
        height: theme.spacing(6),
        fontWeight: '500',
        fontSize: '1rem',
        padding: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            height: theme.spacing(4),
        },
        '&:focus': {
            borderColor: "#F49C00",
            backgroundColor: 'transparent'
        },

        '&:not(:focus):valid': {
            backgroundColor: '#EFECE9',
        },
        '&:disabled': {
            backgroundColor: '#EFECE9',
            color: theme.palette.text.secondary,
        }
    },
    imageUploadBox: {
        background: '#F6EFF0',
        border: '1px dashed rgba(49, 45, 44, 0.6)',
        boxSizing: 'border-box',
        borderRadius: '8px'
    },
    uploadOverlay: {
        cursor: 'pointer',
        '& > input': {
            display: 'none'
        }
    },
}));


function EditGift() {
    const classes = useStyles();
    const handleUpload = null;
    return (
        <Container maxWidth="sm">
            <Box my={6} position="relative">
                <Box className="text-28 text-brown bold text-center">Edit Gift's Details</Box>
                <Link to="/admin/gifts" style={{
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    marginTop: '-16px',
                }}
                ><BackIconLarge /></Link>
            </Box>
            <Box mt={5}>
                <Box mb={1} className={classes.text3}>Edit Gift Name</Box>
                <input
                    name="giftName"
                    type="text"
                    className={[classes.inputBox]}
                    placeholder="TV set, Microwave or others"
                    // value={}
                    // onChange={(e) => handleInput(e)}
                    required
                />
            </Box>
            <Box mt={5}>
                <Box mb={1} className={classes.text3}>Edit Gift's Starting Quantity</Box>
                <input
                    name="startingQuantity"
                    type="number"
                    className={[classes.inputBox]}
                    placeholder="Enter quantity"
                    // value={}
                    // onChange={(e) => handleInput(e)}
                    required
                />
            </Box>
            <Box mt={5}>
                <Box mb={1} className={classes.text3}>Change Gift Image</Box>
                <Box display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.imageUploadBox} w={1} h={10} py={{ xs: 2, md: 4 }}>
                    <input id="file-input" type="file" hidden onChange={handleUpload} />
                    <Box className={classes.uploadOverlay}>
                        <label htmlFor="file-input">
                            <UploadIcon
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                    </Box>
                    <Box mt={1} className="text-16 text-red medium">Change Image</Box>
                </Box>
            </Box>
            <Box mt={5} mb={10}>
                <ButtonBase disabled className="full-width btn-primary">
                    <Box className="text-20">
                        Create a Gift
                    </Box>
                </ButtonBase>
            </Box>
        </Container>
    )
}

export default EditGift;