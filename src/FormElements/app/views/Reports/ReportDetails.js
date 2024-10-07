import React, { Fragment, useEffect, useState, useRef } from 'react';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import { makeStyles } from '@mui/styles';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { styled } from '@mui/system';
import { useParams, useHistory } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterChips from './components/FilterChips';
import { V5GlobalHeaderActionList, V5GlobalIconButtons } from 'src/FormElements/app/components';
import ReportDetailsList from './components/ReportDetailsList';
import ReportsFilterPopup from './components/ReportsFilterPopup';

const useStyles = makeStyles(({ palette, ...theme }) => ({
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

function ReportDetails({match}) {
    const { settings, updateSettings } = useSettings();
    const { reportId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const { loading, reportDetails, reportColumns, sitesForCharts, reportFilterDetails } = useSelector((state) => state.screenBuilder.reports);
    const anchorRef = useRef(null);
    const [customizedReportColumns, setCustomizedReportColumns] = useState([]);

    const fontFamily = settings.themes.typography.fontFamily;
    const primaryColor = settings.layout1Settings.main.primaryColor;

    useEffect(()=> {
        if (reportDetails && reportDetails.length && reportColumns && reportColumns.length) {
            let columnIds = reportDetails.map((report)=> Object.keys(report));
            let columnHeaders = [];
            columnIds = [].concat.apply([], columnIds);
            reportColumns.forEach((column)=>{
                if (columnIds.indexOf(column.id)!==-1) {
                    columnHeaders.push(column);
                }
            })
            const actionHeader = {
                id: 'actionHeader',
                label: '',
                align: 'right',
                icon: "more_vert",
            };
            columnHeaders.push(actionHeader);
            setCustomizedReportColumns(columnHeaders);
        }
    }, [reportColumns, reportDetails])

    useEffect(()=> {
        //Get Configured reports 
        dispatch({
            type: "getReportDetailsAction",
            payload: { reportId, from: '', to: '', sites: '' }
        });

        //Get Report columns
        dispatch({
            type: "getReportColumnsAction",
            payload: { reportId }
        });
        //Get Report Sites
        dispatch({
            type: "getSitesForChartsAction"
        });
    }, [reportId]);

    const goBack = () => {
        history(-1);
    }

    const handleFilterClick = (e) => {
        setIsFilterPopupOpen(true);
    }

    const handleApplyFilter = (data) => {
        setIsFilterPopupOpen(false);

        let siteIds = [];
        sitesForCharts.forEach((site)=>{
            if (data.sites && data.sites.indexOf(site.name) !== -1) {
                siteIds.push(site.siteId);
            }
        })

        dispatch({
            type: "getReportDetailsAction",
            payload: { reportId, from: data.fromDate? format(data.fromDate, 'dd-MM-yyyy'): null, to: data.toDate? format(data.toDate, 'dd-MM-yyyy'): null, sites: siteIds.join(",") }
        });
    }

    useEffect(()=>{
        dispatch({
            type: "getReportDetailsAction",
            payload: { reportId, from: reportFilterDetails.fromDate? format(reportFilterDetails.fromDate, 'dd-MM-yyyy'): "" , to: reportFilterDetails.toDate? format(reportFilterDetails.toDate, 'dd-MM-yyyy'): "", sites: reportFilterDetails?.sites? reportFilterDetails?.sites?.join(",") : "" }
        });
    },[reportFilterDetails])

    const downloadReport = () => {
        dispatch({
              type: "downloadReportByIdAction",
              payload: { reportId, from: reportFilterDetails.fromDate? format(reportFilterDetails.fromDate, 'dd-MM-yyyy'): null, to: reportFilterDetails.toDate? format(reportFilterDetails.toDate, 'dd-MM-yyyy'): null, sites: reportFilterDetails?.sites?.join(",") }
            //   payload: {
            //     reportId
            //   }
        })
    }

    return (
        <Grid sx={{ minHeight: "calc(100vh - 120px)", fontFamily:fontFamily}}>
        { !loading ?
        <>
            <Grid sx={{ my: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: fontFamily }}>
                <Box onClick={goBack} sx={{ cursor: 'pointer'}}>      
                    <ArrowBackIcon />
                </Box>
                <Box sx={{ ml: 2}}>
                    <h2>Report Details</h2>
                </Box>
            </Grid>
            {
                reportDetails && reportDetails.length ?
                <Grid 
                    container
                    direction="row"
                    spacing={2}
                    className="flex justify-end items-center">
                    <Grid item>
                        
                        <V5GlobalIconButtons
                            key={1}
                            iconType={'Filter'}
                            tooltipTitle={'Filter'}
                            areaLabel={'Filter Popup'}
                            iconComponent={'span'}
                            iconClickHandler={handleFilterClick}
                            filterPopupOpen={isFilterPopupOpen}
                            color={primaryColor}
                        />
                        <V5GlobalIconButtons
                            key={2}
                            iconType={'download'}
                            tooltipTitle={'Download Excel'}
                            areaLabel={'Download Excel'}
                            iconComponent={'span'}
                            iconClickHandler={downloadReport}
                            color={primaryColor}
                        />
                    </Grid>
                </Grid>: null
            }
            <FilterChips chipInfo={reportFilterDetails} filtersInfo={reportFilterDetails} primaryColor={primaryColor}/>
            <ReportDetailsList
                allFormsData={reportDetails}
                formattedColumns={customizedReportColumns}
                formattedRows={reportDetails}
                handleFilterClick={handleFilterClick}
                isFilterPopupOpen={isFilterPopupOpen}
                handleView={()=>{}}
                fetchData={()=>{}}
                primaryColor={primaryColor}
            />
            <div ref={anchorRef} style={{ position: "relative" }}>
                <ReportsFilterPopup
                    anchorEl={anchorRef.current}
                    open={isFilterPopupOpen}
                    handleOpen={() => setIsFilterPopupOpen(true)}
                    handleClose={() => setIsFilterPopupOpen(false)}
                    handleApplyFilter={handleApplyFilter}
                    primaryColor={primaryColor}
                />
            </div>
        </>
        :
        <StyledProgress
            size={35}
            className="buttonProgress"
        />
        }
    </Grid>
    )
}

export default ReportDetails;
