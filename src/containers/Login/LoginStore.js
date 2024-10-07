import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { commonActions } from "@app/stores/common/commonActions";
import { customerActions } from "@app/stores/customer/customerActions";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateLoader: commonActions.updateLoader,
      updateAuthData: customerActions.updateAuthData,
    },
    dispatch
  );

const LoginStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default LoginStore;
