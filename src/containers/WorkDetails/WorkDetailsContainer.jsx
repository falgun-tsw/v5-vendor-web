import React, { Component } from "react";
import _get from "lodash.get";
import Radio from "@mui/material/Radio";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import IconButton from "@app/component/common/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircleIcon from "@mui/icons-material/Circle";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Card from "@app/component/common/Card";
import Stack from "@app/component/common/Stack";
import Text from "@app/component/common/Text";
import TextField from "@app/component/common/TextField";
import Button from "@app/component/common/Button";
import Modal from "@app/component/common/Modal";
import Table from "@app/component/common/Table";
import Link from "@app/component/common/Link";
import RenderBulletPoints from "@app/component/JobManagement/RenderBulletPoints";

import ModuleCard from "@app/component/ModuleCard/ModuleCard";
import { Grid } from "@mui/material";
import RenderJobDetails from "@app/component/common/RenderJobDetails";
import constants from '@app/helper/constants';
import { myWorkApis } from "@app/stores/mywork/myworkApis";
import { routes } from "src/routes";
export default class WorkDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      openWorkDetailsLinks: null,
      assignJobTo: "",
      isLoading: false,
      startWorkForm: { jobUserRemark: "" },
      submitWorkForm: { jobUserRemark: "" },
      paginationData: {
        page: 0,
        size: 10
      }
    };
  }

  componentDidMount() {
    const { paginationData } = this.state;
    const { id } = this.props.match.params;
    this.props.getWorkDetails(id);
    this.props.getVendorUsers(paginationData);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.workDetail?.jobDetails?.client?.id !==
      this.props?.workDetail?.jobDetails?.client?.id
    ) {
      this.props.getScreenBuilderModulesAction(
        this.props?.workDetail?.jobDetails?.client?.id
        );
        
      }
      this.props.setActiveJobId(this.props?.workDetail?.jobId)
  }

  handleJobAssignTo = (id) => {
    this.setState({ assignJobTo: id });
  };

  clearSelection = () => {
    this.setState({
      assignJobTo: "",
    });
  };

  handleAssignJob = async () => {
    const { assignJobTo } = this.state;
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });
    let isJobAssigned = false;
    try {
      const payload = { assignJobTo, candidateID: id };
      const response = await myWorkApis.assginJob(payload);
      if (response) {
        isJobAssigned = true;
        this.props.toastAction({ message: "Job Applied SuccessFully !!" });
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      this.setState({ isLoading: false });
    }
    return isJobAssigned;
  };

  handleToggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleOpen = (e) => {
    this.setState({ openWorkDetailsLinks: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ openWorkDetailsLinks: false });
  };

  handleModalOpen = (key = "") => {
    this.handleToggleModal();
    if(key !== "SUBMIT_WORK"){
      this.handleJobAssignModalOpen();
    }
  };

  handleJobAssignModalOpen = () => {
    this.setState({ openWorkDetailsLinks: false });
    this.props.toggleJobActionModal();
  };

  handleJobAssignModalClose = () => {
    this.props.toggleJobActionModal();
  };

  handleSubmit = async (jobStatus) => {
    this.setState({ isLoading: true });
    const { id } = this.props.match.params;
    const { startWorkForm, submitWorkForm } = this.state;
    if (jobStatus === constants.NEW.value) {
      const isJobAssigned = await this.handleAssignJob();
      if (isJobAssigned) {
        const { jobUserRemark } = startWorkForm;
        const payload = { jobUserRemark };
        try {
          const response = await myWorkApis.startMyWork(payload, id);
          if (response) {
            this.handleToggleModal();
            this.props.getWorkDetails(id);
          }
        } catch (err) {
          console.log("error", err);
        } finally {
          this.setState({ isLoading: false });
        }
      }
    } else if (jobStatus === constants.INPROGRESS.value) {
      const { jobUserRemark } = submitWorkForm;
      const payload = { jobUserRemark };
      try {
        const response = await myWorkApis.submitMyWork(payload, id);
        if (response) {
          this.handleToggleModal();
          this.props.getWorkDetails(id);
        }
      } catch (err) {
        console.log("error", err);
      } finally {
        this.setState({ isLoading: false, openWorkDetailsLinks: false });
      }
    }
  };

  handleChange = (e, jobStatus) => {
    if (jobStatus === constants.NEW.value) {
      this.setState({ startWorkForm: { jobUserRemark: e.target.value } });
    } else if (jobStatus === constants.INPROGRESS.value) {
      this.setState({ submitWorkForm: { jobUserRemark: e.target.value } });
    }
  };

  handleOnActionClick = (key) => {
    if (key === "SUBMIT_WORK") this.handleModalOpen(key);
    if (key === "ASSIGN_JOB") this.handleJobAssignModalOpen(key);
  };

  disableActionButton = (key = "") => {
    const { jobStatus } = this.props.workDetail;
    let isDisable = true;
    if (key === "ASSIGN_JOB") {
      if (jobStatus === constants.NEW.value) {
        isDisable = false;
      }
    }
    if (key === "SUBMIT_WORK") {
      if (jobStatus === constants.INPROGRESS.value) {
        isDisable = false;
      }
    }
    return isDisable;
  };

  handleModulePress = (moduleData) => {
    const { id: mid, subModules, name } = moduleData;
    this.props.history.push({
      pathname: routes.subModule.replace(":id",mid),
      state: {
        mid,
        name,
        subModules,
      },
    });
  };

  handlePageAndRowsChange = (page, size) => {
    const { paginationData } = this.state;
    paginationData.page = page - 1;
    paginationData.size = size;
    this.setState(
      {
        paginationData,
      },
      () => this.props.getVendorUsers(paginationData)
    );
  };



  render() {
    const { modalOpen, assignJobTo, paginationData } = this.state;

    let {
      workDetail,
      workDetailLoading,
      vendorUsersList = [],
      openJobAssignModal,
      screenBuilderModules,
      vendorUsersListCountCount,
      venderUserLoading
    } = this.props;
    const assignedModuleList = screenBuilderModules?.filter((d) => {
      if (workDetail?.jobDetails?.modules !== null) {
        return _get(workDetail?.jobDetails, "modules", []).includes(d.id);
      }
    });

    vendorUsersList = vendorUsersList.filter((fd) => fd.status === "ACTIVE");

    const usersColumns = [
      {
        headerText: "User Name",
        field: "userName",
      },
      {
        headerText: "User Code",
        field: "userCode",
      },
      {
        headerText: "Email",
        field: "email",
      },
      {
        headerText: "Status",
        field: "status",
        bodyCellComponent: (v, d) => (
          <Chip
            label={`${d.status}`}
            color="success"
            disabled={d.status === "InActive" ? true : false}
            sx={{
              fontSize: "0.8rem",
              fontWeight: "550",
              backgroundColor: "#D3FBCA",
            }}
            variant="outlined"
          />
        ),
      },
      {
        headerText: "",
        field: "",
        bodyCellComponent: (v, d) => (
            <Link to={routes.userManagementViewVenderUser.replace(":id",d.id)}>
            <Tooltip title="View">
              <IconButton
                edge="end"
                sx={{
                  textDecoration: "none",
                }}
                onClick={() => {
                  console.log(d);
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Link>
        ),
      },
      {
        headerText: "",
        field: "",
        bodyCellComponent: (v, d) => {
          return (
            <Radio
              onClick={() => {
                assignJobTo === d.id
                  ? this.setState({ assignJobTo: "" })
                  : this.handleJobAssignTo(d.id);
              }}
              checked={assignJobTo === d.id}
            />
          );
        },
      },
    ];

    const {
      jobDetails = {},
      jobStatus,
      amountStatus,
      amountPaid,
      totalEarned,
      totalHoursWorked,
      jobRating,
      jobRatingDescription,
      payerRemark,
      notes,
      jobUserRemark
    } = workDetail;

    const {
      jobRefNo = "",
      jobTitle = "",
      jobShortDescription = "",
      skill = [],
      deliverables = [],
      jobDescription = "",
      client = {}
    } = jobDetails;

    const billingData = {
      title: "Billing:",
      data: [
        {
          label:"Total money earned -",
          value:`$${totalEarned}`
        },
        {
          label:"Total paid -",
          value:`$${amountPaid}`
        },
        {
          label:"Total hours worked -",
          value:`${totalHoursWorked}`
        },
      ],
    };

    if(jobStatus === constants.CLOSED.value) {
      billingData.data.push({label: "Payment status  -",value: `${amountStatus}`})
      billingData.data.push({label: "Payer remark  -",value: `${payerRemark}`})
    }

    if (workDetailLoading || venderUserLoading) {
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
            View Work
          </Text>
        </Stack>
        <Card
          sx={{
            padding: "1rem",
            marginTop: "1rem",
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
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
              <Chip
                label={constants[jobStatus]?.label}
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: "550",
                  color: constants[jobStatus]?.color,
                  backgroundColor: constants[jobStatus]?.backgroundColor,
                  border:  `1px solid ${constants[jobStatus]?.color}`
                }}
                variant="outlined"
              />
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
            <Stack>
              <RenderBulletPoints title="Deliverables :" data={deliverables} />
            </Stack>
            <Stack
              direction={{ xs:"column", sm: "row" }}
              spacing={2}
              mt={3}
              sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}
            >
              {[constants.INPROGRESS.value, constants.NEW.value].includes(jobStatus) && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => this.handleOnActionClick("ASSIGN_JOB")}
                  sx={{ width: "100%" }}
                >
                  Assign Job
                </Button>
              )}
              {jobStatus === constants.INPROGRESS.value && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => this.handleOnActionClick("SUBMIT_WORK")}
                  sx={{ width: "100%" }}
                >
                  Submit Work
                </Button>
              )}
            </Stack>
          </Stack>
          <Stack
            p={2}
            sx={{
              width: { sm: "100%", md: "40%" },
              height: "100%",
            }}
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
            <Stack pt={2} flexDirection="row" justifyContent="space-between">
              <Stack justifyContent="flex-start">
                <RenderJobDetails
                  title={billingData.title}
                  data={billingData.data}
                  sxData={billingData.sxData}
                />
              </Stack>
              {jobStatus === constants.CLOSED.value ? (
                <Stack justifyContent="flex-start">
                  <Chip
                    label={amountStatus}
                    color="success"
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: "550",
                    }}
                    variant="outlined"
                  />
                </Stack>
              ) : null}
            </Stack>
            <Stack pt={2} direction="column" justifyContent="space-between">
              <Text sx={{ color: "#206BCD", width: "100%" }}>
                Work instructions:
              </Text>
              <Text sx={{ fontSize: "1rem", color: "#5A5A5C" }}>{notes}</Text>
            </Stack>
            <Stack pt={2} direction="column" justifyContent="space-between">
              <Text sx={{ color: "#206BCD", width: "100%" }}>User remark:</Text>
              <Text sx={{ fontSize: "1rem", color: "#5A5A5C" }}>
                {jobUserRemark}
              </Text>
            </Stack>
            {jobStatus === constants.CLOSED.value ? (
              <>
                <Stack
                  pt={2}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Text
                    sx={{
                      color: "#206BCD"
                    }}
                  >
                    Rating:
                  </Text>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <StarBorderOutlinedIcon
                      sx={{ color: "#F7B645", paddingRight: "0.3125rem" }}
                    />
                    <Text sx={{ fontSize: "1rem" }}>{jobRating}</Text>
                  </Stack>
                </Stack>
                <Text sx={{ fontSize: "1rem", color: "#5A5A5C" }}>
                  {jobRatingDescription}
                </Text>
              </>
            ) : null}
          </Stack>
        </Card>
        <Modal
          open={openJobAssignModal}
          onClose={this.handleJobAssignModalClose}
          size="lg"
          disableClose
        >
          <Text
            pb={1}
            sx={{ fontWeight: "600", fontSize: "1.2rem", textAlign: "center" }}
          >
            Select Users To Assign Job To
          </Text>
          <Table
            columns={usersColumns}
            data={vendorUsersList}
            count={vendorUsersListCountCount}
            onPageChange={(page, size) =>
              this.handlePageAndRowsChange(page, size)
            }
            onRowsPerPageChange={(page, size) =>
              this.handlePageAndRowsChange(page, size)
            }
            rowsPerPage={paginationData.size}
            page={paginationData.page}
            paginationBottom
          />
          <Stack
            p={2}
            direction={{ xs: "row" }}
            spacing={{ xs: 1, sm: 1 }}
            alignItems="space-around"
          >
            <Button
              type="reset"
              variant="contained"
              size="small"
              color="secondary"
              onClick={(e) => {
                this.clearSelection();
              }}
              sx={{ width: "50%", height: "2.5rem" }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={(e) => {
                this.handleModalOpen();
              }}
              sx={{ width: "50%", height: "2.5rem" }}
            >
              Assign
            </Button>
          </Stack>
        </Modal>
        <Modal
          open={modalOpen}
          size="sm"
          disableClose
          onClose={this.handleToggleModal}
        >
          <Text
            sx={{ fontWeight: "600", fontSize: "1.2rem", textAlign: "center" }}
          >
            Do you want to add some user note before
            {jobStatus === constants.NEW.value ? " starting" : " submitting"} the work?
          </Text>
          <Stack
            component="form"
            method="post"
            pt={3}
            alignItems="center"
            spacing={2}
          >
            <TextField
              multiline
              name="jobUserRemark"
              label="Job User Remark"
              onChange={(e) => {
                this.handleChange(e, jobStatus);
              }}
            />
            <Button
              sx={{ width: "40%" }}
              onClick={() => {
                this.handleSubmit(jobStatus);
              }}
            >
              Submit
            </Button>
          </Stack>
        </Modal>
        <Card sx={{ padding: "1rem", marginTop: "1rem" }}>
          <Grid container>
            {assignedModuleList && assignedModuleList.length ? (
              assignedModuleList.map((moduleData, i) => {
                return (
                  <Grid item xs={6} sm={6} md={2} lg={2} key={moduleData.id}>
                    <ModuleCard
                      moduleData={moduleData}
                      handleOnModulePress={() =>
                        this.handleModulePress(moduleData)
                      }
                    />
                  </Grid>
                );
              })
            ) : (
              <div>No Modules Available!</div>
            )}
          </Grid>
        </Card>
      </>
    );
  }
}
