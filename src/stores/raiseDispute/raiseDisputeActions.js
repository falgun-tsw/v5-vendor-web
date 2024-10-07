import { raiseDisputeConstants } from "./riaseDisputeConstants";

const raiseDisputeActions = {};

raiseDisputeActions.fetchDisputeList = () => ({
  type: raiseDisputeConstants.RAISE_DISPUTE_LIST_SAGA,
});

raiseDisputeActions.fetchRaiseDisputeCategories = () => ({
  type: raiseDisputeConstants.RAISE_DISPUTE_CATEGORIES_SAGA,
});

export { raiseDisputeActions };
