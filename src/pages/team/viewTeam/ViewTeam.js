import React, { useEffect } from "react";
import { useState } from "react";
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import db from "../../../firebase";
import "./ViewTeam.css";
import { useParams } from "react-router-dom";

const ViewTeam = () => {
  const [members, setMembers] = useState([]);
  const { teamId } = useParams();

  useEffect(() => {
    db.collection("Team").onSnapshot((snapshot) =>
      setMembers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [teamId]);

  return (
    <div className="viewTeam">
      {members
        .filter((doc) => doc.id === teamId)
        .map((member) => (
          <div className="viewTeam__Left">
            <div className="viewTeam__LeftTop">
              <img
                className="viewTeam__LeftImg"
                src={member.data.imageUrl}
                alt=""
              />
              <div className="viewTeam__LeftInfo">
                <h3>{member.data.name}</h3>
                <h5>React Developer</h5>
              </div>
            </div>
            <div className="viewTeam__ShowInfo">
              <PermIdentity className="viewTeam__ShowIcon" />
              <span className="viewTeam__ShowInfoTitle">{member.id}</span>
            </div>
            <div className="viewTeam__ShowInfo">
              <CalendarToday className="viewTeam__ShowIcon" />
              <span className="viewTeam__ShowInfoTitle">
                {member.data.experience}years
              </span>
            </div>
            <div className="viewTeam__ShowInfo">
              <PhoneAndroid className="viewTeam__ShowIcon" />
              <span className="viewTeam__ShowInfoTitle">
                {member.data.phone}
              </span>
            </div>
            <div className="viewTeam__ShowInfo">
              <MailOutline className="viewTeam__ShowIcon" />
              <span className="viewTeam__ShowInfoTitle">
                {member.data.email}
              </span>
            </div>
          </div>
        ))}

      <div className="viewTeamRight">
        <div className="projectProgress">Data to be filled</div>
      </div>
    </div>
  );
};

export default ViewTeam;
