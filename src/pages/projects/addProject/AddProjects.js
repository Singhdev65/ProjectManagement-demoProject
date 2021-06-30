import React, { useEffect, useState } from 'react';
import { Publish } from '@material-ui/icons';
import db, { storage } from '../../../firebase';
import "./AddProjects.css";
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const AddProjects = () => {
const [roles, setRole] = useState([]);
const [projectName, setProjectName] = useState("");
const [projectType, setProjectType] = useState("");
const [projectDescription, setProjectDescription] = useState("");
const [projectStatus, setProjectStatus] = useState("");
const [startDate, setStartDate] = useState("");
const [releaseDate, setReleaseDate] = useState("");
const [assignee, setAssignee] = useState([]);
const [projectManager, setProjectManager] = useState("");
const [teamLead, setTeamLead] = useState("");
const [tester, setTester] = useState([]);
const [developer, setDeveloper] = useState([]);
const history = useHistory();
const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

// sending data to database

  const handleSubmit = (e) => {
        e.preventDefault();
        db.collection("Projects").add({
          ProjectName: projectName,
          ProjectType: projectType,
          ProjectDescription: projectDescription,
          ProjectStatus: projectStatus,
          StartDate: startDate,
          ReleaseDate: releaseDate,
          Assignee: assignee,
          projectManager: projectManager,
          TeamLead: teamLead,
          Tester: tester,
          Developer: developer, 
          imageUrl:imageUrl,  
        })
        history.push("/projectList");
  }

  // To fetch the image url, after uploading it to firbase storage

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
   }
 
  const  handleImage = () => {
           const uploadTask = storage.ref(`images/${image.name}`).put(image);
             uploadTask.on("state_changes", snapshot => {}, err => {console.log(err)}, () => {
               storage.ref("images").child(image.name).getDownloadURL().then(url => {
                 setImageUrl(url);
               alert("We are good to go now")
               })
             })
           }

  // fetching data from teams array and storing to role array

  useEffect(() => {
    db.collection("Team").onSnapshot(snapshot => (
      setRole(snapshot.docs.map((doc) =>
      ({
        id: doc.id,
        data: doc.data(),
      })))
    ))
  }, [])

  
    return (
        <div className="addProject">
        <h3>Add Projects</h3>
            <form className="addProjectForm" onSubmit={handleSubmit}>
              <div className="addProjectForm__Left">
                <div className="addProjectForm__LeftItem">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    placeholder="Flipkart"
                    className="addProjectForm__LeftItemInput"
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="addProjectForm__LeftItem">
                  <label>Project Type</label>
                  <select className="addProjectForm__LeftItemInput"
                  value={projectType}
                   style={{backgroundColor:"transparent"}}
                  onChange={(e) => setProjectType(e.target.value)}
                  >
                            <option value="">Select</option>
                            <option value="Software">Software</option>
                            <option value="Business">Business</option>
                            <option value="Internal">Internal</option>
                  </select>
                </div>
                <div className="addProjectForm__LeftItem">
                  <label>Project Description</label>
                  <input
                    type="text"
                    value={projectDescription}
                    placeholder="Design a Banner for Diwali Sale."
                    className="addProjectForm__LeftItemInput"
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <div className="addProjectForm__LeftItem">
                  <label>Project Status</label>
                  <select className="addProjectForm__LeftItemInput" 
                  value={projectStatus}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setProjectStatus(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  <option value="In Progress">In Progress</option>
                      <option value="Released">Released</option>
                      <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="addProjectForm__LeftItem">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    className="addProjectForm__LeftItemInput"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="addProjectForm__LeftItem">
                  <label>Release Date</label>
                  <input
                    type="date"
                    className="addProjectForm__LeftItemInput"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>
                <div className="addProjectForm__LeftItem">
                  <label>Default Assignee</label>
                  <select className="addProjectForm__LeftItemInput" style={{backgroundColor:"transparent"}}
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  >
                            <option value="Select">Select</option>
                            <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="addProjectForm__Right" >
                <div className="addProjectForm__RightUpload" style={{display: "flex", flexDirection:"column-reverse" }}>
                <Button onClick={() => handleImage()}>Upload</Button>
                Upload your Figma Design
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon"
                     />
                  </label>
                  <input type="file" id="file" onClick={handleChange} style={{ display: "none" }} />
                </div>
                <div className="addMember">
                <button style={{marginRight:"0.5rem"}}>+</button>
                Assign Project Manager
                <select className="addProjectForm__RightItemInput" 
                  value={projectManager}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setProjectManager(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  {roles.filter((role) => (role.data.role === "Project Manager")).map((role) => (
                  <option value={role.data.name}>{role.data.name}</option>
                ))}
                  </select>
                </div>
                <div className="addMember">
                <button style={{marginRight:"0.5rem"}}>+</button>
                Assign Team Lead
                <select className="addProjectForm__RightItemInput" 
                  value={teamLead}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setTeamLead(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  {roles.filter((role) => (role.data.role === "Team Lead")).map((role) => (
                  <option value={role.data.name}>{role.data.name}</option>
                ))}
                  </select>
                </div>
                <div className="addMember">
                <button style={{marginRight:"0.5rem"}}>+</button>
                Assign Developer
                <select className="addProjectForm__RightItemInput" 
                  value={developer}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setDeveloper(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  {roles.filter((role) => (role.data.role === "Developer")).map((role) => (
                  <option value={role.data.name}>{role.data.name}</option>
                ))}
                  </select>
                </div>
                <div className="addMember">
                <button style={{marginRight:"0.5rem"}}>+</button>
                Assign Tester
                <select className="addProjectForm__RightItemInput" 
                  value={tester}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setTester(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  {roles.filter((role) => (role.data.role === "Tester")).map((role) => (
                  <option value={role.data.name}>{role.data.name}</option>
                ))}
                  </select>
                </div>
                <button type="submit" onClick={handleSubmit} className="addProjectForm__RightButton">Create Project</button>
              </div>
            </form>
        </div>
    )
}

export default AddProjects;
