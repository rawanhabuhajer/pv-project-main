import React, { useState } from "react";

import { format } from "date-fns";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import {
  CalendarDays,
  Check,
  CircleDotDashed,
  EllipsisVertical,
  Info,
  PenLine,
  Timer,
  Trash2,
} from "lucide-react";
import { deleteMvProjects, editMvProjects } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import ProjectUpdateForm from "./ProjectUpdateForm";
import { getFullDate } from "@/helpers/functions";
const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);

  const cookies = parseCookies();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const statusCategories = [
    { label: "Pending", value: 1 },
    { label: "In-progress", value: 2 },
    { label: "Completed", value: 3 },
  ];

  return (
    <div className="project-card">
      <div className="card-header">
        <div className="card-header-content">
          <h3 className="card-title">{project?.name}</h3>
          <div className="dropdown-side">
            <div
              className={`project-status ${
                project?.status === 1
                  ? "pending"
                  : project?.status === 2
                  ? "Inprogress"
                  : ""
              } `}
            >
              {" "}
              {project?.status === 3 ? (
                <Check size={14} color="#166534" />
              ) : project?.status === 2 ? (
                <Info size={14} color="#2563eb" />
              ) : (
                <Timer size={14} color="#d97706" />
              )}
              {project?.status === 3
                ? "Completed"
                : project?.status === 2
                ? "In-progress"
                : "Pending"}
            </div>
            <Dropdown>
              <Dropdown.Toggle>
                <EllipsisVertical color="#333" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setIsUpdateFormOpen(project);
                  }}
                >
                  <PenLine size={18} />
                  &nbsp; Edit project details
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    dispatch(
                      deleteMvProjects({
                        mvCategoryId: project?._id,
                        userId: user?.id,
                        cookies,
                        toast,
                        dispatch,
                      })
                    );
                  }}
                >
                  <Trash2 size={18} />
                  &nbsp; Delete project
                </Dropdown.Item>
                <div className="status-btns">
                  <h5>
                    {" "}
                    <CircleDotDashed size={18} />
                    &nbsp; change status
                  </h5>

                  {statusCategories?.map((item, index) => (
                    <div className="form_radio_btn" key={index}>
                      <label>
                        <input
                          type="radio"
                          value={project?.status}
                          onChange={() => {
                            dispatch(
                              editMvProjects({
                                mvCategoryId: project?._id,
                                cookies,
                                toast,
                                userId: user?.id,
                                dispatch,
                                data: {
                                  status: item?.value,
                                },
                              })
                            );
                          }}
                          // disabled={disabled}
                          name="status"
                          checked={item?.value === project?.status}
                        />
                        <div className="check">
                          <span></span>
                        </div>{" "}
                        <div>
                          <h4>{item?.label}</h4>
                          {/* <h6>{"subTitle"}</h6> */}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="deadline">
          <CalendarDays size={16} /> Deadline : {getFullDate(project?.deadline)}
        </div>
      </div>
      <div className="card-content">
        <p className="card-description">{project?.description}</p>
      </div>
      <p className="card-date">
        Created {format(project?.createdAt, "MMM dd, yyyy")}
      </p>
      <div className="card-footer">
        <Link
          href={`account/mv-cable/${project?._id}`}
          className="card-button-link"
        >
          <button className="card-button">View Project</button>
        </Link>
      </div>
      <ProjectUpdateForm
        isOpen={isUpdateFormOpen}
        onClose={() => setIsUpdateFormOpen(null)}
      />
    </div>
  );
};

export default ProjectCard;
