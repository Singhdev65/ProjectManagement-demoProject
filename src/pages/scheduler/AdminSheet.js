import React, { useEffect, useState } from "react";
import "./AdminSheet.css";
import { DataGrid } from "@material-ui/data-grid";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "../../firebase";

const AdminSheet = () => {
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    db.collection("Attendance").onSnapshot((snapshot) =>
      setAttendance(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          loginTime: doc.data().loginTime,
          logOutTime: doc.data().logOutTime,
          details: doc.data().details,
        }))
      )
    );
  }, []);

  const columns = [
    { field: "name", headerName: "Name" },
    { field: "loginTime", headerName: "LoginTime" },
    { field: "logOutTime", headerName: "LogoutTime", width: "200px" },
    { field: "details", headerName: "Details", width: "400px" },
  ];

  const filteredRow = attendance.filter((attendance) => {
    if (search === "") {
      return attendance;
    } else if (attendance.name.toLowerCase().includes(search.toLowerCase())) {
      return attendance;
    }
  });
  return (
    <div className="adminSheet">
      <h3>Attendance Sheet</h3>
      <div className="adminSheet__filter">
        <SearchOutlinedIcon
          style={{ width: "30px", height: "30px", color: "gray" }}
        />
        <input
          type="text"
          className="admin__input"
          placeholder="Search for Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataGrid autoHeight rows={filteredRow} columns={columns} pageSize={15} />
    </div>
  );
};

export default AdminSheet;
