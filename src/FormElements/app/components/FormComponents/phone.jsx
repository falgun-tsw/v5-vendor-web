import { Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
//import Phone from '@mui/icons-material/Phone';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledTextField = styled(TextField)(({primaryColor}) => ({
    '& label.Mui-focused': {
        color: primaryColor
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: primaryColor
        },
        '&:hover fieldset': {
            borderColor: primaryColor
        },
    }
}))

const V5Phone = (props) => {
    const {
        data,
        formik,
        primaryColor,
        fontFamily
    } = props;
    const [countryCode, setCountryCode] = React.useState('+91');
    const [mobileNo, setMobileNo] = React.useState('');
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const handleChange = (e)=>{
        setMobileNo(e.target.value);
        if (props.data.customOptions.countryCode) {
            formik.setFieldValue([data.id] , `${countryCode}${e.target.value}`);
        } else {
            formik.setFieldValue([data.id] , `${e.target.value}`);
        }
    }

    // const handleCountry = (event)=> {
    //     let value = event.target.value.replace('+', '');
    //     setCountryCode('+' + value );
    //     formik.setFieldValue([data.id] , `${'+' + value}${mobileNo}`);
    // }

    useEffect(()=>{
        if (formik.values && data && data.id && formik.values[data.id]) {
            let formData = formik.values[data.id];
            if (props.data.customOptions.countryCode) {
                setCountryCode(formData.substring(0, 3));
                setMobileNo(formData.substring(3, formData.length));
            } else {
                setMobileNo(formData);
            }
        }
    }, [formik.values[data.id]]);

    return (
        <Grid>
            <Grid container sx={{mt: 3}} direction="row" justifyContent="space-between">
            {  props.data.customOptions.countryCode &&
                    <Grid item xs={2} sm={2}>
                    <StyledTextField
                        fontFamily={fontFamily}
                        primaryColor={primaryColor}
                        id="countryCode"
                        variant="outlined"
                        label="Country Code"
                        placeholder="e.g: +1"
                        // type="number"
                        name={countryCode}
                        value={countryCode}
                        // error={ !countryCode.match(/^[0-9+]{3}$/) && countryCode.length > 0 ? true : false }
                        inputProps ={{ minLength: 0,  maxLength: 3 }}
                        InputLabelProps={{
                            classes: {
                                asterisk: 'text-error'
                            },
                            shrink: countryCode? true: false,
                        }}
                        // onChange={handleCountry}
                        onBlur={formik.handleBlur}
                        style={{ width: '98%'}}
                            required={data.customOptions.required}
                            disabled={formId ? true : false}
                    />
                </Grid>
            }
                <Grid item xs={10} sm={props.data.customOptions.countryCode ? 10 : 12}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="mobileNo"
                    variant="outlined"
                    label="Mobile No."
                    fullWidth
                    // type="number"
                        value={formId && mobileNo}
                    placeholder='e.g: 000-000-0000'
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    error={mobileNo.length > 0 && mobileNo.length < 10 || !mobileNo.match(/^(\s*|\d+)$/) ? true :  false}
                    helperText={!mobileNo.match(/^(\s*|\d+)$/) && mobileNo.length < 11  ? <p>please enter numbers only</p>: mobileNo.length > 0 && mobileNo.length < 10 ? <p style={{margin:0, padding:0, fontSize:'12px'}}>Invalid mobile number</p> : null}
                    InputProps={{
                        inputProps: { minLength: 0,  maxLength: 10 },
                        endAdornment: (
                        <PhoneIcon style={{opacity:0.5}}/>
                        )
                    }}
                    InputLabelProps={{
                        classes: {
                            asterisk: 'text-error'
                        },
                        shrink: mobileNo || formId ? true : false,
                    }}
                    required={data.customOptions.required}
                        disabled={formId && !editable ? true : false}
                />
            </Grid>
        </Grid>
    </Grid>
    );
}

export default V5Phone;