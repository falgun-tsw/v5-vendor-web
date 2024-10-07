import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import Grid from "@app/component/common/Grid";
import Text from "@app/component/common/Text";
import Card from "@app/component/common/Card";
import Box from "@app/component/common/Box";
import Stack from "@app/component/common/Stack";

const UsersJobsAnalysisChart = ({ chartName, chartOptions, exportToCsv }) => {
  return (
    <>
      <Grid item md={6} sm={12} xs={12}>
        <Card>
          <Box sx={{ padding: "1rem" }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Text sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {chartName}
              </Text>
              {exportToCsv ? <ShortcutIcon /> : null}
            </Stack>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default UsersJobsAnalysisChart;
