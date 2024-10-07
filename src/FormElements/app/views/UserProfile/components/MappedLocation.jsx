import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { V5GlobalFormFooter } from 'src/FormElements/app/components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import EmptyView from 'src/FormElements/app/components/EmptyView/EmptyView';
import DisabledView from 'src/FormElements/app/components/EmptyView/DisabledView';
import { CustomTooltip } from './UserDetails';
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
    paper: {
        backgroundColor: 'white',
        width: '98%',
        height: 'auto',
        borderLeft: '4px solid #51BFB6',
        borderRadius: '3px',
        position: 'relative',
        boxShadow: ' 2px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem',
        paddingBottom: "5rem",
        flex: 1,
        marginTop: '4rem'
    },
    paperlast: {
        width: '98%',
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
        position: 'relative',
        paddingBottom: "2rem"
    },
    paperBottom: {
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
        width: '98%',
        height: '3rem',
        position: 'absolute',
        bottom: 0,
        marginTop: "15rem"
    },
    paperBottomlast: {
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
        position: 'absoute',
        bottom: 0,
        marginTop: '2rem',
    },

    icon: {
        position: 'absolute',
        bottom: '0.5rem',
        right: '1rem',
        color: '#00000061',
        cursor: 'pointer',
    },
    iconDisabled: {
        position: 'absolute',
        bottom: '0.5rem',
        right: '1rem',
        color: '#0000001F',
    },
    phoneIcon: {
        color: '#E1E1E0',
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
}));

// const custom = createTheme({
//     palette: {
//         primary: {
//             main: "#51BFB6"
//         }
//     },
// });

function MappedLocation(props) {
    const {
        pageMode,
        formik,
        styleObj,
        setHoveredField,
        hoveredField,
        primaryColor,
        fontFamily
    } = props;

    const classes = useStyles();
    return (
        <Grid style={{ fontFamily: fontFamily }} className='w-full'>
            { formik.values.userSiteLocaions && formik.values.userSiteLocaions.length > 0?
            <Grid item mt={4}>
                <h5>Mapped Locations</h5>
            </Grid>
            : null
            }
            { formik.values.userSiteLocaions && formik.values.userSiteLocaions.length > 0 ? formik.values.userSiteLocaions.map((location) => {
            return <Grid container direction="row" className='w-full'>
                        <Grid item xs={12} mt={4} style={{position:'relative'}}>
                            <StyledTextField
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                disabled
                                value={location.siteId}
                                id="storeId"
                                name="storeId"
                                label="Location ID"
                                select
                                variant="outlined"
                                required
                                className={`${styleObj.textFieldWidth}`}
                                InputLabelProps={{
                                    classes: {
                                        asterisk: 'text-error',
                                    },
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
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                                onMouseEnter={e => {setHoveredField("storeId")}}
                                onMouseLeave={e => {setHoveredField("")}}
                            > 
                                <MenuItem value={location.siteId} key={location.siteId}>
                                    {location.siteId}
                                </MenuItem>
                                <MenuItem value="None" key="None">
                                    None
                                </MenuItem>
                            </StyledTextField>
                            { pageMode === 'edit' && hoveredField == 'storeId' &&
                                <CustomTooltip/>
                            }
                        </Grid>

                        <Grid item xs={12} mt={4} style={{position:'relative'}}>
                            <StyledTextField
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                disabled
                                value={location.address}
                                id="address"
                                name="address"
                                label="Address"
                                type="text"
                                variant="outlined"
                                className={`${styleObj.textFieldWidth}`}
                                onMouseEnter={e => {setHoveredField("lAddress")}}
                                onMouseLeave={e => {setHoveredField("")}}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                            />
                            { pageMode === 'edit' && hoveredField == 'lAddress' &&
                                <CustomTooltip/>
                            }
                        </Grid>

                        <Grid item xs={12} mt={4} style={{position:'relative'}}>
                            <StyledTextField
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                disabled
                                value={location.managers.map((details) => details.id)}
                                id="storeManagerId"
                                name="storeManagerId"
                                label="Store Manager Emp ID"
                                type="text"
                                variant="outlined"
                                className="w-full"
                                onMouseEnter={e => {setHoveredField("storeMId")}}
                                onMouseLeave={e => {setHoveredField("")}}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                            />
                            { pageMode === 'edit' && hoveredField === 'storeMId' &&
                                <CustomTooltip/>
                            }
                        </Grid>

                        <Grid item xs={12} mt={4} style={{position:'relative'}}>
                            <StyledTextField
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                disabled
                                value={location.managers.map((details) => details.firstName + " " + details.lastName)}
                                id="storeManagerName"
                                name="storeManagerName"
                                label="Store Head Emp Name"
                                type="text"
                                variant="outlined"
                                className="w-full"
                                onMouseEnter={e => {setHoveredField("smName")}}
                                onMouseLeave={e => {setHoveredField("")}}
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    }
                                }}
                            />
                            { pageMode === 'edit' && hoveredField == 'smName' &&
                                <CustomTooltip/>
                            }
                        </Grid>

                        <Grid item xs={12} mt={4} style={{position:'relative'}}>
                            <StyledTextField
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                disabled
                                value={location.managers.map((details) => details.mobile)}
                                id="storeManagerMobile"
                                name="storeManagerMobile"
                                label="Mobile Number"
                                type="text"
                                variant="outlined"
                                className="w-full"
                                InputProps={{
                                    classes: { 
                                        disabled: classes.disabled 
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <LocalPhoneIcon
                                                className={
                                                    classes.phoneIcon
                                                }
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                onMouseEnter={e => {setHoveredField("smMobile")}}
                                onMouseLeave={e => {setHoveredField("")}}
                            />
                            { pageMode === 'edit' && hoveredField == 'smMobile' &&
                                <CustomTooltip/>
                            }
                        </Grid>

                    </Grid>
            }) : null}
        </Grid>
    )
}

export default MappedLocation;
