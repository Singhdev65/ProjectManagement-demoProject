import React, { useEffect, useState } from "react";
import "./Projects.css";
import { DataGrid } from "@material-ui/data-grid";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

const ProjectList = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("Projects").onSnapshot((snapshot) =>
      setProjects(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          projectName: doc.data().ProjectName,
          projectType: doc.data().ProjectType,
          developer: doc.data().Developer,
          tester: doc.data().Tester,
          teamLead: doc.data().TeamLead,
          projectManager: doc.data().projectManager,
          projectStatus: doc.data().ProjectStatus,
          projectDescription: doc.data().ProjectDescription,
        }))
      )
    );
  }, []);

  const filteredRow = projects.filter((project) => {
    if (search === "") {
      return project;
    } else if (
      project.projectName.toLowerCase().includes(search.toLowerCase())
    ) {
      return project;
    }
    // return project;
  });

  const customFilter = filteredRow.filter((doc) => {
    if (doc.developer.toLowerCase() === user.displayName.toLowerCase()) {
      doc.role = doc.developer;
      return true;
    }
    if (doc.tester.toLowerCase() === user.displayName.toLowerCase()) {
      doc.role = doc.tester;
      return true;
    }
    if (doc.teamLead.toLowerCase() === user.displayName.toLowerCase()) {
      doc.role = doc.teamLead;
      return true;
    }
    if (doc.projectManager.toLowerCase() === user.displayName.toLowerCase()) {
      doc.role = doc.projectManager;
      return true;
    }
    return true;
  });

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "projectName", headerName: "Name" },
    { field: "projectType", headerName: "Project Type" },
    { field: "role", headerName: "Assignee" },
    { field: "projectStatus", headerName: "Project Status", width: "200px" },
    { field: "projectDescription", headerName: "Description", width: "620px" },
  ];

  return (
    <div className="projects">
      <h3>Projects</h3>
      <div className="projects__filter">
        <SearchOutlinedIcon
          style={{ width: "30px", height: "30px", color: "gray" }}
        />
        <input
          type="text"
          className="projects__input"
          placeholder="Search for Project"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataGrid
        autoHeight
        rows={customFilter}
        columns={columns}
        pageSize={15}
      />
    </div>
  );
};

export default ProjectList;
