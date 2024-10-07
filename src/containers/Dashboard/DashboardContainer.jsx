import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@app/component/common/Stack";
import Box from "@app/component/common/Box";
import RenderKeyValue from "@app/component/common/RenderKeyValue";
import Grid from "@app/component/common/Grid";
import StatsCard from "@app/component/Dashboard/StatsCard";
import UsersJobsAnalysisChart from "@app/component/Dashboard/UsersJobsAnalysisChart";

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

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProfile();
    this.props.getDashboardStats();
    this.props.getUserStats();
    this.props.getJobStats();
  }

  render() {
    const {
      profileLoading,
      loginProfileData,
      dashboardStats = {},
      dashboardLoading,
      userStats = [],
      jobStats = [],
      userStatsLoading,
      jobStatsLoading,
    } = this.props;

    const {
      totalJobs,
      totalUsers,
      totalCompletedJobs,
      totalJobsInprogress,
      activeUsers,
      inActiveUsers,
    } = dashboardStats;

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

    const statsData = [
      { id: 1, count: totalJobs, label: "No. of jobs" },
      { id: 3, count: totalCompletedJobs, label: "Completed jobs" },
      { id: 4, count: totalJobsInprogress, label: "Job in progress" },
      { id: 2, count: totalUsers, label: "No. of users" },
      { id: 5, count: activeUsers, label: "Active users" },
      { id: 6, count: inActiveUsers, label: "Inactive users" },
    ];

    if (
      profileLoading ||
      dashboardLoading ||
      userStatsLoading ||
      jobStatsLoading
    ) {
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
      <Stack mt={3}>
        <Stack>
          <Box>
            <RenderKeyValue
              label="Welcome Back,"
              value={loginProfileData.firstName}
              sxForLabel={{ fontWeight: "normal", fontSize: "1.25rem" }}
              sxForValue={{ fontWeight: "bold", fontSize: "1.25rem" }}
            />
          </Box>
          <Grid container spacing={1} py={2}>
            <StatsCard data={statsData} />
          </Grid>
        </Stack>

        <Grid container pt={1} spacing={4}>
          <UsersJobsAnalysisChart
            chartName="Jobs"
            chartOptions={jobOptions}
            exportToCsv={false}
          />
          <UsersJobsAnalysisChart
            chartName="Users"
            chartOptions={userOptions}
            exportToCsv={false}
          />
        </Grid>
      </Stack>
    );
  }
}

export default DashboardContainer;
