import React, { useEffect } from 'react';
import { TextField, Grid, FormLabel, createMuiTheme } from '@mui/material';
import { styled } from '@mui/system';
import MUIRichTextEditor from "mui-rte";
import { ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { ThemeProvider } from '@mui/styles';
import { stateToHTML } from "draft-js-export-html";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                width: "100%",
                marginTop: 10,
                // marginLeft: 10,
                border: "1px solid grey",
                borderRadius: 4
            },
            editor: {
                display: "block",
                maxHeight: 252,
                padding: "0 10px",
                // marginTop: 2,
                marginBottom: 1,
            },
            container: {
                display: "flex",
                flexDirection: "column",
                margin: 0
            },
            toolbar: {
                backgroundColor: "transparent"
            },
            placeHolder: {
                position: "relative"
            },
            editorContainer: {
                padding: 8,
                margin: 0,
                fontSize: 13,
                backgroundColor: "#fff"
            }
        }
    }
})

const StyledTextField = styled(TextField)(({ primaryColor, fontFamily}) => ({
    '& label.Mui-focused': {
        color: primaryColor,
        fontFamily: fontFamily
    },
    '& .MuiFormLabel-root': {
        fontFamily: fontFamily
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor
    },
    '& .MuiOutlinedInput-root': {

        '&.Mui-focused fieldset': {
            borderColor: primaryColor,
        },
        '&:hover fieldset': {
            borderColor: primaryColor
        },
    },
}))


const V5LongText = (props) => {
    const {
        data,
        formik,
        customStyle,
        placeholderText,        
        type,
        primaryColor,
        fontFamily,
    } = props;
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const [textForRendering, setTextForRendering] = React.useState(null);

    const handleChange =(e)=> {
        formik.setFieldValue(data.id, stateToHTML(e.getCurrentContent()));
        // formik.setTouched([data.id] , true );
    }
    useEffect(()=>{
        if(formik?.values && formik.values[data.id] ) {
        const contentHTML = convertFromHTML(toString(formik.values[data.id]))
        const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
        setTextForRendering(JSON.stringify(convertToRaw(state)));
        }
    },[data.id]);

    useEffect(() => {
        if (data.customOptions.defaultValue && !formId) {
            formik.setFieldValue(data.id, data.customOptions.defaultValue);
        }
    }, []);

    return (
        <>
        {data.customOptions.editorMode !== 'Rich_Text'? 
        <Grid mt={3}>
            <StyledTextField
                primaryColor={primaryColor}
                fontFamily={fontFamily}
                id="name-input"
                name={data.id}
                        value={formId && formik.values[data.id] ? formik.values[data.id] : formik.values[data.id] ? formik.values[data.id] : ""}
                label={data.label}
                variant="outlined"
                fullWidth
                type={type}
                style={customStyle}
                placeholder={placeholderText}
                required={data.customOptions.required}
                        error={formik.touched[data.id] && formik.errors[data.id] ? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                    classes: {
                        asterisk: 'text-error'
                    },
                    shrink: formId || formik.values[data.id] || data.customOptions.defaultValue ? true : false,
                }}
                disabled={(formId && !editable) || data.customOptions.isFieldDisabled? true : false}
            />
            {formik.touched[data.id] && formik.errors[data.id] ? <p style={{color:'red', fontSize: "13px", marginTop: "0px"}}>* {formik.errors[data.id]}</p> : null}
        </Grid>
        : 
        <Grid mt={3} className={`mb-5 pb-2`}>
            <ThemeProvider theme={defaultTheme}>
                <FormLabel sx={{ fontSize: "14px", fontFamily:fontFamily }} component="legend" required={data.customOptions.required} >{data.label}</FormLabel>
                <div className='mb-2'>
                    <MUIRichTextEditor
                        label="Type here..."
                        value={textForRendering}
                        //onSave={save}
                        onChange={handleChange}
                        inlineToolbar={true}
                        controls={["bold","italic","underline","bulletList","numberList","strikethrough","link"]}
                    />
                </div>
            </ThemeProvider>
        </Grid>
    }
    </>
    );
}

export default V5LongText;