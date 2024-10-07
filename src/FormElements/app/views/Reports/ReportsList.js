import React, { Fragment, useEffect, useState } from 'react';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import { makeStyles } from '@mui/styles';
import { Box, CircularProgress, Grid, Icon } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { useParams, useHistory } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import ReportsListTable from './components/ReportsListTable';
import ChartsView from './components/ChartsView';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    reportsBody: {
        maxHeight: 'calc(100vh - 150px)',
        overflowX: 'scroll',
        whiteSpace: 'noWrap',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        marginTop: '10px'
    },
    icon: {
        color: '#747474'
    },
    topHeadingContainer: {
        borderRadius: "10px",
        marginLeft: "0rem",
        marginRight: "0rem",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    mobileBackIconPosition: {
        position: "relative",
        top: "-3.2rem"
    }
}));

const StyledProgress = styled(CircularProgress)(() => ({
    '@media screen and (min-width: 800px)': {
        position: 'absolute',
        top: '35vh',
        left: `calc(((100% - 260px) / 3) + 260px)`,
    },
    '@media screen and (max-width: 800px)': {
        position: 'absolute',
        top: 'calc(50% - 64px)',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))

function ReportsList({match}) {
    const { settings, updateSettings } = useSettings();
    const primaryColor = settings.layout1Settings.main.primaryColor
    const { moduleId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { reportsList } = useSelector((state) => state.screenBuilder.reports);
    const fontFamily = settings.themes.typography.fontFamily;
    const [ viewType, setViewType ] = useState('chartView');
    const [ sortDirection, setSortDirection ] = useState('DESC');
    const isMobile = localStorage.getItem("isMobile");

    useEffect(()=> {
        dispatch({
            type: "getReportsListAction",
            payload: { moduleId, sortDirection }
        });
    }, [moduleId, sortDirection]);

    const goToReportDetails = (reportId) => {
        history(`/modules/${moduleId}/reports/${reportId}`);
    }

    const goBack = () => {
        setViewType(viewType === 'reportView'? 'chartView': 'reportView')
    }

    useEffect(() => {
        if (moduleId) {
            dispatch({
                type: 'getAllChartsDataAction',
                payload: { moduleId }
            })
        }
       //Get Report Sites
        dispatch({
            type: "getSitesForChartsAction"
        });
    }, [moduleId]);

    const handleSort = () => {
        setSortDirection(sortDirection === "DESC" ? "ASC": "DESC");
    }
    const handleBack = () => {
        history('/dashboard');
    }
    return (
        <Grid p={1} sx={{ fontFamily: fontFamily, height: "100vh" }}>
            {
                viewType === 'chartView' ?
                <>
                        <Icon className={`ml-1 mb-8 cursor-pointer ${isMobile === "true" && classes.mobileBackIconPosition}`} onClick={handleBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                            </svg>
                        </Icon>
                        <Grid sx={{ fontFamily: fontFamily }}>
                            <Box style={{ border: `1px solid ${primaryColor}`, marginTop: `${isMobile === 'true' && '-2.3rem'}` }} className={`flex justify-between w-full mb-3 pt-1 pb-1 ${classes.topHeadingContainer}`}>
                                {/* <ArrowBackIcon onClick={handleBack} className="cursor-pointer mb-3" /> */}
                                <h3 className='ml-4 mt-1 font-medium'>Reports</h3>
                                <div className='ml-2 cursor-pointer pr-5' onClick={goBack}>
                                    <TableChartTwoToneIcon 
                                variant="contained"
                                        style={{ color: primaryColor }}
                                        // onClick={goToReportDetails}
                            />
                                </div>

                            </Box>
                            <Box sx={{ ml: 2, cursor: 'pointer' }} onClick={goBack} >

                        </Box>
                    </Grid>
                    <Grid className={classes.reportsBody}>
                        <ChartsView />
                    </Grid>
                </>
                :
                <>
                        <Grid sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: fontFamily }}>
                        <Box onClick={goBack} sx={{ cursor: 'pointer'}}>      
                                <Icon className={`ml-1 mb-8 cursor-pointer ${isMobile === "true" && classes.mobileBackIconPosition}`} onClick={handleBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                                    </svg>
                                </Icon>
                        </Box>
                            <Box style={{ border: `1px solid ${primaryColor}`, marginTop: `${isMobile === 'true' && '-2.3rem'}` }} className={`flex justify-between w-full mb-3 pt-1 pb-1 ${classes.topHeadingContainer}`}>
                                <h3 className="ml-4 mt-1 font-medium">List of Reports</h3>
                        </Box>
                    </Grid>
                    <Grid className={classes.reportsBody}>
                        <ReportsListTable data={reportsList} handleClick={goToReportDetails} fontFamily={fontFamily} handleSort={handleSort} sortDirection={sortDirection}/>
                    </Grid>
                </>
            }
            
        </Grid>
    )
}

export default ReportsList;
