const validationHelper = {};

validationHelper.required = (value) => {
  let isValid = 1;
  let message = "";

  // to avoid check for boolean scenario individual check is applied
  if ([null, undefined, ""].includes(value)) {
    message = "This field is required";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.name = (value) => {
  let { isValid, message } = validationHelper.required(value);
  value = value.trim();
  const nameRegex = /^[a-zA-Z\s']*$/;
  if (isValid && (!nameRegex.test(value) || value.length < 3)) {
    message = "Invalid name";
    isValid = 0;
  }
  return { isValid, message };
};

validationHelper.portfolioName = (value) => {
  let { isValid, message } = validationHelper.required(value);

  const portfolioNameRegex = /^[a-zA-Z0-9_]*$/;
  if ((isValid && !portfolioNameRegex.test(value)) || value.length < 3) {
    message = "Invalid Portfolio Name format";
    isValid = 0;
  }

  return { isValid, message };
};
validationHelper.pan = (value) => {
  let { isValid, message } = validationHelper.required(value);

  const panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (isValid && !panRegex.test(value)) {
    message = "Invalid Pan format";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.aadhar = (value) => {
  let { isValid, message } = validationHelper.required(value);
  const aadharRegex =
    /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
  if (isValid && !aadharRegex.test(value)) {
    message = "Invalid Aadhar format";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.dateOfBirth = (value) => {
  let { isValid, message } = validationHelper.required(value);

  return { isValid, message };
};

validationHelper.email = (value) => {
  let { isValid, message } = validationHelper.required(value);

  // const emailRegex = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (isValid && !emailRegex.test(value)) {
    message = "Invalid Email format";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.password = (value) => {
  let { isValid, message } = validationHelper.required(value);

  if (isValid && value.length < 3) {
    message = "Invalid Password format";
    isValid = 0;
  }

  // const passwordRegex =
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // if (!passwordRegex.test(value)) {
  //     message = "Invalid Password format";
  //     isValid = 0;
  // }

  return { isValid, message };
};

validationHelper.confirmPassword = (confirmPassword, password) => {
  let { isValid, message } = validationHelper.password(confirmPassword);

  if (isValid && confirmPassword !== password) {
    message = "Enter same passwords";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.mobile = (value) => {
  let { isValid, message } = validationHelper.required(value);

  if (isValid && isNaN(value)) {
    message = "Invalid mobile number";
  }
  const phoneNo = /^[6-9]\d{9}$/gi;
  if (isValid && !phoneNo.test(value)) {
    message = "Invalid mobile number";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.inputNumber = (value) => {
  let { isValid, message } = validationHelper.required(value);

  if (isValid && isNaN(value)) {
    isValid = 0;
    message = "Enter only numbers";
  } else if (value < 0) {
    isValid = 0;
    message = "Enter positive numbers";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.minInvestment = (value, minValue) => {
  let { isValid, message } = validationHelper.required(value);

  if (isValid && isNaN(value)) {
    message = "Invalid investment amount";
    isValid = 0;
  }
  if (isValid && parseInt(value) < parseInt(minValue)) {
    message = `Minimum investment amount is ${minValue}`;
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.otp = (value) => {
  let { isValid, message } = validationHelper.required(value);

  if (isValid && value.length !== 6) {
    message = "Invalid OTP";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.ifscCode = (value) => {
  let { isValid, message } = validationHelper.required(value);

  /* NOTE: regex pattern check. 
        - It should be 11 characters long.
        - The first four characters should be upper case alphabets.
        - The fifth character should be 0.
        - The last six characters usually numeric, but can also be alphabetic.
    */
  const ifscRegex = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
  if (isValid && !ifscRegex.test(value)) {
    message = "Invalid IFSC code";
    isValid = 0;
  }

  return { isValid, message };
};

validationHelper.bankAccountNumber = (value) => {
  let { isValid, message } = validationHelper.required(value);
  value = value.trim();
  const bankAccountRegex = /^\d{9,18}$/;
  if (isValid && !bankAccountRegex.test(value)) {
    message = "Invalid account number";
    isValid = 0;
  }

  return { isValid, message };
};

export { validationHelper };
