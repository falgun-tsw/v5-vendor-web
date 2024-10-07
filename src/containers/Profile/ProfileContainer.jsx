import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@app/component/common/Stack";
import { customerApis } from "@app/stores/customer/customerApis";
import { validationHelper } from "@app/helper/validation";
import ViewProfile from "@app/component/Profile/ViewProfile";
import EditProfile from "@app/component/Profile/EditProfile";

const viewType = {
  VIEW_PROFILE: "VIEW_PROFILE",
  EDIT_PROFILE: "EDIT_PROFILE",
};
class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeViewType: viewType.VIEW_PROFILE,
      form: {
        fullName: "",
        mobileNumber: "",
        email: "",
        designation: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        location: "",
        accountHolderName:"",
        accountNumber:"",
        bankName:"",
        branch:"",
        ifscCode:""
      },
      formError: {
        fullName: "",
        mobileNumber: "",
        email: "",
        designation: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        location: "",
        accountHolderName:"",
        accountNumber:"",
        bankName:"",
        branch:"",
        ifscCode:""
      },
      isLoading: false,
    };
  }
  componentDidMount(){
    this.setInitialData();
  }
  setInitialData = () => {
    const { profile } = this.props;
    const { address, spocDetail ,bankDetail } = profile;
    if (Object.keys(profile).length) {
      this.setState({
        form: {
          fullName: spocDetail.name,
          mobileNumber: spocDetail.mobile,
          email: spocDetail.email,
          designation: spocDetail.designation,
          country: address.country,
          state: address.state,
          city: address.city,
          pincode: address.pinCode,
          location: address.location,
          accountHolderName:bankDetail.accountHolderName,
          accountNumber:bankDetail.accountNumber,
          bankName:bankDetail.bankName,
          branch:bankDetail.branch,
          ifscCode:bankDetail.ifscCode
        },
      });
    }
  };

  onViewChange = (viewtype) => {
    if (viewtype === "EDIT_PROFILE") {
      this.setState({ activeViewType: viewType.EDIT_PROFILE });
    } else if (viewtype === "VIEW_PROFILE") {
      this.setState({
        activeViewType: viewType.VIEW_PROFILE,
        formError: {
          fullName: "",
          mobileNumber: "",
          email: "",
          designation: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          location: "",
          accountHolderName:"",
          accountNumber:"",
          bankName:"",
          branch:"",
          ifscCode:""
        },
      });
    }
  };

  handleOnChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  };

  handleSubmit = async () => {
    const { form } = this.state;
    if (this.handleValidation() > 0) {
      return;
    }
    this.setState({ isLoading: true });
    const {
      fullName,
      mobileNumber,
      email,
      country,
      state,
      city,
      pincode,
      location,
      designation,
      accountHolderName,
      accountNumber,
      bankName,
      branch,
      ifscCode
    } = form;
    const address = {
      location,
      city,
      state,
      country,
      pinCode: pincode,
    };
    const spocDetail = {
      name: fullName,
      email: email,
      mobile: mobileNumber,
      designation,
    };
    const bankDetail = {
      accountHolderName,
      accountNumber,
      bankName,
      branch,
      ifscCode
    }

    try {
      const payload = {
        address,
        spocDetail,
        bankDetail,
        experienceInYear: "",
        workHighlights: "",
      };
      const response = await customerApis.editProfile(payload);

      if (response) {
        this.props.toastAction({ message: response.message });
        this.props.getProfile();
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;
    const country = validationHelper.required(form.country);
    const state = validationHelper.required(form.state);
    const city = validationHelper.required(form.city);
    const location = validationHelper.required(form.location);
    const pincode = validationHelper.inputNumber(form.pincode);
    const accountNumber = validationHelper.bankAccountNumber(form.accountNumber);
    const ifscCode = validationHelper.ifscCode(form.ifscCode);

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

    if (!pincode.isValid) {
      errorCount++;
      formError.pincode = pincode.message;
    } else {
      formError.pincode = "";
    }

    if (!accountNumber.isValid) {
      errorCount++;
      formError.accountNumber = accountNumber.message;
    } else {
      formError.accountNumber = "";
    }

    if (!ifscCode.isValid) {
      errorCount++;
      formError.ifscCode = ifscCode.message;
    } else {
      formError.ifscCode = "";
    }

    this.setState({ formError });
    return errorCount;
  };

  render() {
    const { activeViewType, form, formError, isLoading } = this.state;
    const {
      profileLoading = 0,
      profile = {},
    } = this.props;

    const addressFromData = [
      {
        required: true,
        fullWidth: true,
        label: "Country",
        error: `${formError.country}`,
        helperText: `${formError.country}`,
        value: form.country,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("country", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "State",
        error: `${formError.state}`,
        helperText: `${formError.state}`,
        value: form.state,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("state", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "City",
        error: `${formError.city}`,
        helperText: `${formError.city}`,
        value: form.city,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("city", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Pincode",
        error: `${formError.pincode}`,
        helperText: `${formError.pincode}`,
        value: form.pincode,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("pincode", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Location",
        error: `${formError.location}`,
        helperText: `${formError.location}`,
        value: form.location,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("location", e.target.value),
      },
    ];

    const spocDetailFormData = [
      {
        required: true,
        fullWidth: true,
        label: "Name",
        error: `${formError.fullName}`,
        helperText: `${formError.fullName}`,
        value: form.fullName,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("fullName", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "email",
        error: `${formError.email}`,
        helperText: `${formError.email}`,
        value: form.email,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("email", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "mobileNumber",
        error: `${formError.mobileNumber}`,
        helperText: `${formError.mobileNumber}`,
        value: form.mobileNumber,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("mobileNumber", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "designation",
        error: `${formError.designation}`,
        helperText: `${formError.designation}`,
        value: form.designation,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("designation", e.target.value),
      }
    ];
    const bankDetailFormData = [
      {
        required: true,
        fullWidth: true,
        label: "AccountHolderName",
        error: `${formError.accountHolderName}`,
        helperText: `${formError.accountHolderName}`,
        value: form.accountHolderName,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("accountHolderName", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "AccountNumber",
        error: `${formError.accountNumber}`,
        helperText: `${formError.accountNumber}`,
        value: form.accountNumber,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("accountNumber", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Bank Name",
        error: `${formError.bankName}`,
        helperText: `${formError.bankName}`,
        value: form.bankName,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("bankName", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Branch",
        error: `${formError.branch}`,
        helperText: `${formError.branch}`,
        value: form.branch,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("branch", e.target.value),
      },
      {
        required: true,
        fullWidth: true,
        label: "Ifsc Code",
        error: `${formError.ifscCode}`,
        helperText: `${formError.ifscCode}`,
        value: form.ifscCode,
        gridSize: { xs: 12, md: 4 },
        onChange: (e) => this.handleOnChange("ifscCode", e.target.value),
      }
    ];

    if (profileLoading) {
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
        <Stack mt={3}>
          {activeViewType === viewType.VIEW_PROFILE ? (
            <ViewProfile
              profileData={profile}
              handleViewChange={this.onViewChange}
              {...this.props}
            />
          ) : (
            <EditProfile
              profileData={profile}
              addressFromData={addressFromData}
              spocDetailFormData={spocDetailFormData}
              bankDetailFormData={bankDetailFormData}
              handleViewChange={this.onViewChange}
              handleSubmit={this.handleSubmit}
              isLoading={isLoading}
            />
          )}
        </Stack>
      </>
    );
  }
}

export default ProfileContainer;
