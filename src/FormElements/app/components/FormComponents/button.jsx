import React from 'react';
import {
    Button
} from '@mui/material';
//import { makeStyles } from '@mui/styles';
//import { useParams } from 'react-router-dom';
//import { useSelector } from 'react-redux';
// const useStyles = makeStyles({
//     SecondaryButton:{
// backgroundColor:"#C1C1C1",
// color:'black',
// '&:hover': {
//     background: '#C1C1C1',
// },

//     }  
// }); 
const V5Button = (props) => {
    const { data, primaryColor, fontFamily} = props;
    // const classes = useStyles();
    // const { formId } = useParams();

    const handleAction = (e) => {
        props.buttonAction(data.customOptions.buttonAction, data.label, data.id);
    }

    return (
        <>
            {data.buttonType !== "hyperlink" ?
            <Button variant="contained" style={{fontFamily:fontFamily,margin:`4px 0px`}} className='my-2' color={data.buttonType} fullWidth onClick={handleAction}>
                {data.label}
            </Button>
            :
            <div className='my-1' style={{border:`1px solid ${primaryColor}`, borderRadius:'5px'}}>
                <a className='my-2' style={{display:'flex', fontFamily:fontFamily, justifyContent:'center', color:primaryColor}} target="_blank" href={data.customOptions.Hyperlink}>{data.label}</a>
            </div>
            }
        </>
    );
}

export default V5Button;