import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import variablePie from "highcharts/modules/variable-pie.js";

const Chart = ({ type, options }) => {
  variablePie(Highcharts);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={type}
      options={options}
    />
  );
};

export default Chart;
