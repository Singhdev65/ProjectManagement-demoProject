import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./User.css";
import { useStateValue } from "../../StateProvider";
import { useEffect, useState } from "react";
import db from "../../firebase";

export default function User() {
  const [{ user }] = useStateValue();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("Team").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs
          .filter((doc) => doc.data().email === user.email)
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
      )
    );
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User Profile</h1>
      </div>
      <div className="userContainer">
        {users.map((team) => (
          <div className="userShow" key={team.id}>
            <div className="userShowTop">
              <img src={user.photoURL} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{team.data.name}</span>
                <span className="userShowUserTitle">{team.data.role}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.uid}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1997</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{team.data.phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{team.data.address}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="prince00"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Prince"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Kumar"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Position</label>
                <input
                  type="text"
                  placeholder="React Developer"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="prince@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+91 123 456 6789"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Noida | India"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user.photoURL} alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button
                type="submit"
                className="userUpdateButton"
                onClick={(e) => e.preventDefault()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
