import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { customerActions } from "@app/stores/customer/customerActions";
import { commonActions } from "@app/stores/common/commonActions";
const mapStateToProps = (state) => {
  return {
    profileData: state.customer.profile,
    profileLoading: state.customer.loading.profile,
    loginProfile: state.customer.loginProfile,
    profilePic: state.customer.profile.profilePic,
    notifications: [
      {
        id: 1,
        isRead: false,
        title: "Rebalance Pending",
        subtitle: "You have one rebalance pending complete it now!",
        timestamp: "Just Now",
        linkText: "Rebalance Now",
        link: "/",
      },
      {
        id: 1,
        isRead: true,
        title: "New Update is Rolled Out",
        subtitle: "",
        timestamp: "15 min ago",
        linkText: "Know More",
        link: "/",
      },
      {
        id: 3,
        isRead: true,
        title: "Complete your KYC now to start growing your money",
        subtitle: "",
        timestamp: "2 days ago",
        linkText: "Complete KYC",
        link: "/",
      },
      {
        id: 4,
        isRead: false,
        title: "Rebalance Pending",
        subtitle: "You have one rebalance pending complete it now!",
        timestamp: "Just Now",
        linkText: "Rebalance Now",
        link: "/",
      },
      {
        id: 5,
        isRead: true,
        title: "New Update is Rolled Out",
        subtitle: "",
        timestamp: "15 min ago",
        linkText: "Know More",
        link: "/",
      },
      {
        id: 6,
        isRead: true,
        title: "Complete your KYC now to start growing your money",
        subtitle: "",
        timestamp: "2 days ago",
        linkText: "Complete KYC",
        link: "/",
      },
    ],
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logoutAction: customerActions.logout,
      toastAction: commonActions.setToast,
    },
    dispatch
  );

const LayoutStore = (Container) =>
  connect(mapStateToProps, mapDispatchToProps)(Container);
export default LayoutStore;
