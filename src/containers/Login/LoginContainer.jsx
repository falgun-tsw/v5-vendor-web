import React, { Component } from "react";
import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Stack from "@app/component/common/Stack";
import Grid from "@app/component/common/Grid";
import Box from "@app/component/common/Box";
import Text from "@app/component/common/Text";
import TextField from "@app/component/common/TextField";
import Button from "@app/component/common/Button";
import { validationHelper } from "@app/helper/validation";
import { customerApis } from "@app/stores/customer/customerApis";
import { localStore } from "@app/stores/localStorage";
import { customerParsers } from "@app/stores/customer/customerParsers";

export class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      submitDisabled: true,
      form: {
        userName: "",
        userPassword: "",
      },
      formError: {
        userName: "",
        userPassword: "",
      },
      isLoading: 0,
    };
  }

  handleSubmit = async () => {
    if (this.handleValidation() > 0) {
      return;
    }
    this.setState({ isLoading: 1 });
    try {
      const { userName, userPassword } = this.state.form;
      const response = await customerApis.login({ userName, userPassword });
      const res = customerParsers.login(response);
      if (res) {
        localStore.setToken(res.token);
        this.props.updateAuthData(res);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      this.setState({ isLoading: 0 });
    }
  };

  changePasswordVisibility = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleOnChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
    let submitForm = form.userName && form.userPassword;
    this.setState({ submitDisabled: !submitForm });
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;
    const userName = validationHelper.required(form.userName);
    const userPassword = validationHelper.password(form.userPassword);
    if (!userName.isValid) {
      errorCount++;
      formError.userName = userName.message;
    } else {
      formError.userName = "";
    }
    if (!userPassword.isValid) {
      errorCount++;
      formError.userPassword = userPassword.message;
    } else {
      formError.userPassword = "";
    }
    this.setState({ formError });
    return errorCount;
  };

  render() {
    const { formError, isLoading, showPassword, submitDisabled } = this.state;
    return (
      <Stack
        sx={{
          minHeight: "100vh",
          backgroundImage: "url(/images/loginbackground.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "center",
        }}
      >
        <Grid container sx={{ marginTop: "4rem" }}>
          <Grid item lg={6} md={5} xs={1}></Grid>
          <Grid item lg={4} md={6} xs={10}>
            <Stack
              sx={{
                backgroundColor: "#ffff",
                height: "35rem",
                borderRadius: "0.25rem",
                boxShadow: "0px 0px 20px #9e9e9e",
              }}
            >
              <Box component="form" method="post" m={4} sx={{ height: "100%" }}>
                <img
                  src="images/globallogo.png"
                  alt="global-logo"
                  width="100rem"
                  height="30rem"
                />
                <Text mt={4} sx={{ fontSize: "2.5rem", fontWeight: "600" }}>
                  Sign In
                </Text>
                <Box component="form" mt={3}>
                  <TextField
                    required
                    fullWidth
                    name="userName"
                    id="userName"
                    label="Username"
                    onChange={(e) =>
                      this.handleOnChange("userName", e.target.value)
                    }
                    error={formError.userName}
                    helperText={formError.userName}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    required
                    fullWidth
                    name="password"
                    id="password"
                    label="Password"
                    sx={{ marginTop: "2.5rem" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.changePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      this.handleOnChange("userPassword", e.target.value)
                    }
                    error={formError.userPassword}
                    helperText={formError.userPassword}
                  />

                  <Button
                    disabled={submitDisabled}
                    onClick={this.handleSubmit}
                    fullWidth
                    variant="contained"
                    size="medium"
                    loading={isLoading}
                    sx={{ mt: 5, backgroundColor: "#283593" }}
                  >
                    SIGN IN
                  </Button>
                  <Box
                    mt={5}
                    pt={1.5}
                    sx={{ borderTop: "1px solid #e0e0e0", textAlign: "center" }}
                  >
                    <Text sx={{ fontSize: "0.81rem", color: "#bdbdbd" }}>
                      For Troubleshoot,{" "}
                      <span style={{ color: "#3949ab", fontSize: "0.75rem" }}>
                        CONTACT ADMIN
                      </span>
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item lg={2} md={4} xs={1}></Grid>
        </Grid>
      </Stack>
    );
  }
}

export default LoginContainer;
