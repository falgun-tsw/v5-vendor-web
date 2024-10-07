import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack from "@app/component/common/Stack";
import Table from "@app/component/common/Table";
import Link from "@app/component/common/Link";
import VendorCard from "@app/component/common/VendorCard";
import NoDataAvailable from "@app/component/common/NoDataAvailable";
import constants from "@app/helper/constants";
import { routes } from "src/routes";

const myworkColumns = [
  {
    headerText: "Job RefNo",
    field: "jobRefNo",
    bodyCellComponent: (v, d) => (
      <Link
        to={routes.myWorkDetails.replace(":id",d.id)}
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
    headerText: "Total Hours Worked",
    field: "totalHoursWorked",
  },
  {
    headerText: "Created At",
    field: "createdAt",
  },
  {
    headerText: "Job Status",
    field: "jobStatus",
    bodyCellComponent: (v, d) => {
      return (
        <Chip
          label={constants[d.jobStatus]?.label}
          sx={{
            fontSize: "0.8rem",
            fontWeight: "550",
            color: constants[d.jobStatus]?.color,
            backgroundColor: constants[d.jobStatus]?.backgroundColor,
            border: `1px solid ${constants[d.jobStatus]?.color}`
          }}
          variant="outlined"
        />
      );
    },
  },
  {
    headerText: "",
    field: "",
    bodyCellComponent: (v, d) => (
      <Link  to={routes.myWorkDetails.replace(":id",d.id)}>
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

export default class MyWorkContainer extends Component {
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
    this.props.getMyWorkList(paginationData);
  }

  handlePageAndRowsChange = (page, size) => {
    const { paginationData } = this.state;
    paginationData.page = page - 1;
    paginationData.size = size;
    this.setState(
      {
        paginationData,
      },
      () => this.props.getMyWorkList(paginationData)
    );
  };

  render() {
    const { myworkList = [], myworkLoading = 0, workListCount = 0 } = this.props;
    const { paginationData } = this.state;

    if (myworkLoading) {
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
      <VendorCard headerTitle="Worked">
        {myworkList.length ? (
          <Stack pt={1}>
            <Table
              columns={myworkColumns}
              data={myworkList}
              count={workListCount}
              onPageChange={(page,size) => this.handlePageAndRowsChange(page,size)}
              onRowsPerPageChange={(page,size) => this.handlePageAndRowsChange(page,size)}
              rowsPerPage={paginationData.size}
              page={paginationData.page}
              paginationBottom
            />
          </Stack>
        ) : (
          <NoDataAvailable />
        )}
      </VendorCard>
    );
  }
}
