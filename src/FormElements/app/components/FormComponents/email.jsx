import React from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles({
    errorColor:{
        color:'red',  
        fontSize: "13px", 
        margin: "0px",
        marginLeft:"15px"
    },
})
const V5Email = (props) => {
    const { type, data, formik, primaryColor,fontFamily } = props;
    const classes = useStyles();
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    return (
        <Grid mt={3}>
            <StyledTextField
                primaryColor={primaryColor}
                fontFamily={fontFamily}
                id={props.id}
                variant="outlined"
                label={data.label}
                required={data.customOptions.required}
                fullWidth
                type={type}
                name={data.id}
                error={formik.touched[data.id] && formik.errors[data.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={(formId && formik.values[data.id])}
                placeholder={data.label}
                InputLabelProps={{
                    classes: {
                        asterisk: 'text-error'
                    },
                    shrink: formik.values[data.id] || formId ? true : false,
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <EmailIcon />
                        </InputAdornment>
                    )
                }}
                disabled={formId && !editable ? true : false}
            />
            {formik.touched[data.id] && formik.errors[data.id] ? <p className={classes.errorColor}> { formik.errors[data.id]}</p> : null}
        </Grid>
    )
}

export default V5Email;