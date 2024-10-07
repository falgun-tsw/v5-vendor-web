import { xhrClient } from 'src/FormElements/app/utilities/DataRequest';
import { config } from '@app/FormElements/config';
const { isProd } = config;
//..SCREENBUILDER ENDPOINT 
const API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.screenbuilder_api_endpoint;

const APIVERSION = "screenbuilder/api/v1";
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
    ? config.production.api_endpoint
    : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";

//..GET ALL REPORTS
const getReportsListService = (moduleId, sortDirection) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/modules/${moduleId}/reports?sortOrder=${sortDirection}`);
}
//..GET INDIVIDUAL REPORT DETAILS
const getReportDetailsService = (reportId, from, to, sites) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations/${reportId}/report?from=${from}&sites=${sites}&to=${to}`);
}
//..GET INDIVIDUAL REPORT COLUMNS
const getReportColumnsService = (reportId) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/reportconfigurations/${reportId}/columns`);
}
//GET SITES FOR CHARTS
const getSitesForChartsService = (clientId) => {
    return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/users/filter-sites`);
}
//GET CHARTS LIST DATA
const getAllChartsDataService = (moduleId) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/modules/${moduleId}/charts`);
}
//GET CHART BY ID
const getChartDataByIdService = (chartId, from, to, sites) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/charts/${chartId}?from=${from}&to=${to}&sites=${sites}`);
}
//DOWNLOAD REPORT BY ID
const downloadReportByIdService = (reportId,from, to, sites ) => {
    return xhrClient.get(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/${reportId}/download-report?from=${from}&to=${to}&sites=${sites? sites : "" }`, 'application/pdf', null, 'blob');
}

export {
    getReportsListService,
    getReportDetailsService,
    getReportColumnsService,
    getSitesForChartsService,
    getAllChartsDataService,
    getChartDataByIdService,
    downloadReportByIdService
};
