import { appliedjobConstants } from "./appliedjobConstants";
import { axios } from "@app/helper/axios";

const appliedjobApis = {};

appliedjobApis.getAppliedJobs = (payload = {}) => {
  const searchParams = {};
  if (Object.keys(payload).length) {
    Object.keys(payload).forEach((item) => {
      if (![null, undefined, ""].includes(payload[item])) {
        searchParams[item] = payload[item];
      }
    });
  }
  return axios.get(appliedjobConstants.APPLIED_JOBS_API,{ params: searchParams });
};

appliedjobApis.getAppliedJobsDeatils = (payload) => {
  return axios.get(appliedjobConstants.APPLIED_JOBS_DETAILS_API.replace("jobid", payload));
};

export { appliedjobApis };
