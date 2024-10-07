import { Grid, MenuItem, TextField, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React,  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CustomTooltip } from './UserDetails';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/system';

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
            color: "#1976d2"
        }
    },
    paper: {
        width: '100%',
        height: '15rem',
        borderRadius: '3px',
        position: 'relative',
        marginBottom: '5rem',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: "10rem",
        marginTop: "3rem"
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
    disabled : {
        cursor: 'not-allowed !important',
        pointerEvents: 'all'
    },
}))

function BasicDetails(props) {
    const {
        pageMode,
        handleInputChange,
        formik,
        setHoveredField,
        hoveredField,
        primaryColor,
        fontFamily
    } = props;
    const classes = useStyles();
    const { states, cities } = useSelector((state)=> state.profile);
    const dispatch = useDispatch();
    const emailRegex =  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/;
    const pinRegex = /^[0-9]*$/;

    const handleStateChange = (state) => {
        dispatch({
            type: "getCitiesByStateDataAction",
            payload: state
        });
        formik.setFieldValue("state", state);
    }

    useEffect(()=> {
        dispatch({
            type: "getCitiesByStateDataAction",
            payload: formik.values.state
        });
    }, []);

    useEffect(()=> {
        dispatch({
            type: "getCitiesByStateDataAction",
            payload: formik.values.state
        });
    }, [formik.values.state]);
    return (
        <Grid container direction="row" className='w-full'>
            <Grid item mt={4}>
                <h5>Basic details</h5>
            </Grid>
            <Grid item xs={12} mt={3} style={{position:'relative'}} >
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: formik.values.fullName? true: false,
                    }}
                    value={formik.values.fullName}
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    disabled
                    onMouseEnter={e => {setHoveredField("fullName")}}
                    onMouseLeave={e => {setHoveredField("")}}
                />
                { pageMode === 'edit' && hoveredField === 'fullName' &&
                    <CustomTooltip/>
                }                     
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        inputVariant="outlined"
                        id="dob"
                        name="dob"
                        label="Date of Birth"
                        fullWidth
                        value={formik.values.dob}
                        autoOk
                        format="dd MMM yyyy"
                        InputProps={{
                            classes: { 
                                disabled: classes.disabled 
                            }
                        }}
                        disabled
                        renderInput={(params) => 
                        <StyledTextField {...params} primaryColor={primaryColor} fontFamily={fontFamily}
                            fullWidth 
                            onMouseEnter={e => {setHoveredField("dob")}}
                            onMouseLeave={e => {setHoveredField("")}}
                            />
                        }
                    />
                </LocalizationProvider>
                { pageMode === 'edit' && hoveredField === 'dob' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="phone"
                    name="phone"
                    label="Mobile Number"
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    type="text"
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><PhoneIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                    }}
                    required
                    InputLabelProps={{
                        classes: {
                            asterisk: 'text-error'
                        }, 
                        shrink: formik.values.phone? true: false,
                    }}
                    inputProps={{ maxLength: 10 }}
                    variant="outlined"
                    disabled={pageMode === 'view' ? true : false}
                />
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={ formik.values.email?.length > 0 && !formik.values.email.match(emailRegex) }
                    helperText={ formik.values.email?.length > 0 && !formik.values.email.match(emailRegex) ? "Entered email is incorrect." : "" }
                    disabled={pageMode === 'view' ? true : false}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" className={classes.iconColor} /></InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: formik.values.email? true: false,
                    }}
                    variant="outlined"
                    />
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="gender"
                    select
                    name="gender"
                    label="Gender"
                    fullWidth
                    type="text"
                    defaultValue={formik.values.gender? formik.values.gender: ''}
                    value={formik.values.gender? formik.values.gender: ''}
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
                            // getContentAnchorEl: null,
                            classes: { 
                                disabled: classes.disabled 
                            }
                        }
                    }}
                    variant="outlined"
                    disabled
                    onMouseEnter={e => {setHoveredField("gender")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    >
                    <MenuItem selected value={formik.values.gender}>
                        {formik.values.gender}
                    </MenuItem>
                    <MenuItem value="None" key="None">
                        None
                    </MenuItem>
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'gender' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="pan"
                    name="pan"
                    fullWidth
                    label="PAN Number"
                    type="text"
                    variant="outlined"
                    disabled
                    value={formik.values.pan}
                    onChange={formik.handleChange}
                    onMouseEnter={e => {setHoveredField("pan")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                    />
                    { pageMode === 'edit' && hoveredField === 'pan' &&
                        <CustomTooltip/>
                    }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="aadhar"
                    name="aadhar"
                    label="Aadhar Number"
                    disabled
                    value={formik.values.aadhar}
                    onChange={formik.handleChange}
                    fullWidth
                    type="text"
                    variant="outlined"
                    onMouseEnter={e => {setHoveredField("aadhar")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                />
                { pageMode === 'edit' && hoveredField === 'aadhar' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="address"
                    name="address"
                    label="Address"
                    value={formik.values?.address? formik.values.address: ""}
                    disabled={pageMode === 'view' ? true : false}
                    onChange={formik.handleChange}
                    fullWidth
                    type="text"
                    variant="outlined"
                />
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    disabled
                    id="country"
                    name="country"
                    label="Country"
                    // defaultValue="India"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    fullWidth
                    type="text"
                    variant="outlined"
                    />
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="state"
                    select
                    name="state"
                    fullWidth
                    defaultValue={formik.values.state? formik.values.state: ''}
                    value={formik.values.state? formik.values.state: ''}
                    onChange={(e)=>handleStateChange(e.target.value)}
                    disabled={pageMode === 'view' ? true : false}
                    label="State"
                    type="text"
                    variant="outlined"
                    >   
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    { 
                    states.map((x,index)=>{
                        return(
                        <MenuItem value={x.name}>{x.name}</MenuItem>
                        )
                    }) 
                    }
                </StyledTextField>
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="city"
                    select
                    name="city"
                    fullWidth
                    value={formik.values.city? formik.values.city: ''}
                    onChange={formik.handleChange}
                    disabled={pageMode === 'view' ? true : false}
                    label="City"
                    type="text"
                    variant="outlined"
                    >
                    { 
                        cities.map((x,index)=>{
                            return(
                            <MenuItem value={x.name} >{x.name}</MenuItem>
                            )
                        }) 
                    }

                </StyledTextField>
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="area"
                    label="Area"
                    fullWidth
                    name='area'
                    value={formik.values.area? formik.values.area : ''}
                    onChange={formik.handleChange}
                    disabled={pageMode === 'view' ? true : false}
                />
            </Grid>

            <Grid item xs={12} mt={4}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="pincode"
                    name="pincode"
                    label="PIN"
                    fullWidth
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    disabled={pageMode === 'view' ? true : false}
                    error={formik.values.pincode?.length > 0 && formik.values.pincode?.length != 6 || formik.values.pincode !== null && !formik.values.pincode?.match(pinRegex)}
                    helperText={formik.values.pincode?.length > 0 && formik.values.pincode?.length != 6 || formik.values.pincode !== null && !formik.values.pincode?.match(pinRegex) ? `Enter valid Pincode` : ""}
                    type="text"
                    variant="outlined"
                />
            </Grid>
        </Grid>
    )
}

export default BasicDetails;
