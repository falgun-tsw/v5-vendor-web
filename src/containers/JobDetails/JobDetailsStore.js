import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { commonActions } from "@app/stores/common/commonActions";
import { jobManagementActions } from "@app/stores/JobManagement/jobManagementActions";

const mapStateToProps = (state) => {
  return {
    jobDetails: state.jobManagement.jobDetails,
    jobdetailLoading: state.jobManagement.loading.jobdetail,
    appliedjobList: state.appliedjob.appliedJobsList,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJobDetails: jobManagementActions.getJobDescription,
      showLoader: commonActions.updateLoader,
      setToast: commonActions.setToast,
    },
    dispatch
  );

const JobDetailsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default JobDetailsStore;
