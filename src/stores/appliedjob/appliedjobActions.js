import { appliedjobConstants } from "./appliedjobConstants";

const appliedjobActions = {};

appliedjobActions.getAppliedJobs = (payload) => ({
  type: appliedjobConstants.APPLIED_JOBS_SAGA,
  payload
});

appliedjobActions.getAppliedJobsDetails = (payload) => ({
  type: appliedjobConstants.APPLIED_JOBS_DETAILS_SAGA,
  payload,
});

export { appliedjobActions };
