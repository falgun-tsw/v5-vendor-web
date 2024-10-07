import React, { useEffect } from 'react';
import {
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    //Switch,
    TextField,
    FormLabel,
    Checkbox,
    Button,
    Chip,
    Box,
    ListItemText
} from '@mui/material';
// import {
//     KeyboardDatePicker,
//     MuiPickersUtilsProvider,
// } from '@material-ui/pickers';
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import { makeStyles } from '@mui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { V5GlobalFormFooter } from 'src/FormElements/app/components';
import Email from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CustomTooltip } from './UserDetails';
import { styled } from '@mui/system';
import Multiselect1 from 'src/FormElements/app/components/Multiselect/Multiselect1';

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

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-root": {
            color: "#00000099",
            fontWeight: "400"
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "#51BFB6",
        }
    },
    formContainer: {
        width: '75vw',
        paddingBottom: '5rem',
    },
    emailIcon: {
        color: '#636365',
    },
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    disabledInputLabel: {
        "& .MuiFormLabel-root.Mui-disabled": {
            color: "#000000BC"
        }
    },
    switchLabel: {
        '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            color: "#9f9f9e",
            marginLeft: '-12px'
        }
    },
    actvBtn: {
        backgroundColor: "#E5F2F0",
        color: "#46C796",
        border: "1px solid #46C796",
        padding: "0 1rem",
        margin: "0 0.5rem"
    },
    inctvBtn: {
        backgroundColor: "rgba(0, 0, 0, 0.1) !important",
        border: "1px solid rgba(0, 0, 0, 0.8) !important",
        padding: "0 1rem",
        margin: "0 0.5rem",
        color: "rgba(0, 0, 0, 0.8)"
    },
    button: {
        padding: "0 1rem",
        margin: "0 0.5rem"
    },
    checkbox: {
        "&$checked": {
            color: "#51BFB6"
        },
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    customBox: {
        display: 'flex',
        flexWrap: 'nowrap',
        gap: 4.9,
        maxWidth: '300px',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            width: 'none',
            display: 'none'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },
    disabled : {
        cursor: 'not-allowed !important',
        pointerEvents: 'all'
    },
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function EmploymentDetails(props) {
    const {
        formik,
        pageMode,
        styleObj,
        handleDate,
        setHoveredField,
        hoveredField,
        primaryColor,
        fontFamily
    } = props;
    const classes = useStyles();

    const handleRoleChange = () => {};

    return (
        <Grid container direction="row" className='w-full' style={{fontFamily:fontFamily}}>
            <Grid item mt={4}>
                <h5>Employment details</h5>
            </Grid>

            <Grid item xs={12} mt={3}>
                <Multiselect1
                    roles={formik.values.employeeDetails && formik.values.employeeDetails.roles? formik.values.employeeDetails.roles: []}
                    roleName={formik.values.employeeDetails && formik.values.employeeDetails.roles? formik.values.employeeDetails.roles.map((v)=>v.name): []}
                    handleRoleChange={handleRoleChange}
                    handleDelete={handleRoleChange}
                    disabled={true}
                    label={`Role`}
                />
                { pageMode === 'edit' && hoveredField === 'aadhar' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    fontFamily={fontFamily}
                    id="typeOfEmployment"
                    name="typeOfEmployment"
                    label="Type of Employment"
                    select
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.typeOfEmployment? formik.values.employeeDetails.typeOfEmployment: ''}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("typeOfEmployment")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    SelectProps={{
                        MenuProps: {
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    < MenuItem value="Full Time" >
                        Full Time
                    </MenuItem>
                    < MenuItem value="Part Time" >
                        Part Time
                    </MenuItem>
                    < MenuItem value="Contract" >
                        Contract
                    </MenuItem>
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'typeOfEmployment' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    fontFamily={fontFamily}
                    id="employeeId"
                    name="employeeId"
                    label="Emp ID"
                    type="text"
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.employeeId}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("employeeId")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    InputLabelProps={{
                        shrink: formik.values.employeeDetails && formik.values.employeeDetails.employeeId? true: false,
                    }}
                    disabled
                />
                { pageMode === 'edit' && hoveredField === 'employeeId' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={2} style={{position:'relative'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        inputVariant="outlined"
                        id="doj"
                        name="doj"
                        label="Date of Joining"
                        //  maxDate={Date.now()}
                        fullWidth
                        value={formik.values.employeeDetails && formik.values.employeeDetails.joiningDate}
                        autoOk
                        InputLabelProps={{
                            classes: {
                                asterisk: 'text-error'
                            }
                        }}
                        format="dd MMM yyyy"
                        InputProps={{
                            readOnly: true,
                            classes: { 
                                disabled: classes.disabled 
                            }
                        }}
                        disabled
                        renderInput={(params) => 
                        <StyledTextField {...params} fontFamily={fontFamily}
                            fullWidth 
                            className="mt-5" 
                            InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error'
                                }
                            }} 
                            onMouseEnter={e => {setHoveredField("doj")}}
                            onMouseLeave={e => {setHoveredField("")}}
                            />
                        }
                    />
                </LocalizationProvider>
                { pageMode === 'edit' && hoveredField === 'doj' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    fontFamily={fontFamily}
                    id="email"
                    name="email"
                    label="Email"
                    type="text"
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("eemail")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.email}
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        },
                        endAdornment: (
                            <InputAdornment position="end" className="pl-16">
                                <Email
                                    className={
                                        classes.emailIcon
                                    }
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                { pageMode === 'edit' && hoveredField === 'eemail' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4}>
                <FormControlLabel
                    value="status"
                    name="status"
                    label="Status:"
                    labelPlacement="start"
                    size="small"
                    control={
                        <>
                            <Button variant="outlined" size="small"
                                name="status"
                                className={classes.inctvBtn}
                                disabled
                            >
                                {formik.values.employeeDetails && formik.values.employeeDetails.status}
                            </Button>
                        </>
                    }
                />
            </Grid>

            <Grid item mt={4}>
                <h5>Reporting Manager</h5>
            </Grid>

            <Grid item xs={12} mt={3} style={{position:'relative'}}>
                <StyledTextField
                    fontFamily={fontFamily}
                    id="employeeId"
                    name="employeeId"
                    label="Emp ID"
                    select
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.employeeId? formik.values.employeeDetails.reportingManager.employeeId: ''}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("empId")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    SelectProps={{
                        MenuProps: {
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }
                    }}
                >
                    <MenuItem value={formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.employeeId} key={formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.employeeId} >
                        {formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.employeeId}
                    </MenuItem>
                    <MenuItem value="None" key="None">
                        None
                    </MenuItem>
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'empId' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    fontFamily={fontFamily}
                    id="name"
                    name="name"
                    label="Employee's Name"
                    type="text"
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.name}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("empName")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    InputLabelProps={{
                        shrink: formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.name? true: false,
                    }}
                />
                { pageMode === 'edit' && hoveredField === 'empName' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    fontFamily={fontFamily}
                    id="role"
                    name="role"
                    label="Employee's Role"
                    type="text"
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.roles?.length && formik.values.employeeDetails.reportingManager.roles[0].name}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("eRole")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    InputLabelProps={{
                        shrink: formik.values.employeeDetails && formik.values.employeeDetails.reportingManager && formik.values.employeeDetails.reportingManager.roles?.length && formik.values.employeeDetails.reportingManager.roles[0].name? true: false,
                    }}
                />
                { pageMode === 'edit' && hoveredField === 'eRole' &&
                    <CustomTooltip/>
                }
            </Grid>

            {/* <Grid item mt={4}>
                <h5>Referral Details</h5>
            </Grid>

            <Grid item xs={12} mt={3}>
                <TextField
                    id="id"
                    name="id"
                    label="Emp ID"
                    select
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.id ? formik.values.employeeDetails.referral.id : ''}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("erId")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    SelectProps={{
                        MenuProps: {
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }
                    }}
                >
                    < MenuItem value={formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.id} key={formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.id} >
                        {formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.id}
                    </MenuItem>
                    <MenuItem value="None" key="None">
                        None
                    </MenuItem>
                </TextField>
                { pageMode === 'edit' && hoveredField === 'erId' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4}>
                <TextField
                    id="name"
                    name="name"
                    label="Employee's Name"
                    type="text"
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.name}
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("erName")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    InputLabelProps={{
                        shrink: formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.name? true: false,
                    }}
                />
                { pageMode === 'edit' && hoveredField === 'erName' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4}>
                <TextField
                    id="role"
                    name="role"
                    label="Employee's Role"
                    type="text"
                    variant="outlined"
                    value={formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.roles?.length && formik.values.employeeDetails.referral.roles[0].name? formik.values.employeeDetails.referral.roles[0].name : '' }
                    className={styleObj.textFieldWidth}
                    onMouseEnter={e => {setHoveredField("erRole")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    InputLabelProps={{
                        shrink: formik.values.employeeDetails && formik.values.employeeDetails.referral && formik.values.employeeDetails.referral.roles?.length && formik.values.employeeDetails.referral.roles[0].name? true: false,
                    }}
                />
                { pageMode === 'edit' && hoveredField === 'erRole' &&
                    <CustomTooltip/>
                }
            </Grid> */}
        </Grid>
    )
}

export default EmploymentDetails;
