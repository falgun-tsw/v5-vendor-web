import React, { useEffect } from 'react';
import { TextField, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledTextField = styled(TextField)(({primaryColor,fontFamily}) => ({
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

const V5Number = (props) => {
    const {
        data,
        formik,
        customStyle,
        placeholderText,        
        primaryColor,
        fontFamily
    } = props;
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    // const blockInvalidChar = (e) =>{ 
    //     ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    //  }
    // console.log(data);
    useEffect(() => {
        if (data.customOptions.defaultValue && !formId) {
            formik.setFieldValue(data.id, data.customOptions.defaultValue);
        }
    }, []);

    return (
        <Grid mt={3}>
            <StyledTextField
                primaryColor={primaryColor}
                fontFamily={fontFamily}
                id="name-input"
                name={data.id}
                label={data.label}
                value={formId && formik.values[data.id] ? formik.values[data.id] : formik.values[data.id] ? formik.values[data.id] : (formId && !editable && formik.values[data.id] === "") ? 0 : null}
                variant="outlined"
                fullWidth
                type="number"
                style={customStyle}
                placeholder={placeholderText}
                required={data.customOptions.required}
                error={formik.touched[data.id] && formik.errors[data.id] }
                disabled={(formId && !editable) || data.customOptions.isFieldDisabled? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                //onKeyDown={blockInvalidChar}
                //InputProps={{ inputProps: { min: 0,} }}
                InputLabelProps={{
                    classes: {
                        asterisk: 'text-error'
                    },
                    shrink: formik.values[data.id] || formId || formik.values[data.id] === 0 || data.customOptions.defaultValue? true : false,
                }}
            />
            {formik.touched[data.id] && formik.errors[data.id] ? <p style={{color:'red', fontSize: "13px", marginTop: "0px"}}>* {formik.errors[data.id]}</p> : null}
        </Grid>
    );
}

export default V5Number;