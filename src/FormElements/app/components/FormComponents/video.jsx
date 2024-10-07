import React, { useEffect, useRef } from 'react';
import { Button, FormLabel, Grid, IconButton, SwipeableDrawer, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux';
import { config } from '@app/FormElements/config';

import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: "red" },
            },
        },
    },
})

const DrawerRoot = styled(SwipeableDrawer)(() => ({
    "& .MuiBackdrop-root": {
        backgroundColor:"rgba(0, 0, 0, 0.65)"
    }
}))

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

const V5Video = (props) => {
    const { data, formik, fontFamily, primaryColor } = props;
    // const webcamRef = useRef(null);
    const inputRef = useRef(null);
    const useStyles = makeStyles({
        buttonStyle: {
            border: `1px dotted ${primaryColor}`,
            borderRadius: '5px',
            backgroundColor: `${primaryColor}${80}`,
            display: 'flex',
            flexDirection: 'column',
            height: '10rem',
            justifyContent: "center",
            fontFamily:fontFamily,
            '&:hover': {
                backgroundColor: `${primaryColor}${80}`
            }
        },
        videoText: {
            color: 'black',
            opacity: 0.5,
            margin: 0,
            padding: 0,
            fontSize: '10px',
            fontFamily:fontFamily
        },
        inputStyle: {
            display: 'none',
            visibility: "hidden"
        },
        hoverBtnStyle: {
            padding: '1rem',
            "&:hover": {
                backgroundColor: `${primaryColor}${80}`
            }
        },
        drawer: {
            '@media screen and (min-width: 800px)': {
                width: `calc((100% - 260px) / 3)`,
                marginLeft: `calc(((100% - 260px) / 3) + 260px)`,
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
            },
        },
        deleteIcon: {
            position: 'relative',
            top: '-76px',
            right: '-340px',
            color: 'white',
            padding: 0
        },
    })
    const classes = useStyles();
    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";
    const [video, setVideo] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [recordingStart, setRecodingStart] = React.useState(false);
    const [recording, setRecording] = React.useState(false);
    const [userMediaRecorder, setUserMediaRecorder] = React.useState(null);
    const [chunks, setChunks] = React.useState([]);
    const [recordedVideo, setRecorderVideo] = React.useState("");
    const [recordingStop, setRecordingStop] = React.useState(false);
    const [uniqueId, setUniqueId] = React.useState('');
    const [videoUpload, setvideoUpload] = React.useState(false);
    const [recordedBlob, setRecordedBlob] = React.useState('');
    const dispatch = useDispatch();
    const { responseIds } = useSelector((state) => state.screenBuilder.file);
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
    const [resetCameraView, setResetCameraView] = React.useState(false);
    const [device, setDevice] = React.useState("Desktop");
    //custome code 
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [defaultVideoValue, setDefaultVideoValue] = React.useState(null);
    const isInitialMount = React.useRef(true);
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;

    let constraints = {
        video: true,
        audio: false,
        facingMode: facingMode
    };


    function revisedRandId() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }

    useEffect(() => {
        if (video)
        formik.setFieldValue([data.id], video);
    }, [video]);

    useEffect(() => {
        setDefaultVideoValue(data[data.id]);
    }, [])
    useEffect(() => {
        const deviceType = () => {
            const ua = navigator.userAgent;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                setDevice("tablet")
            }
            else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                setDevice("mobile")
            }

        };
        deviceType();
    }, []);

    // useEffect(() => {

    //     if (recordingStart) {
    //         async function getMedia() {
    //             let stream = null;
    //             try {
    //                 stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: { exact: facingMode } } });
    //                 webcamRef.current.srcObject = stream;
    //                 webcamRef.current.muted = true;
    //                 // webcamRef.current.play();
    //                 let mediaRecorder = new MediaRecorder(stream, {
    //                     mimeType: 'video/webm',
    //                 });
    //                 setUserMediaRecorder(mediaRecorder);
    //                 // listen for data from media recorder
    //                 mediaRecorder.ondataavailable = e => {
    //                     if (e.data && e.data.size > 0) {
    //                         setChunks((chunks) => chunks.concat([e.data]));
    //                     }
    //                 };

    //             } catch (err) {
    //                 /* handle the error */
    //                 const stream = null;
    //                 webcamRef.current.srcObject = stream;
    //                 console.log(err);
    //             }
    //         }
    //         getMedia();
    //     }

    // }, [recordingStart, facingMode]);

    useEffect(() => {
        if (data.customOptions.defaultValue && data.customOptions.defaultValue === formik.values[data.id]) {
            formik.setFieldValue(data.id, data.customOptions.defaultValue);
        } else {
            formik.setFieldValue(data.id, responseIds[uniqueId]);
        }
    }, [responseIds]);

    useEffect(() => {
        if (formik.values[data.id] || data.customOptions.defaultValue) {
            setvideoUpload(true);
        }
    }, [formik.values[data.id]]);

    const handleChange = (event) => {
        if (event.target.files[0].size < 1e+7) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            //Generating unique Id for setting up formik data
            const id = revisedRandId();
            setUniqueId(id);
            setvideoUpload(true);

            dispatch({
                type: "setUploadAction",
                file: formData,
                fileType: "VIDEO",
                name: id

            });
            setVideo(URL.createObjectURL(event.target.files[0]));
        }
        setOpen(false);
    }

    const startRecording = () => {
        setRecording(true);
        setChunks([]);
        userMediaRecorder.start(10);
    }

    const stopRecording = () => {
        userMediaRecorder.stop();
        setRecording(false);
        saveVideo();
        setRecordingStop(true);
        let stream = webcamRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
        webcamRef.current.srcObject = null;
    }

    const saveVideo = () => {
        // convert saved chunks to blob
        const blob = new Blob(chunks, { type: 'video/mp4' });
        // generate video url from blob
        setRecordedBlob(blob)
        const videoURL = window.URL.createObjectURL(blob);
        setRecorderVideo(videoURL);
        webcamRef.current.srcObject.getTracks()[0].stop();
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const recordVideo = () => {
        if (!data.customOptions.isFieldDisabled) {
            setRecodingStart(true);
            setOpen(!open);
        }
    }

    const deleteRecording = () => {
        setRecodingStart(false);
        setRecordingStop(false)
        // webcamRef.current.srcObject.getTracks()[0].stop();
    }
    const saveRecording = () => {
        let formData = new FormData();
        var file = new File([recordedBlob], `${revisedRandId()}.mp4`, {
            type: recordedBlob.type
        });
        formData.append('file', file);
        //Generating unique Id for setting up formik data
        const id = revisedRandId();
        setUniqueId(id);
        dispatch({
            type: "setUploadAction",
            file: formData,
            fileType: "VIDEO",
            name: id
        });
        setvideoUpload(true)
    }
    const handleDeleteVideo = () => {
        if (!data.customOptions.isFieldDisabled) {
            formik.setFieldValue(data.id, "");
            setDefaultVideoValue("");
            setRecordingStop(false);
            setRecodingStart(false);
        }
    }
    const switchCamera = React.useCallback(() => {
        setResetCameraView(true);
        setTimeout(() => {
            setFacingMode(
                prevState =>
                    prevState === FACING_MODE_USER
                        ? FACING_MODE_ENVIRONMENT
                        : FACING_MODE_USER
            );
            setResetCameraView(false);
        }, 100)
    }, []);
    const closeCamera = () => {
        setRecodingStart(false);
    }
    const openFileUploadPopUp = () => {
        inputRef.current.click();
    }
    //custome code
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (!capturing) {
                handleDownload();
            }
        }
    }, [recordedChunks]);

    const handleStartCaptureClick = React.useCallback(() => {
        setRecording(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, facingMode]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks, facingMode]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setRecording(false);
        setRecordingStop(true);
    }, [mediaRecorderRef, webcamRef, setRecording]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            setRecordedBlob(blob)
            const url = URL.createObjectURL(blob);
            const video = document.getElementById("video-replay");
            video.src = url;
        }
    }, [recordedChunks]);

    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormLabel sx={{ fontSize: "14px" }} component="legend" required={data.customOptions.required}>{data.label}</FormLabel>

                {(videoUpload && formik.values[data.id]) || defaultVideoValue ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "black" }}>
                    <IconButton className={classes.deleteIcon}>
                        {!formId && !editable && <DeleteOutlineIcon fontSize="small" onClick={handleDeleteVideo} />}
                    </IconButton>
                    {defaultVideoValue ? <video src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${defaultVideoValue}`} autoPlay loop className="mt-5" style={{ width: '100%', height: '10rem',marginTop:5 }} controls /> : <video src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${formik.values[data.id]}`} autoPlay loop className="mt-5" style={{ width: '100%', height: '10rem',marginTop:5 }} controls />}

                </div> : !recordingStart ?
                        <Button onClick={data.customOptions.isVideoUpload || data.customOptions.isVideoAvail ? handleOpen : null} fullWidth className={classes.buttonStyle} >
                        {data.customOptions.isVideoUpload ||
                            data.customOptions.isVideoAvail ?
                        <div style={{padding:4}}>
                                    <img src={`/assets/icons/photo_camera_black_24dp.svg`} />
                            <p className={classes.videoText}>Video</p>
                            </div> : null}
                        <div className="p-2">
                            {data.customOptions.isVideoLink && <a target="__blank" href={data.customOptions.videoLink}>Video Link</a>}
                        </div>
                    </Button>
                    :
                    <div>
                        {recordingStop &&
                            <>
                                <video id="video-replay" className="mt-5" style={{ width: '100%', height: '10rem' }} controls></video>
                                <Button variant="outlined" fullWidth style={{ cursor: "pointer", backgroundColor:primaryColor, color:'black', border:`1px solid ${primaryColor}`,marginBottom:4 }} className="mb-2" onClick={saveRecording}>Save</Button>
                                <Button variant="outlined" fullWidth style={{ cursor: "pointer", backgroundColor: primaryColor, color: 'black', border: `1px solid ${primaryColor}`,marginBottom:4 }} className="mb-2" onClick={handleDeleteVideo} >Delete</Button>
                                <Button variant="outlined" fullWidth style={{ cursor: "pointer",backgroundColor:primaryColor, color:'black', border:`1px solid ${primaryColor}` }} onClick={deleteRecording}>Cancel</Button>
                            </>
                        }
                        {!recordingStop && <>
                                {!resetCameraView ? <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    videoConstraints={{
                                        ...constraints,
                                        facingMode
                                    }}
                                    className="mt-5" style={{ width: '100%', height: '10rem' }}
                                /> : "Loading...."}

                                {!recording && <div>
                                    <Button variant="outlined" fullWidth style={{ cursor: "pointer", backgroundColor: primaryColor, color: 'black', border: `1px solid ${primaryColor}`,marginBottom:4 }} onClick={handleStartCaptureClick}>Start Recording</Button>
                                    {device === "mobile" || device === "tablet" ? <Button variant="outlined" fullWidth className="mt-3" style={{ cursor: "pointer", backgroundColor: primaryColor, color: 'black', border: `1px solid ${primaryColor}` }} onClick={switchCamera}>Switch Camera</Button> : null}
                                    <Button variant="outlined" fullWidth className="mt-3" style={{ cursor: "pointer", backgroundColor: primaryColor, color: 'black', border: `1px solid ${primaryColor}` }} onClick={closeCamera}>Cancel</Button>
                                </div>}
                                {recording && <Button variant="outlined" fullWidth style={{ cursor: "pointer", backgroundColor: primaryColor, color: 'black', border: `1px solid ${primaryColor}` }} onClick={handleStopCaptureClick}>Stop Recording</Button>}
                        </>}
                    </div>
                }
                <DrawerRoot
                    anchor={'bottom'}
                    open={open}
                    onClose={handleClose}
                    classes={{ paper: classes.drawer }}
                >
                    <div className='p-3'>
                        <Grid container justifyContent="space-between" style={{padding:4}} >
                            <Grid item style={{ fontWeight: 'bold' }}>
                                Add Video
                            </Grid>
                            <Grid item>
                                <CancelIcon onClick={handleClose} fontSize="small" />
                            </Grid>
                        </Grid>
                        {data.customOptions.isVideoUpload &&
                            <Grid container justifyContent="space-between" onClick={openFileUploadPopUp} className={classes.hoverBtnStyle} >
                                <Grid item>
                                    <label for={data.id}>GALLERY</label>
                                </Grid>
                                <Grid item>
                                    <label for={data.id}><img src={`/assets/icons/Gallery.svg`} /></label>
                                </Grid>
                            </Grid>
                        }
                        {data.customOptions.isVideoAvail &&
                            <Grid container justifyContent="space-between" onClick={recordVideo} className={classes.hoverBtnStyle} >
                                <Grid item >
                                    <label>CAMERA</label>
                                </Grid>
                                <Grid item>
                                    <img onClick={recordVideo} src={`/assets/icons/camera.svg`} />
                                </Grid>
                            </Grid>
                        }

                        <input
                            type="file"
                            className={classes.inputStyle}
                            name={data.id}
                            ref={inputRef}
                            onChange={handleChange}
                            id={data.id}
                            accept="video/mp4,video/x-m4v,video/*"
                        >
                        </input>
                    </div>
                </DrawerRoot>
            </ThemeProvider>
        </Grid>
    );
}

export default V5Video;