import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { manageVendorUserActions } from "@app/stores/userManagement/userManagementActions";
import { commonActions } from "@app/stores/common/commonActions";

const mapStateToProps = (state) => {
  return {
    userDetailsLoading: state.user.loading.userDetails,
    vendorUserDetails: state.user.vendorUserDetails,
    vendorUserCreds: state.user.vendorUserCreds
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getVendorUserDetails: manageVendorUserActions.getVendorUserDetails,
      toastAction: commonActions.setToast,
      getVendorUserCreds: manageVendorUserActions.getVendorUserCreds,
    },
    dispatch
  );

const ViewVendorUserStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default ViewVendorUserStore;
