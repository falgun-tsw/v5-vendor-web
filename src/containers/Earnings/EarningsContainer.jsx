import React, { Component } from "react";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import constants from '@app/helper/constants';
import Card from "@app/component/common/Card";
import Stack from "@app/component/common/Stack";
import Text from "@app/component/common/Text";
import Table from "@app/component/common/Table";
import NoDataAvailable from "@app/component/common/NoDataAvailable";
import VendorCard from "@app/component/common/VendorCard";

const earningsColumns = [
  {
    headerText: "Job RefNo",
    field: "jobRefNo",
    bodyCellComponent: (v, d) => <Text>#{d.jobRefNo}</Text>,
  },
  {
    headerText: "Job Title",
    field: "jobTitle",
  },
  {
    headerText: "Amount Recieved",
    field: "totalEarned",
  },
  {
    headerText: "Hours Worked",
    field: "totalHoursWorked",
  },
  {
    headerText: "Payment Status",
    field: "jobStatus",
    bodyCellComponent: (v, d) => (
        <Chip
          label={d.jobStatus}
          sx={{
            fontSize: "0.8rem",
            fontWeight: "550",
            color: constants[d.jobStatus]?.color,
            backgroundColor: constants[d.jobStatus]?.backgroundColor,
            border: `1px solid ${constants[d.jobStatus]?.color}`,
          }}
          variant="outlined"
        />
      )
  },
];

export default class EarningsContainer extends Component {
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
    this.props.getEarningsList(paginationData);
    this.props.getEarningsStats();
  }

  handlePageAndRowsChange = (page, size) => {
    const { paginationData } = this.state;
    paginationData.page = page - 1;
    paginationData.size = size;
    this.setState(
      {
        paginationData,
      },
      () => this.props.getEarningsList(paginationData)
    );
  };

  render() {
    const {
      jobEarningsList = [],
      jobEarningsLoading,
      earningStats = {},
      jobEarningsListCount = 0
    } = this.props;
    const { totalMoneyEarned, totalHoursWorked } = earningStats;
    const { paginationData } = this.state;
    if (jobEarningsLoading) {
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
          headerTitle="Job Earnings"
          headerRight={
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1 }}
              sx={{
                width: { xs: "auto", sm:"27.8125rem"},
                textAlign: { xs: "center", sm: "right" },
              }}
            >
              <Text sx={{ width: "100%" }}>
                Total Hours Worked: {totalHoursWorked} hr
                {totalHoursWorked > 1 ? "s" : null}
              </Text>
              <Text sx={{ width: "100%" }}>
                Total Earnings: ${totalMoneyEarned}
              </Text>
            </Stack>
          }
        >
          {jobEarningsList.length ? (
            <Stack pt={1}>
              <Table
                columns={earningsColumns}
                data={jobEarningsList}
                count={jobEarningsListCount}
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
      </>
    );
  }
}
