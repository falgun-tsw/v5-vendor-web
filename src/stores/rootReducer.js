import { combineReducers } from "redux";
import { commonReducers } from "./common/commonReducers";
import { customerReducers } from "./customer/customerReducers";
import { userManagementReducers } from "./userManagement/userManagementReducers";
import { appliedjobReducers } from "./appliedjob/appliedjobReducers";
import { earningReducers } from "./earning/earningReducers";
import { faqReducers } from "./faq/faqReducers";
import { myWorkReducers } from "./mywork/myworkReducers";
import {reportReducers} from "./report/reportReducers";
import { rootReducer } from "@app/FormElements/app/redux/rootReducer";
import { dashboardReducers } from "./dashboard/dashboardReducers";
import { raiseDisputeReducers } from './raiseDispute/raiseDisputeReducers';
import { jobManagementReducers } from "./JobManagement/jobManagementReducers";

const rootReducers = combineReducers({
  common: commonReducers,
  customer: customerReducers,
  dashboard: dashboardReducers,
  user: userManagementReducers,
  jobManagement: jobManagementReducers,
  appliedjob: appliedjobReducers,
  myWork: myWorkReducers,
  report : reportReducers,
  earning: earningReducers,
  faq: faqReducers,
  raiseDispute: raiseDisputeReducers,
  screenBuilder:rootReducer,
});

export default rootReducers;
