import { faqConstants } from "./faqConstants";
import { axios } from "@app/helper/axios";

const faqApis = {};

faqApis.faqsList = () => {
  const res = axios.get(faqConstants.FAQS_API);
  return res;
};

export { faqApis };
