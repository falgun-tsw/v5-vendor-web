import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@app/component/common/Stack";
import Box from "@app/component/common/Box";
import Text from "@app/component/common/Text";
import Card from "@app/component/common/Card";
import IconButton from "@app/component/common/IconButton";
import RenderForm from "@app/component/common/RenderForm";
import Button from "@app/component/common/Button";
import { manageVendorUserApi } from "@app/stores/userManagement/userManagementApis";
import { validationHelper } from "@app/helper/validation";
import { routes } from "src/routes";

class EditVendorUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isLoading: false,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getVendorUserDetails(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vendorUserDetails !== this.props.vendorUserDetails) {
      this.setInitialData();
    }
  }

  setInitialData = () => {
    const { vendorUserDetails } = this.props;

    const {
      firstName,
      lastName,
      middleName,
      email,
      mobile,
      address = {},
    } = vendorUserDetails;
    const { country, state, city, location, pinCode } = address;
    this.setState({
      form: {
        firstName,
        lastName,
        middleName,
        email,
        mobile,
        country,
        state,
        city,
        location,
        pinCode,
      },
    });
  };

  handleOnChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
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
    const { form } = this.state;
    const { id } = this.props.match.params;
    const {
      firstName,
      lastName,
      middleName,
      email,
      mobile,
      country,
      state,
      city,
      location,
      pinCode,
    } = form;
    if (this.handleValidation() > 0) {
      return;
    }
    this.setState({ isLoading: true });
    const payload = {
      firstName,
      middleName,
      lastName,
      email,
      mobile,
      address: {
        country,
        state,
        city,
        location,
        pinCode,
      },
    };
    try {
      const response = await manageVendorUserApi.editVendorUser(id, payload);
      if (response) {
        this.props.history.push(routes.userManagement);
        this.props.toastAction({ message: "Vendor User Updated Successfully" });
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;

    const firstName = validationHelper.name(form.firstName);
    const middleName = validationHelper.name(form.middleName);
    const lastName = validationHelper.name(form.lastName);
    const email = validationHelper.email(form.email);
    const mobile = validationHelper.mobile(form.mobile);
    const country = validationHelper.required(form.country);
    const state = validationHelper.required(form.state);
    const city = validationHelper.required(form.city);
    const location = validationHelper.required(form.location);
    const pinCode = validationHelper.inputNumber(form.pinCode);

    if (!firstName.isValid) {
      errorCount++;
      formError.firstName = firstName.message;
    } else {
      formError.firstName = "";
    }
    if (!middleName.isValid) {
      errorCount++;
      formError.middleName = middleName.message;
    } else {
      formError.middleName = "";
    }
    if (!lastName.isValid) {
      errorCount++;
      formError.lastName = lastName.message;
    } else {
      formError.lastName = "";
    }

    if (!email.isValid) {
      errorCount++;
      formError.email = email.message;
    } else {
      formError.email = "";
    }

    if (!mobile.isValid) {
      errorCount++;
      formError.mobile = mobile.message;
    } else {
      formError.mobile = "";
    }

    if (!country.isValid) {
      errorCount++;
      formError.country = country.message;
    } else {
      formError.country = "";
    }

    if (!state.isValid) {
      errorCount++;
      formError.state = state.message;
    } else {
      formError.state = "";
    }
    if (!city.isValid) {
      errorCount++;
      formError.city = city.message;
    } else {
      formError.city = "";
    }

    if (!location.isValid) {
      errorCount++;
      formError.location = location.message;
    } else {
      formError.location = "";
    }

    if (!pinCode.isValid) {
      errorCount++;
      formError.pinCode = pinCode.message;
    } else {
      formError.pinCode = "";
    }

    this.setState({ formError });
    return errorCount;
  };

  render() {
    const { userDetailsLoading, vendorUserDetails } = this.props;
    const { form, formError, isLoading } = this.state;
    const { profileImage } = vendorUserDetails;
    const {
      firstName,
      lastName,
      middleName,
      email,
      mobile,
      country,
      state,
      city,
      location,
      pinCode,
    } = form;
    const basicDetails = [
      {
        required: true,
        fullWidth: true,
        label: "First Name",
        error: `${formError.firstName}`,
        helperText: `${formError.firstName}`,
        value: firstName,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("firstName", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Middle Name",
        error: `${formError.middleName}`,
        helperText: `${formError.middleName}`,
        value: middleName,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("middleName", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Last Name",
        error: `${formError.lastName}`,
        helperText: `${formError.lastName}`,
        value: lastName,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("lastName", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Mobile Number",
        error: `${formError.mobile}`,
        helperText: `${formError.mobile}`,
        value: mobile,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("mobile", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Email",
        error: `${formError.email}`,
        helperText: `${formError.email}`,
        value: email,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("email", e.target.value),
      },
    ];
    const addressDetails = [
      {
        required: true,
        fullWidth: true,
        label: "Country",
        error: `${formError.country}`,
        helperText: `${formError.country}`,
        value: country,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("country", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "State",
        error: `${formError.state}`,
        helperText: `${formError.state}`,
        value: state,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("state", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "City",
        error: `${formError.city}`,
        helperText: `${formError.city}`,
        value: city,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("city", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Pincode",
        error: `${formError.pinCode}`,
        helperText: `${formError.pinCode}`,
        value: pinCode,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("pinCode", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Location",
        error: `${formError.location}`,
        helperText: `${formError.location}`,
        value: location,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("location", e.target.value),
      },
    ];
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
        <Stack mt={3} sx={{ height: "100%" }}>
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => {
                this.resetFormData();
                this.props.history.push(routes.userManagement);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Text sx={{ color: "#0000008a", fontWeight: "500 !important" }}>
              Edit User
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
          <Card sx={{ marginTop: "1.85rem", padding: "1.25rem !important" }}>
            <Stack pb={2}>
              <Text sx={{ fontSize: "1.13rem", fontWeight: "600" }} pb={2}>
                Basic Details
              </Text>
              <RenderForm data={basicDetails} />
            </Stack>

            <Stack pb={2}>
              <Text sx={{ fontSize: "1.13rem", fontWeight: "600" }} pb={2}>
                Address
              </Text>
              <RenderForm data={addressDetails} />
            </Stack>
          </Card>
          <Stack direction="row" justifyContent="flex-end" mt={4} spacing={3}>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{ width: "10rem" }}
              onClick={() => {
                this.props.history.push(routes.userManagement);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: "10rem" }}
              onClick={this.handleSubmit}
              loading={isLoading}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
}

export default EditVendorUserContainer;
