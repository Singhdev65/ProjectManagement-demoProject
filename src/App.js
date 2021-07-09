import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Dashboard from "./components/home/Dashboard";
import User from "./pages/user/User";
import Projects from "./pages/projects/Projects";
import AddProjects from "./pages/projects/addProject/AddProjects";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Team from "./pages/team/Team";
import AddTeam from "./pages/team/addTeam/AddTeam";
import ViewTeam from "./pages/team/viewTeam/ViewTeam";
import EditProjects from "./pages/projects/editProjects/EditProjects";
import Calender from "./pages/scheduler/Calender";
import CalenderForm from "./pages/scheduler/CalenderForm";
import AdminSheet from "./pages/scheduler/AdminSheet";
import Login from "./pages/login/Login";
import { useStateValue } from "./StateProvider";
import ProjectList from "./pages/projects/ProjectList";
import PageNotFound from "./pages/notfound/PageNotFound";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <div>
            <Topbar hamburger={() => setSidebar(!sidebar)} />
            <div className="app__body">
              {sidebar && <Sidebar />}
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/user" exact component={User} />
                {user.email === "princekasayap65@gmail.com" ? (
                  <Route path="/projectList" exact component={Projects} />
                ) : (
                  <Route path="/projectList" exact component={ProjectList} />
                )}
                {user.email === "princekasayap65@gmail.com" ? (
                  <Route path="/project/add" exact component={AddProjects} />
                ) : (
                  <Route path="/project/add" exact component={PageNotFound} />
                )}
                <Route
                  path="/project/update/:projectId"
                  exact
                  component={EditProjects}
                />
                <Route path="/team/members" exact component={Team} />
                {user.email === "princekasayap65@gmail.com" ? (
                  <Route path="/team/add" exact component={AddTeam} />
                ) : (
                  <Route path="/team/add" exact component={PageNotFound} />
                )}
                <Route
                  path="/team/members/view/:teamId"
                  exact
                  component={ViewTeam}
                />
                <Route path="/attendance" exact component={Calender} />
                <Route
                  path="/attendance/repeat"
                  exact
                  component={CalenderForm}
                />
                <Route
                  path="/attendance/adminSheet"
                  exact
                  component={AdminSheet}
                />
                <Route path="/clients" exact component={PageNotFound} />
                <Route path="/clients/active" exact component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
