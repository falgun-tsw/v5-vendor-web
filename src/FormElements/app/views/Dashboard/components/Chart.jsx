import React, { useEffect, useState, useRef } from 'react'
import { Card, CardContent, Grid, Icon, MenuItem, Modal, Popover, TextField, Typography } from '@mui/material'
import { capitalizeFirstLetter } from '@app/FormElements/utils'
import { makeStyles } from '@mui/styles'
import Plot from 'react-plotly.js'
import { getChartDataService } from '../../../redux/Dashboard/dashboardService'
import FilterCharts from './FilterCharts'
import useSettings from 'src/FormElements/app/hooks/useSettings'
import { format } from 'date-fns'
import { V5GlobalIconButtons } from 'src/FormElements/app/components'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmptyView from 'src/FormElements/app/components/EmptyView/EmptyView'
import { Box } from '@mui/system'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    chartIcon: {
        '& span': {
            fontSize: '24px',
            color: '#00000061',
            opacity: 1,
            paddingRight: '10px',
        },
        marginLeft: "auto"
    },
    chartContainer: {
        overflowX: 'scroll',
        height: '100vh',
        margin: "0 0.5rem"
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
    topHeadingContainer: {
        borderRadius: "10px",
        marginLeft: "0.5rem",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "95%",
        marginTop: "1rem"
    },
    mobileBackIconPosition: {
        position: "relative",
        top: "-3.2rem"
    }
}))

