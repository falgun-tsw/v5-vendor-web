import _get from "lodash.get";

const manageVendorUserParser = {};
manageVendorUserParser.parseVendorUserList = (res) => {
  const vendorUsersListCountCount = _get(res, "totalElements", 0);
  if (res && res.content) {
    res = res.content;
  }

  if (!res) {
    return [];
  }

  const data = res.map(function (response, i) {
    return {
      id: _get(response, "id", ""),
      userName: _get(response, "firstName", ""),
      userCode: _get(response, "vendorUserRefNo", ""),
      email: _get(response, "email", ""),
      state: _get(response.address, "state", ""),
      mobileNumber: _get(response, "mobile", ""),
      status: _get(response, "status", "Active"),
    };
  });

  return {data,vendorUsersListCountCount};
};

manageVendorUserParser.parseVendorUserDetails = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return {};
  }

  const handleAddress = (data) => {
    return {
      location: _get(data, "location", ""),
      city: _get(data, "city", ""),
      country: _get(data, "country", ""),
      state: _get(data, "state", ""),
      pinCode: _get(data, "pinCode", ""),
    };
  };
  return {
    address: handleAddress(_get(res, "address", {})),
    firstName: _get(res, "firstName", ""),
    middleName: _get(res, "middleName", ""),
    lastName: _get(res, "lastName", ""),
    profileImage: _get(res, "profileImage", ""),
    email: _get(res, "email", ""),
    mobile: _get(res, "mobile", ""),
    vendorUserRating: _get(res, "vendorUserRating", null),
    status: _get(res, "status", ""),
  };
};

manageVendorUserParser.parseVendorUserCreds = (res) => {
  if (res && res.response) {
    res = res.response;
  }

  if (!res) {
    return {};
  }

  return {
    vendorUserRefNo: _get(res,"vendorUserRefNo",""),
    userName: _get(res,"userName",""),
    joiningDate: _get(res,"joiningDate",""),
    password: _get(res,"password","")
  }
};

export { manageVendorUserParser };
