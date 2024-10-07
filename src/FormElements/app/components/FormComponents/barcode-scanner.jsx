import React from 'react';
import { Button, FormHelperText, FormLabel, Grid, IconButton, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import Box from '@mui/material/Box';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
            asterisk: {color:"red"},
            },
        },
    },
})
const useStyles = makeStyles({
    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        backgroundColor: '#fff',
        outline: 'none',
    },
    container: {
        display: 'flex',
        alignItem: 'center',
        justifyContent:'space-between',
        border:'1px solid #00000061',
        backgroundColor:'#F1F6F8',
        borderRadius:'4px',
        height: '80px'
    },
    child: {
        border: '1px solid #cecece',
        borderRadius: '5px',
        alignSelf: 'center',
        marginLeft: '12px',
        padding: "0 5rem"
    },
    subChild: {
        border: '1px solid #cecece',
        borderRadius: '5px',
        alignSelf: 'center',
        marginLeft: '12px',
        padding:`4px 2px`
    },
    popupStyle: {
        width: '400px',
        height: '300px',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding:`4px 2px`

    },
})

const V5BarcodeScanner = (props) => {
    const { data, formik, fontFamily } = props;
    const [open, setOpen] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState('');
    const classes = useStyles();
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const handleOpen = () => { setOpen(true); } 
    const handleClose = () => { setOpen(false); }
    const saveImageSrc = (src) => { setImgSrc(src); }

    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormLabel sx={{ fontSize: "14px", fontFamily:fontFamily}} component="legend" required={data.customOptions.required}>{data.label}</FormLabel>
                <Grid className={classes.container}>
                    <Grid item xs={12} sm={5} className={`${imgSrc ? classes.child : classes.subChild} py-3 pl-2`} >
                        {imgSrc !== '' ? (
                            <Typography style={{ fontFamily: fontFamily }}>{imgSrc}</Typography>
                        ) : <Typography component="span" style={{ fontFamily: fontFamily }} >{formik.values[data.id] ? formik.values[data.id] : data.label}</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={5} style={{ display: 'flex' }} justifyContent="center" >
                        {
                            !formId && !editable &&
                        <IconButton aria-label="Desktop View" onClick={() => { handleOpen() }} >
                            <CameraAltTwoToneIcon />
                        </IconButton>
                        }
                    </Grid>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={handleClose}
                    >
                        <Box className={classes.modalStyle}>
                            <BarcodeScanner
                                data={data}
                                formik={formik}
                                saveImageSrc={(src) => {
                                    handleClose()
                                    saveImageSrc(src)
                                }}
                            />
                        </Box>
                    </Modal>
                </Grid>
            </ThemeProvider>
        </Grid>
    )
}
export default V5BarcodeScanner

export function BarcodeScanner(props) {
    const { formik, data, fontFamily, primaryColor } = props;
    const [barcode, setBarcode] = React.useState('');
    const classes = useStyles();
    const deleteImage = () => { setBarcode('') };
    const saveImage = () => {
        props.saveImageSrc(barcode);
        formik.setFieldValue(data.id, barcode);
    }
    return (
        <>
            {barcode === '' ? (
                <>
                    <BarcodeScannerComponent width={400} height={300}
                        onUpdate={(err, result) => {
                            if (result) setBarcode(result.text)
                        }}
                    />
                    <FormHelperText style={{fontFamily:fontFamily}}>
                        Note: Scan the barcode with the camera
                    </FormHelperText>
                </>
            ) : (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.popupStyle} >
                            <Typography variant="h5" component="h5" style={{fontFamily:fontFamily}}>
                                {barcode}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={deleteImage}
                                style={{ marginTop: '10px', fontFamily:fontFamily, color:primaryColor }}
                            >
                                Rescan
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={saveImage}
                                style={{ marginTop: '10px', fontFamily:fontFamily, color:primaryColor }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}