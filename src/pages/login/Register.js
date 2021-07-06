import { Publish } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import "./Register.css";
import db, { auth } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { useEffect } from "react";

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [{}, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection("Users").add({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      role: user.role,
    });
    await auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  const updateField = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register">
      <div className="register__header">
        <h2>Register</h2>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__formLeft">
          <div className="register__formItem">
            <label>Full Name</label>
            <input
              required
              value={user.fullName}
              type="text"
              name="fullName"
              className="register__formInput"
              onChange={updateField}
            />
          </div>
          <div className="register__formItem">
            <label>Email</label>
            <input
              required
              value={user.email}
              ref={emailRef}
              type="email"
              name="email"
              className="register__formInput"
              onChange={updateField}
            />
          </div>
          <div className="register__formItem">
            <label>Mobile</label>
            <input
              required
              value={user.mobile}
              type="number"
              name="mobile"
              className="register__formInput"
              onChange={updateField}
            />
          </div>
          <div className="register__formItem">
            <label>Password</label>
            <input
              required
              value={user.password}
              ref={passwordRef}
              type="password"
              name="password"
              onChange={updateField}
              className="register__formInput"
            />
          </div>
          <div className="register__formItem">
            <label>Role</label>
            <select
              required
              className="register__formInput"
              value={user.role}
              name="role"
              onChange={updateField}
            >
              <option value="">Select</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Developer">Developer</option>
              <option value="Tester">Tester</option>
            </select>
          </div>
        </div>

        <div className="register__formRight">
          <div className="register__formRightUpload">
            <label htmlFor="file">
              <Publish className="userUpdateIcon" />
              Upload Picture
            </label>
            <button className="register__formRightUploadButton">
              Upload Image
            </button>
            <input type="file" id="file" required style={{ display: "none" }} />
          </div>
          <button
            className="register__formRightUploadButton"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
