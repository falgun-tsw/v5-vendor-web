import React, { Component } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@app/component/common/Stack";
import Box from "@app/component/common/Box";
import Text from "@app/component/common/Text";
import Card from "@app/component/common/Card";
import Menu from "@app/component/common/Menu";
import MenuItem from "@app/component/common/MenuItem";
import IconButton from "@app/component/common/IconButton";
import TextField from "@app/component/common/TextField";
import UserInfoPanel from "@app/component/ViewVendorUser/UserInfoPanel";
import Modal from "@app/component/common/Modal";
import Button from "@app/component/common/Button";
import RenderKeyValue from "@app/component/common/RenderKeyValue";
import { manageVendorUserApi } from "@app/stores/userManagement/userManagementApis";
import { validationHelper } from "@app/helper/validation";
import { axios } from "@app/helper/axios";
const styles = {
  profilekey: {
    fontSize: "1.300rem",
    fontWeight: "600",
  },
  profilevalue: {
    fontSize: "1.1rem",
  },
};

class ViewVendorUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openVendorLinks: null,
      openUserInfoPanel: false,
      modalOpen: false,
      isLoading: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showPassword: false,
      showUserPanelPassword: false,
      form: {
        currentPassword: "",
        newPassword: "",
      },
      formError: {
        currentPassword: "",
        newPassword: "",
      },
      isChangePasswordloading: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getVendorUserDetails(id);
    this.props.getVendorUserCreds(id);
  }

  changePanelPasswordVisibility = () => {
    this.setState({ showUserPanelPassword: !this.state.showUserPanelPassword });
  };

  handleOpen = (e) => {
    this.setState({ openVendorLinks: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ openVendorLinks: false });
  };

  handleUserInfo = () => {
    this.toogleUserPanel();
    this.setState({ openVendorLinks: false });
  };

  toogleUserPanel = () => {
    this.setState({ openUserInfoPanel: !this.state.openUserInfoPanel });
  };

  handleToggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleModalOpen = () => {
    this.handleToggleModal();
    this.toogleUserPanel();
  };

  handleModalClose = () => {
    this.handleToggleModal();
    this.setState({
      formError: { newPassword: "" },
    });
  };

  togglePassword = (key) => {
    const { showCurrentPassword, showNewPassword } = this.state;
    if (key === "currentPassword") {
      this.setState({ showCurrentPassword: !showCurrentPassword });
      return;
    }
    this.setState({ showNewPassword: !showNewPassword });
  };

  resetFormData = () => {
    this.setState({
      form: {
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        email: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        location: "",
      },
      formError: {
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        email: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        location: "",
      },
    });
  };

  handleSubmit = async () => {
    const { id } = this.props.match.params;
    const { form } = this.state;
    const {vendorUserCreds} = this.props;
    if (this.handleValidation() > 0) {
      return;
    }
    try {
      this.setState({ isChangePasswordloading: true })
      const res = await axios.put(`vendor-user/change-password/${vendorUserCreds.vendorUserId}`,null,{params:{newPassword: form.newPassword}})
      if(res){
        this.props.toastAction({ message: "Password Changed" });
        this.props.getVendorUserCreds(id);
        this.handleModalClose()
      }
    } catch (error) {
      console.log("vendor user change password error")
    }finally{
      this.setState({ isChangePasswordloading: false })
    }
  };

  handleOnChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;
    const newPassword = validationHelper.password(form.newPassword);
    if (!newPassword.isValid) {
      errorCount++;
      formError.newPassword = newPassword.message;
    } else {
      formError.newPassword = "";
    }
    this.setState({ formError });
    return errorCount;
  };

  handleDeactivateUser = async () => {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    try {
      const response = await manageVendorUserApi.deactivateVendorUser(id);
      if (response) {
        this.props.toastAction({ message: "User Deactivated Successfully" });
        this.props.getVendorUserDetails(id);
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleActivateUser = async() => {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    try {
      const response = await manageVendorUserApi.activateVendorUser(id);
      if (response) {
        this.props.toastAction({ message: "User activated Successfully" });
        this.props.getVendorUserDetails(id);
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { userDetailsLoading, vendorUserDetails, vendorUserCreds = {} } = this.props;
    const {
      address = {},
      email,
      firstName,
      lastName,
      mobile,
      profileImage,
      vendorUserRating,
      status,
    } = vendorUserDetails;
    const { location, city, state, country, pinCode } = address;
    const {
      openVendorLinks,
      openUserInfoPanel,
      modalOpen,
      showCurrentPassword,
      showNewPassword,
      formError,
      showUserPanelPassword,
      isChangePasswordloading
    } = this.state;

    if (userDetailsLoading) {
      return (
        <Stack
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "lightgrey" }} size={50} />
        </Stack>
      );
    }

    return (
      <>
        <Modal open={modalOpen} onClose={this.handleModalClose} disableClose>
          <Stack component="form" method="post">
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
              required
              fullWidth
              name="currentPassword"
              id="currentpassword"
              label="Current Password"
              onChange={(e) =>
                this.handleOnChange("currentPassword", e.target.value)
              }
              value={vendorUserCreds.password}
              sx={{ marginTop: "2.5rem" }}
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
              required
              fullWidth
              name="newPassword"
              id="newpassword"
              label="New Password"
              onChange={(e) =>
                this.handleOnChange("newPassword", e.target.value)
              }
              sx={{ marginTop: "2.5rem" }}
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
                type="reset"
                variant="contained"
                size="small"
                color="secondary"
                sx={{ width: "10rem" }}
                onClick={() => {
                  this.handleModalClose();
                }}
              >
                CANCEL
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  this.handleSubmit();
                }}
                sx={{ width: "10rem" }}
                loading={isChangePasswordloading}
              >
                SAVE PASSWORD
              </Button>
            </Stack>
          </Stack>
        </Modal>
        <Stack mt={2} sx={{ height: "100%" }} justifyContent="flex-start">
          <UserInfoPanel
            openUserInfoPanel={openUserInfoPanel}
            closeUserPanel={this.toogleUserPanel}
            handleModalOpen={this.handleModalOpen}
            changePanelPasswordVisibility={this.changePanelPasswordVisibility}
            showUserPanelPassword={showUserPanelPassword}
            data={vendorUserCreds}
          />
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => {
                this.props.history.goBack();
                this.resetFormData();
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Text sx={{ color: "#0000008a", fontWeight: "500 !important" }}>
              View User
            </Text>
          </Stack>
          <Box
            sx={{
              width: "120px",
              height: "120px",
              textAlign: "center",
              backgroundColor: "#A29F9F",
              color: "#545353",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: { xs: "center" },
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="back"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              <img
                src="/images/userprofile.svg"
                alt="back"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            )}
          </Box>
          <Card
            sx={{
              marginTop: "30px",
              padding: "20px",
              overflowX: "scroll",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Text sx={styles.profilekey}>Basic Details:</Text>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <StarBorderOutlinedIcon
                    sx={{ color: "#F7B645", paddingRight: "0.3125rem" }}
                  />
                  <Text sx={styles.profilevalue}>{vendorUserRating}</Text>
                </Stack>
                <Stack>
                  <IconButton edge="end" size="large" onClick={this.handleOpen}>
                    <MoreVertOutlinedIcon />
                  </IconButton>
                  <Menu
                    open={Boolean(openVendorLinks)}
                    anchorEl={openVendorLinks}
                    onClose={this.handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 60,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    {status === "INACTIVE" ? (
                      <MenuItem onClick={this.handleActivateUser}>
                        Activate User
                      </MenuItem>
                    ) : null}
                    {status === "ACTIVE" ? (
                      <MenuItem onClick={this.handleDeactivateUser}>
                        Deactivate User
                      </MenuItem>
                    ) : null}
                    <MenuItem
                      onClick={() => {
                        this.handleUserInfo();
                      }}
                    >
                      Info
                    </MenuItem>
                  </Menu>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
                <RenderKeyValue
                  label={"Name:"}
                  value={`${firstName} ${lastName}`}
                />
              </Stack>
              <Stack
                direction="row"
                pt={1}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <RenderKeyValue label="Mobile:" value={mobile} />
              </Stack>
              <Stack
                direction="row"
                pt={1}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <RenderKeyValue label="Email:" value={email} />
              </Stack>
            </Stack>

            <Stack mt={4}>
              <Text sx={styles.profilekey}>Address:</Text>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                pt={1}
                spacing={{ xs: 1 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <RenderKeyValue label="Country:" value={country} />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <RenderKeyValue label="State:" value={state} />
                </Stack>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                pt={1}
                spacing={{ xs: 1 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <RenderKeyValue label="City:" value={city} />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <RenderKeyValue label="Pin:" value={pinCode} />
                </Stack>
              </Stack>

              <Stack
                direction={{ xm: "column", sm: "row" }}
                pt={1}
                spacing={{ xs: 1 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <RenderKeyValue label="Location:" value={location} />
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </>
    );
  }
}

export default ViewVendorUserContainer;
