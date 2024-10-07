import React from "react";
import Stack from "../common/Stack";
import Card from "../common/Card";
import Text from "../common/Text";
import Button from "../common/Button";
import RenderForm from "../common/RenderForm";
import IconButton from "@app/component/common/IconButton";
import { config } from "@app/config/index";
import { ArrowBack } from "@mui/icons-material/";

const configRes = config();

const EditProfile = ({
  profileData = {},
  handleViewChange,
  addressFromData,
  spocDetailFormData,
  bankDetailFormData,
  handleSubmit,
  isLoading,
  ...props
}) => {
  const { venderDetails = {}, profileURL, spocDetail = {} , bankDetail = {} } = profileData;

  const isSPOCDetailsAvailable =
    spocDetail.name ||
    spocDetail.email ||
    spocDetail.mobile ||
    spocDetail.designation;

    const isBankDetailsAvailable = 
    bankDetail.accountHolderName || 
    bankDetail.accountNumber ||
    bankDetail.bankName || 
    bankDetail.branch || 
    bankDetail.ifscCode;
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        pb={1}
      >
        <IconButton
          onClick={() => {
            handleViewChange("VIEW_PROFILE");
          }}
        >
          <ArrowBack />
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
          <RenderForm data={addressFromData} />
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
            <RenderForm data={spocDetailFormData} />
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
            <RenderForm data={bankDetailFormData} />
          </Card>
        ) : null}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={4} spacing={3}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            sx={{ width: "10rem" }}
            onClick={() => {
              handleViewChange("VIEW_PROFILE");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSubmit();
            }}
            sx={{ width: "10rem" }}
            loading={isLoading}
          >
            Save Changes
          </Button>
        </Stack>
    </>
  );
};

export default EditProfile;
