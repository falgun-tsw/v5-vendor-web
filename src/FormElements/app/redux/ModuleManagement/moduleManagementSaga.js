import { call, put, takeEvery, all } from 'redux-saga/effects';
import { SNACKBAR_SUCCESS, SNACKBAR_ERROR } from '../slices/snackbar';
import { format } from 'date-fns';
import {
    setAllModules,
    setClientLogoForHeader,
    setAllForms,
    setStateByName,
    setFormattedColumnsAndRows,
    setWorkflowData,
    setScreenFormData,
    setScreenFormResponseData,
    setLoading,
    setApproval,
    setEmpInfo,
    setMappingDropdownInfo,
} from './moduleManagementSlice';
import {
    getMasterModulesService,
    getClientHeaderLogoService,
    getAllFormsByModuleIdService,
    getAllFormsBySubModuleIdService,
    getColumnsAndFiltersByModuleIdService,
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
    getDynamicMappingDropdownService
} from './moduleManagementService';

function* getAllModules(data) {
    try {
        const { clientId } = data.payload;
        const response = yield call(getMasterModulesService, clientId);
        let formattedData = response.modules.map((module) => {
            let formattedSubModule = module.subModules.map((subModule) => {
                if (subModule.id) {
                    return {
                        ...subModule,
                        //path: subModule.name.toLowerCase(),
                        //path: `/module-management?mid=${module.id}&smid=${subModule.id}&wid=${subModule.workFlowId}`,
                        path: subModule.mappedBy? 
                                `/module-management/modules/${module.id}/submodules/${subModule.id}/wid/${subModule.workFlowId}/mappedBy/${subModule.mappedBy}`
                                :
                                `/module-management/modules/${module.id}/submodules/${subModule.id}/wid/${subModule.workFlowId}`
                                ,
                        type: 'children'
                    }
                }
                //if id does not exist, make reports route
                return {
                    ...subModule,
                    //path: subModule.name.toLowerCase(),
                    //path: `/module-management?mid=${module.id}&smid=${subModule.id}&wid=${subModule.workFlowId}`,
                    path: `/modules/${module.id}/reports`,
                    type: 'children'
                }
            })
            if (formattedSubModule && formattedSubModule.length) {
                return {
                    ...module,
                    children: formattedSubModule,
                    //path: module.name.toLowerCase()
                    //path: `/module-management?mid=${module.id}&wId=${module.workFlowId}`
                    path: `/module-management/modules/${module.id}/wid/${module.workFlowId}`
                }
            }
        })
        formattedData = formattedData.filter(v=>v);
        yield put(setAllModules(formattedData));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message))
    }
}

