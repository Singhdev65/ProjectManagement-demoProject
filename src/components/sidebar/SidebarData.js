import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import StorageIcon from "@material-ui/icons/Storage";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import EventIcon from "@material-ui/icons/Event";

export const SidebarData = [
  {
    icon: <DashboardIcon />,
    title: "DashBoard",
    path: "/",
  },
  {
    icon: <PersonIcon />,
    title: "User Profile",
    path: "/user",
  },
  {
    icon: <PeopleIcon />,
    title: "Team",
    path: "/team/members",

    subNav: [
      {
        title: "Add Team",
        path: "/team/add",
        icon: <AddIcon />,
        cName: "sub-nav",
      },
      {
        title: "Members",
        path: "/team/members",
        icon: <GroupWorkIcon />,
        cName: "sub-nav",
      },
    ],
  },
  {
    icon: <StorageIcon />,
    title: "Projects",
    path: "/projectList",

    subNav: [
      {
        title: "Add Project",
        path: "/project/add",
        icon: <AddIcon />,
        cName: "sub-nav",
      },
      {
        icon: <StorageIcon />,
        title: "Projects List",
        path: "/projectList",
      },
    ],
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: <EventIcon />,
  },
  {
    title: "AttendanceSheet",
    path: "/attendance/adminSheet",
    icon: <EventIcon />,
  },
  {
    icon: <AssignmentLateIcon />,
    title: "Clients",
    path: "/clients",
  },
  {
    icon: <PersonIcon />,
    title: "Active Clients",
    path: "/clients/active",
  },
];
