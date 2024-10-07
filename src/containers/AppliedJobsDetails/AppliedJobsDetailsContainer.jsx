import React, { Component } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import IconButton from "@app/component/common/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import Card from "@app/component/common/Card";
import Stack from "@app/component/common/Stack";
import Text from "@app/component/common/Text";
import Button from "@app/component/common/Button";
import Modal from "@app/component/common/Modal";
import TextField from "@app/component/common/TextField";
import RenderJobDetails from "@app/component/common/RenderJobDetails";
import RenderBulletPoints from "@app/component/JobManagement/RenderBulletPoints";
import constants from '@app/helper/constants';
import { jobManagementApis } from "@app/stores/JobManagement/jobManagementApis";

export default class AppliedJobsDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApplyJobModal: false,
      userNote: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getAppliedJobsDetails(id);
  }

  handleUnapplyJob = async () => {
    const { userNote } = this.state;
    const { id } = this.props.match.params;
    try {
      const response = await jobManagementApis.unapplyJob({id, userNote});
      if (response) {
        this.props.getAppliedJobsDetails(id);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  toggleApplyJobModal = () => {
    this.setState({ showApplyJobModal: !this.state.showApplyJobModal });
    this.clearUserNote();
  };
  handleUserNote = (e) => {
    this.setState({ userNote: e.target.value });
  };
  clearUserNote = () => {
    this.setState({ userNote: "" });
  };
  render() {
    const { appliedJobDetails = {}, appliedJobDetailsLoading = {} } =
      this.props;
    const {
      jobApplicant: {
        jobTitle,
        jobApplicationStatus,
        jobApplicationAt = "",
        userNote,
        jobAplicationStatusReason,
      } = {},
      jobDetail: {
        jobShortDescription,
        jobApplicantStatus,
        skill = [],
        highlights = [],
        deliverables = [],
        jobType,
        projectType,
        client = {},
        address = {},
        jobTiming = {},
        billing = {},
        jobVisibility = {},
        jobRefNo,
        jobDescription
      } = {},
    } = appliedJobDetails;

    const jobTimingData = {
      title: "Job Timing:",
      data: [
        {
          label: "Hours Required -",
          value: `${jobTiming.hourRequired}Hrs/${jobTiming.hourRequiredPer}`,
        },
        {
          label: "Total Duration -",
          value: `${jobTiming.durationOfWork} ${jobTiming.durationOfWorkType}`,
        },
        {
          label: "Shift time -",
          value: `${jobTiming.shiftStartTime} - ${jobTiming.shiftEndTime} PM`,
        },
        {
          label: "Job days -",
          value: `${jobTiming.jobDays}`,
        },
      ],
      sxData: { flexDirection: "column", justifyContent: "flex-start" }
    };

    const jobVisibilitydata = {
      title: "Job Visibility:",
      data: [
        {
          label: "Visibility Type -",
          value: `${jobVisibility.visibilityType}`,
        },
        {
          label: "Visibility Value -",
          value: `${jobVisibility.visibilityValue}`,
        },
      ],
      sxData: { flexDirection: "row", justifyContent: "space-between" }
    };

    const applicationStatusData = {
      title: "Application status:",
      data: [
        {
          label: "Application status -",
          value: `${constants[jobApplicationStatus]?.label}`,
        },
        {
          label: "Applied at  -",
          value: `${jobApplicationAt.split("T")[0]}`,
        },
        {
          label: "Reason -",
          value: `${jobAplicationStatusReason}`,
        },
        {
          label: "User Note  -",
          value: `${userNote}`,
        },
      ],
      sxData: { flexDirection: "column", justifyContent: "flex-start" }
    };

    const Address = `${address.location}, ${address.city}, ${address.state},
    ${address.country}, ${address.pinCode}`;

    if (appliedJobDetailsLoading) {
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
        <Stack direction="row" alignItems="center" pt={2}>
          <IconButton
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Text sx={{ color: "#0000008a", fontWeight: "500 !important" }}>
            View Job
          </Text>
        </Stack>
        <Card
          sx={{
            padding: "1rem",
            marginTop: "1rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Stack
            p={2}
            sx={{ width: { sm: "100%", md: "60%" }, height: "100%" }}
          >
            <Stack
              direction={{ xs: "row" }}
              justifyContent="flex-start"
              alignItems="center"
              spacing={{ xs: 2 }}
            >
              <Text sx={{ fontSize: "0.9rem", color: "#333333" }}>
                #{jobRefNo}
              </Text>
              <Stack direction="row" spacing={1}>
                <Chip
                  label={jobType}
                  color="success"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: "550",
                  }}
                  variant="outlined"
                />

                <Chip
                  label={projectType}
                  color="primary"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: "550",
                  }}
                  variant="outlined"
                />
              </Stack>
            </Stack>
            <Text
              sx={{
                fontWeight: "600",
                fontSize: "1.3rem",
                color: "#262626",
              }}
              pt={1}
            >
              {jobTitle}
            </Text>
            <Text
              pt={1}
              sx={{
                fontSize: "1rem",
                color: "#333333",
              }}
              dangerouslySetInnerHTML={{ __html: `${jobDescription ? jobDescription : jobShortDescription}` }}
            >
            </Text>
            <Stack pt={1} direction="row" flexWrap="wrap">
              {skill.map((skill, index) => {
                
                return (
                  <Text
                  key={skill.id}
                    mr={3}
                    color="primary"
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: "400",
                      color: "#2B70C5",
                    }}
                  >
                    <CircleIcon
                      sx={{
                        fontSize: "0.375rem",
                        marginRight: "0.625rem",
                        color: "#2B70C5",
                      }}
                    />
                    {skill.name}
                  </Text>
                );
              })}
            </Stack>
            <Stack pt={2}>
              <RenderBulletPoints title="Job highlights :" data={highlights} />
            </Stack>
            <Stack pt={2}>
              <RenderBulletPoints title="Deliverables :" data={deliverables} />
            </Stack>

            <Stack
              spacing={1}
              alignItems="flex-start"
              pt={3}
              direction={{ xs: "row", sm: "row", md: "column" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <DateRangeOutlinedIcon
                  sx={{
                    fontSize: "1.3rem",
                    color: "#4d4d4d",
                  }}
                />

                <Text sx={{ fontSize: "0.8rem", color: "#4d4d4d" }}>
                  {jobTiming.durationOfWork} {jobTiming.durationOfWorkType}
                </Text>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <UpdateOutlinedIcon
                  sx={{
                    fontSize: "1.3rem",
                    color: "#4d4d4d",
                  }}
                />

                <Text sx={{ fontSize: "0.8rem", color: "#4d4d4d" }}>
                  {jobTiming.hourRequired} Hrs/{jobTiming.hourRequiredPer}
                </Text>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PriceChangeOutlinedIcon
                  sx={{
                    fontSize: "1.3rem",
                    color: "#4d4d4d",
                  }}
                />

                <Text sx={{ fontSize: "0.8rem", color: "#4d4d4d" }}>
                  ${billing.number}/{billing.type}
                </Text>
              </Stack>
            </Stack>

            <Stack pt={3} pb={3}>
              <Text
                sx={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  color: "#333333",
                }}
              >
                Address:
              </Text>
              <Text sx={{ fontSize: "0.85rem", paddingTop: "0.3rem" }}>
                {Address}
              </Text>
            </Stack>
            {jobApplicantStatus === "NEW" ? (
              <Stack direction="row" spacing={2} mt={3} sx={{ width: { xs: "100%", sm: "100%", md: "50%" }}}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "0.5rem",
                    textTransform: "capitalize",
                    padding: "0.3rem 1.7rem",
                    fontSize: "1.2rem",
                    backgroundColor: "#515151 !important",
                    width: { xs: "100%", sm: "50%", md: "100%" },
                  }}
                  onClick={this.handleUnapplyJob}
                >
                  Unapply
                </Button>
              </Stack>
            ) : null}
          </Stack>
          <Stack
            p={2}
            sx={{ width: { sm: "100%", md: "40%" }, height: "100%" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={
                  client.clientLogo
                    ? client.clientLogo
                    : "/images/userprofile.svg"
                }
                alt="back"
                style={{ width: "55px", height: "55px", borderRadius: "50%" }}
              />
              <Stack>
                <Text sx={{ fontSize: "0.7rem", color: "#5A5A5C" }}>
                  #{client.clientId}
                </Text>
                <Text
                  sx={{
                    fontSize: "1.1rem",
                    color: "#5A5A5C",
                    fontWeight: "550",
                  }}
                >
                  {client.clientName}
                </Text>
              </Stack>
            </Stack>
            <Stack pt={2}>
              <RenderJobDetails sxData={jobTimingData.sxData} title={jobTimingData.title} data={jobTimingData.data} />
            </Stack>
            <Stack pt={2}>
                <Text sx={{ color: "#206BCD" }}>Job billing:</Text>
                  <Text
                    sx={{ fontSize: "0.9rem", color: "#5A5A5C" }}
                    pt={1}
                  >{`${billing.number} $ ${billing.type}`}</Text>
            </Stack>
            <Stack pt={2}>
              <RenderJobDetails sxData={jobVisibilitydata.sxData} title={jobVisibilitydata.title} data={jobVisibilitydata.data} />
            </Stack>
            <Stack pt={2}>
              <RenderJobDetails sxData={applicationStatusData.sxData} title={applicationStatusData.title} data={applicationStatusData.data} />
            </Stack>
          </Stack>

          <Modal
            open={this.state.showApplyJobModal}
            onClose={this.toggleApplyJobModal}
            disableClose
          >
            <Stack component="form" method="post">
              <Text
                sx={{
                  fontSize: "1rem",
                  fontWeight: "550",
                  textAlign: "center",
                }}
              >
                Are you sure you want to unapply on this job?
              </Text>
              <TextField
                sx={{ marginTop: "1rem" }}
                multiline
                name="userNote"
                label="User Note"
                onChange={(e) => {
                  this.handleUserNote(e);
                }}
              />
              <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                <Button
                  type="reset"
                  variant="contained"
                  size="small"
                  color="secondary"
                  sx={{ width: "10rem" }}
                  onClick={() => {
                    this.toggleApplyJobModal();
                    this.clearUserNote();
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    this.handleUnapplyJob();
                  }}
                  sx={{ width: "10rem" }}
                >
                  Unapply
                </Button>
              </Stack>
            </Stack>
          </Modal>
        </Card>
      </>
    );
  }
}
