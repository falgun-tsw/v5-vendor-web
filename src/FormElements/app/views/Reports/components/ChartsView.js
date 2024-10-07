import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import Plot from 'react-plotly.js';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    Popover,
    Typography,
    Button,
    TextField,
    Popper
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu'
import { format } from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { capitalizeFirstLetter } from '@app/FormElements/utils';
import { setChartFilter } from 'src/FormElements/app/redux/ReportsManagement/reportsManagementSlice';
import EmptyView from 'src/FormElements/app/components/EmptyView/EmptyView';
import { cloneDeep } from 'lodash';
import { V5GlobalIconButtons } from 'src/FormElements/app/components'
import Multiselect1 from 'src/FormElements/app/components/Multiselect/Multiselect1';

const useStyles = makeStyles(() => ({
    root: {
        width: '360px',
        '& .MuiBox-root ': {
            backgroundColor: '#fffff',
        },
    },
    chartReverse: {
        background: '#ffffff !important ',
        transform: 'rotate(90deg)',
        borderRadius: '4px',
    },
    mainCard: {
        cursor: 'pointer',
        minHeight: '280px',
        backgroundColor: '#ffffff !important',
        marginBottom: '15px',
    },
    typography: {
        fontSize: '12px',
        fontWeight: '300',
        textAnchor: 'middle',
        marginRight: '25px',
    },
    filterHeader: {
        fontSize: '16px',
        backgroundColor: '#50BFB7',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        color: '#747474',
    },
    cancel: {
        fontSize: '14px !important',
        letterSpacing: '1.25px !important',
        lineHeight: '16px !important',
        color: '#50BFB7 !important',
        border: '1px solid #50BFB7 !important',
        width: '100px !important',
        borderRadius: '4px !important',
        padding: '8px !important',
    },
    save: {
        fontSize: '14px !important',
        letterSpacing: '1.25px !important',
        lineHeight: '16px !important',
        color: '#000000BC !important',
        border: '1px solid #50BFB7 !important',
        width: '100px !important',
        background: '#50BFB7 0% 0% no-repeat padding-box !important',
        borderRadius: '4px !important',
        marginLeft: '15px !important',
        padding: '8px !important',
    },
    chartType: {
        marginTop: "1rem",
        width: "150px"
    },
    chartOptionContainer: {
        width: "8rem",
        backgroundColor: "#fff",
        boxShadow: 24,
        height: "8rem",
    },
    svgIcons1: {
        opacity: 0.5,
        marginRight: "0.5rem",
        '&:hover': {
            opacity: 1,
            color: "black"
        }
    },
}))

const StyledDesktopDatePicker = styled(DesktopDatePicker)(({ primaryColor }) => ({
    border: primaryColor
}))

