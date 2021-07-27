import React, { useContext } from 'react';
import clsx from 'clsx';
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

import { post } from '../../services/api';
import { AppContext, setAlert } from '../../Provider';


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
    selectBox: {
        '&:hover': {
            borderColor: theme.palette.secondary.main,
            backgroundColor: 'transparent'
        },
    },
}));


function CreateGift() {
    const classes = useStyles();
    const [, dispatch] = useContext(AppContext);
    const initialState = {
        type: '',
        quantity: 1,
        preview: null,
        image: null,
    };

    const [formData, setFormData] = React.useState(initialState);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function handleImage(e) {
        e.preventDefault();
        let files = e.target.files;
        if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            return;
        }
        if (files.length === 0) {
            return;
        }
        setFormData({ ...formData, image: files[0], preview: URL.createObjectURL(files[0]) });
    }

    const handleCreate = async () => {

        dispatch({ type: "START_LOADING" });

        let _formData = new FormData();
        _formData.append('file', formData.image);
        _formData.append('type', formData.type);
        _formData.append('quantity', formData.quantity);

        const response = await post("/addGift", _formData, true, {
            'Content-Type': `multipart/form-data; boundary=${_formData._boundary}`,
        });
        if (response.status === 201) {
            setAlert(dispatch, "Success", "Gift created successfully", "success");
            setFormData(initialState);
        } else {
            setAlert(dispatch, "Error", response.data, "error");
        }
        dispatch({ type: "STOP_LOADING" });
    }

    const formComplete = formData.type
        && formData.quantity
        && (formData.quantity > 0)
        && formData.image
        && formData.preview;

    return (
        <Container maxWidth="sm">
            <Box my={6} position="relative">
                <Box className="text-28 text-brown bold text-center">Create a new gift</Box>
                <Link to="/admin/gifts" style={{
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    marginTop: '-16px',
                }}
                ><BackIconLarge fill="#B11F24" stroke="#B11F24" /></Link>
            </Box>
            <Box mt={5}>
                <Box mb={1} className="text-14">Choose a Gift Type</Box>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="" disabled>Select</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Television">Television</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Voucher $100">Voucher $100</option>
                    <option value="Voucher $50">Voucher $50</option>
                </select>
            </Box>
            <Box mt={5}>
                <Box mb={1} className="text-14">Enter Gift's Starting Quantity</Box>
                <input
                    name="quantity"
                    type="number"
                    min={1}
                    className={[classes.inputBox]}
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
            </Box>
            <Box mt={5}>
                <Box mb={1} className="text-14">Add image of gift</Box>
                <Box display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.imageUploadBox} w={1} h={10} py={{ xs: 2, md: 4 }}>
                    <input id="file" type="file" hidden value={""} onChange={handleImage} />
                    {formData.preview ?
                        <label htmlFor="file" className="text-center">
                            <img src={formData.preview} alt="uploaded item" style={{
                                width: 200,
                                height: 200,
                                objectFit: 'contain',
                            }} />
                            <Box mt={1} onClick={() => setFormData({
                                ...formData, preview: null, image: null,
                            })}
                                className={clsx('text-14 text-center text-red')}>Click to discard image
                            </Box>
                        </label>
                        :
                        <>
                            <Box className={classes.uploadOverlay}>
                                <label htmlFor="file">
                                    <UploadIcon
                                        style={{ cursor: 'pointer' }}
                                    />
                                </label>
                            </Box>
                            <Box mt={1} className={clsx('text-14 text-center semi-bold text-red')}>Click to upload the picture <br /> of the gift</Box>
                        </>
                    }
                </Box>
            </Box>
            <Box mt={5} mb={10}>
                <ButtonBase disabled={!formComplete} onClick={handleCreate} className="full-width btn-primary">
                    <Box className="text-20">
                        Create a Gift
                    </Box>
                </ButtonBase>
            </Box>
        </Container>
    )
}

export default CreateGift;