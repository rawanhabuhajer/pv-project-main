import React from "react";
import PvStatusBars from "./PvStatusBars";
import MvStatusBars from "./MvStatusBars";

const LateseProjects = () => {
  return (
    <div className="LateseProjects">
      {" "}
      <div className="LateseProjects-header">
        <h3>Projects count by status</h3>
      </div>
      <div className="features-stat-grid chartsGrid">
        <PvStatusBars />
        <MvStatusBars />
      </div>
    </div>
  );
};

export default LateseProjects;
