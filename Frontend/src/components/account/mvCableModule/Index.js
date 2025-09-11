import React, { useState, useEffect, CSSProperties } from "react";

import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import AddNewProject from "./AddNewProject";
import styles from "./style.module.scss";

import { PaginationControl } from "react-bootstrap-pagination-control";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import { PuffLoader } from "react-spinners";
import NewProjectCard from "../project/NewProjectCard";
import {
  ArrowDownNarrowWide,
  Funnel,
  ListFilter,
  Search,
  Send,
  X,
} from "lucide-react";
import ProjectForm from "./ProjectForm";
import { addMvProjects, addPvProjects, getMvProjects } from "@/store/actions";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import HeroImage from "../assets/images/pv/MV6.png";
import NoDataImage from "../assets/images/noData.svg";
import Image from "next/future/image";
import ResultModal from "./ResultModal";

const index = () => {
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [categoriesData, setCategoriesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(true);
  //   const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.authentication);
  const [selectedSort, setSelectedSort] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const dispatch = useDispatch();
  const { MvProjectsMeta, MvProjectsLoading, MvProjects } = useSelector(
    (state) => state.projects
  );
  const cookies = parseCookies();
  const statusCategories = [
    { label: "Pending", value: 1 },
    { label: "In-progress", value: 2 },
    { label: "Completed", value: 3 },
  ];
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formData = {
    name: projectName,
    description: projectDescription,
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(
        getMvProjects({
          userId: user?.id,
          pageNumber: 1,
          pageSize: 10,
          cookies,
          selectedSort: selectedSort
            ? selectedSort
            : "&sortBy=updatedAt&order=des",
          searchValue: searchValue,
          status: selectedFilter,
        })
      );
    }
  }, [user?.id]);

  const handleCreateProject = ({ title, description, deadline }) => {
    if (user?.id) {
      dispatch(
        addMvProjects({
          cookies,
          toast,
          userId: user?.id,
          data: {
            name: title,
            description: description,
            deadline: deadline,
          },
        })
      );
    }
  };

  const handleClickSearch = () => {
    dispatch(
      getMvProjects({
        userId: user?.id,
        pageNumber: 1,
        pageSize: 10,
        cookies,
        selectedSort: selectedSort
          ? selectedSort
          : "&sortBy=updatedAt&order=des",
        searchValue: searchValue,
        status: "",
      })
    );
  };

  return (
    <div className={styles["projectsPage-wrapper"]}>
      <>
        <div className="hero-section">
          <div
            className="text-section"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <h1>
              Secure AI Conversations for <br></br>
              <span>Photovoltaic Module</span>
            </h1>
            <div className="right-side">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="search for project name"
                  className="form-control"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (searchValue.trim() === "") return;
                    else if (e.key === "Enter") {
                      e.preventDefault();
                      handleClickSearch();
                    }
                  }}
                  value={searchValue}
                />
                {searchValue?.length > 0 && (
                  <button
                    className="delete-search"
                    onClick={() => {
                      setSearchValue("");
                      setSelectedFilter("");
                      dispatch(
                        getMvProjects({
                          userId: user?.id,
                          pageNumber: 1,
                          pageSize: 10,
                          cookies,
                          selectedSort: selectedSort
                            ? selectedSort
                            : "&sortBy=updatedAt&order=des",
                          searchValue: "",
                          status: "",
                        })
                      );
                    }}
                  >
                    <X color="#fff" size={24} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickSearch();
                  }}
                  disabled={
                    searchValue?.length < 1 || searchValue.trim() === ""
                  }
                >
                  <Send color="#ffffff" size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="heroImg">
            <Image
              src={HeroImage}
              alt="Hero"
              fill
              style={{ objectFit: "cover" }}
            />
            {/* <HeroImage /> */}
          </div>
        </div>
        <div className="page-header">
          <div>
            <h1 className="page-title">MV cable projects</h1>
            <p className="page-description">
              Manage all your projects and create new ones.
            </p>
          </div>
          <div className="right-side filterButton">
            <Dropdown>
              <Dropdown.Toggle>
                Filter &nbsp;
                <Funnel color="#333" size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <h3 className="status-wrapper"> Filter status : </h3>
                <div className="status-container">
                  {statusCategories?.map((item, index) => (
                    <div className="form_radio_btn">
                      <label>
                        <input
                          type="radio"
                          value={item?.value}
                          onChange={(e) => {
                            setSelectedFilter(e.target.value);
                            dispatch(
                              getMvProjects({
                                userId: user?.id,
                                pageNumber: 1,
                                pageSize: 10,
                                cookies,
                                selectedSort: selectedSort
                                  ? selectedSort
                                  : "&sortBy=updatedAt&order=des",
                                searchValue: searchValue,
                                status: e.target.value,
                              })
                            );
                          }}
                          // disabled={disabled}
                          name="status"
                          checked={selectedFilter == item?.value}
                        />
                        <div className="check">
                          <span></span>
                        </div>{" "}
                        <div>
                          <h4>{item?.label}</h4>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="btn-wrapper">
                  <button
                    className="btn reFilter"
                    onClick={() => {
                      setSelectedFilter();
                      setSelectedSort();
                      setSearchValue("");
                      dispatch(
                        getMvProjects({
                          userId: user?.id,
                          pageNumber: 1,
                          pageSize: 10,
                          cookies,
                          selectedSort: "&sortBy=updatedAt&order=des",
                          searchValue: "",
                          status: "",
                        })
                      );
                    }}
                  >
                    Reset
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle>
                <div className="actions-icon">
                  Sort by &nbsp;
                  <ListFilter color="#111827 " size={20} />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <h3 className="status-wrapper"> Sort results by : </h3>

                <div className="form-group status">
                  <p>Project creation date </p>
                  <div className="checkbox-wrapper">
                    <div className="form-checkbox des">
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          value="&sortBy=createdAt&order=des"
                          className="form-control"
                          onChange={(e) => {
                            setSelectedSort(e.target.value);
                            dispatch(
                              getMvProjects({
                                userId: user?.id,
                                pageNumber: 1,
                                pageSize: 10,
                                cookies,
                                selectedSort: e.target.value,
                                searchValue: searchValue,
                              })
                            );
                          }}
                          checked={
                            selectedSort === "&sortBy=createdAt&order=des"
                          }
                        />

                        <span></span>
                      </label>
                    </div>
                    <div className="form-checkbox asc">
                      <label>
                        <input
                          name="sort"
                          type="radio"
                          value="&sortBy=createdAt&order=asc"
                          className="form-control"
                          onChange={(e) => {
                            setSelectedSort(e.target.value);
                            dispatch(
                              getMvProjects({
                                userId: user?.id,
                                pageNumber: 1,
                                pageSize: 10,
                                cookies,
                                selectedSort: e.target.value,
                                searchValue: searchValue,
                              })
                            );
                          }}
                          checked={
                            selectedSort === "&sortBy=createdAt&order=asc"
                          }
                        />

                        <span>
                          <div>
                            <h4>
                              <p> </p>
                            </h4>
                          </div>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group status">
                  <p>Project modification date </p>
                  <div className="checkbox-wrapper">
                    <div className="form-checkbox des">
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          value="&sortBy=updatedAt&order=des"
                          className="form-control"
                          onChange={(e) => {
                            setSelectedSort(e.target.value);
                            dispatch(
                              getMvProjects({
                                userId: user?.id,
                                pageNumber: 1,
                                pageSize: 10,
                                cookies,
                                selectedSort: e.target.value,
                                searchValue: searchValue,
                              })
                            );
                          }}
                          checked={
                            selectedSort === "&sortBy=updatedAt&order=des"
                          }
                        />

                        <span></span>
                      </label>
                    </div>
                    <div className="form-checkbox asc">
                      <label>
                        <input
                          name="sort"
                          type="radio"
                          value="&sortBy=updatedAt&order=asc"
                          className="form-control"
                          onChange={(e) => {
                            setSelectedSort(e.target.value);
                            dispatch(
                              getMvProjects({
                                userId: user?.id,
                                pageNumber: 1,
                                pageSize: 10,
                                cookies,
                                selectedSort: e.target.value,
                                searchValue: searchValue,
                              })
                            );
                          }}
                          checked={
                            selectedSort === "&sortBy=updatedAt&order=asc"
                          }
                        />

                        <span>
                          <div>
                            <h4>
                              <p> </p>
                            </h4>
                          </div>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="btn-wrapper">
                  <button
                    className="btn reFilter"
                    onClick={() => {
                      setSelectedSort("");
                      dispatch(
                        getMvProjects({
                          userId: user?.id,
                          pageNumber: 1,
                          pageSize: 10,
                          cookies,
                          selectedSort: "&sortBy=updatedAt&order=des",
                          searchValue: searchValue,
                        })
                      );
                    }}
                  >
                    Reset
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {isLoading ? (
          <div className="spinner_wrapper">
            <PuffLoader color="#4E0099" />
          </div>
        ) : (
          <>
            {MvProjects && MvProjects.length > 0 ? (
              <>
                <div className="projects-grid">
                  <NewProjectCard onClick={() => setIsFormOpen(true)} />
                  {MvProjects.map((category) => (
                    <ProjectCard key={category._id} project={category} />
                  ))}
                </div>

                <ProjectForm
                  isOpen={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                  onSave={handleCreateProject}
                />

                <div className="table--pagination">
                  <PaginationControl
                    page={page}
                    between={3}
                    total={MvProjectsMeta?.count}
                    limit={10}
                    changePage={(newPage) => {
                      setPage(newPage);
                      dispatch(
                        getMvProjects({
                          userId: user?.id,
                          pageNumber: newPage,
                          pageSize: 10,
                          cookies,
                          selectedSort: selectedSort
                            ? selectedSort
                            : "&sortBy=updatedAt&order=des",
                          searchValue: searchValue,
                          status: selectedFilter,
                          dispatch,
                        })
                      );
                    }}
                    ellipsis={2}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="projects-grid">
                  <NewProjectCard onClick={() => setIsFormOpen(true)} />
                </div>
                <div className="noData">
                  <NoDataImage />
                  <p>No data found</p>
                </div>
              </>
            )}
          </>
        )}
      </>
      {/* )} */}
    </div>
  );
};

export default index;
