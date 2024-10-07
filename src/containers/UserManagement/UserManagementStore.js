import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { manageVendorUserActions } from "@app/stores/userManagement/userManagementActions";

const mapStateToProps = (state) => {
  return {
    usersLoading: state.user.loading.user,
    vendorUsersList: state.user.vendorUsersList,
    vendorUsersListCountCount: state.user.vendorUsersListCountCount,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getVendorUsers: manageVendorUserActions.getVendorUser,
    },
    dispatch
  );

const UserManagementStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default UserManagementStore;
