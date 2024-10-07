import React from 'react'
import useSettings from 'src/FormElements/app/hooks/useSettings'
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const V5GlobalLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]
    const {  clientLogoForHeader } = useSelector((state) => state.screenBuilder.modules);

    return (
        <Box sx={{ minWidth: "50px", maxWidth: "100px", height: "40px", marginRight: "1rem"}}>
            {clientLogoForHeader? <img style={{minWidth: "50px", maxWidth: "100px", height: "40px"}} src={clientLogoForHeader}/>: null}
        </Box>
    )
}

export default V5GlobalLogo
