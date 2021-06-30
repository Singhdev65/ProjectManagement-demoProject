import { Button } from '@material-ui/core';
import { Publish } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import db, { storage } from '../../../firebase';
import './EditProjects.css';
import { useParams } from 'react-router-dom';

const EditProjects = () => {
const [projects, setProjects] = useState([]);
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
const {projectId} = useParams();

// sending data to database

  const handleSubmit = (e) => {
        e.preventDefault();
        db.collection("Projects").doc(projectId).update({
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

   useEffect(() => {
    db.collection("Team").onSnapshot(snapshot => (
      setRole(snapshot.docs.map((doc) =>
      ({
        id: doc.id,
        data: doc.data(),
      })))
    ))
  }, [])

   useEffect(() => {
    db.collection("Projects").onSnapshot(snapshot => (
        setProjects(snapshot.docs.map((doc) =>
      ({
        id: doc.id,
        data: doc.data(),
      })))
    ))
  }, [])
    

    return (
        <div className="editProject">
            <h3>Update Project</h3>
            {projects.filter(doc => (doc.id === projectId)).map((doc) => (
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Project Name</label>
                  <input
                    type="text"
                    defaultValue={doc.data.ProjectName}
                    className="userUpdateInput"
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Project Type</label>
                  <select className="userUpdateInput"
                    defaultValue={doc.data.ProjectType}
                   style={{backgroundColor:"transparent"}}
                  onChange={(e) => setProjectType(e.target.value)}
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
                    defaultValue={doc.data.ProjectDescription}
                    className="userUpdateInput"
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Project Status</label>
                  <select className="userUpdateInput" 
                  defaultValue={doc.data.ProjectStatus}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setProjectStatus(e.target.value)}
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
                    defaultValue={doc.data.StartDate}
                    className="userUpdateInput"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Release Date</label>
                  <input
                    type="date"
                    className="userUpdateInput"
                    defaultValue={doc.data.ReleaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Default Assignee</label>
                  <select className="userUpdateInput" style={{backgroundColor:"transparent"}}
                  defaultValue={doc.data.Assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  >
                            <option value="Select">Select</option>
                            <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="userUpdateRight" >
                <div className="userUpdateUpload" style={{display: "flex", flexDirection:"column-reverse" }}>
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
                <select className="userUpdateInput" 
                  defaultValue={doc.data.projectManager}
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
                <select className="userUpdateInput" 
                 defaultValue={doc.data.TeamLead}
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
                <select className="userUpdateInput" 
                  defaultValue={doc.data.Developer}
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
                <select className="userUpdateInput" 
                  defaultValue={doc.data.Tester}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setTester(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  {roles.filter((role) => (role.data.role === "Tester")).map((role) => (
                  <option value={role.data.name}>{role.data.name}</option>
                ))}
                  </select>
                </div>
                <button type="submit" onClick={handleSubmit} className="userUpdateButton">Update Project</button>
              </div>
            </form>
            ))}
        </div>
    )
}

export default EditProjects;
