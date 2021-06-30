import React from 'react';
import { SidebarData } from './SidebarData';
import SubNav from './SubNav';
import './Sidebar.css';

const Sidebar = () => {

    return (
        <div className="sidebar">
        <ul className="sidebar__list">
            {SidebarData.map((item, index) => (
                <SubNav item={item} key={index}/>
            ))}
            </ul>
        </div>
    )
}

export default Sidebar;
