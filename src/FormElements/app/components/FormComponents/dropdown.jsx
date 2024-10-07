import React, { useEffect, useState } from 'react';
import {
    Select, FormControl, MenuItem, Grid, InputLabel
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import V5FormElement from './index';

const V5Dropdown = (props) => {
    const {
        data,
        formik,
        primaryColor,
        fontFamily
    } = props;
    const theme = createTheme({
        components: {
            MuiFormLabel: {
                styleOverrides: {
                asterisk: {color:"red"},
                },
            },
        },
    });
    const useStyles = makeStyles({
        select: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: primaryColor,
            },
        },
        inputLabel: {
            color: "black",
            "&.Mui-focused": {
                color: primaryColor
            }
        }
    });
    const classes = useStyles();
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const [dependentComponents, setDependentComponents] = useState([]);
    const [ formattedData, setFormattedData ] = useState([]);
    const [dropDownValue, setdropDownValue] = useState("-");
    const [updatedDropDownData, setUpdatedDropDownData] = useState([]);

    useEffect(() => {
        if (data.customOptions.defaultOptions) {
            formik.setFieldValue([data.id], data.customOptions.defaultOptions);
        }
    }, [data.customOptions.defaultOptions]);

    const onValueChange = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
        prefillDependentFormData(event.target.value);
        setDependentComponents(dependentComponents);
    }

    useEffect(()=>{
        if (data[data.id]) {
            prefillDependentFormData(data[data.id]);
        }
    }, [data])

    const prefillDependentFormData = (selectedOption) => {
        setdropDownValue(selectedOption)
        if (data.hasDependentComponents) {
            let filteredFormData = data.dependentComponents.filter((item)=>{
                return item.parentId.indexOf(data.dropDownOptions.filter(v=>v.value===selectedOption)[0].key) !==-1
            })
            if (filteredFormData.length) {
                setDependentComponents(filteredFormData[0].form);
                setFormattedData(filteredFormData[0].form);
            } else {
                setDependentComponents([]);
                setFormattedData([]);
            }
        }
    }
    useEffect(()=>{
        let newObject = {...formik.values};
        if (dependentComponents.length) {
            let newData = dependentComponents.map((element) => {
                if (element.element === "Time" && element.customOptions.defaultTime === "current") {
                    newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : Date.now();
                } else if (element.element === "Date_Picker" && element.customOptions.defaultDateOptions === "current") {
                    newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : Date.now();
                } else {
                    if (element.element === "Check_List") {
                        // newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : screenFormResponseData[element.id] ? screenFormResponseData[element.id] : [];
                        newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue? element.customOptions.defaultValue : [];
                    } else {
                        // newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : screenFormResponseData[element.id] ? screenFormResponseData[element.id] : "";
                        newObject[element.id] = screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue? element.customOptions.defaultValue: formik.values[element.id] ? formik.values[element.id] : '';
                    }
                }
                // return {...element, [element.id]: screenFormResponseData[element.id]? screenFormResponseData[element.id]: ""}
                return {...element, [element.id]: screenFormResponseData[element.id]? screenFormResponseData[element.id]: element.customOptions.defaultValue? element.customOptions.defaultValue: ""}
            });
            formik.setValues(newObject);
            // prefillFormData(newObject);
            setFormattedData(newData);
        } else {
            setFormattedData([]);
        }
    }, [dependentComponents, data]);
    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormControl fullWidth variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label" style={{fontFamily:fontFamily}}  className={classes.inputLabel} required={data.customOptions.required} >{data.label}</InputLabel>
                    <Select className={classes.select}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name={data.id}
                        value={dropDownValue ? dropDownValue : data.customOptions?.defaultOptions}
                    label={data.label}
                    fullWidth
                    required={data.customOptions.required}
                    // onChange={!formId && formik.handleChange}
                    onChange={(e)=>onValueChange(e)}
                    disabled={formId && !editable ? true : false}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                        },
                        getContentAnchorEl: null
                    }}
                    >
                    {
                        data.customOptions.showEmptyTextOption && 
                        <MenuItem value={data.customOptions.emptyOptionText}>{data.customOptions.emptyOptionText}</MenuItem>
                    }
                    {
                        data.dropDownOptions.map((option)=>
                            <MenuItem key={option.key} value={option.value}>{option.label}</MenuItem>
                        )
                    }

                    </Select>
                </FormControl>
                {/* Dependent Section */}
                {
                    formattedData.length? formattedData.map((data, index)=>
                        <V5FormElement data={data} key={index} index={index} formik={formik}/>
                    ): null
                }
            </ThemeProvider>
        </Grid>
    );
}

export default V5Dropdown;