import { axios } from "@app/helper/axios";
import { raiseDisputeConstants } from "./riaseDisputeConstants";

const raiseDisputeApis = {};

raiseDisputeApis.getDisputeApi = async () => {
  const res = await axios.get(raiseDisputeConstants.RAISE_DISPUTE_LIST_API);
  return res;
};

raiseDisputeApis.getDisputeCategoriesApi = async () => {
  const res = await axios.get(raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_API);
  return res;
};

raiseDisputeApis.raiseDispute = async (payload) => {
  const res = await axios.post(raiseDisputeConstants.CREATE_RAISE__DISPUTE_API, payload);
  return res;
};

export { raiseDisputeApis };
