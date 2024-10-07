import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reportActions } from "@app/stores/report/reportActions";
import { dashboardActions } from '@app/stores/dashboard/dashboardActions';
const mapStateToProps = (state) => {
  return {
    earningStats: state.report.earningStats,
    earningStatsLoading: state.report.loading.report,
    userStats: state.dashboard.userStats,
    jobStats: state.dashboard.jobStats,
    userStatsLoading: state.dashboard.loading.userStats,
    jobStatsLoading: state.dashboard.loading.jobStats,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEarningStats: reportActions.getEarningsStats,
      getUserStats: dashboardActions.fetchUserStats,
      getJobStats: dashboardActions.fetchJobStats,
    },
    dispatch
  );

const ReportsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default ReportsStore;
