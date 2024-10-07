import { earningConstants } from "./earningConstants";
import { axios } from "@app/helper/axios";

const earningApis = {};

earningApis.earningsList = (payload) => {
  return axios.get(earningConstants.EARNINGS_API, { params: payload });
};

earningApis.getEarningStats = () => {
  const response = axios.get(earningConstants.STATS_EARNINGS_STATS_API);
  return response;
};

export { earningApis };
