import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
import SubprojectCard from "./SubprojectCard";
import NewSubprojectCard from "./NewSubprojectCard";
import SubprojectForm from "./SubprojectForm";
import Link from "next/link";
import styles from "../styles/style.module.scss";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import {
  ArrowDownNarrowWide,
  ArrowLeft,
  Cookie,
  Funnel,
  ListFilter,
  Search,
  X,
} from "lucide-react";
import { addProjectSubById, getProjectSubById } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";

const SubprojectsPage = () => {
  const router = useRouter();
  const cookie = parseCookies();
  const [project, setProject] = useState(null);
  const [subprojects, setSubprojects] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const projectId = router.query.account[2];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const { pvSubProjectsLoading, SubProjectsMeta, pvSubProjects } = useSelector(
    (state) => state.projects
  );

  const [page, setPage] = useState(1);

  const statusCategories = [
    { label: "Pending", value: 1 },
    { label: "In-progress", value: 2 },
    { label: "Completed", value: 3 },
  ];

  useEffect(() => {
    if (projectId) {
      dispatch(
        getProjectSubById({
          pageNumber: 1,
          pageSize: 10,
          projectId: projectId,
          search: searchValue,
          sortBy: sortBy,
        })
      );
    }
  }, [projectId]);

  const handleCreateSubproject = ({ title, description }) => {
    const formData = {
      name: title,
      description: description,
      data: [
        {
          name: title,
          description: description,
          cableLength: null,
          vmp: null,
          Impp: null,
          operationTemp: null,
          classSelected: "",
          childSelected: "",
          areaSelected: null,
          conductorCableLength: null,
          seriesModule: null,
          r20: null,
          rTempreture: null,
          uTempreture: null,
          ploss: null,
          plossTemp: null,
          kt: null,
          pmax: null,
          uMax: null,
          uMaxLength: null,
          classSelectedModule: "",
          childSelectedModule: "",
          areaSelectedModule: null,
          r20Module: null,
          rTempretureModule: null,
        },
      ],
    };
    dispatch(
      addProjectSubById({
        cookie,
        projectId: projectId,
        data: formData,
        toast,
        dispatch,
      })
    );
  };

  const handleSearchSubProject = () => {
    dispatch(
      getProjectSubById({
        pageNumber: 1,
        pageSize: 10,
        search: searchValue,
        projectId: projectId,
        sortBy: sortBy,
        status: selectedFilter,
      })
    );
  };
  if (!projectId) {
    return (
      <>
        <div className="not-found">
          <p>Project not found.</p>
          <Link href="/" className="home-link">
            Return to Projects
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styles["subParoject-wrapper"]}>
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link href="/account/pv-cable">
            <a>
              <ArrowLeft size={20} color="#333" />
            </a>
          </Link>
          <div>
            <h1 className="page-title">{SubProjectsMeta?.categoryName}</h1>
            <p className="page-description">
              Manage subprojects and create new ones.
            </p>
          </div>
        </div>
        <div className="right-side">
          <div className="form-group">
            <input
              type="text"
              placeholder="search for project name"
              className="form-control"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (searchValue?.trim() === "") return;
                else if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubProject();
                }
              }}
              value={searchValue}
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSearchSubProject();
              }}
              disabled={searchValue?.length < 1 || searchValue?.trim() === ""}
            >
              <Search color="#333" size={18} />
            </button>
            {searchValue?.length > 0 && (
              <button
                type="button"
                className="closeBtn"
                onClick={async () => {
                  setSearchValue("");
                  dispatch(
                    getProjectSubById({
                      pageNumber: 1,
                      pageSize: 10,
                      search: "",
                      projectId: projectId,
                    })
                  );
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <Dropdown>
            <Dropdown.Toggle>
              <div className="actions-icon">
                <ListFilter color="#333" size={24} />
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
                        value="createdAt&order=des"
                        className="form-control"
                        onChange={(e) => setSortBy(e.target.value)}
                        checked={sortBy === "createdAt&order=des"}
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
                        onChange={(e) => setSortBy(e.target.value)}
                        checked={sortBy === "createdAt&order=asc"}
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
                        onChange={(e) => setSortBy(e.target.value)}
                        checked={sortBy === "updatedAt&order=des"}
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
                        onChange={(e) => setSortBy(e.target.value)}
                        checked={sortBy === "updatedAt&order=asc"}
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
                    handleSearchSubProject();
                  }}
                >
                  Apply filter
                </button>
                <button
                  className="btn reFilter"
                  onClick={() => {
                    setSearchValue("");
                    setSortBy("");
                    dispatch(
                      getProjectSubById({
                        pageNumber: 1,
                        pageSize: 10,
                        search: "",
                        projectId: projectId,
                        sortBy: "",
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
                <Funnel size={20} color="#333" />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <h3 className="status-wrapper"> Filter status : </h3>
              <div className="status-container">
                {statusCategories?.map((item, index) => (
                  <div className="form_radio_btn" key={item?.value}>
                    <label>
                      <input
                        type="radio"
                        value={item?.value}
                        onChange={(e) => {
                          setSelectedFilter(e.target.value);

                          dispatch(
                            getProjectSubById({
                              pageNumber: 1,
                              pageSize: 10,
                              search: searchValue,
                              projectId: projectId,
                              sortBy: sortBy,
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
                    setSearchValue("");
                    setSortBy("");
                    setSelectedFilter();
                    dispatch(
                      getProjectSubById({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchValue,
                        projectId: projectId,
                        sortBy: sortBy,
                        status: null,
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

      <div className="subprojects-grid">
        <NewSubprojectCard onClick={() => setIsFormOpen(true)} />
        {pvSubProjects?.map((subproject, index) => (
          <SubprojectCard
            key={index}
            subproject={subproject}
            projectId={projectId}
          />
        ))}
      </div>

      <SubprojectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleCreateSubproject}
      />
    </div>
  );
};
export default SubprojectsPage;
