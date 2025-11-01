import { getFullDate } from "@/helpers/functions";
import {
  ArrowRight,
  Calendar,
  Check,
  ClockAlert,
  Info,
  Timer,
} from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const NearDeadlineList = () => {
  const { nearDeadlineProjects } = useSelector((state) => state.dashboard);

  const router = useRouter();

  return (
    <div className="NearDeadlineList">
      <h2>Upcoming Project Closures</h2>
      {nearDeadlineProjects?.categories?.length > 0 ||
      nearDeadlineProjects?.mvCategories?.length > 0 ? (
        <div className="inner">
          {/* CATEGORIES */}
          {nearDeadlineProjects?.categories
            ?.filter((item) => item?.status !== 3)
            ?.map((item, index) => (
              <div
                key={`cat-${index}`}
                className={`deadline-item ${
                  item?.status === 1
                    ? "danger"
                    : item?.status === 2
                    ? "warning"
                    : ""
                }`}
                onClick={() => {
                  router?.push(`${`/account/projects/${item?._id}`}`);
                }}
              >
                <div className="title">
                  <div className="icon">
                    <ClockAlert size={20} />
                  </div>
                  <h5>{item?.name}</h5>
                </div>

                <div className="date-status">
                  <div className="date-wr">
                    <Calendar size={16} color="#000" />
                    <span>Deadline : {getFullDate(item?.deadline)}</span>
                  </div>
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

                <p>{item?.description}</p>

                <div className="action-btn">
                  <span>Take Action</span> <ArrowRight size={18} />
                </div>
              </div>
            ))}

          {/* MV CATEGORIES */}
          {nearDeadlineProjects?.mvCategories?.map((item, index) => (
            <div
              key={`mv-${index}`}
              className={`deadline-item ${item?.status !== 3 ? "danger" : ""}`}
              onClick={() => {
                router?.push(`/account/mv-cable/${item?._id}`);
              }}
            >
              <div className="title">
                <div className="icon">
                  <ClockAlert size={20} />
                </div>
                <h5>{item?.name}</h5>
              </div>

              <div className="date-status">
                <div className="date-wr">
                  <Calendar size={16} color="#000" />
                  <span>Deadline : {getFullDate(item?.deadline)}</span>
                </div>
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

              <p>{item?.description}</p>

              <div className="action-btn">
                <span>Take Action</span> <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>No near-deadline projects</p>
        </div>
      )}
    </div>
  );
};

export default NearDeadlineList;
