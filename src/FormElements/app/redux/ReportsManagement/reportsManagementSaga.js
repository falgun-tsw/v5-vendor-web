import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from '../slices/snackbar';
import {
    setReportsList,
    setReportDetails,
    setReportColumns,
    setLoading,
    setSitesForCharts,
    setUpdatedChart,
    setChartsData
} from './reportsManagementSlice';
import {
    getReportsListService,
    getReportDetailsService,
    getReportColumnsService,
    getSitesForChartsService,
    getAllChartsDataService,
    getChartDataByIdService,
    downloadReportByIdService
} from './reportsManagementService';

function* getReportsList(data) {
    try {
        const { moduleId, sortDirection } = data.payload;
        const response = yield call(getReportsListService, moduleId, sortDirection);
        yield put(setReportsList(response.reports));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getReportDetails(data) {
    try {
        yield put(setLoading(true));
        const { reportId, from, to, sites } = data.payload;
        const response = yield call(getReportDetailsService, reportId, from, to, sites);
        yield put(setReportDetails(response));
        yield put(setLoading(false));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getReportColumns(data) {
    try {
        const { reportId } = data.payload;
        const response = yield call(getReportColumnsService, reportId);
        yield put(setReportColumns(response));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}
//GET SITES FOR CHARTS
function* getSitesForCharts(data) {
    try {
        let response = yield call(getSitesForChartsService);
        yield put(setSitesForCharts(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));  
    }
}
//GET CHARTS LIST DATA
function* getAllChartsData(data) {
    try {
        const { moduleId } = data.payload;
        const response = yield call(getAllChartsDataService, moduleId);
        yield put(setChartsData(response.data || []));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//GET CHART DATA BY ID
function* getChartDataById(data) {
    try {
        const { chartId, from, to, siteIds } = data.payload;
        const response = yield call(getChartDataByIdService, chartId, from, to, siteIds);
        let r = {...response};
        r.id = chartId;
        let chartResponse = {
            id: chartId,
            data: r
        }
        yield put(setUpdatedChart(chartResponse));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//DOWNLOAD REPORT BY REPORT ID
function* downloadReportById(data) {
    try {
        const { reportId, from, to, sites } = data.payload;
        let response = yield call(downloadReportByIdService, reportId, from, to, sites);
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Reports.xls');
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
      }
}

function* watchGetReportsList() {
    yield takeEvery('getReportsListAction', getReportsList);
}
function* watchGetReportDetails() {
    yield takeEvery('getReportDetailsAction', getReportDetails);
}
function* watchGetReportColumns() {
    yield takeEvery('getReportColumnsAction', getReportColumns);
}
function* watchGetSitesForChartsAction() {
    yield takeEvery('getSitesForChartsAction', getSitesForCharts);
}
function* watchGetAllChartsAction() {
    yield takeEvery('getAllChartsDataAction', getAllChartsData);
}
function* watchGetChartDataByIdAction() {
    yield takeEvery('getChartDataByIdAction', getChartDataById);
}
function* watchDownloadReportByIdAction() {
    yield takeEvery('downloadReportByIdAction', downloadReportById);
}

export default function* reportsManagementSaga() {
    yield all([
        watchGetReportsList(),
        watchGetReportDetails(),
        watchGetReportColumns(),
        watchGetSitesForChartsAction(),
        watchGetAllChartsAction(),
        watchGetChartDataByIdAction(),
        watchDownloadReportByIdAction()
    ]);
}