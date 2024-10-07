import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { earningActions } from "@app/stores/earning/earningActions";
const mapStateToProps = (state) => {
  return {
    jobEarningsList: state.earning.jobEarningsList,
    jobEarningsListCount: state.earning.jobEarningsListCount,
    jobEarningsLoading: state.earning.loading.jobEarning,
    earningStats: state.earning.earningStats,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEarningsList: earningActions.getEarningsList,
      getEarningsStats: earningActions.getEarningsStats,
    },
    dispatch
  );

const EarningsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default EarningsStore;
