import React from "react";
import Text from "../common/Text";
import Card from "../common/Card";
import Stack from "../common/Stack";
import IconButton from "../common/IconButton";
import RenderKeyValue from "../common/RenderKeyValue";
import { routes } from "src/routes";
import { config } from "@app/config/index";
import { ArrowBack, Edit } from "@mui/icons-material/";

const configRes = config();

const ViewProfile = (props) => {
  const { profileData, handleViewChange } = props;
  const {
    venderDetails = {},
    profileURL,
    spocDetail = {},
    address = {},
    bankDetail = {}
  } = profileData;

  const isBankDetailsAvailable = 
    bankDetail.accountHolderName || 
    bankDetail.accountNumber ||
    bankDetail.bankName || 
    bankDetail.branch || 
    bankDetail.ifscCode;


  const isSPOCDetailsAvailable =
    spocDetail.name ||
    spocDetail.email ||
    spocDetail.mobile ||
    spocDetail.designation;

  const spocDetailsData = [
    {
      label: "FullName:",
      value: spocDetail.name,
    },
    {
      label: "Email:",
      value: spocDetail.email,
    },
    {
      label: "Mobile:",
      value: spocDetail.mobile,
    },
    {
      label: "Designation:",
      value: spocDetail.designation,
    },
  ];

  const bankDetailsData = [
    {
      label : "AccountHolderName:",
      value : bankDetail.accountHolderName
    },
    {
      label : "BankName:",
      value : bankDetail.bankName
    },
    {
      label : "AccountNumber:",
      value : bankDetail.accountHolderName
    },
    {
      label : "Branch:",
      value : bankDetail.branch
    },
    {
      label : "Ifsc Code:",
      value : bankDetail.ifscCode
    }
  ];
  const addressDetails = [
    {
      label: "Country:",
      value: address.country,
    },
    {
      label: "State:",
      value: address.state,
    },
    {
      label: "City:",
      value: address.city,
    },
    {
      label: "Pincode:",
      value: address.pinCode,
    },
    {
      label: "Location:",
      value: address.location,
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={1}
      >
        <IconButton
          onClick={() => {
            props.history.push(routes.dashboard);
          }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => {
            handleViewChange("EDIT_PROFILE");
          }}
        >
          <Edit />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <img
            src={
              profileURL
                ? configRes.imageBaseUrl + venderDetails.companyLOGO
                : "images/profileimage.jpg"
            }
            alt="profileImage"
            width="100"
            height="100"
            style={{
              borderRadius: "50%",
              border: "1px solid #111111",
              padding: "0.3125rem",
              marginBottom: "0.3125rem",
            }}
          />
          <Text sx={{ fontWeight: "500" }}>{venderDetails.vendorName}</Text>
        </Card>
        <Card
          sx={{
            padding: "1rem",
          }}
        >
          <Text sx={{ fontSize: "1.15rem", fontWeight: "600" }} pb={2}>
            Address Details:
          </Text>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={{ xs: 2, sm: 0 }}
          >
            {addressDetails.map((item) => {
              return (
                <RenderKeyValue
                  key={`spocDetails`}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Stack>
        </Card>
        {isSPOCDetailsAvailable ? (
          <Card
            sx={{
              padding: "1rem",
            }}
          >
            <Text sx={{ fontSize: "1.15rem", fontWeight: "600" }} pb={2}>
              Spoc Details:
            </Text>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, sm: 0 }}
            >
              {spocDetailsData.map((item) => {
                return (
                  <RenderKeyValue
                    key={`spocDetails`}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            </Stack>
          </Card>
        ) : null}

{isBankDetailsAvailable ? (
          <Card
            sx={{
              padding: "1rem",
            }}
          >
            <Text sx={{ fontSize: "1.15rem", fontWeight: "600" }} pb={2}>
              Bank Details:
            </Text>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={{ xs: 2, sm: 0 }}
            >
              {bankDetailsData.map((item) => {
                return (
                  <RenderKeyValue
                    key={`bankDetails`}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            </Stack>
          </Card>
        ) : null}



      </Stack>
    </>
  );
};

export default ViewProfile;
