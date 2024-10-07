import { all } from "redux-saga/effects";
import { registerCommonSagas } from "./common/commonSagas";
import { registerCustomerSagas } from "./customer/customerSagas";
import { registerUserManagementSagas } from "./userManagement/userManagementSagas";
import { registerAppliedJobSagas } from "./appliedjob/appliedjobSagas";
import { registerEarningSagas } from "./earning/earningSagas";
import { registerFaqsSagas } from "./faq/faqSagas";
import { registerMyWorkSagas } from "./mywork/myworkSagas";
import { registerReportSagas } from "./report/reportSagas";
import { registerDashboardSagas } from "./dashboard/dashboardSagas";
import { registerRaiseDisputeSagas } from "./raiseDispute/raiseDisputeSagas";

import fileManagementSaga from "@app/FormElements/app/redux/FileUploadManagement/FileManagementSaga";
import modulesManagementSaga from "@app/FormElements/app/redux/ModuleManagement/moduleManagementSaga";
import userProfileManagementSaga from "@app/FormElements/app/redux/UserProfileManagement/userProfileManagementSaga";
import reportsManagementSaga from "@app/FormElements/app/redux/ReportsManagement/reportsManagementSaga";
import dashboardSaga from "@app/FormElements/app/redux/Dashboard/dashboardSaga";
import { registerJobManagementSagas } from "./JobManagement/registerJobManagementSagas";

function* rootSaga() {
  yield all([
    registerCommonSagas(),
    registerCustomerSagas(),
    registerDashboardSagas(),
    registerUserManagementSagas(),
    registerJobManagementSagas(),
    registerAppliedJobSagas(),
    registerMyWorkSagas(),
    registerReportSagas(),
    registerEarningSagas(),
    registerFaqsSagas(),
    registerRaiseDisputeSagas(),
    //formElements Sagas
    modulesManagementSaga(),
    userProfileManagementSaga(),
    fileManagementSaga(),
    reportsManagementSaga(),
    dashboardSaga(),
  ]);
}

export default rootSaga;
