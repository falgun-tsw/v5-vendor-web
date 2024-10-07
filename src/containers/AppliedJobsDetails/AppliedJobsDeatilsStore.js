import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { appliedjobActions } from "@app/stores/appliedjob/appliedjobActions";
const mapStateToProps = (state) => {
  return {
    appliedJobDetailsLoading: state.appliedjob.loading.appliedJobDetails,
    appliedJobDetails: state.appliedjob.appliedJobDetails,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAppliedJobsDetails: appliedjobActions.getAppliedJobsDetails,
    },
    dispatch
  );

const AppliedJobsDetailsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default AppliedJobsDetailsStore;
