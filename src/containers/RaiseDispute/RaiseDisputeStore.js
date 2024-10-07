import { raiseDisputeActions } from "@app/stores/raiseDispute/raiseDisputeActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { commonActions } from "@app/stores/common/commonActions";
import { myWorkActions } from "@app/stores/mywork/myworkActions";

const mapStateToProps = (state) => {
  return {
    myWorkList: state.myWork,
    raiseDispute: state.raiseDispute
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchMyWorkList: myWorkActions.getMyWorkList,
      fetchDisputeList: raiseDisputeActions.fetchDisputeList,
      fetchDisputeCategories: raiseDisputeActions.fetchRaiseDisputeCategories,
      setToast: commonActions.setToast,
    },
    dispatch
  );

const RaiseDisputeStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default RaiseDisputeStore;