const StyledTextField = styled(TextField)(({ primaryColor, fontFamily }) => ({
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

function ChartsView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { settings, updateSettings } = useSettings();
    const [chartId, setChartId] = useState([]);
    // const [selectedChart, setSelectedChart] = useState("");
    const [OpenChartFiler, setOpenChartFilter] = useState(false);
    const anchorRef = useRef(null)
    const [refrenceChart, setRefrenceElChart] = useState(null);
    const [chartType, setChartType] = useState();
    const [selectedChart, setSelectedChart] = useState({
        id: '',
        chartType: ''
    });
    const fontFamily = settings.themes.typography.fontFamily;
    const primaryColor = settings.layout1Settings.main.primaryColor;

    const { sitesForCharts, charts, chartFilter } = useSelector((state) => state.screenBuilder.reports)
    const [formattedCharts, setFormattedCharts] = useState([]);
    const config = {
        showLink: false,
        displayModeBar: true,
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setChartId(id);
    }

    const handleChartType = (type, chartId) => {
        // setSelectedChart(chartId);
        setChartType(type);
        setOpenChartFilter(false);
        let chartData = { ...selectedChart };
        chartData.chartType = type;
        setSelectedChart(chartData);
    }

    const downloadChart = (id) => {
        let ele = document
            .getElementById('chart' + id)
            .getElementsByClassName('modebar-container');
        for (var i = 0; i < ele.length; i++) {
            ele[i].getElementsByClassName('modebar-btn')?.[0].click();
        }
    }

    const formatChartData = (chartData) => {
        let chart;

        if (chartData.type === "PIE_CHART") {
            chart = {
                labels: [],
                values: [],
                width: [],
                borderRadius: 0.5,
                type: 'pie'
            }
        } else if (chartData.type === "LINE_CHART") {
            chart = {
                x: [],
                y: [],
                width: [],
                borderRadius: 0.5,
                type: 'scatter'
            }
        } else {
            chart = {
                x: [],
                y: [],
                width: [],
                borderRadius: 0.5,
                type: 'bar'
            }
        }
        if (chartData.type !== "PIE_CHART") {
            chartData.charts.forEach(v => {
                chart.x.push(v[chartData.xAxis.componentId]);
                chart.y.push(v[chartData.yAxis.componentId]);
                let width = 0.7;
                if (v[chartData.xAxis.componentId] && !isNaN(v[chartData.xAxis.componentId]) && !isNaN(v[chartData.yAxis.componentId]) ) {
                    width = 5000;
                }
                chart.width.push(width);
                v[chartData.xAxis.componentId] && isNaN(v[chartData.xAxis.componentId]) ? chart['orientation'] = 'w' : chart['orientation'] = 'h';
            });
        } else {
            chartData.charts.forEach(v => {
                if (isNaN(v[chartData.xAxis.componentId])) {
                    chart.labels.push(v[chartData.xAxis.componentId]);
                } else {
                    chart.values.push(v[chartData.yAxis.componentId]);
                }
                if (isNaN(v[chartData.yAxis.componentId])) {
                    chart.labels.push(v[chartData.yAxis.componentId]);
                } else {
                    chart.values.push(v[chartData.yAxis.componentId]);
                }
                chart.width.push(0.7);
            });
        }
        return [chart];
    }

    const formatChartMargin = (chartData) => {
        let chartMargin;
        if (chartData.type !== "PIE_CHART") {
            chartMargin = {
                l: 50,
                r: 50,
                b: 130,
                t: 10,
            }
        } else {
            chartMargin = {
                l: 0,
                r: 0,
                b: 130,
                t: 5,
            }

        }
        return chartMargin;
    }
    const handleClickFilter = (event, id) => {
        setAnchorE2(event.currentTarget)
        setChartId(id);

        let cF = { ...chartFilter };
        if (Object.keys(cF).indexOf(id) === -1) {
            cF[id] = {
                from: null,
                to: null,
                sites: [],
                siteIds: []
            }
        }
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCloseFilter = () => {
        setAnchorE2(null);
    }

    const handleClearFilter = () => {
        let cF = cloneDeep(chartFilter);
        cF[chartId].from = null;
        cF[chartId].to = null;
        cF[chartId].sites = [];
        cF[chartId].siteIds = [];
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const handleSiteChange = (event) => {
        const { target: { value } } = event;
        let ids = [];
        sitesForCharts.forEach((site) => {
            if (value.indexOf(site.name) !== -1) {
                ids.push(site.siteId);
            }
        })

        let cF = cloneDeep(chartFilter);
        if (Object.keys(cF).indexOf(chartId) !== -1) {
            cF[chartId].sites = value;
            cF[chartId].siteIds = ids;
        }
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }
    const handleDeleteSite = () => { }

    const open = Boolean(anchorEl, anchorE2);
    const id = open ? 'simple-popover' : undefined;

    const opens = Boolean(anchorE2);
    const ids = open ? 'simple-popover' : undefined;

    const getChartDataWithFilter = () => {
        handleCloseFilter();
        dispatch({
            type: "getChartDataByIdAction",
            payload: {
                chartId,
                from: chartFilter[chartId].from ? format(chartFilter[chartId].from, 'dd-MM-yyyy') : '',
                to: chartFilter[chartId].to ? format(chartFilter[chartId].to, 'dd-MM-yyyy') : '',
                siteIds: chartFilter[chartId].siteIds ? chartFilter[chartId].siteIds : chartFilter[chartId].siteIds.join(",")
            }
        })
    }

    const handleFromDateChange = (e) => {
        let cF = cloneDeep(chartFilter);
        cF[chartId]["from"] = e;
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const handleToDateChange = (e) => {
        let cF = cloneDeep(chartFilter);
        cF[chartId]["to"] = e;
        dispatch({
            type: setChartFilter.type,
            payload: cF
        })
    }

    const renderChartEmptyState = () => (
        <div align="center" className="m-10">
            <h5 className="mt-3 font-medium">No Data Available!</h5>
        </div>
    )

    const renderMainEmptyState = () => (
        <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontFamily }}>
            <EmptyView
                Imgsrc="/assets/images/No_Data_Illustration.svg"
                Title="No Charts Available."
            />
        </Grid>
    )

    const selectChartType = (e, chartId) => {
        setRefrenceElChart(e.currentTarget)
        setOpenChartFilter(true);
        setSelectedChart({
            id: chartId,
            chartType: ''
        });
    }

    useEffect(() => {
        let data = [...charts];
        data = data.map((el) => {
            if (el.id === selectedChart.id && selectedChart.chartType) {
                return {
                    ...el, type: selectedChart.chartType
                }
            }
            return el;
        })
        setFormattedCharts(data);
    }, [selectedChart]);

    useEffect(() => {
        setFormattedCharts(charts);
    }, [charts]);

    const renderChart = (chart, i) => (
        <Card className={classes.mainCard} id={'chart' + chart.id}>
            <CardContent>
                <Grid container spacing={3} className="items-center">

                    <Popover
                        id={id}
                        open={OpenChartFiler}
                        anchorEl={refrenceChart}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className={classes.chartOptionContainer} >
                            <div className={`flex justify-center items-center mt-4 cursor-pointer`} onClick={() => handleChartType('BAR_CHART', chart.id)}>
                                <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                    analytics
                                </Icon>
                                <span>Bar Chart</span>
                            </div>
                            <div className="flex justify-center items-center mt-4 cursor-pointer" onClick={() => handleChartType('LINE_CHART', chart.id)}>
                                <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                    stacked_line_chart
                                </Icon>
                                <span>Line Chart</span>
                            </div>
                            <div className="flex justify-center items-center mt-4 cursor-pointer" onClick={() => handleChartType('PIE_CHART', chart.id)}>
                                <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                    pie_chart
                                </Icon>
                                <span>Pie Chart</span>
                            </div>
                        </div>
                    </Popover>
                    <Grid container className="mt-5 mr-4">
                        <Grid item xs={9}>
                            <span className="ml-4 font-bold">
                                {capitalizeFirstLetter(chart.name)}
                            </span>
                        </Grid>
                        <Grid item xs={1} className="mr-2">
                            <V5GlobalIconButtons
                                key={2}
                                iconType={chart.type === "BAR_CHART" ? "bar_chart" : chart.type === "LINE_CHART" ? "stacked_line_chart" : "pie_chart"}
                                tooltipTitle={'Select Chart Type'}
                                areaLabel={'Select Chart Type'}
                                iconComponent={'span'}
                                iconClickHandler={(e) => selectChartType(e, chart.id)}
                                color={primaryColor}
                            />
                        </Grid>
                        <Grid item xs={1} className="mr-2">
                            {chart.filters.length ?
                                <V5GlobalIconButtons
                                    key={1}
                                    iconType={'Filter'}
                                    tooltipTitle={'Filter'}
                                    areaLabel={'Filter Popup'}
                                    iconComponent={'span'}
                                    iconClickHandler={(e) => handleClickFilter(e, chart.id)}
                                    filterPopupOpen={opens}
                                    ref={anchorE2}
                                    color={primaryColor}
                                /> : null}
                            <Popover
                                id={ids}
                                open={opens}
                                anchorEl={anchorE2}
                                onClose={handleCloseFilter}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Typography>
                                    <Grid
                                        className={classes.filterHeader}
                                        container
                                        spacing={2}
                                    >
                                        <Grid item xs={9}>
                                            Filter
                                        </Grid>
                                        <Grid item xs={2} onClick={handleCloseFilter} className="cursor-pointer">
                                            <CloseIcon />
                                        </Grid>
                                    </Grid>

                                    <Grid className="p-5">
                                        {
                                            formattedCharts && formattedCharts[formattedCharts.findIndex(x => x.id === chartId)]?.filters.indexOf("SITE_ID") !== -1 ?
                                                <Grid container className="mt-3">
                                                    <Multiselect1
                                                        roles={sitesForCharts ? sitesForCharts : []}
                                                        label="Site ID"
                                                        roleName={chartFilter && chartFilter[chartId] && chartFilter[chartId].sites ? chartFilter[chartId].sites : []}
                                                        handleRoleChange={handleSiteChange}
                                                        handleDelete={handleDeleteSite}
                                                    />
                                                </Grid> : null
                                        }
                                        {
                                            formattedCharts && formattedCharts[formattedCharts.findIndex(x => x.id === chartId)]?.filters.indexOf("DATE_RANGE") !== -1 ?
                                                <>
                                                    <Grid container className="mt-10">
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <StyledDesktopDatePicker
                                                                primaryColor={primaryColor}
                                                                fontFamily={fontFamily}
                                                                name="from"
                                                                label="From Date"
                                                                inputFormat={"dd MMM yyyy"}
                                                                className={classes.inputField}
                                                                //onChange={formik.handleChange}
                                                                value={chartFilter[chartId] ? chartFilter[chartId].from : null}
                                                                onChange={handleFromDateChange}
                                                                renderInput={(params) => <StyledTextField primaryColor={primaryColor} fontFamily={fontFamily} {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                    <Grid className="mt-10">
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <StyledDesktopDatePicker
                                                                primaryColor={primaryColor}
                                                                fontFamily={fontFamily}
                                                                name="to"
                                                                label="To Date"
                                                                inputFormat={"dd MMM yyyy"}
                                                                className={classes.inputField}
                                                                //onChange={formik.handleChange}
                                                                value={chartFilter[chartId] ? chartFilter[chartId].to : null}
                                                                onChange={handleToDateChange}
                                                                renderInput={(params) => <StyledTextField primaryColor={primaryColor} fontFamily={fontFamily} {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                </> : null}
                                        <Grid className="mt-10 flex justify-between">
                                            <Button className={classes.cancel} onClick={handleClearFilter}>CLEAR</Button>
                                            <Button className={classes.save} onClick={getChartDataWithFilter}>
                                                APPLY
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </Popover>
                            <V5GlobalIconButtons
                                key={2}
                                iconType={'download'}
                                tooltipTitle={'Save as png'}
                                areaLabel={'Save as png'}
                                iconComponent={'span'}
                                iconClickHandler={() => downloadChart(chart.id)}
                                color={primaryColor}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                {chart.charts.length ?
                    <Grid style={{ maxWidth: '420px', maxHeight: '280px', overflow: 'auto' }}>
                        <Plot
                            data={formatChartData(chart)}
                            layout={{
                                autosize: false,
                                height: chart.type === 'BAR_CHART'? 280: chart.type === 'PIE_CHART'? 350: 400,
                                width: chart.type === 'BAR_CHART'? 400: chart.type === 'PIE_CHART'? 350: 400,
                                margin: formatChartMargin(chart),
                                showlegend: false,
                                xaxis: {
                                    fixedrange: true,
                                    title: {
                                        text: chart.xAxis.hint
                                    }
                                },
                                yaxis: {
                                    fixedrange: true,
                                    automargin: true,
                                    title: {
                                        text: chart.yAxis.hint,
                                        standoff: 5
                                    }
                                },
                            }}
                            config={config}
                        />
                    </Grid> :
                    renderChartEmptyState()
                }
            </CardContent>
        </Card>
    )

    return <div>{formattedCharts.length > 0 ? formattedCharts.map(renderChart) : renderMainEmptyState()}</div>
}

export default ChartsView;
