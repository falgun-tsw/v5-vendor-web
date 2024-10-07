import React, { useEffect } from 'react';
import {
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
    Button,
    Tooltip,
    Checkbox,
    FormControlLabel,
    Card,
    SwipeableDrawer,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import PropTypes from "prop-types";
import useSettings from 'src/FormElements/app/hooks/useSettings';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DateFnsUtils from '@date-io/date-fns';
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import { makeStyles } from '@mui/styles';
import { convertDate } from 'src/FormElements/app/utilities/DateFormat';
import { useFormik } from 'formik';
import Email from '@mui/icons-material/Email';
import { useDispatch, useSelector } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import EmploymentDetails from './EmploymentDetails';
import BankDetails from './BankDetails';
import MappedLocation from './MappedLocation';
import BasicDetails from './BasicDetails';
import { styled } from '@mui/system';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: { 
        "& .MuiInputLabel-root": {
            color: "#00000099",
            fontWeight: "400"
        },

        "& .MuiFormLabel-root.Mui-focused": {
            color: "#51BFB6"
        },

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
            color: "#9f9f9e"
        }
    },
    iconColor: {
        color: "#636365"
    },
    disableCursor: {
        '&:hover': {
            cursor: 'notAllowed'
        }, 
    },
    disabled : {
        cursor: 'not-allowed',
        pointerEvents: 'all'
    },
    customTooltip: {
        position: 'absolute',
        left: '15px',
        top: '35px',
        zIndex: '500',
        width: '240px',
        padding: '0px 10px',
        wordBreak: 'break-word'
    },
    drawer: {
        '@media screen and (min-width: 800px)': {
            width: `calc((100% - 260px) / 3)`,
            marginLeft: `calc(((100% - 260px) / 3) + 260px)`,
            borderRadius:'5px',
            marginBottom:'20%'
        },
        '@media screen and (max-width: 799px)': {
            width: '100%',
            padding: '5px',
            marginBottom:'90%'
        }
    },
}));
const DrawerRoot = styled(SwipeableDrawer)(() => ({
    "& .MuiBackdrop-root": {
        backgroundColor:"rgba(0, 0, 0, 0.65)"
    }
  }))
function UserDetails(props) {
    const {
        pageMode,
        handleCancel,
        profileImage, 
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { settings, updateSettings } = useSettings();
    const { userProfileDetails, profileId } = useSelector((state)=> state.profile);
    const [ formData, setFormData ] = React.useState({});
    const [ hoveredField, setHoveredField ] = React.useState("phone");
    const [showDeletePopup, setShowDeletePopup] = React.useState(false);
    const primaryColor = settings.layout1Settings.main.primaryColor;
    const fontFamily = settings.themes.typography.fontFamily;
    const history = useHistory();
    
    const formik = useFormik({
        initialValues: formData,
        enableReinitialize: true,
        onSubmit: async (values) => {
            dispatch({
                type: "updateUserProfileDetailsAction",
                payload: values,
                isProfileUpdated: true
            });
            let formData = new FormData();
            formData.append('file', profileImage);
            if (profileImage) {
                dispatch({
                    type: 'updateUserProfileLogoAction',
                    file: formData
                });
            }
            handleCancel();
            history('/dashboard');
        }
    });
    
    useEffect(() => {
        dispatch({
            type: "getUserProfileDetailsAction" 
        });
        dispatch({
            type: "getStatesCitiesMasterAction" 
        });
        dispatch({
            type: "getUserProfileLogoAction",
            payload: profileId
        });
        dispatch({
            type: "getStatesDataAction" 
        });
    }, [dispatch]);

    useEffect(()=>{
        setFormData({...userProfileDetails});
        formik.setValues({...userProfileDetails});
        Object.keys(userProfileDetails).forEach((v)=>{ formik.setFieldTouched(v, true) });
        //formik.setTouched({ fullName: true});
        dispatch({
            type: 'getCitiesByStateDataAction',
            payload: formik.values.state
        })
    },[userProfileDetails]);

    const handleClose = () => {
        dispatch({
            type: "getUserProfileDetailsAction" 
        });
        handleCancel();
        setShowDeletePopup(false);
    }
    const typeOfUser = localStorage.getItem('typeOfUser');

    //....STYLE CONSTANTS
    const styleObj = {
        textFieldWidth: 'w-full',
    };
    return (
        <Grid style={{fontFamily:fontFamily}}>
            <form onSubmit={formik.handleSubmit} >
                <Grid className="w-full mt-2 p-1">
                    <BasicDetails
                        primaryColor={primaryColor}
                        styleObj={styleObj}
                        pageMode={pageMode}
                        formik={formik}
                        hoveredField={hoveredField}
                        setHoveredField={setHoveredField}
                    />
                    <EmploymentDetails
                        primaryColor={primaryColor}
                        styleObj={styleObj}
                        pageMode={pageMode}
                        formik={formik}
                        hoveredField={hoveredField}
                        setHoveredField={setHoveredField}
                    />
                    <MappedLocation
                        primaryColor={primaryColor}
                        styleObj={styleObj}
                        pageMode={pageMode}
                        formik={formik}
                        hoveredField={hoveredField}
                        setHoveredField={setHoveredField}
                    />
                    <BankDetails
                        pageMode={pageMode}
                        primaryColor={primaryColor}
                        formik={formik}
                        hoveredField={hoveredField}
                        setHoveredField={setHoveredField}
                    />

                    {pageMode === 'edit' &&
                    <Grid container justifyContent="flex-end" className="p-1 mt-3" style={{position:'sticky'}}>
                        <Grid item xs={12}>
                            <Button className="w-full" type="button" onClick={()=>setShowDeletePopup(true)} variant='outlined' color='primary' >CANCEL</Button>
                        </Grid>
                        <Grid item xs={12} className="mt-3">
                            <Button className="w-full" type="submit" disabled={formik.values.phone.length < 10 || formik.values.pincode?.length > 0 && formik.values.pincode?.length != 6 } variant="contained" color="primary" >SAVE</Button>
                        </Grid>
                    </Grid>
                    }
                    <DrawerRoot
                        classes={{ paper: classes.drawer }}
                        anchor={'bottom'}
                        open={showDeletePopup}
                        onClose={()=>setShowDeletePopup(false)}
                        aria-labelledby="alert-dialog-title"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          Saved data will be lost.
                          Are you sure want to delete?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Yes</Button>
                          <Button onClick={()=>setShowDeletePopup(false)} autoFocus>
                            No
                          </Button>
                        </DialogActions>
                      </DrawerRoot>
                </Grid>
            </form>
        </Grid>
    );
}

export function CustomTooltip() {
    const classes = useStyles();
    const { settings, updateSettings } = useSettings();
    const primaryColor = settings.layout1Settings.main.primaryColor;
    const fontFamily = settings.themes.typography.fontFamily;
    return(
        <Card style={{fontFamily:fontFamily}} className={`${classes.customTooltip} text-left`}>
                <p>To update this, please contact your 
                    <span style={{margin:0, color: primaryColor, fontSize: '14px'}}> ADMIN@V5GLOBAL.IN</span>
                </p>
        </Card>
    )
}

UserDetails.propTypes = {
    formValues: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func
}

UserDetails.defaultProps = {

};

export default UserDetails;