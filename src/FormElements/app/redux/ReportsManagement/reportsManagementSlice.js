import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

var initialState = {
    reportsList: [],
    reportDetails: [],
    reportColumns: [],
    loading: true,
    formattedColumns: [],
    formattedRows: [],
    reportFilterDetails: {
        fromDate: null,
        toDate: null,
        sites: null
    },
    sitesForCharts: [],
    charts: [],
    chartFilter: {}
}

const reportsSlice = createSlice({
    name: 'moduleInfo',
    initialState,
    reducers: {
        setReportsList(state, action) {
            state.loading = false;
            state.reportsList = action.payload;
        },
        setReportDetails(state, action) {
            state.loading = false;
            state.reportDetails = action.payload;
        },
        setReportColumns(state, action) {
            state.loading = false;
            let data = [...action.payload];
            data = data.map((column)=> {
                return {id: column.componentId, label: column.hint}
            })
            const actionHeader = {
                id: 'actionHeader',
                label: '',
                //minWidth: 170,
                align: 'right',
                icon: "more_vert",
                //format: (value) => value.toFixed(2),
            };
            data.push(actionHeader);
            state.reportColumns = data;
        },
        setLoading (state, action) {
            state.loading = action.payload;
        },
        setSitesForCharts(state, action) {
            let data = action.payload.map((s)=>{
                return {...s, name: s.siteId,}
            })
            state.sitesForCharts = data;
        },
        setReportFilters(state, action) {
            state.reportFilterDetails = action.payload;
        },
        setChartsData(state, action) {
            state.charts = action.payload;
        },
        setChartFilter(state, action) {
            state.chartFilter = action.payload
        },
        setUpdatedChart(state, action) {
            let newCharts = cloneDeep(state.charts);

            newCharts = newCharts.map((v)=>{
                if (action.payload.id === v.id) {
                    return {...action.payload.data};
                } else {
                    return {...v};
                }
            })
            state.charts = newCharts;
        },
    },
})

export default reportsSlice.reducer;

//Actions
export const {
    setReportsList,
    setReportDetails,
    setReportColumns,
    setLoading,
    setSitesForCharts,
    setReportFilters,
    setChartsData,
    setChartFilter,
    setUpdatedChart
} = reportsSlice.actions;