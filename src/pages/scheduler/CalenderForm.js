import React, { useState } from "react";
import "./CalenderForm.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Checkbox } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

const CalenderForm = () => {
  const [loginTime, setLoginTime] = useState("");
  const [logOutTime, setLogOutTime] = useState("");
  const [details, setDetails] = useState("");
  const history = useHistory();
  const [{ user }] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("Attendance").add({
      name: user.displayName,
      loginTime: loginTime,
      logOutTime: logOutTime,
      details: details,
    });
    history.push("/attendance");
  };
  return (
    <div className="calenderForm">
      <form onSubmit={handleSubmit}>
        <nav className="calenderForm__nav">
          <div className="calenderForm__navLeft">
            <Link to="/attendance">
              <h2>&times;</h2>
            </Link>
          </div>
          <div className="calenderForm__navRight">
            <DeleteOutlineIcon />
            <button className="calenderForm__navButton" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </nav>

        <main className="calenderForm__main">
          <div className="calenderForm__mainLeft">
            <div className="calenderForm__Item">
              <label>Details</label>
              <input
                type="text"
                value={details}
                className="calenderForm__Input"
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="calenderForm__Item">
              <input
                type="time"
                value={loginTime}
                className="calenderForm__Input"
                onChange={(e) => setLoginTime(e.target.value)}
                style={{ marginRight: "0.5rem" }}
              />

              <input
                type="time"
                className="calenderForm__Input"
                value={logOutTime}
                onChange={(e) => setLogOutTime(e.target.value)}
              />
            </div>

            <div>
              <Checkbox />
              All Day
              <Checkbox />
              Repeat
            </div>
            <h3>More Information</h3>
            <textarea cols="80" rows="10"></textarea>
          </div>
          <div className="calenderForm__mainRight">
            <div className="calenderForm__Item">
              <label>Repeat</label>
              <select
                className="calenderForm__Input"
                style={{ backgroundColor: "transparent" }}
              >
                <option value="">Daily</option>
                <option value="Software">Weekly</option>
                <option value="Business">Monthly</option>
                <option value="Internal">Yearly</option>
              </select>
            </div>
            <div className="calenderForm__Item">
              <label>Repeat EveryDay</label>
              <input type="number" className="calenderForm__Input" />
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default CalenderForm;