function* getClientLogoForHeader(data) {
    try {
        const { clientId } = data.payload;
        const response = yield call(getClientHeaderLogoService, clientId);
        yield put(setClientLogoForHeader(URL.createObjectURL(response)));
    } catch (error) {
        yield put(setClientLogoForHeader(null));
    }
}
//..Get data related to table based on module id
function* getAllFormsByModuleId(payload) {
    try {
        const { moduleId, filters, from, to, employeeId, name, empRole, page, sortBy, size, sortOrder, isFromApplyFilter, mappedBy } = payload.payload;
        const request = {
            size: size,
            filters: filters,
            from: from,
            to: to,
            employeeId: employeeId,
            name: name,
            empRole: empRole,
            page: page,
        }
        if (sortBy) {
            request.sortBy = sortBy;
        }
        if (sortOrder) {
            request.sortOrder = sortOrder;
        }
        const response = yield call(getAllFormsByModuleIdService, moduleId, request, mappedBy);
        let data = { moduleId, data: response }
        yield put(setAllForms(data));
        yield put(setFormattedColumnsAndRows({ isFromApplyFilter: isFromApplyFilter }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..Get data related to table based on Sub module id
function* getAllFormsBySubModuleId(payload) {
    try {
        const { moduleId, submoduleId, filters, from, to, employeeId, name, empRole, page, size, sortBy, sortOrder, isFromApplyFilter, mappedBy,jobId
        } = payload.payload;
        let request = {
            size: size,
            filters: filters,
            from: from instanceof Date? format(from, 'dd-MM-yyyy'): from,
            to: to instanceof Date? format(to, 'dd-MM-yyyy'): to,
            employeeId: employeeId,
            name: name,
            empRole: empRole,
            page: page,
            jobId:jobId

        };
        if (sortBy) {
            request.sortBy = sortBy;
        }
        if (sortOrder) {
            request.sortOrder = sortOrder;
        }
        const response = yield call(getAllFormsBySubModuleIdService, moduleId, submoduleId, request, mappedBy,);
        let data = { moduleId, submoduleId, data: response }

        yield put(setAllForms(data));
        yield put(setFormattedColumnsAndRows({ isFromApplyFilter: isFromApplyFilter }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
// ..getDownloadExel by SubModuleId

function* getDownloadExelBySubmoduleId(payload) {
    try {
        const { moduleId, submoduleId, filters, page,from, to, employeeId, name, empRole, size, mappedBy, subModuleName } = payload.payload;
        let request = {
            size: size,
            filters: filters,
            from: from instanceof Date? format(from, 'dd-MM-yyyy'): from,
            to: to instanceof Date? format(to, 'dd-MM-yyyy'): to,
            employeeId: employeeId,
            name: name,
            empRole: empRole,
            page: page,
        };
        const response = yield call(getDownloadExelBySubmoduleById, moduleId, submoduleId, request, mappedBy);
        const url = window.URL.createObjectURL(response);
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', `${subModuleName}.xls`,);
   
       // Append to html link element page
       document.body.appendChild(link);
   
       // Start download
       link.click();
   
       // Clean up and remove the link
       link.parentNode.removeChild(link);
    } catch(error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..Get columns and filters data by module id
function* getColumnsAndFiltersByModuleId(payload) {
    try {
        const { moduleId } = payload.payload;
        const response = yield call(getColumnsAndFiltersByModuleIdService, moduleId);
        yield put(setStateByName({ name: 'columnsAndFilters', value: response }));
        yield put(setFormattedColumnsAndRows({ isFromApplyFilter: false }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..Get columns and filters data by sub module id
function* getColumnsAndFiltersBySubModuleId(payload) {
    try {
        const { moduleId, submoduleId, mappedBy } = payload.payload;
        const response = yield call(getColumnsAndFiltersBySubModuleIdService, moduleId, submoduleId, mappedBy);
        yield put(setStateByName({ name: 'columnsAndFilters', value: response }));
        yield put(setFormattedColumnsAndRows({ isFromApplyFilter: false }));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

//...Get all workflow screens by workflow id
function* getWorkflowData(data) {
    try {
        const { workflowId } = data.payload;
        const response = yield call(getWorkflowDataService, workflowId);
        yield put(setWorkflowData(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}

//...Get all workflow screens by workflow id
function* getScreenFormDataById(data) {
    try {
        yield put(setLoading(true));
        const { screenId } = data.payload;
        const response = yield call(getScreenFormDataByIdService, screenId);
        yield put(setScreenFormData(response));
        yield put(setLoading(false));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
        yield put(setLoading(false));
    }
}
//...Submit screen form data by module id
function* submitScreenFormDataMId(payload) {
    try {
        const { moduleId, data, workflowId } = payload.payload;
        const response = yield call(submitScreenFormDataForModuleService, moduleId, data, workflowId);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//...Submit screen form data by sub module id
function* submitScreenFormDataSmId(payload) {
    try {
        const { moduleId, subModuleId, data, workflowId,jobId } = payload.payload;
        const response = yield call(submitScreenFormDataForSubModuleService, moduleId, subModuleId, data, workflowId,jobId);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//...Get screen form data by Form Id
function* getFormDataById(data) {
    try {
        yield put(setLoading(true));
        const { moduleId, submoduleId, formId, mappedBy } = data.payload;
        const response = yield call(getFormDataByIdService, moduleId, submoduleId, formId, mappedBy);
        yield put(setScreenFormResponseData(response));
        yield put(setLoading(false));
    } catch (error) {
        // yield put(SNACKBAR_ERROR(error.message));
        yield put(setScreenFormResponseData({}));
        yield put(setLoading(false));
    }
}
//...Update screen form data by Form Id
function* updateFormDataById(data) {
    try {
        const { moduleId, submoduleId, formId, formData, workflowId, mappedBy } = data.payload;
        const response = yield call(updateFormDataByIdService, moduleId, submoduleId, formId, formData, workflowId, mappedBy);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..SET REJECT APPROVE PERMISSION
function* updateRejectApprovePermission(payload) {
    try {
        const { workflowId, moduleId, submoduleId, formId, approved, mappedBy } = payload.data;
        let response = yield call(updateApprovalService, workflowId, moduleId, submoduleId, formId, approved, mappedBy);
        yield call(getAllFormsBySubModuleId, { payload: payload.data});
        yield put(setApproval(approved));
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message));
    }
}
//..GET EMP INFO FOR FILTERS
function* getEmpInfo() {
    try {
        let response = yield call(getEmpInfoService);
        yield put(setEmpInfo(response));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..BUTTON ACTION CALL
function* customButtonCall(payload) {
    try {
        const { data } = payload;
        let response = yield call(customButtonCallService, data);
        yield put(SNACKBAR_SUCCESS(response.message));
    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}
//..GET LOCATION MAPPING DATA
function* getMappingDropdownInfo() {
    try {
        let response = yield call(getDynamicMappingDropdownService);
        yield put(setMappingDropdownInfo(response));

    } catch (error) {
        yield put(SNACKBAR_ERROR(error.message))
    }
}

function* watchAllModules() {
    yield takeEvery('getAllModulesAction', getAllModules);
}
function* watchGetClientLogoForHeader() {
    yield takeEvery('getClientLogoAction', getClientLogoForHeader)
}

//..Get data related to table based on module id
function* watchGetAllFormsByModuleId() {
    yield takeEvery('getAllFormsByModuleIdAction', getAllFormsByModuleId);
}
//..Get data related to table based on Sub module id
function* watchGetAllFormsBySubModuleId() {
    yield takeEvery('getAllFormsBySubModuleIdAction', getAllFormsBySubModuleId);
}
// ..setExel download based on Sub module id
function* watchSetDownloadExelBySubModuleId() {
    yield takeEvery('setExelDownload', getDownloadExelBySubmoduleId);
}
//..Get columns and filters data by module id
function* watchGetColumnsAndFiltersByModuleId(payload) {
    yield takeEvery('getColumnsAndFiltersByModuleIdAction', getColumnsAndFiltersByModuleId);
}
//..Get columns and filters data by sub module id
function* watchGetColumnsAndFiltersBySubModuleId(payload) {
    yield takeEvery('getColumnsAndFiltersBySubModuleIdAction', getColumnsAndFiltersBySubModuleId);
}
//..Get Workflow data by workflow id
function* watchGetWorkflowData(payload) {
    yield takeEvery('getWorkflowByIdAction', getWorkflowData);
}
//..Get Screen data by screen id
function* watchGetScreenFormDataById(payload) {
    yield takeEvery('getScreenFormDataByIdAction', getScreenFormDataById);
}
//..Submit Screen data by module id
function* watchSubmitFormDataByModuleId(payload) {
    yield takeEvery('submitScreenFormDataByMIdAction', submitScreenFormDataMId);
}
//..Submit Screen data by submodule id
function* watchSubmitFormDataBySubModuleId(payload) {
    yield takeEvery('submitScreenFormDataBySmIdAction', submitScreenFormDataSmId);
}
//..Get Screen Form data by form id
function* watchGetFormDataByFormId(payload) {
    yield takeEvery('getFormDataByIdAction', getFormDataById);
}
//..Update Screen Form data by form id
function* watchUpdateFormDataByFormId(payload) {
    yield takeEvery('updateFormDataByIdAction', updateFormDataById);
}
//..SET REJECT APPROVE PERMISSION
function* watchRejectApprovePermission() {
    yield takeEvery('updateRejectApprovePermissionAction', updateRejectApprovePermission)
}
//..GET EMP INFO FOR FILTERS
function* watchGetEmpInfo() {
    yield takeEvery('getEmpInfoAction', getEmpInfo)
}
//..BUTTON ACTION CALL
function* watchCustomButtonCall() {
    yield takeEvery('customButtonCallAction', customButtonCall)
}

//..GET LOCATION MAPPING DATA
function* watchDynamicMappingDropdownInfo(){
    yield takeEvery('getDynamicMappingDropdownAction',getMappingDropdownInfo)
}

export default function* moduleManagementSaga() {
    yield all([
        watchAllModules(),
        watchGetClientLogoForHeader(),
        watchGetAllFormsByModuleId(),
        watchGetAllFormsBySubModuleId(),
        watchGetColumnsAndFiltersByModuleId(),
        watchGetColumnsAndFiltersBySubModuleId(),
        watchGetWorkflowData(),
        watchGetScreenFormDataById(),
        watchSubmitFormDataByModuleId(),
        watchSubmitFormDataBySubModuleId(),
        watchGetFormDataByFormId(),
        watchUpdateFormDataByFormId(),
        watchRejectApprovePermission(),
        watchSetDownloadExelBySubModuleId(),
        watchGetEmpInfo(),
        watchCustomButtonCall(),
        watchDynamicMappingDropdownInfo()
    ]);
}