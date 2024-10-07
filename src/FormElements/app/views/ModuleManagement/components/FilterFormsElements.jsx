import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { TextField, MenuItem, Tooltip } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { capitalize } from 'lodash';
import { styled } from '@mui/system';
import { capitalizeFirstLetter } from '@app/FormElements/utils';
import { useSelector } from 'react-redux';

const StyledTextField = styled(TextField)(({primaryColor,fontFamily}) => ({
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

const StyledDesktopDatePicker = styled(DesktopDatePicker)(({primaryColor}) => ({
    border: primaryColor
}))

function FilterFormsElements(props) {
    const {
        type,
        label,
        value,
        inputFormat,
        handleOnChange,
        touched,
        change,
        errors,
        classes,
        primaryColor,
        fontFamily,
        data, key, index, formik
    } = props;
    const { empName, empId } = useSelector((state) => state.screenBuilder.modules);
    const [customHint, setCustomHint] = useState("");

    useEffect(() => {
        if (data.hint === "static_employeeId") {
            setCustomHint("Emp ID")
        } else if (data.hint === "static_userName") {
            setCustomHint("Emp Name")
        } else if (data.hint === "static_role") {
            setCustomHint("Emp Role")
        }
    }, []);

    return (
        <>
            {(() => {
                switch (data.type) {
                    case 'Short_Text':
                        return (
                            <>
                                <StyledTextField
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    value={formik.values[data.componentId]}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0} ><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    //style={customStyle}
                                    //placeholder={placeholderText}
                                    //margin="normal"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                //disabled
                                />
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Long_Text':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0}><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Email':
                        return (
                            <>
                                <StyledTextField    
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    // label={capitalize(`${data.hint}`)}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0} ><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Number':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    // label={capitalize(`${data.hint}`)}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0} ><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Dropdown':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    // label={capitalize(`${data.hint}`)}
                                    label={<Tooltip title={data.hint.length >= 10 ? customHint ? customHint : capitalize(`${data.hint}`) : ``} enterTouchDelay={0} ><div>{data.hint.length < 10 ? capitalize(`${data.hint}`) : customHint ? customHint : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {data.values?.map((val) => <MenuItem value={val.id ? val.id : val}>{val.name ? val.name : val}</MenuItem>)}
                                </StyledTextField>
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Single_Choice':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    value={formik.values[data.componentId]}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0}><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {data.values.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
                                </StyledTextField>
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Button_Radios':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0} ><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {data.values.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
                                </StyledTextField>
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Location_Coordinates':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0} ><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Check_List':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    value={formik.values[data.componentId]}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0}><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {data.values.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
                                </StyledTextField>
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    // case 'Configurable_List':
                    //     return (
                    //         <></>
                    //     );
                    // case 'Signature':
                    //     return (
                    //         <></>
                    //     );
                    // case 'Section_Header':
                    //     return (
                    //         <></>
                    //     );
                    case 'Date_Picker':
                        return (
                            <>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StyledDesktopDatePicker
                                        primaryColor={primaryColor}
                                        fontFamily={fontFamily}
                                        name={data.componentId}
                                        InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                        label={`Date ${capitalizeFirstLetter(data.hint)}`}
                                        inputFormat={"dd MMM yyyy"}
                                        value={formik.values[data.componentId] ? formik.values[data.componentId] : null}
                                        //onChange={formik.handleChange}
                                        onChange={(e) => {
                                            formik.setFieldValue(data.componentId, e);
                                            formik.setFieldTouched(data.componentId, true)
                                        }}
                                        renderInput={(params) => <StyledTextField primaryColor={primaryColor} fontFamily={fontFamily} {...params} />}
                                    />
                                </LocalizationProvider>
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    case 'Phone':
                        return (
                            <>
                                <StyledTextField 
                                    primaryColor={primaryColor}
                                    fontFamily={fontFamily}
                                    id="name-input"
                                    name={data.componentId}
                                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                    value={formik.values[data.componentId]}
                                    label={<Tooltip title={data.hint.length >= 10? data.hint : ``} enterTouchDelay={0}><div>{data.hint.length < 10? capitalize(`${data.hint}`) : capitalize(`${data.hint.slice(0, 12)}...`)}</div></Tooltip>}
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched[data.componentId] && formik.errors[data.componentId] ? <p style={{ color: 'red', fontSize: "13px", marginTop: "0px" }}>* {formik.errors[data.componentId]}</p> : null}
                            </>
                        );
                    // case 'Button':
                    //     return (
                    //         <></>
                    //     );
                    // case 'Photo':
                    //     return (
                    //         <></>
                    //     );
                    // case 'Tiles':
                    //     return (
                    //         <></>
                    //     );
                    default:
                        return null;
                }
            })()}
        </>

    )
}

FilterFormsElements.propTypes = {
    data: PropTypes.object
}

FilterFormsElements.defaultProps = {

};

export default FilterFormsElements;
