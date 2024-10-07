import React, { Suspense } from "react";
import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardIcon from "@mui/icons-material/HomeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import DangerousIcon from '@mui/icons-material/Dangerous';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { withRouter } from "react-router-dom";
import Stack from "@app/component/common/Stack";
import Header from "@app/component/Layout/Header";
import Text from "@app/component/common/Text";
import TextField from "@app/component/common/TextField";
import Sidebar from "@app/component/Layout/Sidebar";
import Modal from "@app/component/common/Modal";
import Button from "@app/component/common/Button";
import IconButton from "@app/component/common/IconButton";
import { validationHelper } from "@app/helper/validation";
import { customerApis } from "@app/stores/customer/customerApis";
import { routes } from "src/routes";
class LayoutWebContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrentPassword: false,
      showNewPassword: false,
      isDrawerExpanded: false,
      isNotificationDropdownOpen: false,
      notificationAnchorEl: null,
      activeScreen: routes.dashboard,
      form: {
        currentPassword: "",
        newPassword: "",
      },
      formError: {
        currentPassword: "",
        newPassword: "",
      },
      openChangePasswordModal: false,
      isLoading: 0
    };
  }

  componentDidMount() {
    this.updateDrawerToggle();
    window.addEventListener("resize", this.updateDrawerToggle.bind(this));
  }

  updateDrawerToggle = () => {
    if (window.innerWidth > 1200) {
      this.setState({ isDrawerExpanded: true });
    } else {
      this.setState({ isDrawerExpanded: false });
    }
  };

  handleDrawerToggle = (isDrawerExpanded) => {
    this.setState({ isDrawerExpanded });
  };

  handleNotificationOpen = (e) => {
    this.setState({
      notificationAnchorEl: e.currentTarget,
      isNotificationDropdownOpen: true,
    });
  };

  handleNotificationClose = () => {
    this.setState({
      notificationAnchorEl: null,
      isNotificationDropdownOpen: false,
    });
  };

  handleLogoutClick = () => {
    this.props.logoutAction();
    this.props.history.replace("/login");
  };

  handleSidebarRedirection = (pathname) => {
    this.setState({ activeScreen: pathname });
    if (window.innerWidth < 900) {
      this.handleDrawerToggle(false);
    }
    this.props.history.push(pathname);
  };

  isActiveRoute = (pathname = []) => {
    if (
      pathname.filter((p) => this.props.location.pathname.includes(p)).length ||
      pathname.includes(this.props.location.pathname)
    ) {
      return true;
    }
    return false;
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDrawerToggle.bind(this));
  }

  handleProfileAction = () => {
    this.props.history.push(routes.profile);
  };

  toggleModal = () => {
    this.setState({
      openChangePasswordModal: !this.state.openChangePasswordModal,
      formError: { currentPassword: "", newPassword: "" },
    });
  };

  togglePassword = (key) => {
    this.setState((prevState) => {
      if (key === "currentPassword") {
        return { showCurrentPassword: !prevState.showCurrentPassword };
      } else {
        return { showNewPassword: !prevState.showNewPassword };
      }
    });
  };

  handleOnChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  };

  handleChangePassword = async () => {
    const {
      form: { currentPassword, newPassword },
    } = this.state;
    this.setState({ isLoading: 1 });
    try {
      if (this.handleValidation() > 0) {
        return;
      }
      const res = await customerApis.changePassword({
        currentPassword,
        newPassword,
      });
      if (res) {
        this.props.toastAction({ message: "Password Changed Successfully" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: 0 });
    }
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;
    const currentPassword = validationHelper.password(form.currentPassword);
    const newPassword = validationHelper.password(form.newPassword);
    if (!currentPassword.isValid) {
      errorCount++;
      formError.currentPassword = currentPassword.message;
    } else {
      formError.currentPassword = "";
    }
    if (!newPassword.isValid) {
      errorCount++;
      formError.newPassword = newPassword.message;
    } else {
      formError.newPassword = "";
    }
    this.setState({ formError });
    return errorCount;
  };

  render() {
    const {
      openChangePasswordModal,
      showCurrentPassword,
      showNewPassword,
      formError,
      isDrawerExpanded,
      isNotificationDropdownOpen,
      notificationAnchorEl,
      isLoading
    } = this.state;
    const { children, notifications = [], profileData } = this.props;
    const sidebarMenuConfig = [
      {
        type: "item",
        primaryText: "Dashboard",
        icon: (
          <DashboardIcon
            sx={{
              fontSize: 20,
              color: this.isActiveRoute([routes.dashboard])
                ? "primary.main"
                : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.dashboard),
        isActive: this.isActiveRoute([routes.dashboard]),
      },
      {
        type: "item",
        primaryText: "User Management",
        icon: (
          <GroupOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([
                routes.userManagement,
                routes.userManagementAddVendorUser,
                routes.userManagementEditVendorUser,
                routes.userManagementViewVenderUser,
              ])
                ? "primary.main"
                : "",
            }}
          />
        ),
        onClick: () =>
          this.handleSidebarRedirection(routes.userManagement),
        isActive: this.isActiveRoute([
          routes.userManagement,
          routes.userManagementAddVendorUser,
          routes.userManagementEditVendorUser,
          routes.userManagementViewVenderUser,
        ]),
      },
      {
        type: "item",
        primaryText: "Job Management",
        icon: (
          <ManageSearchOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([
                routes.jobManagement,
                routes.jobManagementDetails,
              ])
                ? "primary.main"
                : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.jobManagement),
        isActive: this.isActiveRoute([
          routes.jobManagement,
          routes.jobManagementDetails,
        ]),
      },
      {
        type: "item",
        primaryText: "Applied Jobs",
        icon: (
          <TaskAltOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([
                routes.appliedJobs,
                routes.appliedJobsDetails,
              ])
                ? "primary.main"
                : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.appliedJobs),
        isActive: this.isActiveRoute([
          routes.appliedJobs,
          routes.appliedJobsDetails,
        ]),
      },
      {
        type: "item",
        primaryText: "My Work",
        icon: (
          <WorkOutlineOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([routes.myWork]) ? "primary.main" : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.myWork),
        isActive: this.isActiveRoute([routes.myWork]),
      },
      {
        type: "item",
        primaryText: "Reports",
        icon: (
          <AssessmentOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([routes.reports]) ? "primary.main" : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.reports),
        isActive: this.isActiveRoute([routes.reports]),
      },
      {
        type: "item",
        primaryText: "Earnings",
        icon: (
          <CurrencyRupeeOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([routes.earnings])
                ? "primary.main"
                : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.earnings),
        isActive: this.isActiveRoute([routes.earnings]),
      },
      {
        type: "item",
        primaryText: "FAQ",
        icon: (
          <QuizOutlinedIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([routes.faq]) ? "primary.main" : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.faq),
        isActive: this.isActiveRoute([routes.faq]),
      },
      {
        type: "item",
        primaryText: "Raise Dispute",
        icon: (
          <DangerousIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([routes.raiseDispute])
                ? "primary.main"
                : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.raiseDispute),
        isActive: this.isActiveRoute([routes.raiseDispute]),
      },
      {
        type: "item",
        primaryText: "Ask Us",
        icon: (
          <ConnectWithoutContactIcon
            sx={{
              fontSize: 18,
              color: this.isActiveRoute([routes.askUs]) ? "primary.main" : "",
            }}
          />
        ),
        onClick: () => this.handleSidebarRedirection(routes.askUs),
        isActive: this.isActiveRoute([routes.askUs]),
      },
    ];

    const profileMenuConfig = [
      {
        label: "Profile",
        onClick: () => this.handleProfileAction(),
      },
      {
        label: "Change Password",
        onClick: () => this.toggleModal(),
      },
      {
        label: "Logout",
        onClick: () => this.handleLogoutClick(),
      },
    ];

    return (
      <>
        <Modal open={openChangePasswordModal} onClose={this.toggleModal} disableClose>
          <Stack>
            <Text
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Change Password
            </Text>
            <TextField
              type={showCurrentPassword ? "text" : "password"}
              fullWidth
              label="Current Password"
              onChange={(e) =>
                this.handleOnChange("currentPassword", e.target.value)
              }
              sx={{ marginTop: "1.5rem" }}
              error={formError.currentPassword}
              helperText={formError.currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        this.togglePassword("currentPassword");
                      }}
                      edge="end"
                    >
                      {showCurrentPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showNewPassword ? "text" : "password"}
              fullWidth
              label="New Password"
              onChange={(e) =>
                this.handleOnChange("newPassword", e.target.value)
              }
              sx={{ marginTop: "1.5rem" }}
              error={formError.newPassword}
              helperText={formError.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        this.togglePassword("newPassword");
                      }}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ width: "10rem" }}
                onClick={() => {
                  this.toggleModal();
                }}
              >
                CANCEL
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  this.handleChangePassword()
                }}
                sx={{ width: "10rem" }}
                loading={isLoading}
              >
                SAVE PASSWORD
              </Button>
            </Stack>
          </Stack>
        </Modal>

        <Stack direction="row" sx={{ minHeight: "100vh" }}>
          <Sidebar
            menuConfig={sidebarMenuConfig}
            isDrawerExpanded={isDrawerExpanded}
            onDrawerToggle={this.handleDrawerToggle}
          />

          <Stack
            sx={{
              flex: 1,
              backgroundColor: {
                xs: "background.paper",
                md: "grey.100",
              },
              width: "100%",
            }}
          >
            <Header
              onDrawerToggle={this.handleDrawerToggle}
              isDrawerExpanded={isDrawerExpanded}
              notifications={notifications}
              onNotificationOpen={this.handleNotificationOpen}
              onNotificationClose={this.handleNotificationClose}
              isNotificationDropdownOpen={isNotificationDropdownOpen}
              notificationAnchorEl={notificationAnchorEl}
              profileMenuConfig={profileMenuConfig}
              profileData={profileData}
            />
            <Stack
              sx={{
                position: "relative",
                flex: 1,
                maxWidth: "100%",
                px: { xs: 2, md: 3 },
                py: 0,
                pb: { xs: 2, md: 3 },
              }}
            >
              <Suspense
                fallback={
                  <Stack
                    sx={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      style={{ color: "lightgrey" }}
                      size={50}
                    />
                  </Stack>
                }
              >
                {children}
              </Suspense>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }
}

export default withRouter(LayoutWebContainer);
