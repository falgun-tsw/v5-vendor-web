import { commonActions } from "@app/stores/common/commonActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setToast: commonActions.setToast,
    },
    dispatch
  );


const AskUsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default AskUsStore;
