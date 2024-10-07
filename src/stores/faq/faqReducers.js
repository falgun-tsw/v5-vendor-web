import { faqConstants } from "./faqConstants";

const initialState = {
  faqsList: [],
  loading: {
    faqs: 0,
  },
};

export const faqReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case faqConstants.FAQS_REQUEST:
      return {
        ...state,
        loading: {
          faqs: 1,
        },
      };

    case faqConstants.FAQS_RESPONSE:
      return {
        ...state,
        loading: {
          faqs: 0,
        },
        faqsList: payload,
      };

    default:
      return state;
  }
};
