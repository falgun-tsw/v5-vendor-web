import React, { Component } from "react";
import { CircularProgress, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import _get from "lodash/get";
import Button from "@app/component/common/Button";
import Card from "@app/component/common/Card";
import Modal from "@app/component/common/Modal";
import Stack from "@app/component/common/Stack";
import Grid from "@app/component/common/Grid";
import IconButton from "@app/component/common/IconButton";
import RenderForm from "@app/component/common/RenderForm";
import NoDataAvailable from "@app/component/common/NoDataAvailable";
import RaiseDisputeCard from "@app/component/RaiseDispute/RaiseDisputeCard";
import VendorCard from "@app/component/common/VendorCard";
import Text from "@app/component/common/Text";
import constants from "@app/helper/constants";
import { dateTimeHelper } from "@app/helper/dateTime";
import { validationHelper } from "@app/helper/validation";
import { raiseDisputeApis } from "@app/stores/raiseDispute/raiseDisputeApis";

const screens = {
  LIST_DISPUTE: "LIST_DISPUTE",
  VIEW_DISPUTE: "VIEW_DISPUTE",
};

const RenderDetails = ({ title, value }) => {
  return (
    <Stack pt={1}>
      <Text sx={{ color: "#206BCD" }}>{title}</Text>
      <Text sx={{ fontSize: "1rem", fontWeight: "400" }}>{value}</Text>
    </Stack>
  );
};

export default class RaiseDisputeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: screens.LIST_DISPUTE,
      openRaiseDisputeModal: false,
      form: {
        disputeCategory: "",
        job: "",
        title: "",
        description: "",
      },
      formError: {
        disputeCategory: "",
        job: "",
        title: "",
        description: "",
      },
      isLoading: 0,
      disputeDetails: {},
    };
  }

  componentDidMount() {
    this.props.fetchMyWorkList();
    this.props.fetchDisputeList();
    this.props.fetchDisputeCategories();
  }

  toggleRaiseDisputeModal = () => {
    this.setState(
      { openRaiseDisputeModal: !this.state.openRaiseDisputeModal },
      () => {
        if (!this.state.openRaiseDisputeModal) this.resetForm();
      }
    );
  };

  handleValidation = () => {
    const { form, formError } = this.state;
    let errorCount = 0;
    let disputeCategory = validationHelper.required(form.disputeCategory);
    let job = validationHelper.required(form.job);
    let title = validationHelper.required(form.title);
    let description = validationHelper.required(form.description);
    if (!disputeCategory.isValid) {
      errorCount++;
      formError.disputeCategory = disputeCategory.message;
    } else {
      formError.disputeCategory = "";
    }
    if (!job.isValid) {
      errorCount++;
      formError.job = job.message;
    } else {
      formError.job = "";
    }
    if (!title.isValid) {
      errorCount++;
      formError.title = title.message;
    } else {
      formError.title = "";
    }
    if (!description.isValid) {
      errorCount++;
      formError.description = description.message;
    } else {
      formError.description = "";
    }
    this.setState({ formError });
    return errorCount;
  };

  handleRaiseDispute = async () => {
    const { form } = this.state;
    const {
      myWorkList: { myworkList = [] },
      raiseDispute: { disputeCategoryList = [] },
    } = this.props;
    if (this.handleValidation() > 0) {
      return;
    }
    this.setState({ isLoading: 1 });
    try {
      const disputeCategoryId = disputeCategoryList.filter(
        (fd) => fd.disputeCategoryName === form.disputeCategory
      );
      const jobCandidateId = myworkList.filter(
        (fd) => fd.jobTitle === form.job
      );
      const payload = {
        jobCandidateId: jobCandidateId[0].id,
        disputeCategoryId: disputeCategoryId[0].id,
        disputeTitle: form.title,
        disputeName: disputeCategoryId[0].disputeCategoryName,
        disputeDescription: form.description,
      };
      const res = await raiseDisputeApis.raiseDispute(payload);
      if (res) {
        this.props.setToast({ message: res.message });
        this.props.fetchDisputeList();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      this.setState({ isLoading: 0, openRaiseDisputeModal: false });
      this.resetForm();
    }
  };

  handleFormChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  };

  handleCardPress = (data) => {
    this.setState({ activeScreen: screens.VIEW_DISPUTE, disputeDetails: data });
  };

  resetForm = () => {
    this.setState({
      form: {
        disputeCategory: "",
        job: "",
        title: "",
        description: "",
      },
      formError: {
        disputeCategory: "",
        job: "",
        title: "",
        description: "",
      },
    });
  };

  render() {
    const {
      openRaiseDisputeModal,
      form,
      activeScreen,
      disputeDetails,
      isLoading,
      formError,
    } = this.state;
    const {
      myWorkList: {
        myworkList = [],
        loading: { mywork: myWorkLoading },
      },
      raiseDispute: {
        disputeList = [],
        disputeCategoryList = [],
        isLoading: {
          disputeList: disputeListLoading,
          disputeCategoryList: disputeCategoryListLoading,
        },
      },
    } = this.props;

    const selectJobMenuData = [];
    const selectDisputeCategoryMenuData = [];

    myworkList.forEach((item) => {
      selectJobMenuData.push({
        label: item.jobTitle,
        value: item.jobTitle,
      });
    });

    disputeCategoryList.forEach((item) => {
      selectDisputeCategoryMenuData.push({
        label: item.disputeCategoryName,
        value: item.disputeCategoryName,
      });
    });

    const disputeCategoryData = disputeCategoryList.find((item) => {
      return (
        `${item.id}`.toLowerCase() ===
        `${disputeDetails.disputeCategoryId}`.toLowerCase()
      );
    });

    const disputeCategoryName = _get(
      disputeCategoryData,
      "disputeCategoryName",
      ""
    );

    const formData = [
      {
        type: "dropdown",
        fullWidth: true,
        InputLabel: "select Dispute Category",
        label: "select Dispute Category",
        value: form.disputeCategory,
        onChange: (e) =>
          this.handleFormChange("disputeCategory", e.target.value),
        MenuItem: selectDisputeCategoryMenuData,
        gridSize: { xs: 12, sm: 12, md: 12 },
        required: true,
        error: formError.disputeCategory,
        helperText: formError.disputeCategory,
      },
      {
        type: "dropdown",
        fullWidth: true,
        InputLabel: "select Job",
        label: "select Job",
        value: form.job,
        onChange: (e) => this.handleFormChange("job", e.target.value),
        MenuItem: selectJobMenuData,
        gridSize: { xs: 12, sm: 12, md: 12 },
        required: true,
        error: formError.job,
        helperText: formError.job,
      },
      {
        fullWidth: true,
        label: "Title",
        value: form.title,
        gridSize: { xs: 12, sm: 12, md: 12 },
        onChange: (e) => this.handleFormChange("title", e.target.value),
        required: true,
        error: formError.title,
        helperText: formError.title,
      },
      {
        fullWidth: true,
        label: "Description",
        value: form.description,
        gridSize: { xs: 12, sm: 12, md: 12 },
        onChange: (e) => this.handleFormChange("description", e.target.value),
        multiline: true,
        rows: 4,
        required: true,
        error: formError.description,
        helperText: formError.description,
      },
    ];

    const details = [
      {
        keyIndex: 0,
        title: "Dispute Category:",
        value: `${disputeCategoryName || "NA"}`,
      },
      {
        keyIndex: 1,
        title: "Dispute Title:",
        value: `${disputeDetails.disputeTitle}`,
      },
      {
        keyIndex: 2,
        title: "Description:",
        value: `${disputeDetails.disputeDescription}`,
      },
      {
        keyIndex: 3,
        title: "Raised At:",
        value: `${
          dateTimeHelper.displayDate(disputeDetails.createdAt) || "NA"
        }`,
      },
      {
        keyIndex: 4,
        title: "Closed Remark:",
        value: `${disputeDetails.closedAt || "NA"}`,
      },
    ];

    if (myWorkLoading || disputeListLoading || disputeCategoryListLoading) {
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
        <VendorCard
          headerTitle="Raise Dispute"
          headerRight={
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.toggleRaiseDisputeModal()}
              size="small"
            >
              Raise Dispute
            </Button>
          }
        >
          {activeScreen === screens.LIST_DISPUTE ? (
            disputeList.length ? (
              <Stack pt={2}>
                {disputeList.map((item, index) => (
                  <RaiseDisputeCard
                    key={item.id}
                    disputeRefNo={item.disputeRefNo}
                    disputeTitle={item.disputeTitle}
                    createdAt={item.createdAt}
                    disputeStatus={item.disputeStatus}
                    onPress={() => this.handleCardPress(item)}
                  />
                ))}
              </Stack>
            ) : (
              <NoDataAvailable infoText="No Dispute Available" />
            )
          ) : (
            <Stack pb={2}>
              <Stack direction="row" justifyContent="flex-start">
                <IconButton
                  onClick={() =>
                    this.setState({ activeScreen: screens.LIST_DISPUTE })
                  }
                >
                  <ArrowBackIcon />
                </IconButton>
              </Stack>
              <Stack p={2}>
                <Stack direction="row" alignItems="center" pb={1} spacing={2}>
                  <Text sx={{ fontSize: "0.9rem", color: "#333333" }}>
                    #{disputeDetails.disputeRefNo}
                  </Text>
                  <Chip
                    label={constants[disputeDetails.disputeStatus]?.label}
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: "550",
                      color: constants[disputeDetails.disputeStatus]?.color,
                      backgroundColor:
                        constants[disputeDetails.disputeStatus]
                          ?.backgroundColor,
                      border: `1px solid ${
                        constants[disputeDetails.disputeStatus]?.color
                      }`,
                    }}
                    variant="outlined"
                  />
                </Stack>
                {details.map((item) => (
                  <RenderDetails
                    key={item.keyIndex}
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </VendorCard>
        <Modal
          open={openRaiseDisputeModal}
          onClose={this.toggleRaiseDisputeModal}
          disableClose
          size="md"
          sxForBody={{ padding: "0" }}
        >
          <Grid container spacing={2}>
            <Grid
              items
              sm={4}
              md={5}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <div style={{ maxHeight: "32.0625rem", overflow: "hidden" }}>
                <img
                  alt="Raise Dispute"
                  src="/images/raiseDispute.png"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={7}
              sx={{
                padding: { sm: "0px !important" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack p={2}>
                <Stack direction="row" justifyContent="flex-end">
                  <IconButton onClick={() => this.toggleRaiseDisputeModal()}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
                <Stack>
                  <RenderForm data={formData} />
                  <Stack pt={2} direction="row" justifyContent="center">
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      loading={isLoading}
                      onClick={() => this.handleRaiseDispute()}
                      sx={{ width: "10rem", height: "2.5rem" }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Modal>
      </>
    );
  }
}
