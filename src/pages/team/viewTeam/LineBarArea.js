import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  CartesianGrid,
  Legend,
  Scatter,
  ResponsiveContainer,
  Area,
} from "recharts";
import db from "../../../firebase";

const LineBarArea = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    db.collection("Projects").onSnapshot((snapshot) =>
      setProjects(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().ProjectName,
          "Start Date": 0,
          "Release Date": Date.parse(doc.data().ReleaseDate),
          "Project Progress": (Date.parse(doc.data().StartDate) * 3) / 4,
        }))
      )
    );
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={projects}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <Legend />
        <Area
          type="monotone"
          dataKey="Project Progress"
          fill="#8884d8"
          stroke="#8884d8"
        />
        <Bar dataKey="Release Date" barSize={20} fill="#413ea0" />
        <Scatter dataKey="Start Date" fill="red" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LineBarArea;
