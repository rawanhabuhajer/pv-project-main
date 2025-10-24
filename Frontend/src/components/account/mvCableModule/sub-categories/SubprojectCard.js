import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

import {
  Check,
  CircleDotDashed,
  EllipsisVertical,
  Info,
  PenLine,
  Timer,
  Trash2,
} from "lucide-react";
import { Dropdown } from "react-bootstrap";
import SubCategoryUpdate from "./SubCategoryUpdate";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { deleteMvProjectSubById, editMvProjectSubById } from "@/store/actions";
import toast from "react-hot-toast";

const SubprojectCard = ({ projectId, subproject }) => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { user } = useSelector((state) => state.authentication);
  const { pvSubProjectsData } = useSelector((state) => state.projects);
  const statusCategories = [
    { label: "Pending", value: 1 },
    { label: "In-progress", value: 2 },
    { label: "Completed", value: 3 },
  ];
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [tableData, setTableData] = useState();

  const pdfDownloaderRef = useRef();

  const [isExporting, setIsExporting] = useState(false);

  // update tableData when new data comes in
  useEffect(() => {
    if (pvSubProjectsData) {
      setTableData(pvSubProjectsData?.subcategory?.data[0]);
    }
  }, [pvSubProjectsData]);

  // export only once when tableData is ready
  useEffect(() => {
    if (tableData && Object.keys(tableData).length > 0 && isExporting) {
      pdfDownloaderRef.current?.exportToPDF();
      setIsExporting(false); // reset flag
    }
  }, [tableData, isExporting]);
  return (
    <>
      <div className="subproject-card">
        <div className="card-header">
          <div className="card-header-content">
            <h3 className="card-title">{subproject?.name}</h3>
            <div className="dropdown-side">
              <div
                className={`project-status ${
                  subproject?.status === 1
                    ? "pending"
                    : subproject?.status === 2
                    ? "Inprogress"
                    : ""
                } `}
              >
                {" "}
                {subproject?.status === 3 ? (
                  <Check size={14} color="#166534" />
                ) : subproject?.status === 2 ? (
                  <Info size={14} color="#2563eb" />
                ) : (
                  <Timer size={14} color="#d97706" />
                )}
                {subproject?.status === 3
                  ? "Completed"
                  : subproject?.status === 2
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
                      setIsUpdateFormOpen(subproject?._id);
                    }}
                  >
                    <PenLine size={18} />
                    &nbsp; Edit project details
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(
                        deleteMvProjectSubById({
                          subProjectId: subproject?._id,
                          projectId: projectId,
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

                    {statusCategories?.map((item) => (
                      <div className="form_radio_btn" key={item?.value}>
                        <label>
                          <input
                            type="radio"
                            value={subproject?.status}
                            onChange={() => {
                              dispatch(
                                editMvProjectSubById({
                                  subProjectId: subproject?._id,
                                  projectId,
                                  cookies,
                                  toast,
                                  dispatch,
                                  userId: user?.id,
                                  data: {
                                    status: item?.value,
                                  },
                                })
                              );
                            }}
                            // disabled={disabled}
                            name="status"
                            checked={item?.value === subproject?.status}
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
        </div>
        <div className="card-content">
          <p className="card-date">
            Created{" "}
            {format(subproject?.createdAt || new Date(), "MMM dd, yyyy")}
          </p>
          <p className="card-description">{subproject?.description}</p>
        </div>

        <div className="card-footer">
          <Link
            href={`/account/mv-cable/subcategories/${subproject?._id}`}
            className="card-button-link"
          >
            <button className="card-button">View Project</button>
          </Link>
        </div>
      </div>

      <SubCategoryUpdate
        isOpen={isUpdateFormOpen}
        onClose={() => setIsUpdateFormOpen(null)}
        subproject={subproject}
        projectId={projectId}
      />
    </>
  );
};

export default SubprojectCard;
