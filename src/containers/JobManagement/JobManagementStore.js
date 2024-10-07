import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { jobManagementActions } from "@app/stores/JobManagement/jobManagementActions";
const mapStateToProps = (state) => {
  return {
    isJobListLoading: state.jobManagement.loading.job,
    vendorJobsList: state.jobManagement.vendorJobsList,
    jobSkillsList: state.jobManagement.jobSkillsList,
    jobSkillsCategoriesList: state.jobManagement.jobSkillsCategoriesList,
    totalJobCount: state.jobManagement.totalJobCount,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchVendorJobs: jobManagementActions.getJobsList,
      fetchSkill: jobManagementActions.getSkillsList,
      fetchSkillsCategories: jobManagementActions.getSkillsCategoreyList,
    },
    dispatch
  );

const JobManagementStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default JobManagementStore;
