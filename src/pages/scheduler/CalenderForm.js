import React, { useState } from 'react';
import './CalenderForm.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Checkbox } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import db from '../../firebase'

const CalenderForm = () => {
  const [loginTime, setLoginTime] = useState("");
  const [logOutTime, setLogOutTime] = useState("");
  const [details, setDetails] = useState("");
  const history = useHistory();

const handleSubmit = (e) => {
  e.preventDefault();
  db.collection("Attendance").add({
    loginTime: loginTime,
    logOutTime: logOutTime,
    details: details,
  })
  history.push('/attendance');
}

  console.log(details)
    return (
        <form className="calenderForm" onSubmit={handleSubmit}>
            <nav className="calenderForm__nav">
                <div className="calenderForm__navLeft">
                <Link to="/attendance">
                    <h2>&times;</h2>
                </Link>
                </div>
                <div className="calenderForm__navRight">
                    <DeleteOutlineIcon />
                    <button className="calenderForm__navButton" onClick={handleSubmit}>Save</button>
                </div>
            </nav>

            <main className="calenderForm__main">
                <div className="calenderForm__mainLeft">
                <div className="userUpdateItem">
                  <label>Details</label>
                  <input
                    type="text"
                    value={details}
                    className="userUpdateInput"
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <div className="calenderForm__mainForm">
                <input
                    type="time"
                    value={loginTime}
                    className="userUpdateInput"
                    onChange={(e) => setLoginTime(e.target.value)}
                    style={{marginRight: "0.5rem"}}
                  />

                <input
                    type="time"
                    className="userUpdateInput"
                    value={logOutTime}
                    onChange={(e) => setLogOutTime(e.target.value)}
                  />
                </div>

                <div className="calenderForm__mainForm">
                        <Checkbox />
                        All Day
                        <Checkbox />
                        Repeat
                </div>
                <h3>More Information</h3>
                <textarea cols="80" rows="10"></textarea>
                </div>
                <div className="calenderForm__mainRight">
                <div className="userUpdateItem">
                  <label>Repeat</label>
                  <select className="userUpdateInput"
                   style={{backgroundColor:"transparent"}}
                  >
                            <option value="">Daily</option>
                            <option value="Software">Weekly</option>
                            <option value="Business">Monthly</option>
                            <option value="Internal">Yearly</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Repeat EveryDay</label>
                  <input
                    type="number"
                    className="userUpdateInput"
                  />
                </div>
                </div>
            </main>
        </form>
    )
}

export default CalenderForm;
