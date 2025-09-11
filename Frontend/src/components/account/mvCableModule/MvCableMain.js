import React, { useState, useEffect, CSSProperties } from "react";
import Card from "../../components/card/Card";
import "../categories/categories.css";
import { Link } from "react-router-dom";
import ModalComponent from "../../components/modal/ModalComponent";
import axios from "axios";
// import UseAuthContext from "../../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoader from "react-spinners/FadeLoader";
import AddNewProject from "./AddNewProject";
import styles from "./style.module.scss";

import { PaginationControl } from "react-bootstrap-pagination-control";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import SortIcon from "../../assets/sort.svg";
import AscIcon from "../../assets/ascIcon.svg";
import CloseIcon from "../../assets/close.svg";
import SearchIcon from "../../assets/search.svg";
import { useSelector } from "react-redux";
import { getMvProjects } from "@/store/actions";
const MvCableMain = () => {
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [categoriesData, setCategoriesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const { user, loading } = UseAuthContext();
  const { user } = useSelector((state) => state.authentication);
  const [selectedSort, setSelectedSort] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formData = {
    name: projectName,
    description: projectDescription,
  };

  useEffect(() => {
    if (user) {
      dispatch(
        getMvProjects({
          userId: user?.id,
          pageNumber: 1,
          pageSize: 8,
          selectedSort: selectedSort,
          searchValue: searchValue,
        })
      );
    }
  }, [user]);

  const handleSaveCategory = async (event) => {
    event.preventDefault();
    // setIsLoading(true)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/mvCategories/${user?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProjectDescription("");
      setProjectName("");
      handleClose();

      toast.success("Project added sucssesfully");
      setIsLoading(false);
    } catch (err) {
      toast.error("Please provide project details");
    }
  };

  const handleUpdateCategory = async (mvCategoryId) => {
    setIsLoading(true);

    try {
      // Ensure categoryData is structured as expected
      const response = await axios.patch(
        `http://localhost:8000/api/mvCategories/singlecategory/${mvCategoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Category updated successfully");
      getmvCategoriesApi();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || "Failed to update category");
    }
  };

  const handleDeleteCategory = async (mvCategoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/mvCategories/singlecategory/${mvCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getmvCategoriesApi();
      toast.success("Category deleted successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("Error deleting category", err);
      toast.error("Error occurred while deleting category");
    }
  };

  const handleClickSearch = () => {
    dispatch(
      getMvProjects({
        userId: user?.id,
        pageNumber: 1,
        pageSize: 8,
        selectedSort: selectedSort,
        searchValue: searchValue,
      })
    );
  };

  return (
    <div className={styles["mvCableMain-wrapper"]}>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "85vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FadeLoader color="#546672" size={75} />
        </div>
      ) : (
        <>
          <div className="hero">
            <img src={heroImage} className="hero-image" />
            <h1>MV cable projects</h1>
            <div className="overlay"></div>

            {/* <ToastContainer /> */}
            <div className="overlay"></div>
            <div className="categories-container">
              <div>
                <div className="card-header">
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        disabled={
                          searchValue.length < 1 || searchValue.trim() === ""
                        }
                      >
                        <img src={SearchIcon} />
                      </button>
                      {searchValue.length > 0 && (
                        <button
                          type="button"
                          className="closeBtn"
                          onClick={async () => {
                            setSearchValue("");

                            setIsLoading(true);
                            try {
                              const response = await axios.get(
                                `http://localhost:8000/api/mvCategories/${
                                  user?.id
                                }?page=${1}&limit=12&${
                                  selectedSort || "sortBy=updatedAt&order=desc"
                                }&search=`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${user.token}`,
                                  },
                                }
                              );
                              const { data, totalCategories } = response.data;
                              setCategoriesData(data.Mvcategories);
                              setTotalPages(totalCategories);
                              setIsLoading(false);
                            } catch (err) {
                              console.log("err", err);
                            }
                          }}
                        >
                          <img src={CloseIcon} alt="Close" />
                        </button>
                      )}
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle>
                        <div className="actions-icon">
                          <img src={SortIcon} />
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
                                  onChange={(e) =>
                                    setSelectedSort(e.target.value)
                                  }
                                  checked={
                                    selectedSort ===
                                    "&sortBy=createdAt&order=des"
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
                                  onChange={(e) =>
                                    setSelectedSort(e.target.value)
                                  }
                                  checked={
                                    selectedSort ===
                                    "&sortBy=createdAt&order=asc"
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
                                  onChange={(e) =>
                                    setSelectedSort(e.target.value)
                                  }
                                  checked={
                                    selectedSort ===
                                    "&sortBy=updatedAt&order=des"
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
                                  onChange={(e) =>
                                    setSelectedSort(e.target.value)
                                  }
                                  checked={
                                    selectedSort ===
                                    "&sortBy=updatedAt&order=asc"
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
                            className="btn"
                            // onClick={() => {
                            //   getCategoriesApi(page);
                            // }}
                          >
                            Apply filter
                          </button>
                          <button className="btn reFilter">Reset</button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <AddNewProject
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    open={open}
                    setProjectName={setProjectName}
                    setProjectDescription={setProjectDescription}
                    projectDescription={projectDescription}
                    projectName={projectName}
                    onclick={handleSaveCategory}
                    onclickCancel={handleClose}
                  />
                </div>
                {categoriesData && categoriesData.length > 0 ? (
                  <div className="card_wrapper">
                    {categoriesData.map((category, index) => (
                      <Card
                        key={index}
                        category={category}
                        onClick={() => navigate(`/mv-cable/${category._id}`)}
                        handleDeleteCategory={handleDeleteCategory}
                        handleEditCategory={handleUpdateCategory}
                        setProjectName={setProjectName}
                        setProjectDescription={setProjectDescription}
                        projectDescription={projectDescription}
                        projectName={projectName}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="noData">
                    There isn't any category added yet.
                  </div>
                )}
              </div>
              <div className="table--pagination">
                <PaginationControl
                  page={page}
                  between={2}
                  total={totalPages}
                  limit={12}
                  changePage={(newPage) => {
                    setPage(newPage);
                  }}
                  ellipsis={2}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MvCableMain;
