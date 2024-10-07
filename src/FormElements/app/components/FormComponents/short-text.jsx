import React, { useEffect } from 'react';
import { TextField, Grid, InputAdornment, IconButton, Icon } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledTextField = styled(TextField)(({ primaryColor, fontFamily }) => ({
    '& label.Mui-focused': {
        color: primaryColor,
        fontFamily: fontFamily
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'fontFamily'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor
    },
    '& .MuiOutlinedInput-root': {

        '&.Mui-focused fieldset': {
            borderColor: primaryColor,
        },
        '&.Mui-focused fieldset': {
            borderColor: primaryColor
        },
        '&:hover fieldset': {
            borderColor: primaryColor
        },
        '&.Mui-focused fieldset': {
            borderColor: primaryColor
        },
    },
}))

const V5ShortText = (props) => {
    const {
        data,
        formik,
        customStyle,
        placeholderText,
        type,
        index,
        primaryColor,
        fontFamily,
    } = props;
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;

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
                value={formId && formik.values[data.id] ? formik.values[data.id] : formik.values[data.id] ? formik.values[data.id] : ""}
                label={data.label}
                variant="outlined"
                fullWidth
                type={data.customOptions.validation === "Numeric" ? "number" : type}
                style={customStyle}
                placeholder={placeholderText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={data.customOptions.required}
                error={formik.touched[data.id] && formik.errors[data.id] ? true : false}
                InputLabelProps={{
                    classes: {
                        asterisk: 'text-error'
                    },
                    shrink: formId || formik.values[data.id] || data.customOptions.defaultValue ? true : false,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                            >
                                {data.customOptions.selectedIcons ? <Icon>{data.customOptions.selectedIcons}</Icon> : null}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                disabled={(formId && !editable) || data.customOptions.isFieldDisabled ? true : false}
            />
            {formik.touched[data.id] && formik.errors[data.id] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.id]}</p> : null}
        </Grid>
    );
}

export default V5ShortText;