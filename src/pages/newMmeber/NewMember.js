import { Avatar, Card } from "@material-ui/core";
import React from "react";
import "./NewMember.css";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const NewMember = ({ name, position, imageUrl }) => {
  return (
    <Card
      className="newMember"
      style={{ boxShadow: "1px 2px 3px #bfbfbf", marginBottom: "3px" }}
    >
      <Avatar className="newMember__Avatar" src={imageUrl} />
      <div className="newMember__info">
        <h5>{name}</h5>
        <h6>{position}</h6>
      </div>
      <VisibilityOutlinedIcon className="newMember__icon" />
    </Card>
  );
};

export default NewMember;
