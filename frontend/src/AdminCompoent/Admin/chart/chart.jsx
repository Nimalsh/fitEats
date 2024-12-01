import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomLineChart = ({ data, yAxisKey, yAxisLabel }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart margin={0} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="day" 
          stroke="black" // Makes the x-axis line and text black
          tick={{ fill: 'black' }} // Makes the labels black
          label={{ value: 'Days', position: 'insideBottomRight', offset: -5, fill: 'black' }} // Adds label to x-axis
        />
        <YAxis 
          stroke="black" // Makes the y-axis line and text black
          tick={{ fill: 'black' }} // Makes the labels black
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: 'black' }} // Adds label to y-axis
        />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey={yAxisKey} 
          stroke="black" 
          dot={{ fill: 'black' }} // Shows dots only on points
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
