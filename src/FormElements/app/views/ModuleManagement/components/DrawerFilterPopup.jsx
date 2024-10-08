import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { Button, Grid  } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import FilterFormsElements from './FilterFormsElements';
import { styled } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    root:{
        "& .MuiBackdrop-root": {
            backgroundColor:"rgba(0, 0, 0, 0.8)"
        }
    },
    paper: {
        '@media screen and (min-width: 800px)': {
            width: `calc((100% - 260px) / 3)`, 
            marginLeft: `calc(((100% - 260px) / 3) + 260px)`,
        },
    },
}))

const DrawerRoot = styled(SwipeableDrawer)(() => ({
    "& .MuiBackdrop-root": {
        backgroundColor:"rgba(0, 0, 0, 0.65)"
    }
}))

const FilterHeaderWrap = styled(Grid)(({primaryColor,fontFamily}) => ({
    backgroundColor: primaryColor,
    fontFamily:fontFamily
}))

const FOutlinedButton = styled(Button)(({primaryColor, fontFamily}) => ({
    border: `1px solid ${primaryColor} !important`,
    color: primaryColor,
    fontFamily:fontFamily
}))

const FContainedButton = styled(Button)(({primaryColor, fontFamily}) => ({
    backgroundColor: primaryColor,
    fontFamily:fontFamily
}))

function DrawerFilterPopup(props) {
    const {
        open,
        handleOpen,
        handleClose,
        anchorEl,
        handleApplyFilter,
        primaryColor,
        fontFamily
    } = props;
    const classes = useStyles();
    const { moduleFilterDetails, columnsAndFilters, mappedBy, empId, empName, empRole } = useSelector((state) => state.screenBuilder.modules);
    const validationSchema = Yup.object({});
    const dispatch = useDispatch();
    const [moduleFilterDetailsCopy, setModuleFilterDetailsCopy] = useState(moduleFilterDetails);
    const [formattedFilters, setFormattedFilters] = useState([]);
    //const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: moduleFilterDetailsCopy,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => { },
    })

    useEffect(() => {
        setModuleFilterDetailsCopy({ ...moduleFilterDetails });
    }, [moduleFilterDetails]);

    useEffect(() => {
        const fltr = columnsAndFilters.filters && columnsAndFilters.filters.filter(x => x.type !== "Photo");
        let copyOfFilters;
        if (fltr) {
            copyOfFilters = [...fltr];
            let employeeIdIndex = copyOfFilters.findIndex((obj => obj.componentId === "employeeId"));
            let userNameIndex = copyOfFilters.findIndex((obj => obj.componentId === "userName"));
            let rolesIndex = copyOfFilters.findIndex((obj => obj.componentId === "role"));
            if (employeeIdIndex > -1) {
                copyOfFilters.splice(employeeIdIndex, 1, { componentId: 'employeeId', type: 'Dropdown', values: empId, hint: 'static_employeeId' })
            }
            if (userNameIndex > -1) {
                copyOfFilters.splice(userNameIndex, 1, { componentId: 'userName', type: 'Dropdown', values: empName, hint: 'static_userName' })
            }
            if (rolesIndex > -1) {
                copyOfFilters.splice(rolesIndex, 1, { componentId: 'role', type: 'Dropdown', values: empRole, hint: 'static_role' })
            }
        }
        setFormattedFilters(copyOfFilters);
    }, [columnsAndFilters, empId]);

    useEffect(() => {
        if (mappedBy) {
            dispatch({
                type: "getEmpInfoAction"
            })
        }
    }, [mappedBy]);

    useEffect(() => {
        formik.setValues(moduleFilterDetailsCopy)
    }, [moduleFilterDetailsCopy]);

    const applyFilter = () => {
        let filterData = [];
        let from = "";
        let to = "";
        let employeeId = "";
        let name = "";
        let empRole = "";
        let result = {};
        for (let prop of Object.keys(formik.values)) {
            let objFilter = {
                componentId: "",
                componentValue: ""
            };
            if (formik.values[prop]) {
                //objFilter[prop] = formik.values[prop];               
                objFilter.componentId = prop;
                let cValue = formik.values[prop];
                if (columnsAndFilters && columnsAndFilters.filters) {
                    const result = columnsAndFilters.filters.find(x => x.componentId === prop);
                    if (result) {
                        if (result.type === "Date_Picker" && result.hint === "from") {
                            // cValue = format(cValue, 'dd-MM-yyyy');
                            from = cValue
                        } else if (result.type === "Date_Picker" && result.hint === "to") {
                            // cValue = format(cValue, 'dd-MM-yyyy');
                            to = cValue;
                        } else if (result.type === "Dropdown" && result.hint === "static_employeeId" || result.hint === "Emp Id") {
                            employeeId = cValue;
                        } else if (result.type === "Dropdown" && result.hint === "static_userName" || result.hint === "Emp Name") {
                            name = cValue;
                        } else if (result.type === "Dropdown" && result.hint === "static_role" || result.hint === "Emp Role") {
                            empRole = cValue;
                        } 
                    }
                }
                objFilter.componentValue = cValue;
                // filterData.push(objFilter);
                if (result.type !== "Date_Picker" && result.hint !== "static_employeeId" && result.hint !== "static_userName" && result.hint !== "static_role" && result.hint !== "Emp Id" && result.hint !== "Emp Name" && result.hint !== "Emp Role" ) {
                    filterData.push(objFilter);
                }
            }
        }
        handleApplyFilter(filterData, from, to, employeeId, name, empRole, formik.values);
    }

    const clearFilter = () => {      
        formik.resetForm(formik.initialValues);
        setModuleFilterDetailsCopy(formik.initialValues);
    }

    return (
            <Grid style={{fontFamily:fontFamily}}>
                <FilterHeaderWrap
                    style={{
                        display: 'flex',
                        alignItem: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding:10
                    }}
                    primaryColor={primaryColor}
                >
                    <p className="text-16">Filter</p>
                    <CloseIcon
                        style={{cursor:"pointer"}}
                        onClick={handleClose}
                    />
                </FilterHeaderWrap>
                <form style={{padding:'1rem'}}>
                    <Grid spacing={2} container justify="space-between" className="mt-5">
                        {
                            formattedFilters
                            && formattedFilters.map((f, i) =>
                                <Grid item xs={6}>
                                    <FilterFormsElements
                                        data={f} key={i} index={i} formik={formik} primaryColor={primaryColor}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                    <Grid spacing={2} container justify="space-between" className="mb-1 mt-5">
                        <Grid item xs={6} >
                            <FOutlinedButton
                                type="button"
                                fullWidth
                                variant="outlined"
                                disabled={!formik.isValid}
                                onClick={clearFilter}
                                primaryColor={primaryColor}
                            >
                                CLEAR
                            </FOutlinedButton>
                        </Grid>
                        <Grid item xs={6} >
                            <FContainedButton
                                type="button"
                                fullWidth
                                variant="contained"
                                disabled={!formik.isValid}
                                onClick={applyFilter}
                                primaryColor={primaryColor}
                            >
                                APPLY
                            </FContainedButton>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        // </Grid>
        // </DrawerRoot>
    )
}

export default DrawerFilterPopup;
