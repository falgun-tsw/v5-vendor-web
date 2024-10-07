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

//..GET MASTERS MODULES
const getMasterModulesService = (clientId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/clients/${clientId}/modules`);
}
const getClientHeaderLogoService = (clientId) => {
    return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/clients/${clientId}/logo`, null, null, "blob");
}

//..Get/post data related to table based on module id
const getAllFormsByModuleIdService = (moduleId, data, mappedBy) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/all?mappedBy=${mappedBy? mappedBy: ""}`, null, data);
}
//..Get/post data related to table based on module id
const getAllFormsBySubModuleIdService = (moduleId, submoduleId, data, mappedBy) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodule/${submoduleId}/all?mappedBy=${mappedBy? mappedBy: "" }`, null, data);
}
//..Get/post call to download xl based on module id
const getDownloadExelBySubmoduleById = (moduleId, submoduleId, data, mappedBy) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodule/${submoduleId}/download?mappedBy=${mappedBy? mappedBy: ""}`, null, data,'blob');
}
//..Get columns and filters data by module id
const getColumnsAndFiltersByModuleIdService = (moduleId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/columnsandfilters`);
}
//..Get columns and filters data by sub module id
const getColumnsAndFiltersBySubModuleIdService = (moduleId, submoduleId, mappedBy) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodules/${submoduleId}/columnsandfilters?mappedBy=${mappedBy? mappedBy: ""}`);
}
//..Get All screens info by workflowId
const getWorkflowDataService = (workflowId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/workflows/${workflowId}`);
}
//..Get Screens form data screen id
const getScreenFormDataByIdService= (screenId) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/submodules/${screenId}/screens`);
}
//..Submit Screens form data for module
const submitScreenFormDataForModuleService = (moduleId, data, workflowId) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/forms?workflowId=${workflowId}`, null, data);
}
//..Submit Screens form data for module with jobId
const submitScreenFormDataForSubModuleService= (moduleId, submoduleId, data, workflowId,jobId) => {
    return xhrClient.post(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodule/${submoduleId}?workflowId=${workflowId}&jobId=${jobId}`, null, data);
}
//..Get Screens form data for form id
const getFormDataByIdService= (moduleId, submoduleId, formId, mappedBy) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodules/${submoduleId}/forms/${formId}?mappedBy=${mappedBy?mappedBy: ""}`);
}
//..Get Screens form data for form id
const updateFormDataByIdService= (moduleId, submoduleId, formId, formData, workflowId, mappedBy) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodule/${submoduleId}/form/${formId}?workflowId=${workflowId}&mappedBy=${mappedBy?mappedBy: ""}`, null, formData);
}
//..Update Approval
const updateApprovalService = (workflowId, moduleId, submoduleId, formId, approved, mappedBy) => {
    return xhrClient.put(`${API_ENDPOINT}${APIVERSION}/modules/${moduleId}/submodule/${submoduleId}/form/${formId}?mappedBy=${mappedBy}&workflowId=${workflowId}`, null, { "approved": approved })
}
const getEmpInfoService = () => {
    return xhrClient.get(`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/employee-info`);
}
//Custom button call service
const customButtonCallService = (data) => {
    return xhrClient.post(`${API_ENDPOINT}${ONBOARDING_APIVERSION}/customButtonCall`, null, data);
}

//location mapping dropdown data
const getDynamicMappingDropdownService = (moduleId, submoduleId, mappedBy) => {
    return xhrClient.get(`${API_ENDPOINT}${APIVERSION}/dynamic-mapping/SITE`);
}

export {
    getMasterModulesService,
    getClientHeaderLogoService,
    getAllFormsByModuleIdService,
    getColumnsAndFiltersByModuleIdService,
    getAllFormsBySubModuleIdService,
    getColumnsAndFiltersBySubModuleIdService,
    getWorkflowDataService,
    getScreenFormDataByIdService,
    submitScreenFormDataForModuleService,
    submitScreenFormDataForSubModuleService,
    getFormDataByIdService,
    updateFormDataByIdService,
    updateApprovalService,
    getDownloadExelBySubmoduleById,
    getEmpInfoService,
    customButtonCallService,
    getDynamicMappingDropdownService,
};
