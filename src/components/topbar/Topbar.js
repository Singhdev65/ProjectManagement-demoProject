import React, { useState } from 'react';
import "./Topbar.css";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Topbar = ({hamburger}) => {
    const [search, setSearch] = useState(false);

    return (
        <div className="topbar">
            <div className="topbar__wrapper">
                <div className="topbar__left">
                    <IconButton>
                        <MenuIcon className="hamburger topbar__icons" onClick={hamburger} />
                    </IconButton>
                </div>
                <div className="topbar__right">
                <div className="topbar__middle">
                    {search && <input type="text" placeholder="Search Here" />}
                        <SearchIcon className="topbar__icons" onClick={() => setSearch(!search)} />
                </div>
                    <div className="topbar__rightIconWrapper">
                        <NotificationsNoneOutlinedIcon className="topbar__icons"/>
                        <span className="topbar__rightIconBadge">4</span>
                    </div>
                    <div className="topbar__rightIconWrapper">
                        <EmailOutlinedIcon className="topbar__icons"/>
                        <span className="topbar__rightIconBadge">7</span>
                    </div>
                    <Avatar className="topbar__rightImage" />
                    <div className="topbar__rightIconWrapper">
                        <button variant="contained" color="primary" className="topbar__btn" >SignOut</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar;
