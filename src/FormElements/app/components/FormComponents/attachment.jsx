import { Button, FormLabel,Grid} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { config } from '@app/FormElements/config';
import { useParams } from "react-router-dom";

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
            asterisk: {color:"red"},
            },
        },
    },
})

const V5Attachment = (props) => {
    const {
        data, formik, primaryColor, fontFamily
    } = props;
    const useStyles = makeStyles({
        buttonStyle: {
            border:`1px dotted ${primaryColor}!important`, 
            borderRadius:'5px',
            backgroundColor:`${primaryColor}${80}!important`,
            display:'flex', 
            flexDirection:'column',
            '&:hover':{
                backgroundColor:`${primaryColor}${80}!important`,
            }
        },
        inputLabelStyle: {
            cursor:'pointer',
            padding:`0 12px`,
        },
        iconStyle: {
            margin:"-7px", 
            fontSize:'11px'
        },
        inputStyle: {
            display:'none',
            visibility:"hidden"
        },
        attachmentText: {
            color:'black', 
            opacity:0.5,
            margin:0, 
            padding:0, 
            fontSize:'10px'
        },
        fileText: {
            padding:0,
            margin:0 ,
            color:primaryColor,
            fontFamily:fontFamily,
            fontSize:"12px"
        }
    })
    const classes = useStyles();
    const { isProd } = config;
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    //..SCREENBUILDER ENDPOINT 
    // const API_ENDPOINT = isProd
    //     ? config.production.api_endpoint
    //     : config.development.screenbuilder_api_endpoint;

    // const APIVERSION = "screenbuilder/api/v1";
    //..ONBOARDING ENDPOINT
    const ONBOARDING_API_ENDPOINT = isProd
        ? config.production.api_endpoint
        : config.development.api_endpoint;
    const ONBOARDING_APIVERSION = "api/v1";
    const [image,setImage]= React.useState("");
    const [showDelete, setShowDelete] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const inputFile = React.useRef(null)
    const [uniqueId, setUniqueId] = React.useState('');
    const dispatch = useDispatch();
    const { responseIds } = useSelector((state) => state.screenBuilder.file);
    const [name, setName] = useState('');
    function revisedRandId() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }

    useEffect(()=>{
        setName(data.customOptions.fileName)
    },[])

    const handleDeleteFile = () => {
        if (!data.customOptions.isFieldDisabled) {
            setName("");
            setImage("");
            formik.setFieldValue([data.id], "");
            setShowDelete(false);
        }   
    }

    const handleChange=(event)=>{
        if (!data.customOptions.isFieldDisabled) {
            let extension = event.target.files[0].name.split('.').pop();
            let dotextension = `.${extension}`
            const id = revisedRandId();
            if(data.customOptions.Attachment.includes(dotextension)){
            setImage(event.target.files[0].name);
                setName(event.target.files[0].name);
                setUniqueId(id);
                let formData = new FormData();
                formData.append('file', event.target.files[0]);
                dispatch({
                    type: "setUploadAction",
                    file: formData,
                    fileType: "DOCUMENT",
                    name: id
                });
            } else {
                setOpen(true);
            }
        }
    }
    // const handleFileUpload = () => {
    //     inputFile.current.click();
    // }

    const handleDelete = (event) => {
        if (!data.customOptions.isFieldDisabled) {
            setImage("");
            formik.setFieldValue([data.id], "");
            setShowDelete(false);
        }
    }

    useEffect(()=>{
        setShowDelete(true);
    },[image]);

    useEffect(() => {
        if (responseIds && Object.keys(responseIds).length) {
            formik.setFieldValue(data.id, { 'id': responseIds[uniqueId], name: image });
            setShowDelete(true);
        }
    }, [responseIds]);

    useEffect(() => {
        if (formik.values[data.id]?.id) {
            formik.setFieldValue(data.id, { 'id': formik.values[data.id].id, name: formik.values[data.id].name });
        } else {
            formik.setFieldValue(data.id, { 'id': formik.values[data.id], name: name })
        }
    }, [window.location.href]);
    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormLabel sx={{ fontSize: "14px"}} component="legend" required={data.customOptions.required}>{data.label}</FormLabel>
                <Button 
                    fullWidth 
                    // onClick={handleFileUpload}
                    className={`${classes.buttonStyle}`}>
                    <label for={data.id} className={`${classes.inputLabelStyle} px-5`}>
                        <img className={classes.iconStyle} src={"/assets/icons/attachment_black_24dp.svg"} alt=""/>
                        </label>
                    <input 
                        type="file"
                        className={classes.inputStyle}
                        ref={inputFile}
                        name={data.id}
                        onChange={(e) => handleChange(e)}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                        id={data.id}
                        disabled={formik.values[data.id]?.name && formId ? true : false}
                        accept={data.customOptions.Attachment}>
                    </input>
                    <p className={classes.attachmentText}>
                        Attachment
                        </p>
                    {formId &&
                    <span style={{display:'flex'}}>
                            <a className={classes.fileText} href={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${formik.values[data.id] && formik.values[data.id].id ? formik.values[data.id].id : data.customOptions.defaultValue}`}>
                                {formik.values[data.id]?.name ? formik.values[data.id]?.name : data.customOptions.fileName}
                            </a>
                            {(showDelete && !formId && !editable) && < img className="pl-5" src={"/assets/icons/Delete.svg"} onClick={handleDelete} alt="" />}
                    </span>
                    }
                    {
                        !formId &&
                    <span style={{display:'flex'}}>
                            <a className={classes.fileText} href={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${formik.values[data.id]? formik.values[data.id].id? formik.values[data.id].id: formik.values[data.id]: ''}`}>
                                {name}
                            </a>
                                {showDelete && !formId && !editable && name && < img className="pl-5" src={"/assets/icons/Delete.svg"} onClick={handleDeleteFile} alt="" />}
                    </span>
                } 
                </Button>
            </ThemeProvider>
        </Grid>
    )
}

export default V5Attachment;