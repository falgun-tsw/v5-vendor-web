import React  from 'react';
import {
    FormControlLabel,
    FormControl,
    Checkbox,
    FormLabel,
    FormGroup,
    Grid
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
            asterisk: {color:"red"},
            },
        },
    },
})

const V5Checklist = (props) => {
    const {
        data,
        formik,
        primaryColor,
        fontFamily
    } = props;
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const selectedStyle = {border:'1px solid #00000099', fontFamily:fontFamily, fontSize:'12px', borderRadius:'4px', width:'45%', height:"1.8rem", paddingLeft:'15%'}
    const selectedStyle1 = {border:`1px solid ${primaryColor}`,fontFamily:fontFamily, color:`#00000099`, backgroundColor:`${primaryColor}`, fontSize:'12px', borderRadius:'4px', width:'45%', height:"1.8rem", paddingLeft:'15%'}
    const unSelectedStyle = {border:'1px solid #00000099',fontFamily:fontFamily, fontSize:'12px', borderRadius:'4px', width:'100%',height:"1.8rem", paddingLeft:'45%' }
    const unSelectedStyle1 = {border:`1px solid ${primaryColor}`,fontFamily:fontFamily, color:`#00000099`, backgroundColor:`${primaryColor}`, fontSize:'12px', borderRadius:'4px', width:'100%',height:"1.8rem", paddingLeft:'45%' }
    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormControl fullWidth>
                    <FormLabel sx={{ fontSize: "14px", fontFamily:fontFamily }} component="legend" required={data.customOptions.required} >{data.label}</FormLabel>
                    <FormGroup 
                        style={{justifyContent:'space-between'}}
                        sx={{ marginLeft: "12px"}}
                        name={data.id}
                        aria-label={data.label}
                        row={data.customOptions.columns === 1 ? false : true}
                    >
                        {data.checkListOptions.map((x,index)=>{
                            return <FormControlLabel 
                                style={(data.customOptions.columns === 0 && formik.values[data.id]?.includes(x.label)) ? selectedStyle1 : data.customOptions.columns === 0 ? selectedStyle : (data.customOptions.columns === 1 && formik.values[data.id]?.includes(x.label)) ? unSelectedStyle1 : unSelectedStyle}
                                        className="my-2 py-1"
                                        label={x.label} 
                                        key={index} 
                                        value={x.label} 
                                        name={data.id} 
                                onChange={!formId && !editable && formik.handleChange}
                                control={<Checkbox style={{ display: 'none' }}
                                />}
                                    />
                        })}
                </FormGroup>
                </FormControl>
            </ThemeProvider>
        </Grid>
    );
}

export default V5Checklist;