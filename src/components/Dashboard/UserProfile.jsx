import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Stack from "@app/component/common/Stack";
import Grid from "@app/component/common/Grid";
import Text from "@app/component/common/Text";
import Menu from "@app/component/common/Menu";
import MenuItem from "@app/component/common/MenuItem";
import Modal from "@app/component/common/Modal";
import Link from "@app/component/common/Link";
import TextField from "@app/component/common/TextField";
import Button from "@app/component/common/Button";
import { config } from "@app/config/index";

const configRes = config();

const UserProfile = (props) => {
  const {
    profileMenu,
    handleSubmit,
    handleOnChange,
    dashboardStateData,
    loginProfileData,
  } = props;
  const { submitDisabled, formError } = dashboardStateData;
  const { firstName } = loginProfileData;
  const [openProfileLinks, setProfileLinks] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleOpen = (e) => {
    setProfileLinks(e.currentTarget);
  };

  const handleClose = () => {
    setProfileLinks(false);
  };
  const togglePassword = (key) => {
    if (key === "currentPassword") {
      setShowCurrentPassword(!showCurrentPassword);
      return;
    }
    setShowNewPassword(!showNewPassword);
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose} disableClose>
        <Stack component="form" method="post">
          <Text
            sx={{ fontSize: "1.5rem", fontWeight: "600", textAlign: "center" }}
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
            onChange={(e) => handleOnChange("currentPassword", e.target.value)}
            sx={{ marginTop: "2.5rem" }}
            error={formError.currentPassword}
            helperText={formError.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      togglePassword("currentPassword");
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
            onChange={(e) => handleOnChange("newPassword", e.target.value)}
            sx={{ marginTop: "2.5rem" }}
            error={formError.newPassword}
            helperText={formError.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      togglePassword("newPassword");
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
            >
              CANCEL
            </Button>

            <Button
              variant="contained"
              size="small"
              disabled={submitDisabled}
              onClick={() => {
                handleSubmit();
              }}
              sx={{ width: "10rem" }}
            >
              SAVE PASSWORD
            </Button>
          </Stack>
        </Stack>
      </Modal>

      <Grid container p={2}>
        <Grid item lg={4} md={4} sm={5} xs={12}>
          <img
            src="images/globallogo.png"
            alt="global-logo"
            width="100"
            height="40"
          />
          <Text variant="h6" sx={{ fontSize: "1rem" }} mt={1}>
            Welcome back,
            <Text
              component="span"
              sx={{ fontWeight: "600", fontSize: "1.1rem" }}
              ml={1}
            >
              {firstName}
            </Text>
          </Text>
        </Grid>
        <Grid item lg={5} md={5} sm={2}></Grid>
        <Grid item lg={3} md={3} sm={5} xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              // src={profileImage ?  `${configRes.apiUrl}/${profileImage}` : "images/profileimage.jpg" }
              src="images/profileimage.jpg"
              alt="global-logo"
              width="60"
              height="60"
              style={{ borderRadius: "50%" }}
            />
            <Text component="span" sx={{ fontSize: "0.75rem" }}>
              Emp ID:
              <br /> {firstName}
            </Text>
            <IconButton edge="end" size="large" onClick={handleOpen}>
              <ArrowDropDownIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
            <Menu
              open={Boolean(openProfileLinks)}
              anchorEl={openProfileLinks}
              onClose={handleClose}
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
                    right: 52,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              {profileMenu.map((item, index) => {
                return (
                  <MenuItem onClick={handleClose}>
                    {item.label === "Change Password" ? (
                      <Text
                        sx={{
                          textDecoration: "none",
                          color: "#404040",
                        }}
                        onClick={handleModalOpen}
                      >
                        <Text sx={{ width: "100%" }}>{item.label}</Text>
                      </Text>
                    ) : (
                      <Link
                        to={item.redirectTo}
                        sx={{
                          textDecoration: "none",
                          color: "#404040",
                          width: "100%",
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </MenuItem>
                );
              })}
            </Menu>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;
