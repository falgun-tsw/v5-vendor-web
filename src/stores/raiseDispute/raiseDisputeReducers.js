import { raiseDisputeConstants } from "./riaseDisputeConstants";

const initialState = {
  disputeList: [],
  disputeCategoryList: [],
  isLoading: {
    disputeList: 0,
    disputeCategoryList: 0,
  },
};

export const raiseDisputeReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case raiseDisputeConstants.RAISE_DISPUTE_LIST_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeList: 1,
        }
      };
    }

    case raiseDisputeConstants.RAISE_DISPUTE_LIST_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeList: 0,
        },
        disputeList: payload,
      };
    }

    case raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_REQUEST: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeCategoryList: 1,
        },
      };
    }

    case raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_RESPONSE: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          disputeCategoryList: 0,
        },
        disputeCategoryList: payload,
      };
    }

    default:
      return state;
  }
};
