import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Stack from "@app/component/common/Stack";
import Card from "@app/component/common/Card";
import Button from "@app/component/common/Button";
import Grid from "@app/component/common/Grid";
import UsersJobsAnalysisChart from '@app/component/Dashboard/UsersJobsAnalysisChart';

const earningOptions = {
  title: {
    text: "",
  },

  legend: {
    enabled: false,
  },
  subTitle: {
    text: "",
  },
  credits: { enabled: false },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  series: [
    {
      data: [],
      showInLegend: "false",
    },
  ],
};

const userOptions = {
  title: {
    text: "",
  },

  subTitle: {
    text: "",
  },
  credits: { enabled: false },
  legend: {
    enabled: false,
  },

  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  series: [
    {
      data: [],
    },
  ],
};

const jobOptions = {
  title: {
    text: "",
  },

  legend: {
    enabled: false,
  },
  subTitle: {
    text: "",
  },
  credits: { enabled: false },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  series: [
    {
      data: [],
      showInLegend: "false",
    },
  ],
};
export default class ReportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
    };
  }

  componentDidMount() {
    const { year } = this.state;
    this.props.getEarningStats(year);
    this.props.getUserStats();
    this.props.getJobStats();
  }

  handleChangeYear = (e) => {
    this.setState({ year: e.target.value });
  };

  handleGenerateReport = () => {
    this.props.getEarningStats();
    this.props.getUserStats();
    this.props.getJobStats();
  };

  render() {
    const { year } = this.state;
    const {
      earningStats,
      earningStatsLoading,
      userStats,
      jobStats,
      userStatsLoading,
      jobStatsLoading,
    } = this.props;


    earningOptions.xAxis.categories = earningStats.map((item, i) => {
      return item.month;
    });

    earningOptions.series[0].data = earningStats.map((item, i) => {
      return item.amount;
    });

    userOptions.xAxis.categories = userStats.map((item, i) => {
      return item.month;
    });

    userOptions.series[0].data = userStats.map((item, i) => {
      return item.count;
    });

    jobOptions.xAxis.categories = jobStats.map((item, i) => {
      return item.month;
    });

    jobOptions.series[0].data = jobStats.map((item, i) => {
      return item.count;
    });

    if (userStatsLoading || jobStatsLoading || earningStatsLoading) {
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
      <Card sx={{ padding: "1rem", marginTop: "1rem" }}>
        <Stack>
          <h3>Reports</h3>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={{ xs: 2, sm: 0 }}
          >
            <Stack
              pt={3}
              spacing={2}
              sx={{ width: { xs: "100%", sm: "50%", md: "30%" } }}
            >
              <FormControl size="small">
                <InputLabel id="select-year">Year</InputLabel>
                <Select
                  labelId="select-year"
                  name="year"
                  value={year}
                  label="Year"
                  onChange={this.handleChangeYear}
                >
                  <MenuItem value={year}>{year}</MenuItem>
                </Select>
              </FormControl>
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "550",
                  backgroundColor: "#59b300 !important",
                }}
                size="small"
                onClick={() => this.handleGenerateReport()}
              >
                Generate Report
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Grid container pt={3} spacing={4}>
          <UsersJobsAnalysisChart
            chartName="Users"
            chartOptions={userOptions}
            exportToCsv={false}
          />
          <UsersJobsAnalysisChart
            chartName="Jobs"
            chartOptions={jobOptions}
            exportToCsv={false}
          />
          <UsersJobsAnalysisChart
            chartName="Earnings"
            chartOptions={earningOptions}
            exportToCsv={false}
          />
        </Grid>
      </Card>
    );
  }
}
