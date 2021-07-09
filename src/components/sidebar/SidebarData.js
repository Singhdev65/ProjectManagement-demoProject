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
    key: 1,
    icon: <DashboardIcon />,
    title: "DashBoard",
    path: "/",
  },
  {
    key: 2,
    icon: <PersonIcon />,
    title: "User Profile",
    path: "/user",
  },
  {
    key: 3,
    icon: <PeopleIcon />,
    title: "Team",
    // path: "/team/members",

    subNav: [
      {
        key: 4,
        title: "Add Team",
        path: "/team/add",
        icon: <AddIcon />,
      },
      {
        key: 5,
        title: "Members",
        path: "/team/members",
        icon: <GroupWorkIcon />,
      },
    ],
  },
  {
    key: 6,
    icon: <StorageIcon />,
    title: "Projects",
    // path: "/projectList",

    subNav: [
      {
        key: 7,
        title: "Add Project",
        path: "/project/add",
        icon: <AddIcon />,
      },
      {
        key: 8,
        icon: <StorageIcon />,
        title: "Projects List",
        path: "/projectList",
      },
    ],
  },
  {
    key: 9,
    title: "Attendance",
    path: "/attendance",
    icon: <EventIcon />,
  },
  {
    key: 10,
    title: "AttendanceSheet",
    path: "/attendance/adminSheet",
    icon: <EventIcon />,
  },
  {
    key: 11,
    icon: <AssignmentLateIcon />,
    title: "Clients",
    path: "/clients",
  },
  {
    key: 12,
    icon: <PersonIcon />,
    title: "Active Clients",
    path: "/clients/active",
  },
];
