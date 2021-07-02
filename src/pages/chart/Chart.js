import React from "react";
import "./Chart.css";
import {
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { Card } from "@material-ui/core";

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <Card className="chart">
      <h3 className="chart__title">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <Line type="monotone" dataKey={dataKey} stroke="blue" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
