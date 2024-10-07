import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { customerActions } from "@app/stores/customer/customerActions";
import { commonActions } from "@app/stores/common/commonActions";

const mapStateToProps = (state) => {
  return {
    profile: state.customer.profile,
    profileLoading: state.customer.loading.profile,
    loginProfileData: state.customer.loginProfile,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProfile: customerActions.getProfile,
      toastAction: commonActions.setToast,
    },
    dispatch
  );

const ProfileStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default ProfileStore;
