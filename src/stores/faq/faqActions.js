import { faqConstants } from "./faqConstants";

const faqActions = {};

faqActions.getFaqsList = () => {
  return { type: faqConstants.FAQS_SAGA };
};

export { faqActions };
