import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { customerActions } from "@app/stores/customer/customerActions";
import { commonActions } from "@app/stores/common/commonActions";
import { dashboardActions } from "@app/stores/dashboard/dashboardActions";

const mapStateToProps = (state) => {
  return {
    profileData: state.customer.profile,
    profileLoading: state.customer.loading.profile,
    loginProfileData: state.customer.loginProfile,
    dashboardStats: state.dashboard.dashboardStats,
    dashboardLoading: state.dashboard.loading.dashboardStats,
    userStats: state.dashboard.userStats,
    jobStats: state.dashboard.jobStats,
    userStatsLoading: state.dashboard.loading.userStats,
    jobStatsLoading: state.dashboard.loading.jobStats,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logoutAction: customerActions.logout,
      toastAction: commonActions.setToast,
      getProfile: customerActions.getProfile,
      getDashboardStats: dashboardActions.fetchDashboardStats,
      getUserStats: dashboardActions.fetchUserStats,
      getJobStats: dashboardActions.fetchJobStats,
    },
    dispatch
  );

const DashboardStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default DashboardStore;
