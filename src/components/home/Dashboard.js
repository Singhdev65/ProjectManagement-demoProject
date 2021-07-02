import React, { useEffect, useState } from "react";
import Chart from "../../pages/chart/Chart";
import "./Dashboard.css";
import { userData } from "../../pages/chart/ChartData";
import { Card } from "@material-ui/core";
import InfoBox from "../../pages/infoBox/InfoBox";
import NewMember from "../../pages/newMmeber/NewMember";
import Projects from "../../pages/projects/Projects";
import db from "../../firebase";

const Dashboard = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    db.collection("Team").onSnapshot((snapshot) =>
      setMembers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__infoBox">
        <InfoBox />
      </div>
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Successful delivery"
      />
      <div className="dashboard__widgetsWrapper">
        <Card className="dashboard__newMember">
          <h3>New Member</h3>
          {members.slice(0, 4).map((member) => (
            <NewMember
              key={member.id}
              name={member.data.name}
              position={member.data.role}
              imageUrl={member.data.imageUrl}
            />
          ))}
        </Card>
        <Card className="home__table">
          <Projects />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
