import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { appliedjobActions } from "@app/stores/appliedjob/appliedjobActions";
const mapStateToProps = (state) => {
  return {
    appliedJobLoading: state.appliedjob.loading.appliedJob,
    appliedJobList: state.appliedjob.appliedJobsList,
    appliedJobsListCount: state.appliedjob.appliedJobsListCount
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAppliedJobs: appliedjobActions.getAppliedJobs,
    },
    dispatch
  );

const AppliedJobsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default AppliedJobsStore;
