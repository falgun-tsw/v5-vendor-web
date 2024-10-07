import React, { useEffect, useState } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { format } from 'date-fns'
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
const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: "red" },
            },
        },
    },
})

function V5GlobalTime(props) {
    const {
        data,
        formik,
        primaryColor,
        fontFamily
    } = props;

    const [selectedTime, setSelectedTime] = useState(null);
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const selectTime = (time) => {
        setSelectedTime(time);
    }
    useEffect(() => {
        if (data.customOptions.cutomTime) {
            setSelectedTime(data.customOptions.cutomTime);
        }
        if (data.customOptions.defaultTime === "current") {
            setSelectedTime(Date.now());
        }
        if (data.customOptions.defaultTime === 'none') {
            setSelectedTime(null);
        }
    }, [data.customOptions.cutomTime, data.customOptions.defaultTime])

    useEffect(()=> {
        if(data.customOptions.checked){
            formik.setFieldValue(data.id, { 'id': new Date(selectedTime).toLocaleTimeString(), time: selectedTime });
        } else {
            formik.setFieldValue(data.id, { 'id': format(new Date(selectedTime), "HH:mm:ss"), time: selectedTime });
        }
    }, [selectedTime]);

    useEffect(() => {
        if (formik.values[data.id]?.id && formik.values[data.id]?.time !== null) {
            formik.setFieldValue(data.id, { 'id': formik.values[data.id]?.id, time: formik.values[data.id]?.time });
        }
    }, [])
    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopTimePicker
                        label={data.label}
                        name={data.id}
                        disabled={(data.customOptions.defaultTime === "current") || formId && !editable ? true : false}
                        onChange={selectTime}
                        ampm={data.customOptions.checked ? true : false}
                        value={formik.values[data.id]?.time ? formik.values[data.id]?.time : selectedTime}
                        renderInput={(params) => <StyledTextField  {...params} fontFamily={fontFamily} primaryColor={primaryColor} fullWidth required={data.customOptions.required} InputLabelProps={{
                            classes: {
                                asterisk: 'text-error'
                            }

                        }} />}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        </Grid>
    )
}

export default V5GlobalTime