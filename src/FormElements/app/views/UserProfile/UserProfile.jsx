import { Grid, Icon } from '@mui/material';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ProfileHeader from './components/ProfileHeader'
import UserDetails from './components/UserDetails'

function UserProfile(props) {
  const [pageMode, setPageMode] = React.useState('view');
  const [profileImage, setProfileImage] = React.useState('')
  const history = useHistory();
  const [logo, setLogo] = React.useState("");
  const dispatch = useDispatch();
  const { settings, updateSettings } = useSettings();
  const fontFamily = settings.themes.typography.fontFamily;
  const { profileId, userProfileDetails } = useSelector((state) => state.screenBuilder.profile);

  const handleClick = (pageMode) => {
    setPageMode(pageMode);
  }

  const handleCancel = () => {
    setPageMode('view');
    setLogo("");
    dispatch({
      type: "getUserProfileLogoAction",
      payload: profileId 
    });
    dispatch({
      type: "getUserProfileDetailsAction" 
    });
  }

  const handleArrow = () => {
    history('/dashboard')
  }

  const handleImageState = (image) => {
    setProfileImage(image)
  }

  const imageState = (image) => {
    setLogo(URL.createObjectURL(image));
  }

  return (
    <Grid style={{fontFamily:fontFamily}}>
      <Grid container justifyContent="space-between" p={1}>
        <Grid item>
          <h3>
            <img onClick={handleArrow} className='pr-2' src={"/assets/icons/backArrow.svg"} />
            My Profile
          </h3>
        </Grid>
        { pageMode === 'view' &&
        <Grid item className='cursor-pointer'>
            <Icon onClick={()=>{handleClick('edit')}}>
              <img src={'/assets/icons/edit.svg'} />
            </Icon>
        </Grid>
        }
      </Grid>
      <ProfileHeader pageMode={pageMode} handleImageState={handleImageState} logo={logo} imageState={imageState} />
      <UserDetails pageMode={pageMode} handleCancel={handleCancel}  profileImage={profileImage} />
    </Grid>
  )
}

export default UserProfile;