import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5.5 },
  { x: 4, y: 8.5 },
  { x: 5, y: 1.5 },
  { x: 6, y: 5 },
  { x: 7, y: 1 },
  { x: 8, y: 4 },
  { x: 9, y: 3 },
  { x: 10, y: 8 },
];

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart margin={0} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="x" 
          stroke="black" // Makes the x-axis line and text black
          tick={{ fill: 'black' }} // Makes the labels black
        />
        <YAxis 
          stroke="black" // Makes the y-axis line and text black
          tick={{ fill: 'black' }} // Makes the labels black
        />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="y" 
          stroke="black" 
          dot={{ fill: 'black' }} // Shows dots only on points
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
