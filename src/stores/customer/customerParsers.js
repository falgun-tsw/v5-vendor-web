import _get from "lodash.get";

const customerParsers = {};
customerParsers.login = (res) => {
  if (res && res.result) {
    res = res.result;
  }

  if (!res) {
    return {
      firstName: "",
      profileImage: "",
    };
  }
  return {
    token: _get(res, "token", ""),
    firstName: _get(res, "firstName", ""),
    middleName: _get(res, "middleName", ""),
    lastName: _get(res, "lastName", ""),
    profileImage: _get(res, "profileImage", "images/profileimage.jpg"),
    profileCompletionPercentage: _get(res, "profileCompletionPercentage", null),
    lastLoginAt: _get(res, "lastLoginAt", null),
    freelancerRating: _get(res, "freelancerRating", null),
    vendorRating: _get(res, "vendorRating", null),
    vendorUserRating: _get(res, "vendorUserRating", null),
    profileCompleted: _get(res, "profileCompleted", false),
  };
};

customerParsers.profile = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return {};
  }

  const handleAddress = (data) => {
    return {
      location: _get(data, "location", ""),
      city: _get(data, "city", ""),
      state: _get(data, "state", ""),
      country: _get(data, "country", ""),
      pinCode: _get(data, "pinCode", ""),
    };
  };

  const handleBasicDetails = (data) => {
    return {
      email: _get(res.spocDetail, "email", ""),
      mobile: _get(res.spocDetail, "mobile", ""),
      name: _get(res.spocDetail, "name", ""),
      designation: _get(res.spocDetail, "designation", ""),
    };
  };

  const handleBankDetails = (data) => {
    return {
      accountHolderName : _get(res.bankDetail,"accountHolderName",""),
      accountNumber : _get(res.bankDetail,"accountNumber",""),
      bankName : _get(res.bankDetail,"bankName",""),
      branch : _get(res.bankDetail,"branch",""),
      ifscCode : _get(res.bankDetail,"ifscCode","")
    }
  }
  const data = {
    id: _get(res, "id", null),
    profileURL: _get(res, "portfolioUrl", ""),
    spocDetail: handleBasicDetails(_get(res, "spocDetail", {})),
    address: handleAddress(_get(res, "address", {})),
    bankDetail: handleBankDetails(_get(res,"bankDetail",{})),
    venderDetails: {
      vendorName: _get(res, "vendorName", ""),
      companyLOGO: _get(res, "companyLogo", ""),
      vendorRefNo: _get(res, "vendorRefNo", "NA"),
    },
  };

  return data;
};

export { customerParsers };
