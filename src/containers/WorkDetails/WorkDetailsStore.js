import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { manageVendorUserActions } from "@app/stores/userManagement/userManagementActions";
import { myWorkActions } from "@app/stores/mywork/myworkActions";
import { commonActions } from "@app/stores/common/commonActions";


const mapStateToProps = (state) => {
  return {
    workDetail : state.myWork.workDetails,
    workDetailLoading:state.myWork.loading.workdetail,
    venderUserLoading : state.user.loading.user,
    vendorUsersList : state.user.vendorUsersList,
    profileId:state.customer.profile.id,
    openJobAssignModal: state.myWork.showAssignJobModal,
    screenBuilderModules:state.myWork.screenBuilderModules,
    activeJobId:state.myWork.activeJobId,
    vendorUsersListCountCount: state.user.vendorUsersListCountCount,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getWorkDetails: myWorkActions.getMyWorkDetails,
      getVendorUsers: manageVendorUserActions.getVendorUser,
      toggleJobActionModal: myWorkActions.toggleAssignJobModle,
      getScreenBuilderModulesAction:myWorkActions.getScreenBuilderModules,
      setActiveJobId:myWorkActions.setActiveJobId,
      toastAction: commonActions.setToast,
    },
    dispatch
  );

const WorkDetailsStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default WorkDetailsStore;
