import { myWorkConstants } from "./myworkConstants";
import { axios, screenBuilderAxios } from "@app/helper/axios";

const myWorkApis = {};

myWorkApis.getMyWorkList = async (payload) => {
  const res = await axios.get(myWorkConstants.MY_WORK_API,{params: payload});
  return res;
};

myWorkApis.getMyWorkDetails = async (id) => {
  const res = await axios.get(
    myWorkConstants.MY_WORK_DETAILS_API.replace("jobid", id)
  );
  return res;
};

myWorkApis.startMyWork = async (payload, id) => {
  const res = await axios.post(
    myWorkConstants.START_MY_WORK_API.replace("candidatesID", id),
    payload
  );
  return res;
};

myWorkApis.submitMyWork = async (payload, id) => {
  const res = await axios.post(
    myWorkConstants.SUBMIT_MY_WORK_API.replace("candidatesID", id),
    payload
  );
  return res;
};

myWorkApis.assginJob = (payload) => {
  const { assignJobTo = "", candidateID = "" } = payload;
  return axios.put(
    myWorkConstants.ASSIGN_JOB_TO_API.replace("candidateID", candidateID),
    null,
    { params: { vendorUserId: assignJobTo } }
  );
};

myWorkApis.getScreenBuilderModules = async (clientId) => {
  const response = await screenBuilderAxios.get(
    myWorkConstants.SCREEN_BUILDER_MODULES_API.replace("clientid", clientId)
  );
  return response;
};

export { myWorkApis };
