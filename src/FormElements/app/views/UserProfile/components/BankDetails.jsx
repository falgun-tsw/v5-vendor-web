import { Grid, MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomTooltip } from './UserDetails';

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

function BankDetails(props) {
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

    return (
        <Grid container direction="row" className='w-full'>
            <Grid item mt={4}>
                <h5>Bank details</h5>
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="bankName"
                    name="bankName"
                    label="Bank Name"
                    select
                    variant="outlined"
                    value={formik.values.userBankDetails? formik.values.userBankDetails.bankName: ''}
                    className={`w-full`}
                    onMouseEnter={e => {setHoveredField("bankName")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                >
                    <MenuItem value={formik.values.userBankDetails && formik.values.userBankDetails.bankName} key={formik.values.userBankDetails && formik.values.userBankDetails.bankName} >
                        {formik.values.userBankDetails && formik.values.userBankDetails.bankName}
                    </MenuItem>
                    <MenuItem value="None" key="None">
                        None
                    </MenuItem>
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'bankName' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="ifscCode"
                    name="ifscCode"
                    label="IFSC Code"
                    value={formik.values.userBankDetails && formik.values.userBankDetails.ifscCode? formik.values.userBankDetails.ifscCode: ''}
                    type="text"
                    variant="outlined"
                    className={`w-full`}
                    onMouseEnter={e => {setHoveredField("ifscCode")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                >
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'ifscCode' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="accountNumber"
                    name="accountNumber"
                    label="Account Number"
                    value={formik.values.userBankDetails && formik.values.userBankDetails.accountNumber? formik.values.userBankDetails.accountNumber: ''}
                    type="text"
                    variant="outlined"
                    className={`w-full`}
                    onMouseEnter={e => {setHoveredField("accountNumber")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                >
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'accountNumber' &&
                    <CustomTooltip/>
                }
            </Grid>

            <Grid item xs={12} mt={4} style={{position:'relative'}}>
                <StyledTextField
                    primaryColor={primaryColor}
                    fontFamily={fontFamily}
                    id="branchName"
                    name="branchName"
                    label="Branch Name"
                    value={formik.values.userBankDetails && formik.values.userBankDetails.branchName? formik.values.userBankDetails.branchName: ''}
                    type="text"
                    variant="outlined"
                    className={`w-full`}
                    onMouseEnter={e => {setHoveredField("branchName")}}
                    onMouseLeave={e => {setHoveredField("")}}
                    disabled
                    InputProps={{
                        classes: { 
                            disabled: classes.disabled 
                        }
                    }}
                >
                </StyledTextField>
                { pageMode === 'edit' && hoveredField === 'branchName' &&
                    <CustomTooltip/>
                }
            </Grid>
        </Grid>
    )
}

export default BankDetails;
