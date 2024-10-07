import { commonConstants } from "./commonConstants";
import { axios } from "@app/helper/axios";

const commonApis = {};

commonApis.getBlogs = () => {
  return axios.get(commonConstants.BLOGS_API);
};

export { commonApis };
