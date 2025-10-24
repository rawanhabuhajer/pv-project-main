import React, { useEffect, useState } from "react";

import ProjectCard from "./ProjectCard";
import NewProjectCard from "./NewProjectCard";

import styles from "./styles/style.module.scss";
import ProjectForm from "./ProjectForm";
import { Dropdown } from "react-bootstrap";
import { Funnel, ListFilter, Send, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addPvProjects, getPvProjects } from "@/store/actions";

import { PuffLoader } from "react-spinners";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";

import Image from "next/future/image";
import HeroImage from "../assets/images/pv/pv.png";
// Mock initial projects

const Index = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const { pvProjects, pvProjectsMeta, pvProjectsLoading } = useSelector(
    (state) => state.projects
  );
  const cookies = parseCookies();
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState();
  const [selectedFilter, setSelectedFilter] = useState("");

  const statusCategories = [
    { label: "Pending", value: 1 },
    { label: "In-progress", value: 2 },
    { label: "Completed", value: 3 },
  ];

  const handleCreateProject = ({ title, description, deadline }) => {
    if (user?.id) {
      dispatch(
        addPvProjects({
          cookies,
          toast,
          userId: user?.id,
          data: {
            name: title,
            description: description,
            deadline: deadline,
          },
          dispatch,
        })
      );
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(
        getPvProjects({
          pageNumber: 1,
          pageSize: 10,
          userId: user?.id,
          searchValue: searchValue || "",
          selectedSort: selectedSort || "createdAt&order=desc",
          status: "",
        })
      );
    }
  }, [user?.id]);

  return (
    <div className={styles["projectsPage-wrapper"]}>
      <div className="hero-section">
        <div
          className="text-section"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <h1>
            Optimize Every Watt By <br></br>
            <span>PV Cable Sizer IEC 60364 – IEC 60228</span>
          </h1>
          <div className="right-side">
            <div className="form-group">
              <input
                type="text"
                placeholder="search for project name"
                className="form-control"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setSelectedFilter("");
                    dispatch(
                      getPvProjects({
                        pageNumber: page,
                        pageSize: 10,
                        userId: user?.id,
                        selectedSort: selectedSort || "createdAt&order=desc",
                        searchValue: searchValue || "",
                        status: "",
                      })
                    );
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
                      getPvProjects({
                        pageNumber: page,
                        pageSize: 10,
                        userId: user?.id,
                        selectedSort: selectedSort || "createdAt&order=desc",
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
                  setSelectedFilter("");
                  dispatch(
                    getPvProjects({
                      pageNumber: page,
                      pageSize: 10,
                      userId: user?.id,
                      selectedSort: selectedSort || "createdAt&order=desc",
                      searchValue: searchValue || "",
                      status: "",
                    })
                  );
                }}
                disabled={searchValue?.length < 1}
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
          <h1 className="page-title">PV Cable Projects</h1>
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
                  <div className="form_radio_btn" key={index}>
                    <label>
                      <input
                        type="radio"
                        value={item?.value}
                        onChange={(e) => {
                          setSelectedFilter(e.target.value);
                          dispatch(
                            getPvProjects({
                              pageNumber: 1,
                              pageSize: 10,
                              userId: user?.id,
                              searchValue: searchValue,
                              selectedSort: selectedSort,
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
                    dispatch(
                      getPvProjects({
                        pageNumber: 1,
                        pageSize: 10,
                        userId: user?.id,
                        searchValue: searchValue,
                        selectedSort: selectedSort,
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
              Sort by &nbsp;
              <ListFilter color="#333" size={20} />
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
                        value="createdAt&order=des"
                        className="form-control"
                        onChange={(e) => setSelectedSort(e.target.value)}
                        checked={selectedSort === "createdAt&order=des"}
                      />

                      <span></span>
                    </label>
                  </div>
                  <div className="form-checkbox asc">
                    <label>
                      <input
                        name="sort"
                        type="radio"
                        value="createdAt&order=asc"
                        className="form-control"
                        onChange={(e) => setSelectedSort(e.target.value)}
                        checked={selectedSort === "createdAt&order=asc"}
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
                        value="updatedAt&order=des"
                        className="form-control"
                        onChange={(e) => setSelectedSort(e.target.value)}
                        checked={selectedSort === "updatedAt&order=des"}
                      />

                      <span></span>
                    </label>
                  </div>
                  <div className="form-checkbox asc">
                    <label>
                      <input
                        name="sort"
                        type="radio"
                        value="updatedAt&order=asc"
                        className="form-control"
                        onChange={(e) => setSelectedSort(e.target.value)}
                        checked={selectedSort === "updatedAt&order=asc"}
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
                  className="btn"
                  onClick={() => {
                    dispatch(
                      getPvProjects({
                        pageNumber: page,
                        pageSize: 10,
                        userId: user?.id,
                        selectedSort: selectedSort || "createdAt&order=desc",
                        searchValue: searchValue || "",
                      })
                    );
                  }}
                >
                  Apply filter
                </button>
                <button
                  className="btn reFilter"
                  onClick={() => {
                    setSearchValue("");
                    setSelectedSort();
                    dispatch(
                      getPvProjects({
                        pageNumber: page,
                        pageSize: 10,
                        userId: user?.id,
                        selectedSort: "createdAt&order=desc",
                        searchValue: searchValue || "",
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
      {pvProjectsLoading ? (
        <div className="spinner_wrapper">
          <PuffLoader color="#4E0099" />
        </div>
      ) : (
        <>
          <div className="projects-grid">
            <NewProjectCard onClick={() => setIsFormOpen(true)} />
            {pvProjects?.map((project) => (
              <ProjectCard key={project?._id} project={project} />
            ))}
          </div>

          <ProjectForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={handleCreateProject}
          />

          <div className="table--pagination">
            <PaginationControl
              page={1}
              between={3}
              total={pvProjectsMeta?.count}
              limit={pvProjectsMeta?.pageSize}
              changePage={(page) => {
                setPage(page);
                dispatch(
                  getPvProjects({
                    pageNumber: page,
                    pageSize: 10,
                    userId: user?.id,
                    selectedSort: selectedSort || "createdAt&order=desc",
                    searchValue: searchValue || "",
                    status: selectedFilter || "",
                  })
                );
              }}
              ellipsis={2}
            />
          </div>
        </>
      )}
    </div>
    // </Layout>
  );
};
export default Index;
