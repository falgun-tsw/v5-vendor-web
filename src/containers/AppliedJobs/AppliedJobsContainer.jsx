import React, { Component } from "react";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Tooltip } from "@mui/material";


import Card from "@app/component/common/Card";
import Stack from "@app/component/common/Stack";
import Table from "@app/component/common/Table";
import Link from "@app/component/common/Link";
import VendorCard from "@app/component/common/VendorCard";
import NoDataAvailable from "@app/component/common/NoDataAvailable";
import constants from "@app/helper/constants";
import { routes } from "src/routes";

const appliedJobColumns = [
  {
    headerText: "Job RefNo",
    field: "jobRefNo",
    bodyCellComponent: (v, d) => (
      <Link
        to={routes.appliedJobsDetails.replace(":id",d.id)}
        sx={{
          textDecoration: "none",
          color: "#000000DE",
        }}
      >
        #{d.jobRefNo}
      </Link>
    ),
  },

  {
    headerText: "Job Title",
    field: "jobTitle",
  },
  {
    headerText: "Created At",
    field: "createdAt",
  },
  {
    headerText: "Status",
    field: "applicationStatus",
    bodyCellComponent: (v, d) => (
      <Chip
        label={constants[d.jobApplicationStatus]?.label}
        color="primary"
        sx={{
          fontSize: "0.8rem",
          fontWeight: "550",
          color: constants[d.jobApplicationStatus]?.color,
          backgroundColor: constants[d.jobApplicationStatus]?.backgroundColor,
          border: `1px solid ${constants[d.jobApplicationStatus]?.color}`

        }}
        variant="outlined"
      />
    ),
  },
  {
    headerText: "",
    field: "",
    bodyCellComponent: (v, d) => (
      <Link  to={routes.appliedJobsDetails.replace(":id",d.id)}>
        <Tooltip title="View">
          <IconButton
            edge="end"
            sx={{
              textDecoration: "none",
            }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Link>
    ),
  },
];
export default class AppliedJobsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationData: {
        page: 0,
        size: 10
      }
    };
  }

  componentDidMount() {
    const { paginationData } = this.state;
    this.props.getAppliedJobs(paginationData);
  }

  handlePageAndRowsChange = (page, size) => {
    const { paginationData } = this.state;
    paginationData.page = page - 1;
    paginationData.size = size;
    this.setState(
      {
        paginationData,
      },
      () => this.props.getAppliedJobs(paginationData)
    );
  };

  render() {
    const { appliedJobList = [], appliedJobLoading, appliedJobsListCount = 0 } = this.props;
    const { paginationData } = this.state;

    if (appliedJobLoading) {
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
        <VendorCard headerTitle="Applied Job">
          {appliedJobList.length ? (
            <Stack pt={1}>
              <Table
                columns={appliedJobColumns}
                data={appliedJobList}
                count={appliedJobsListCount}
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
            </Stack>
          ) : (
            <NoDataAvailable />
          )}
        </VendorCard>
      </>
    );
  }
}
