import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Sidebar.css";

const SubNav = ({ item }) => {
  const [subNav, setSubNav] = useState(false);

  const showSubnav = () => {
    setSubNav(!subNav);
  };

  return (
    <div className="subnav">
      <div className="sidebarList" onClick={item.subNav && showSubnav}>
        <Link to={item.path}>
          <div className="sidebar__row">
            {item.icon}
            <div className="sidebar__title">{item.title}</div>
          </div>
        </Link>
        <div>
          {item.subNav && subNav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </div>
      {subNav &&
        item.subNav.map((item, index) => {
          return (
            <Link to={item.path}>
              <div className="subnav__row sidebar__row" key={index}>
                {item.icon}
                <div className="sidebar__title">{item.title}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default SubNav;
