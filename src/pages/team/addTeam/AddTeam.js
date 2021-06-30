import React, { useState } from 'react';
import './AddTeam.css';
import { Publish } from '@material-ui/icons';
import db from '../../../firebase';
import {storage} from '../../../firebase';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const AddTeam = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("Team").add({
      name:name, 
      role: role,
      email: email,
      address: address,
      phone: phone,
      experience: experience,
      imageUrl: imageUrl,
    });
    history.push("/team/members");
  }

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

   return (
        <div className="addTeam">
            <h3>Add Member</h3>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label> Name</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="prince Kumar"
                    className="userUpdateInput"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Role</label>
                  <select className="userUpdateInput"
                   value={role}
                  style={{backgroundColor:"transparent"}}
                  onChange={(e) => setRole(e.target.value)}
                  >
                  <option value="Select">Select</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Developer">Developer</option>
                      <option value="Tester">Tester</option>
                  </select>
                </div>
                
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    placeholder="princekasayap65gmail.com"
                    className="userUpdateInput"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={phone}
                    placeholder="9661794532"
                    className="userUpdateInput"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    placeholder="Noida | India"
                    className="userUpdateInput"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Experience(in Years)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={experience}
                    className="userUpdateInput"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
              </div>

              <div className="userUpdateRight" >
                <div className="userUpdateUpload" style={{display: "flex", flexDirection:"column-reverse" }}>
                <Button onClick={() => {handleImage()}}>Upload Image</Button>
                Upload Picture
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon"
                     />
                  </label>
                  <input type="file" id="file" required  onChange={handleChange} style={{ display: "none" }} />
                </div>
                {imageUrl !== "" && <button type="submit" className="userUpdateButton" onClick={handleSubmit}>Add Member</button>}
              </div>
            </form>
        </div>
    )
}

export default AddTeam;
