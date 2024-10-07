import React, { useState, useEffect } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, Grid, IconButton, Icon, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { format } from 'date-fns';
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
const V5DatePicker = (props) => {
    const {
        data,
        formik,
        primaryColor,
        fontFamily
    } = props;
    const [selectedDate, setSelectedDate] = useState(null);
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const selectDate = (date) => {
        setSelectedDate(date);
        // formik.setFieldValue([data.id], date);
    }
    useEffect(() => {
        // if (data.customOptions.defaultDateOptions === "none") {
        //     setSelectedDate(null);
        // } else 
        if (data.customOptions.defaultDateOptions === "current") {
            setSelectedDate(Date.now());
        } else if (data.customOptions.defaultDate) {
            setSelectedDate(data.customOptions.defaultDate)
        }
    }, [data.customOptions.defaultDateOptions, data.customOptions.defaultDate])

    useEffect(()=>{
        if (selectedDate) {
            // formik.setFieldValue([data.id], new Date(selectedDate).toLocaleDateString());
            formik.setFieldValue([data.id], format(new Date(selectedDate), data.customOptions.dateFormat ));
        }
    }, [selectedDate]);
    return (
        <Grid mt={3}>
            {formId && !editable ? <StyledTextField value={formik.values[data.id]} fontFamily={fontFamily} primaryColor={primaryColor}
                fullWidth
                label={data.label}
                required={data.customOptions.required}
                disabled={data.customOptions.readOnly || data.customOptions.defaultDateOptions === "current" || formId && !editable ? true : false}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                disabled={data.customOptions.readOnly || data.customOptions.defaultDateOptions === "current" || formId && !editable ? true : false}
                            >
                                <Icon>{"event"}</Icon>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            /> : <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label={data.label}
                    name={data.id}
                    inputFormat={data.customOptions.dateFormat}
                    onChange={selectDate}
                    autoOk={true}
                    disabled={data.customOptions.readOnly || data.customOptions.defaultDateOptions === "current" || formId && !editable ? true : false}
                        value={selectedDate ? selectedDate : formik.values[data.id]}
                    disablePast={data.customOptions.disablePastDates}
                    renderInput={(params) => <StyledTextField {...params} fontFamily={fontFamily} primaryColor={primaryColor}
                    fullWidth required={data.customOptions.required} 
                    error={formik.touched[data.id] && selectDate === null ? true : false }
                    InputLabelProps={{
                        classes: {
                            asterisk: 'text-error'
                        }
                    }} />}
                />
            </LocalizationProvider>}

        </Grid>
    );
}

export default V5DatePicker;