import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Grid, MenuItem, FormControl, Select, InputLabel, Icon } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { FormikProvider } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@mui/lab/pickers';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import DateFnsUtils from '@date-io/date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { setReportFilters } from 'src/FormElements/app/redux/ReportsManagement/reportsManagementSlice';
import { Box, styled, useTheme } from '@mui/system';
import { Multiselect } from 'src/FormElements/app/components';

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

const StyledDesktopDatePicker = styled(DesktopDatePicker)(({primaryColor}) => ({
    border: primaryColor
}))

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

function ReportsFilterPopup(props) {
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
    const { reportFilterDetails, sitesForCharts } = useSelector((state) => state.screenBuilder.reports);
    const validationSchema = Yup.object({});
    const dispatch = useDispatch();
    const [reportFilterDetailsCopy, setReportFilterDetailsCopy] = useState(reportFilterDetails);
    const [formattedFilters, setFormattedFilters] = useState([]);
    //const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: reportFilterDetailsCopy,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => { },
    })

    useEffect(() => {
        setReportFilterDetailsCopy({ ...reportFilterDetails });
    }, [reportFilterDetails]);

    useEffect(() => {
        formik.setValues(reportFilterDetailsCopy)
    }, [reportFilterDetailsCopy]);

    const applyFilter = () => {
        handleApplyFilter(formik.values);
        dispatch({ 
            type: setReportFilters.type, 
            payload: formik.values
        }) 
    }

    const clearFilter = () => {      
        formik.resetForm(formik.initialValues);
        setReportFilterDetailsCopy(formik.initialValues);
    }

    const handleSiteChange = (event) => {
        const { target: { value }} = event;
        formik.setFieldValue("sites", value);
    }

    const handleDeleteSite = () => {}

    return (
        <DrawerRoot
            anchor={'bottom'}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            ref={anchorEl}
            classes={{ paper: classes.paper }}
        >
            <Grid style={{fontFamily:fontFamily}}>
                <FilterHeaderWrap
                    className={`flex justify-between items-center px-4`}
                    primaryColor={primaryColor}
                >
                    <p className="text-16">Filter</p>
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={handleClose}
                    />
                </FilterHeaderWrap>
                <form className="px-4">

                    <Grid className="mt-5">
                        <Multiselect
                            roles={sitesForCharts ? sitesForCharts : []}
                            label="Site ID"
                            roleName={formik.values.sites? formik.values.sites: []}
                            handleRoleChange={handleSiteChange}
                            handleDelete={handleDeleteSite}
                        />
                    </Grid>
                    <Grid className="mt-5">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StyledDesktopDatePicker
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                name="fromDate"
                                label="From Date"
                                inputFormat={"dd MMM yyyy"}
                                value={formik.values.fromDate}
                                //onChange={formik.handleChange}
                                onChange={(e)=>{formik.setFieldValue("fromDate", e)}}
                                renderInput={(params) => <StyledTextField fullWidth primaryColor={primaryColor} fontFamily={fontFamily} {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid className="mt-5">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StyledDesktopDatePicker
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                name="toDate"
                                label="To Date"
                                inputFormat={"dd MMM yyyy"}
                                value={formik.values.toDate}
                                //onChange={formik.handleChange}
                                onChange={(e)=>{formik.setFieldValue("toDate", e)}}
                                renderInput={(params) => <StyledTextField fullWidth primaryColor={primaryColor} fontFamily={fontFamily} {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid spacing={2} container justify="space-between" className="mb-2 mt-5">
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
        </DrawerRoot>
    )
}

export default ReportsFilterPopup;
