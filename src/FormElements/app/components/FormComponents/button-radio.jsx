import React from 'react';
import {
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    Grid,
    Radio
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { makeStyles } from '@mui/styles';
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

const V5ButtonRadio = (props) => {
    const {
        data,
        formik,
        fontFamily,
    } = props;
    // const useStyles = makeStyles({
    //     fontFamily: {
    //         fontFamily:fontFamily
    //     }
    // })
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const Pstyle = {
        border: '1px solid #d5d5d5', boxShadow: '0 2px 2px rgb(0 0 0 / 10%)',margin:`2px 6px 14px 2px`,padding:`2px 5px`
    };
    const Cstyle = { border: '1px solid #d5d5d5', boxShadow: '0 2px 2px rgb(0 0 0 / 10%)', color: data.customOptions.buttonThemeColor ,margin:`2px 6px 14px 2px`,padding:`2px 5px`};

    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormControl >
                    <FormLabel sx={{ fontSize: "14px", fontFamily:fontFamily}} component="legend" required={data.customOptions.required}>{data.label}</FormLabel>
                    <RadioGroup name={data.id}  row={data.customOptions.columns === 1 ? false : true}
                        value={formik.values[data.id]}
                        onChange={!formId && !editable && formik.handleChange}


                    >
                    {data.buttonRadioOptions.map((x,index)=>{
                        return <FormControlLabel style={formik.values[data.id] === x.label ? Cstyle : Pstyle} labelPlacement='start'
                            label={x.label} 
                                key={index} 
                                value={x.label}
                                className={`px-5 py-2 mt-2 ${fontFamily}`}
                            control={<Radio style={{ display: 'none' }}

                            />} />
                            })}
                    </RadioGroup >
                </FormControl>
            </ThemeProvider>
        </Grid>
    );
}

export default V5ButtonRadio;