import { Publish } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import "./Register.css";
import db, { auth } from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [{}, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection("Users").add({
      name: fullName,
      email: email,
      mobile: mobile,
      password: password,
      role: role,
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
              value={fullName}
              type="text"
              className="register__formInput"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="register__formItem">
            <label>Email</label>
            <input
              required
              value={email}
              ref={emailRef}
              type="email"
              className="register__formInput"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register__formItem">
            <label>Mobile</label>
            <input
              required
              value={mobile}
              type="number"
              className="register__formInput"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="register__formItem">
            <label>Password</label>
            <input
              required
              value={password}
              ref={passwordRef}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="register__formInput"
            />
          </div>
          <div className="register__formItem">
            <label>Role</label>
            <select
              required
              className="register__formInput"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
