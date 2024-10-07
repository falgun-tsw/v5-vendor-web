import React, { useRef, useEffect } from 'react'
import { IconButton, Grid, FormLabel, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, SwipeableDrawer } from '@mui/material'
import Box from '@mui/material/Box'
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles'
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import ImageIcon from '@mui/icons-material/Image'
import Modal from '@mui/material/Modal'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Webcam from 'react-webcam';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HelpIcon from '@mui/icons-material/Help';
import { fontFamily, styled } from '@mui/system'
import { config } from '@app/FormElements/config';
import { blue } from '@mui/material/colors';
import { useParams } from 'react-router-dom';


const { isProd } = config;
//..SCREENBUILDER ENDPOINT 
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.screenbuilder_api_endpoint;

const APIVERSION = "screenbuilder/api/v1";
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: 'red' },
            },
        },
    },
})

const DrawerRoot = styled(SwipeableDrawer)(() => ({
    "& .MuiBackdrop-root": {
        backgroundColor:"rgba(0, 0, 0, 0.65)"
    }
}))

const V5Photo = (props) => {
    const { data, formik, fontFamily, primaryColor } = props
    const useStyles = makeStyles({
        container: {
            height: 'auto',
            border: `1px dashed ${primaryColor}`,
            borderRadius: '8px',
            backgroundColor: `${primaryColor}${80}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px 0',
            fontFamily: fontFamily,
            flexWrap: "wrap",
            padding: "1rem"
        },
        containerOne: {
            height: '80px',
            border: `1px solid ${primaryColor}`,
            borderRadius: '8px',
            backgroundColor: `${primaryColor}${80}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#292929',
            margin: '10px 0',
            fontFamily:fontFamily
        },
        child: {
            display: "flex",
            flexDirection: "row",
            alignItems: "baseLine"
        },
        label: {
            fontWeight: '400',
            fontSize: '0.75rem',
        },
        cameraIcon: {
            marginRight: '25px',
            padding: '0',
        },
        modalStyle: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: "flex",
            flexDirection: "column",
            padding: '32px',
            backgroundColor: '#fff',
            outline: "none"
        },
        title: {
            fontSize: '12px'
        },
        camStyle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        iconButton: {
            marginRight: '5px',
            padding: '0',
        },
        deleteIcon: {
            position: 'relative',
            left: '100%',
            bottom: '1.5rem',
            color: 'white',
            padding: 0
        },
        paper: {
            '@media screen and (min-width: 800px)': {
                width: `calc((100% - 260px) / 3)`,
                marginLeft: `calc(((100% - 260px) / 3) + 260px)`,
                // marginBottom:'1rem',
                minHeight: '90%',
                padding: '5px'
            },
            '@media screen and (max-width: 799px)': {
                width: '100%',
                minHeight: '90%',
                padding: '5px'
            }
        },
    })
    const [open, setOpen] = React.useState(false);
    const [helpTextOpen, setHelpTextOpen] = React.useState(false);
    const [imageUpload, setImageUpload] = React.useState(false);
    const [dataGet, setDataGet] = React.useState(false);
    const [newImages, setNewImages] = React.useState([]);
    const [uniqueId, setUniqueId] = React.useState('');
    const [capturedBlob, setCapturedBlob] = React.useState('');
    const [capturedImage, setCapturedImage] = React.useState('');
    const dispatch = useDispatch();
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const { responseIds } = useSelector((state) => state.screenBuilder.file);
    const anchorRef = useRef(null)
    const modalSource = props.modalSource;

    const handleOpen = (imageUpload) => {
        setOpen(true);
        if (imageUpload) {
            setImageUpload(true);
        } else {
            setImageUpload(false);
        }
    };

    const setImageSrc = async (clickSource, imageFileObj, imageType) => {
        const previousImages = newImages.splice(0, newImages.length - 1);
        let uri = imageFileObj.imageSrc;
        const newImage = {
            imageUrl: uri
        }
        previousImages.push(newImage);

        switch (imageType) {
            case 'UPLOAD_IMAGE':
                setNewImages(previousImages);
                break;

            case 'CAPTURE_IMAGE':
                setNewImages(previousImages);
                break;
            default:
                break;
        }
    }
    const saveUploadImageSrc = (modalSource, src) => {
        setImageSrc(modalSource, src, 'UPLOAD_IMAGE');
        setDataGet(true);
        let formData = new FormData();
        formData.append('file', src);

        //Generating unique Id for setting up formik data
        const id = revisedRandId();
        setUniqueId(id);

        dispatch({
            type: "setUploadAction",
            file: formData,
            fileType: "IMAGE",
            name: id
        });
    }

    useEffect(() => {
        if (responseIds && Object.keys(responseIds).length) {
            formik.setFieldValue(data.id, responseIds[uniqueId]);
        }
    }, [responseIds]);

    useEffect(() => {
        if (formik.values[data.id]) {
            setDataGet(true);
            formik.setFieldValue(data.id, formik.values[data.id]);
        }
    }, [formik.values[data.id]]);

    function revisedRandId() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }

    const saveImageSrc = (modalSource, src) => {
        setImageSrc(modalSource, src, 'CAPTURE_IMAGE');
        setDataGet(true);
        let formData = new FormData();
        var file = new File([src], `${revisedRandId()}.jpg`, {
            type: src.type
        });
        formData.append('file', file);
        //Generating unique Id for setting up formik data
        const id = revisedRandId();
        setUniqueId(id);
        dispatch({
            type: "setUploadAction",
            file: formData,
            fileType: "IMAGE",
            name: id
        });


    }

    const handleClose = () => setOpen(false);
    const handleHelpOpen = () => setHelpTextOpen(true);
    const handleHelpClose = () => setHelpTextOpen(false);
    const handleDeleteVideo = () => {
        setDataGet(false);
        formik.setFieldValue(data.id, "");
    }
    const classes = useStyles();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <>
                    <FormLabel sx={{ fontSize: "14px" }} component="legend" required={data.customOptions.required}>{data.label}</FormLabel>
                    <Grid>
                        {!formId && !formik.values[data.id] ?
                            <Grid className={classes.container}>
                                <Grid className={`${classes.child} flex`}>
                                    {
                                        data.customOptions.isPhotoAvail &&
                                        <IconButton
                                            onClick={() => handleOpen(false)}
                                            className={classes.iconButton}
                                        >
                                            <Grid className={classes.camStyle}>
                                                <CameraAltTwoToneIcon />
                                                    <span className={classes.title}>Capture Photo</span>
                                            </Grid>
                                        </IconButton>
                                    }
                                    {
                                        data.customOptions.isPhotoUpload &&
                                        <IconButton
                                            onClick={() => handleOpen(true)}
                                            className={classes.iconButton}
                                        >
                                            <Grid className={classes.camStyle}>
                                                <ImageIcon />
                                                    <span className={classes.title}>Upload Photo</span>
                                            </Grid>
                                        </IconButton>
                                    }
                                    {/* {
                                        data.customOptions.isShowHelp &&
                                        <IconButton onClick={handleHelpOpen}>
                                            <Grid className={classes.camStyle}>
                                                <HelpIcon />
                                                <span className={classes.title}>Show Help</span>
                                            </Grid>
                                                <Modal
                                                    open={helpTextOpen}
                                                    onClose={handleHelpClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <p className='text-center'>{data.customOptions.helpText}</p>
                                                    </Box>
                                                </Modal>
                                        </IconButton>
                                    } */}
                                </Grid>
                                {/* <Grid className="w-full">
                                    {data.customOptions.isCommentsAvail && <TextField label="Comments" fullWidth className='mt-2' />}
                                </Grid>
                                <Grid className="w-full">
                                    {data.customOptions.isNotApplicable && <FormControlLabel
                                        control={<Checkbox name="notApplicable" color="primary" />}
                                        label="Not Applicable"
                                    />}
                                </Grid> */}
                                {/* <Grid className="w-full">
                                    {data.customOptions["isRadioGroup"] && <FormControl component="fieldset">
                                        <RadioGroup
                                            name="single-choice"
                                            // value={this.state.value}
                                            aria-label="Question Text"
                                            // onChange={(e) => this.handleChange(e)}
                                            row={data.customOptions.isSpreadToColumn}
                                        >
                                            {
                                                data.singleChoiceOptions.map(option => {
                                                    return <FormControlLabel
                                                        key={option.key}
                                                        label={option.label}
                                                        value={option.value}
                                                        control={<Radio color='primary' />}
                                                    />
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>}

                                </Grid> */}
                            </Grid> :
                            <Grid className={classes.containerOne}>
                                {
                                    // data[data.id] ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    //     <IconButton className={classes.deleteIcon}>
                                    //         {!formId && !editable && <DeleteOutlineIcon fontSize="small" onClick={handleDeleteVideo} />}
                                    //     </IconButton>
                                    //     <img src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${data[data.id]}`} height="78" />
                                    // </div> :
                                    formik.values[data.id] && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <IconButton className={classes.deleteIcon}>
                                            {!formId && !editable && <DeleteOutlineIcon fontSize="small" onClick={handleDeleteVideo} />}
                                        </IconButton>
                                            <img src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${formik.values[data.id]}`} height="78" />
                                    </div> 
                                }
                            </Grid>
                        }
                    </Grid>

                    <div ref={anchorRef} style={{ position: "relative" }}>
                        <DrawerRoot
                            anchor={'bottom'}
                            ref={anchorRef.current}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            classes={{ paper: classes.paper }}
                        >
                            <Box>
                                <ImageCaptureUpload photoUpload={imageUpload} formik={formik} data={data} saveUploadImageSrc={(src) => { handleClose(); saveUploadImageSrc(modalSource, src) }} saveImageSrc={(src) => { handleClose(); saveImageSrc(modalSource, src) }} />
                            </Box>
                        </DrawerRoot>
                    </div>
                </>
            </ThemeProvider>
        </Grid>
    )
}
export default V5Photo;


const ImageCaptureUpload = (props) => {
    const { photoUpload, formik, data, primaryColor, fontFamily } = props;
    const useStyles = makeStyles({
        buttonColor:{
            backgroundColor:primaryColor
        }
    })
    const classes = useStyles();
    const webcamRef = React.useRef(null)
    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";
    const [imgFileObj, setImgObj] = React.useState(null);
    const [sizeError, setSizeError] = React.useState(true);
    const [capturedImageURL, setCapturedImageURL] = React.useState("");
    const [capturedBlob, setCapturedBlob] = React.useState("");
    const [facingMode, setFacingMode] = React.useState(data.customOptions.cameraFacingOptions === "front" ? FACING_MODE_USER : data.customOptions.cameraFacingOptions === "rear" ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER);
    const videoConstraints = {
        facingMode: FACING_MODE_USER
    };

    const setCameraMode = React.useCallback(() => {
        setFacingMode(
            prevState =>
                prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
        );
    }, []);

    function base64ToBlob(base64, mime) {
        mime = mime || '';
        var sliceSize = 1024;
        var byteChars = window.atob(base64);
        var byteArrays = [];

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: mime });
    }

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        var base64ImageContent = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");
        let blob = base64ToBlob(base64ImageContent, "image/jpg");
        let imageURL = window.URL.createObjectURL(blob);
        setCapturedImageURL(imageURL);
        setCapturedBlob(blob)

        if (blob.size > 10000000) {
            setSizeError(false);
        } else {
            setImgObj(imageURL);
        }
    }, [webcamRef, setImgObj]);

    const deleteImage = () => {
        setImgObj(null);
    }
    const saveImage = () => {
        if (photoUpload) {
            props.saveUploadImageSrc(imgFileObj);
            formik.setFieldValue(data.id, imgFileObj.imageSrc);
        } else {
            props.saveImageSrc(capturedBlob);
            // formik.setFieldValue(data.id, imgFileObj.imageSrc);
        }
    }

    const handleImageUpload = (clickSource, e) => {
        const target = e.target;
        let file; let reader;

        if (target != undefined && target.files && target.files.length) {
            file = target.files[0];
            reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const imageSrc = reader.result;
                file.imageSrc = imageSrc;
                if (file.size > 10000000) {
                    setSizeError(false);
                } else {
                    setImgObj(file);
                }
            };
        }
    }
    const errorStyle = {
        color: "#f44336",
        fontSize: "0.75rem",
        fontWeight: "400",
        lineHeight: "1.66",
        letterSpacing: "0.03333em",
        fontFamily: fontFamily

    }
    return (
        <>
            {imgFileObj ?
                <img className='p-2' style={{ width: '100%', minHeight: '80vh', alignSelf: 'center' }}
                    src={imgFileObj.imageSrc ? imgFileObj.imageSrc : imgFileObj}
                />
                :
                <>
                    {
                        photoUpload ?
                            <>
                                <Button
                                    variant='contained'
                                    component='label'
                                    disableElevation
                                    className={classes.buttonColor}
                                    style={{ color: 'black', width: '95%', position: 'absolute', bottom: '10px' }}
                                >
                                    {"Choose Image to Upload"}
                                    <input
                                        type='file'
                                        accept={'image/*'}
                                        hidden
                                        onChange={(e) => handleImageUpload("isPhotoUpload", e)}
                                    />
                                </Button>
                                <span style={errorStyle} hidden={sizeError} >Max size should be less than 10mb.</span>
                            </> :
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                videoConstraints={{
                                    ...videoConstraints,
                                    facingMode
                                }}
                                screenshotFormat="image/jpg"
                                style={{ width: '100%', minHeight: '80vh' }}
                                className="p-2"
                            />
                    }
                </>

            }
            {
                imgFileObj ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={deleteImage}
                                style={{ marginTop: '10px', backgroundColor:primaryColor }}>
                                {!photoUpload ? `Recapture` : `CANCEL/REUPLOAD`}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={saveImage}
                                style={{ marginTop: '10px', backgroundColor:primaryColor }}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <>
                        {
                            !photoUpload &&
                            <>
                                <Button
                                    variant="contained"
                                    onClick={capture}
                                    fullWidth
                                    style={{color:primaryColor}}
                                >
                                    Capture photo
                                </Button>
                                {data.customOptions.cameraFacingOptions === "both" && <Button variant="contained"
                                    onClick={setCameraMode}
                                    fullWidth
                                    className='mt-3'
                                    style={{ color: primaryColor }}>Switch Camera</Button>}
                                <span style={errorStyle} hidden={sizeError} >Max size should be less than 10mb.</span>
                            </>
                        }
                    </>
            }
        </>
    );
};