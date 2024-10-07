import { reportConstants } from "./reportConstants";
import { axios } from "@app/helper/axios";

const reportApis = {};

reportApis.getEarningStats = (payload = new Date().getFullYear()) => {
  const reportEarningAPI = reportConstants.REPORT_EARNINGS_STATS_API.replace("earningYear",payload);
  return axios.get(reportEarningAPI);
};

export { reportApis };
