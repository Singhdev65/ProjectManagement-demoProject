import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db, { auth, provider } from "../../firebase";
import "./Login.css";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import Register from "./Register";

const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    db.collection("Team").onSnapshot((snapshot) => {
      setEmails(
        snapshot.docs.map((doc) => ({
          email: doc.data().email,
        }))
      );
    });
  }, []);

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        emails.find(({ email }) => {
          return email.toLowerCase() === result.user.email.toLowerCase();
        })
          ? dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
            })
          : alert("Hell! you are not allowed");
      })
      .catch((error) => alert(error.message));
  };

  // useEffect(() => {
  //   localStorage.setItem("UserData", user);
  //   console.log(user);
  // }, []);

  // To remain login after refresh as well

  // useEffect(() => {
  //   auth.onAuthStateChanged((currentUser) => {
  //     if (currentUser) {
  //       dispatch({
  //         type: actionTypes.SET_USER,
  //         user: currentUser,
  //       });
  //     }
  //   });
  // }, []);

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__headerLeft">
          <h2>
            <span>Project</span>Management
          </h2>
        </div>

        <div className="login__headerRight">
          <p onClick={() => setIsOpen(false)}>login</p>
          <p onClick={() => setIsOpen(!isOpen)}>Register</p>
        </div>
      </div>
      {isOpen ? (
        <Register />
      ) : (
        <div className="login__body">
          <form>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="password" />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem", background: "#007bff" }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem", background: "#007bff" }}
              onClick={signInWithGoogle}
            >
              Login with Google
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
