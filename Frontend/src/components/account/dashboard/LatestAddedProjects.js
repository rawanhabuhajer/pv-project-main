import { getFullDate } from "@/helpers/functions";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  ClockAlert,
  FileSpreadsheet,
  Info,
  Timer,
} from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

import { ArrowLeft, LayoutDashboard, Rows2Icon } from "lucide-react";
import PvStatusBars from "./PvStatusBars";
import { Nav, Tab } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import MvStatusBars from "./MvStatusBars";

const LatestAddedProjects = () => {
  const { latestProjectsLoading, latestProjects } = useSelector(
    (state) => state.dashboard
  );

  const router = useRouter();
  return (
    <div className="">
      {" "}
      <div className="LateseProjects-header">
        <h3>Last created projects</h3>
      </div>
      <div className="features-stat-grid">
        {latestProjects?.items?.length > 0
          ? latestProjects?.items?.map((item, index) => (
              <div
                className="single-item"
                key={item?.id || index}
                onClick={() => {
                  router?.push(
                    `${
                      item?.type === "pv"
                        ? `/account/projects/${item?.id}`
                        : `/account/mv-cable/${item?.id}`
                    }`
                  );
                }}
              >
                <div className="inner">
                  <div className="card-top">
                    <h5>{item.name}</h5>
                    <div
                      className={`project-status ${
                        item?.status === 1
                          ? "pending"
                          : item?.status === 2
                          ? "Inprogress"
                          : ""
                      }`}
                    >
                      {item?.status === 3 ? (
                        <Check size={14} color="#166534" />
                      ) : item?.status === 2 ? (
                        <Info size={14} color="#2563eb" />
                      ) : (
                        <Timer size={14} color="#d97706" />
                      )}
                      {item?.status === 3
                        ? "Completed"
                        : item?.status === 2
                        ? "In-progress"
                        : "Pending"}
                    </div>
                  </div>
                  <span>
                    {item?.type === "pv" ? "PV Project" : "MV Project"}
                  </span>
                  <div className="deadline">
                    <div>
                      <Calendar size={16} /> Deadline :{" "}
                      {getFullDate(item?.deadline)}
                    </div>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default LatestAddedProjects;
