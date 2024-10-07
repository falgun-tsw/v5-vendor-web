import React from 'react';
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    FormLabel,
} from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

const V5SingleChoice = (props) => {
    const {
        data,
        formik,
        customStyle,
        type,
        index,
        primaryColor,
        fontFamily
    } = props;

    const handleChoiseClick = (e) => {
        formik.setFieldValue([data.id] , e.target.value);
    }
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const ButtonStyle = {width:'46%',marginTop:8,marginBottom:8 }
    const FullWidthButtonStyle = {width:'100%',marginTop:8,marginBottom:8}

    const checkedStyle = { 
        width:'150%', 
        height:'1.8rem',
        paddingRight:'0px',
        border:`1px solid ${primaryColor}`,
        color:"black",
        backgroundColor:`${primaryColor}${80}`,
        fontFamily:fontFamily,
        fontSize:'12px',
        
    }
    const uncheckedStyle = {
        width:'150%', 
        height:'1.8rem',
        paddingRight:'0px',
        border:'1px solid #00000099',
        color:'#000000BC',
        fontSize:'12px',
        fontFamily:fontFamily,
        
    }

    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormControl fullWidth>
                    <FormLabel sx={{ fontSize: "14px", fontFamily:fontFamily }} component="legend" required={data.customOptions.required} >{data.label}</FormLabel>
                    <RadioGroup
                        sx={{ paddingLeft: "12px", justifyContent:'space-between'}}
                        name={data.id}
                        aria-label={data.label}
                        row={data.customOptions.columns === 1 ? false : true}
                        
                    >
                    {data.singleChoiceOptions.map((x,index)=>{
                        return <FormControlLabel 
                                style={ data.customOptions.columns === 1 ? FullWidthButtonStyle : ButtonStyle }    
                                    label="" 
                                    className={`my-2`}
                                    key={index} 
                                    value=""
                                    control={
                                        <>
                                        <Button 
                                            variant="outlined" 
                                            name={data.id} 
                                            value={x.label}
                                                style={formik.values[data.id] === x.label ? checkedStyle : uncheckedStyle} 
                                            onClick={handleChoiseClick}
                                                disabled={formId && !editable ? true : false}
                                            size="small">
                                            <span style={{whiteSpace:'nowrap'}}>{x.label.length > 15? `${x.label.substring(0, 15)}...` : x.label }</span>
                                            <Checkbox
                                                style={{marginLeft:'auto'}}
                                                name={x.label}
                                                value={x.label}
                                                    checked={formik.values[data.id] === x.label ? true : false}
                                                icon={<CircleOutlinedIcon style={{fontSize:'1.2rem'}} />}
                                                checkedIcon={<CheckCircleIcon style={{color:primaryColor, fontSize:'1.2rem'}} />}
                                            />
                                        </Button>
                                        </>
                                    }
                                />
                    })}
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        </Grid>
    );
}

export default V5SingleChoice;