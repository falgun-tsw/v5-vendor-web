import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { myWorkActions } from "@app/stores/mywork/myworkActions";
const mapStateToProps = (state) => {
  return {
    myworkList: state.myWork.myworkList,
    workListCount: state.myWork.workListCount,
    myworkLoading: state.myWork.loading.mywork,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyWorkList: myWorkActions.getMyWorkList,
    },
    dispatch
  );

const MyWorkStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default MyWorkStore;
