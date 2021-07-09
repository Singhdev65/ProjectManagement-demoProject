import { Button } from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db, { storage } from "../../../firebase";
import "./EditProjects.css";
import { useParams } from "react-router-dom";

const EditProjects = () => {
  const [projects, setProjects] = useState([]);
  const [roles, setRole] = useState([]);
  const [project, setProject] = useState({
    projectName: "",
    projectType: "",
    projectDescription: "",
    projectStatus: "",
    projectProgress: 400,
    startDate: "",
    releaseDate: "",
    projectManager: "",
    teamLead: "",
    assignee: "",
    tester: "",
    developer: "",
  });
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { projectId } = useParams();

  // sending data to database

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("Projects").doc(projectId).update({
      ProjectName: project.projectName,
      ProjectType: project.projectType,
      ProjectDescription: project.projectDescription,
      ProjectStatus: project.projectStatus,
      StartDate: project.startDate,
      ReleaseDate: project.releaseDate,
      projectManager: project.projectManager,
      TeamLead: project.teamLead,
      Assignee: project.assignee,
      Tester: project.tester,
      Developer: project.developer,
      ProjectProgress: project.projectProgress,
      imageUrl: imageUrl,
    });
    history.push("/projectList");
  };

  // To fetch the image url, after uploading it to firbase storage

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImage = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changes",
      (snapshot) => {},
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
            alert("We are good to go now");
          });
      }
    );
  };

  useEffect(() => {
    db.collection("Team").onSnapshot((snapshot) =>
      setRole(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  useEffect(() => {
    db.collection("Projects").onSnapshot((snapshot) =>
      setProjects(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const updateField = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="editProject">
      <h3>Update Project</h3>
      {projects
        .filter((doc) => doc.id === projectId)
        .map((doc) => (
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  defaultValue={doc.data.ProjectName}
                  className="userUpdateInput"
                  onChange={updateField}
                />
              </div>
              <div className="userUpdateItem">
                <label>Project Type</label>
                <select
                  name="projectType"
                  className="userUpdateInput"
                  defaultValue={doc.data.ProjectType}
                  style={{ backgroundColor: "transparent" }}
                  onChange={updateField}
                >
                  <option value="">Select</option>
                  <option value="Software">Software</option>
                  <option value="Business">Business</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Project Description</label>
                <input
                  type="text"
                  name="projectDescription"
                  defaultValue={doc.data.ProjectDescription}
                  className="userUpdateInput"
                  onChange={updateField}
                />
              </div>
              <div className="userUpdateItem">
                <label>Project Status</label>
                <select
                  name="projectStatus"
                  className="userUpdateInput"
                  defaultValue={doc.data.ProjectStatus}
                  style={{ backgroundColor: "transparent" }}
                  onChange={updateField}
                >
                  <option value="Select">Select</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Released">Released</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={doc.data.StartDate}
                  className="userUpdateInput"
                  onChange={updateField}
                />
              </div>
              <div className="userUpdateItem">
                <label>Project Progress</label>
                <input
                  type="number"
                  name="projectProgress"
                  defaultValue={doc.data.projectProgress}
                  className="userUpdateInput"
                  onChange={updateField}
                />
              </div>
              <div className="userUpdateItem">
                <label>Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  className="userUpdateInput"
                  defaultValue={doc.data.ReleaseDate}
                  onChange={updateField}
                />
              </div>
              <div className="userUpdateItem">
                <label>Default Assignee</label>
                <select
                  className="userUpdateInput"
                  name="assignee"
                  style={{ backgroundColor: "transparent" }}
                  defaultValue={doc.data.Assignee}
                  onChange={updateField}
                >
                  <option value="Select">Select</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div
                className="userUpdateUpload"
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                <Button onClick={() => handleImage()}>Upload</Button>
                Upload your Figma Design
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onClick={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="addMember">
                <button style={{ marginRight: "0.5rem" }}>+</button>
                Assign Project Manager
                <select
                  name="projectManager"
                  className="userUpdateInput"
                  defaultValue={doc.data.projectManager}
                  style={{ backgroundColor: "transparent" }}
                  onChange={updateField}
                >
                  <option value="Select">Select</option>
                  {roles
                    .filter((role) => role.data.role === "Project Manager")
                    .map((role) => (
                      <option value={role.data.name}>{role.data.name}</option>
                    ))}
                </select>
              </div>
              <div className="addMember">
                <button style={{ marginRight: "0.5rem" }}>+</button>
                Assign Team Lead
                <select
                  name="teamLead"
                  className="userUpdateInput"
                  defaultValue={doc.data.TeamLead}
                  style={{ backgroundColor: "transparent" }}
                  onChange={updateField}
                >
                  <option value="Select">Select</option>
                  {roles
                    .filter((role) => role.data.role === "Team Lead")
                    .map((role) => (
                      <option value={role.data.name}>{role.data.name}</option>
                    ))}
                </select>
              </div>
              <div className="addMember">
                <button style={{ marginRight: "0.5rem" }}>+</button>
                Assign Developer
                <select
                  name="developer"
                  className="userUpdateInput"
                  defaultValue={doc.data.Developer}
                  style={{ backgroundColor: "transparent" }}
                  onChange={updateField}
                >
                  <option value="Select">Select</option>
                  {roles
                    .filter((role) => role.data.role === "Developer")
                    .map((role) => (
                      <option value={role.data.name}>{role.data.name}</option>
                    ))}
                </select>
              </div>
              <div className="addMember">
                <button style={{ marginRight: "0.5rem" }}>+</button>
                Assign Tester
                <select
                  className="userUpdateInput"
                  name="tester"
                  defaultValue={doc.data.Tester}
                  style={{ backgroundColor: "transparent" }}
                  onChange={updateField}
                >
                  <option value="Select">Select</option>
                  {roles
                    .filter((role) => role.data.role === "Tester")
                    .map((role) => (
                      <option value={role.data.name}>{role.data.name}</option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="userUpdateButton"
              >
                Update Project
              </button>
            </div>
          </form>
        ))}
    </div>
  );
};

export default EditProjects;
