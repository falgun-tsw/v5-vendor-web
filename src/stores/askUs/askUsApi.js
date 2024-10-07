import { axios } from "@app/helper/axios";
import { askUsConstants } from "./askUsConstants";

const askUsApi = {};

askUsApi.askUs = async (payload) => {
  return await axios.post(askUsConstants.ASK_US_API, payload);
};

export { askUsApi };
