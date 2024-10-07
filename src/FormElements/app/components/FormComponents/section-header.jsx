import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

const useStyles = bg => makeStyles((theme) => ({
    root: {
        backgroundColor: `${bg}!important`,
        // height: 46,
        padding: '0px',
        margin:'3px 0px',
        borderRadius:'4px'
    },
    cardcontent: {
        padding: '11px',
        align: "center"
    },
    typography: {
        flexGrow: 1,
        textAlign: "center",
        color: "#F6F6F6",
        fontSize: 17,
        fontWeight:100
    }
}));
const V5SectionHeader = (props) => {
    const {
        data,
        primaryColor,
        fontFamily
    } = props;
    const sectionBg = data.customOptions.sectionHeaderBGColor;
    const classes = useStyles(sectionBg)();
    const { formId } = useParams();
    return (
        <Grid mt={3}>
            <Card className={classes.root}>
                <CardContent className={classes.cardcontent}>
                    <Typography className={classes.typography} variant="h5" component="h2">
                        <b style={{fontFamily:fontFamily}}>{data.label}</b>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default V5SectionHeader;