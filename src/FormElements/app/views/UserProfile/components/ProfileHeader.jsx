import React, { useEffect } from 'react';
import { Grid, Card, Icon, IconButton, Tooltip, Box, Typography } from '@mui/material';
import { V5GlobalHeaderActionList } from 'src/FormElements/app/components';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import { config } from '@app/FormElements/config';

//import { setClientfilterDetails } from 'app/redux/ClientManagement/clientManagementSlice'
const useStyles = makeStyles(() => ({
    headerBackground: {
        backgroundColor: "linear-gradient(45deg,black,white)",
    },
    container: {
        backgroundColor: "white",
        borderRadius: 4,
        // margin: '1.5rem ',
        width: '100%',
        // border: '1px solid #DCDCDC',
        borderBottom: '1px solid #DCDCDC',
        borderRight: '1px solid #DCDCDC',
        borderLeft: '1px solid #DCDCDC',
        borderRadius: 8,
        height:'180px',
    },
    childContainer: {
        background: "transparent linear-gradient(271deg,#DDDFE4 0% ,#A7AEBB 100%) 0% 0% no-repeat padding-box",
        borderRadius: '8px 8px 0px 0px',
        opacity: 1,
        height:'90px'
    },
    profileImg: {
        display: 'inline-block',
        marginTop: '7rem',
        width: 80,
        height: 80,
        backgroundColor: '#766A96',
        alignItems: 'center',
        borderRadius:'50%',
        "&:hover":{
        }
    },
    profileNametext: {
        marginLeft: "12px",
        marginTop: '18px',
        padding: '4px',
        fontSize: '40px'
    },
    headerText: {
        margin: "2rem",
    },
    img: {
        width:'5rem', 
        height:'5rem',
        left: "38%",
        top: "28%" ,
        borderRadius:'50%' ,
        position:'absolute',
        transition: '.2s ease',
    },
    icon : {
        left: "38%",
        top: "28%" ,
        borderRadius:'50%' ,
        position:'absolute',
        padding:'1.5rem',
        fontSize:'5rem',
        opacity:0,
        cursor:'pointer',
        color:'white',
        "&:hover": {
            opacity:1
        }
    },
    inputStyle: {
        display:'none',
        visibility:"hidden"
    },
    profileHeader: {
        fontWeight:'bold',
    }

}))

function ProfileHeader(props){
    const {
        pageMode, 
        handleImageState,
        logo,
        imageState
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { settings, updateSettings } = useSettings();
    const { userProfileLogo, userProfileDetails, updateUserProfileLogo, profileId } = useSelector((state)=> state.profile);
    const [profileLogoHeader, setProfileLogoHeader] = React.useState('');
    const fontFamily = settings.themes.typography.fontFamily;
    const primaryColor = settings.layout1Settings.main.primaryColor;
    const { isProd } = config;
    //..ONBOARDING ENDPOINT
    const ONBOARDING_API_ENDPOINT = isProd
        ? config.production.api_endpoint
        : config.development.api_endpoint;
    const ONBOARDING_APIVERSION = "api/v1";

    useEffect(() => {
        dispatch({
            type: "getUserProfileLogoAction",
            payload: profileId 
        });
    }, [logo]);

    useEffect(()=>{
        let header = "";
        if(localStorage.getItem('typeOfUser') === "Admin"){
            header = userProfileDetails.fullName? userProfileDetails.fullName.substring(0,2) : ""
        }else{
            header = userProfileDetails.firstName? userProfileDetails.firstName.substring(0,2) : "";
        }
        setProfileLogoHeader(header);
    },[userProfileDetails])

    const handleImage =(event)=> {
        imageState(event.target.files[0]);
        handleImageState(event.target.files[0])
    }
    return (
        <Grid p={1} style={{fontFamily:fontFamily}}>
            <p className={classes.profileHeader}>Profile photo and header image</p>
            <Grid container>
                <Box height={170} style={{position:'relative'}} className={classes.container}>
                    <Box  className={classes.childContainer} display='flex' justifyContent='center' alignItems='center'></Box>
                    { 
                        userProfileDetails?.profileId && logo === "" ?
                            <img className={classes.img} src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${userProfileDetails?.profileId}`} /> :
                        logo !== "" ?
                            <img className={classes.img} src={logo} /> 
                        :  
                                <Grid className={classes.img} style={{ backgroundColor: primaryColor }}> 
                            <h3 style={{textAlign:'center', marginTop:'1.5rem', textTransform: 'uppercase' }}>{profileLogoHeader}</h3>
                        </Grid>
                    }
                    { pageMode === "edit" && 
                        <label for="icon"><img src={`/assets/icons/upload.svg`} className={classes.icon}/></label>
                    }
                    <input 
                        type="file"
                        className={classes.inputStyle}
                        name="icon"
                        onChange={(event)=>handleImage(event)}
                        id="icon"
                    >
                    </input>
                </Box>
            </Grid>
        </Grid>
    )
}
export default ProfileHeader;