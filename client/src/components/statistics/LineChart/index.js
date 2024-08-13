import * as React from 'react';
import { LineChart, LineElement, ChartsXAxis, ChartsYAxis, ChartsTooltip } from '@mui/x-charts';

const ReusableLineChart = ({ title, xAxisData, yAxisData, xAxisLabel = "X-Axis", yAxisLabel = "Y-Axis", width = 600, height = 400 }) => {
  // Convert data to ensure numbers are correctly passed
  const numericYAxisData = yAxisData.map(value => Number(value));

  console.log("xAxisData:", xAxisData); // Debugging
  console.log("numericYAxisData:", numericYAxisData); // Debugging

  return (
    <div>
    {title && <h3>{title}</h3>}
    <LineChart
      width={width}
      height={height}
      xAxis={[{ data: xAxisData, label: xAxisLabel, scaleType: 'band' }]}  // Set scaleType to 'band' for categorical data
      series={[
        {
          data: numericYAxisData,
          element: <LineElement />,
        },
      ]}
    >
      <ChartsXAxis label={xAxisLabel} />
      <ChartsYAxis label={yAxisLabel} />
      <ChartsTooltip />
    </LineChart>
  </div>
  );
};

export default ReusableLineChart;
