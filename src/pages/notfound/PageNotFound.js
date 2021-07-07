import { Card } from "@material-ui/core";
import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <Card className="pageNotFound__card">
        <div className="pageNotFound__cardContent">
          <h3>Page not found 😞</h3>
          <h6>
            Maybe the page you are looking for has been removed, or you are not
            authorized to view the Page.
          </h6>
        </div>
        <div className="card-action">
          <Link to="/">
            <button className="btn" type="submit">
              Go to homepage
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PageNotFound;