const RenderChart = () => {
    const { settings } = useSettings()
    const primaryColor = settings.layout1Settings.main.primaryColor
    const [chartData, setChartData] = useState([])
    const [appliedFilters, setAppliedFilters] = useState(false)
    const [open, setOpen] = useState(false);
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [chartType, setChartType] = useState("bar");
    const [chartMargin, setChartMargin] = useState({});
    const [plot, setPlot] = useState([]);
    const [chart, setChart] = useState({});
    const [chartHeight, setChartHeight] = useState();
    const [chartWidth, setChartWidth] = useState();
    const [test, setTest] = useState(false);
    const { charts } = useSelector((state) => state.screenBuilder.dashboard);
    const dispatch = useDispatch();
    const classes = useStyles()
    const { id } = useParams();
    const history = useHistory();
    const anchorRef = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const isMobile = localStorage.getItem("isMobile");
    const config = {
        showLink: false,
        displayModeBar: true,
    }
    useEffect(() => {
        if (chartType === "bar") {
            setPlot([{ type: 'bar', x: chartData.xAxis, y: chartData.yAxis, width: chartData.width, bargap: 5, orientation: chartData.orientation }])
            setChartMargin({
                l: 50,
                r: 50,
                b: 130,
                t: 10,
            });
            setChartHeight(280);
            setChartWidth(400);
        } else if (chartType === "pie") {
            let labels = [];
            let values = []
            chartData.xAxis?.map((el) => {
                if (isNaN(el / 2)) {
                    labels.push(el)
                } else {
                    values.push(Number(el))
                }
            })
            chartData.yAxis?.map((el) => {
                if (isNaN(el / 2)) {
                    labels.push(el)
                } else {
                    values.push(Number(el))
                }
            });
            setPlot([{
                type: 'pie', labels, values, width: chartData.width, textinfo: "label+percent",
                textposition: "inside"
            }])
            setChartMargin({
                l: 0,
                r: 0,
                b: 130,
                t: 5,
            })
            setChartHeight(350);
            setChartWidth(350);
            plot.map((x)=>{
                let Arry = x.values
                Arry?.map((x)=>{
                    x < 0 ? setTest(true) : setTest(false)
                })
            })
        } else if (chartType === "scatter") {
            setPlot([{ type: 'scatter', x: chartData.xAxis, y: chartData.yAxis, width: chartData.width }])
            setChartHeight(400);
            setChartWidth(400);
        }
    }, [chartType, chartData]);

    useEffect(() => {
        let filteredChart = charts.filter((el) => el.id === id);
        setChart(filteredChart[0])
    }, [charts])

    const applyFilter = async ({ siteIds, fromDate, toDate }) => {
        setAppliedFilters(false)
        const from = fromDate ? format(fromDate, 'dd-MM-yyyy') : null
        const to = toDate ? format(toDate, 'dd-MM-yyyy') : null
        await getChartData({ siteIds, from, to })
        setIsFilterPopupOpen(false)
    }

    const handleFilterClick = () => {
        setIsFilterPopupOpen(true)
    }

    const downloadGraph = (id) => {
        let ele = document
            .getElementById('chart' + id)
            .getElementsByClassName('modebar-container')
        for (var i = 0; i < ele.length; i++) {
            ele[i].getElementsByClassName('modebar-btn')?.[0].click()
        }
    }
    const handleBack = () => {
        history(`/module/Charts`);
    }
    async function getChartData(payload = {}) {
        const res = await getChartDataService(chart.id, payload);
        res.width = [];
        res.xName = res.xAxis.hint;
        res.yName = res.yAxis.hint;
        res.charts?.map((item) => {
            let width = 0.7;
            if (!isNaN(item[res.xAxis.componentId]) && !isNaN(item[res.yAxis.componentId])) {
                width = 5000;
            }
            res.width.push(width);
        });
        res.orientation = res.charts?.length && isNaN(res.charts[0][res?.xAxis?.componentId]) ? 'w' : 'h';
        res.xAxis = res.charts?.map((item) => item[res.xAxis.componentId]) || [];
        res.yAxis = res.charts?.map((item) => item[res.yAxis.componentId]) || [];
        // res.xAxisName = res.charts?.map((item) => item[res.xAxis.hint]) || [];
        // res.yAxisName = res.charts?.map((item) => item[res.yAxis.hint]) || []; 
        if (Object.values(payload).length > 0 && res.charts.length === 0) {
            //No matching data found on filtering
            setAppliedFilters(true);
        }
        setChartData(res);
    }

    useEffect(() => {
        if (chart?.id) {
            getChartData()
        }
    }, [chart]);

    useEffect(() => {
        dispatch({
            type: 'getDashboardDataAction',
        });
    }, [])

    if (chartData.charts?.length === 0 && !appliedFilters) {
        return <>
            <Icon className={`ml-5 mb-8 mt-4 cursor-pointer ${isMobile === 'true' && classes.mobileBackIconPosition}`} onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                </svg>
            </Icon>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EmptyView
                    Imgsrc="/assets/images/No_Data_Illustration.svg"
                    Title="No Charts Available."
                    subTitleStart="Please revise your"
                    subTitleLink="Filter"
                    subTitleEnd="criteria"
                //clickHandler={handleFilterClick}
                />
            </Grid>
        </>
    }
    const selectChartType = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true);
        // setChartType(e.target.value);
        getChartData();
    }
    const handleChartType = (type) => {
        setChartType(type);
        setOpen(false);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }
    const checkNegativeValue = () => {
        let negative = plot[0].values?.some(v => v < 0);
        let inValidValue;
        let inValidLabel;
        if (plot[0].values) {
            inValidValue = plot[0].values?.some(a => typeof a == 'string') || plot[0].values?.length === 0;
        } else {
            inValidValue = true;
        }

        if (plot[0].labels) {
            inValidLabel = plot[0].labels?.some(a => typeof a == 'number') || plot[0].labels?.length == 0;
        } else {
            inValidLabel = true;
        }

        if (negative || inValidValue || inValidLabel) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <>
            <Icon className={`ml-5 mb-8 mt-4 cursor-pointer ${isMobile === 'true' && classes.mobileBackIconPosition}`} onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px" fill="#000000">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                </svg>
            </Icon>
            <div style={{ border: `1px solid ${primaryColor}`, marginTop: `${isMobile === 'true' && '-2.3rem'}` }} className={`flex justify-between mb-3 pt-1 pb-1 ${classes.topHeadingContainer}`}>
                {/* <ArrowBackIcon className="cursor-pointer mr-3" onClick={handleBack} /> */}
                <h3 className='ml-4 mt-1 font-medium'> {capitalizeFirstLetter(chart?.name)}</h3>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {/* <Box sx={{ width: 100, height: 150 }} className={classes.chartOptionContainer}> */}
                <div className={classes.chartOptionContainer} >
                    <div className={`flex justify-center items-center mt-4 cursor-pointer`} onClick={() => handleChartType('bar')}>
                            <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                analytics
                            </Icon>
                            <span>Bar Chart</span>
                        </div>
                        <div className="flex justify-center items-center mt-4 cursor-pointer" onClick={() => handleChartType('scatter')}>
                            <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                stacked_line_chart
                            </Icon>
                            <span>Line Chart</span>
                        </div>
                        <div className="flex justify-center items-center mt-4 cursor-pointer" onClick={() => handleChartType('pie')}>
                            <Icon className={`material-icons-two-tone ${classes.svgIcons1} `}>
                                pie_chart
                            </Icon>
                            <span>Pie Chart</span>
                        </div>
                    </div>
                {/* </Box> */}
            </Popover>
            <Card
                className={`mt-4 ${classes.chartContainer}`}
                id={'chart' + chart?.id}
            >
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid xs={3} >
                            {/* <TextField
                                className={`ml-3 ${classes.chartType}`}
                                label="Chart Type"
                                onChange={selectChartType}
                                select>
                                <MenuItem value="bar">Bar Chart</MenuItem>
                                <MenuItem value="pie">Pie Chart</MenuItem>
                                <MenuItem value="scatter">Line Chart</MenuItem>
                            </TextField> */}
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            className={`${classes.chartIcon} flex justify-end pr-5`}
                        > 
                            <V5GlobalIconButtons
                                key={2}
                                iconType={chartType === "bar" ? "bar_chart" : chartType === "scatter" ? "stacked_line_chart" : "pie_chart"}
                                tooltipTitle={'Select Chart Type'}
                                areaLabel={'Select Chart Type'}
                                iconComponent={'span'}
                                iconClickHandler={selectChartType}
                                color={primaryColor}
                            />
                            {chart && chart?.filters?.length > 0 && (
                                <V5GlobalIconButtons
                                    key={1}
                                    iconType={'Filter'}
                                    tooltipTitle={'Filter'}
                                    areaLabel={'Filter Popup'}
                                    iconComponent={'span'}
                                    iconClickHandler={handleFilterClick}
                                    filterPopupOpen={isFilterPopupOpen}
                                    ref={anchorRef}
                                    color={primaryColor}
                                />
                            )}

                            <V5GlobalIconButtons
                                key={3}
                                iconType={'download'}
                                tooltipTitle={'Save as png'}
                                areaLabel={'Save as png'}
                                iconComponent={'span'}
                                iconClickHandler={() => downloadGraph(chart?.id)}
                                color={primaryColor}
                            />

                        </Grid>
                    </Grid>
                </CardContent>
                {appliedFilters && chartData.charts?.length === 0 ? (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className="pl-6 mb-10"
                    >
                        No matching data found
                    </Typography>
                ) : (
                    <CardContent>
                            {chartType === "pie" && checkNegativeValue() ? <p className='text-center mt-10'>Selected chart type is incompatible  </p> :
                                <Grid style={{ maxWidth: '420px', maxHeight: '280px', overflow: 'auto' }}>
                            <Plot
                                data={plot}
                                layout={{
                                    autosize: false,
                                    height: chartHeight,
                                    width: chartWidth,
                                    margin: chartMargin,
                                    showlegend: false,
                                    xaxis: {
                                        title: {
                                            text: chartData.xName
                                        }
                                    },
                                    yaxis: {
                                        title: {
                                            text: chartData.yName
                                        }
                                    },
                                }}
                                config={config}
                            />
                        </Grid>
                    }
                    </CardContent>
                )}
            </Card>
            <FilterCharts
                chart={chart}
                anchorEl={anchorRef?.current}
                open={isFilterPopupOpen}
                primaryColor={primaryColor}
                applyFilter={applyFilter}
                handleClose={() => setIsFilterPopupOpen(false)}
            />
        </>
    )
}

export default React.memo(RenderChart)
