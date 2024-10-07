import { axios } from "@app/helper/axios";
import { jobManagementConstants } from "./jobManagementConstants";

const jobManagementApis = {};

jobManagementApis.getJobList = async ({ filterData = {}, page = 0, size = 20 }) => {
  const searchParams = { page, size };
  if (filterData) {
    Object.keys(filterData).forEach((fd) => {
      if (filterData[fd].length) {
        searchParams[fd] = filterData[fd].join(",");
      }
    });
  }
  const res = await axios.get(jobManagementConstants.VENDER_JOB_LIST_API, {
    params: searchParams,
  });
  return res;
};

jobManagementApis.getSkillsCategoriesList = async () => {
  const res = await axios.get(
    jobManagementConstants.SKILLS_CATEGORIES_LIST_API
  );
  return res.content;
};

jobManagementApis.getSkillsList = async (payload = {}) => {
  let searchParams = {}
  if(payload.skillsCategories?.length){
    searchParams = {
      skillsCategories: payload.skillsCategories.join()
    }
  }
  const res = await axios.get(jobManagementConstants.SKILLS_LIST_API, {
    params: searchParams,
  });
  return res;
};

jobManagementApis.getJobDescription = async (id) => {
  const res = await axios.get(
    jobManagementConstants.JOB_DESCRIPTION_API.replace("id", id)
  );
  return res;
};

jobManagementApis.applyJob = async ({ id, userNote }) => {
  const res = await axios.post(
    jobManagementConstants.APPLY_JOB_API.replace("jobID", id),
    null,
    { params: { userNote } }
  );
  return res;
};

jobManagementApis.unapplyJob = async ({ id, userNote }) => {
  const res = await axios.post(
    jobManagementConstants.UNAPPLY_JOB_API.replace("jobID", id),
    null,
    {
      params: { userNote },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return res;
};

export { jobManagementApis };
