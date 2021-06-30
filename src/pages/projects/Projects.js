import React, { useEffect, useState } from 'react';
import './Projects.css';
import { DataGrid } from '@material-ui/data-grid';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import db from '../../firebase';
import {Link} from 'react-router-dom';

const Projects = () => {
    const [search, setSearch] = useState("");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      db.collection("Projects").onSnapshot(snapshot => (
        setProjects(snapshot.docs.map((doc) =>
        ({
          id: doc.id,
          projectName: doc.data().ProjectName,
          projectType: doc.data().ProjectType,
          projectAssignee: doc.data().Assignee,
          projectStatus: doc.data().ProjectStatus,
          projectDescription: doc.data().ProjectDescription,
        })))
      ))
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'projectName', headerName: 'Name', },
        { field: 'projectType', headerName: 'Project Type' },
        { field: 'projectAssignee', headerName: 'Assignee',  },
        { field: 'projectStatus', headerName: 'Project Status', width: "200px" },
        { field: 'projectDescription', headerName: 'Description', width: "620px" },
        {
          field: 'action',
          headerName: 'Action',
          width:"250px",
          renderCell: (params) => {
            return (
              <div className="action">
              <Link to={`/project/update/${params.id}`}>
                  <button className="projectListEdit">Edit</button>
              </Link> 
                  <button className="projectListEdit projectListDelete" onClick={() => db.collection("Projects").doc(params.id).delete()} >Delete</button>
              </div>
            )
          }
        }
      ];

      const filteredRow = projects.filter((project) => {
            if (search === "") {
              return project
            } else if (project.projectName.toLowerCase().includes(search.toLowerCase())) {
              return project
            }
          })

    return (
        <div className="projects"  >
      <h3 >Projects</h3>
      <div className="projects__filter">
        <SearchOutlinedIcon style={{ width: "30px", height: "30px", color: "gray" }} />
        <input type="text" className="projects__input" placeholder="Search for Project" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataGrid autoHeight rows={filteredRow} columns={columns} pageSize={15}  />
    </div>
    )
}

export default Projects;
