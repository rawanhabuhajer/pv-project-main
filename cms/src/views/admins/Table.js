import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Col, Dropdown } from "react-bootstrap";

import Filter from "components/shared/Filter";
import Loader from "components/shared/Loader";

import dotsImg from "../../assets/svgs/dots.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAdmin, getAdmins } from "store/actions";
import toast from "react-hot-toast";

const Table = ({ admins }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = admins?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Filter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleEditAdmin = (id) => {
    navigate(`/admins/${id}`);
  };

  const handleDeleteAdmin = async (id) => {
    try {
      dispatch(
        deleteAdmin({
          id: id,
          toast,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "الاسم",
      selector: (row) => row?.username,
      sortable: true,
    },
    {
      name: "البريد الإلكتروني",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "الموبايل",
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },

    {
      cell: (row) => (
        <>
          <div className="global-dropdown">
            <Dropdown>
              <Dropdown.Toggle>
                <img src={dotsImg} alt="remove" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => handleEditAdmin(row._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="#fff"
                    className="bi bi-pencil edit"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                  تعديل
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleDeleteAdmin(row._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="#fff"
                    className="bi bi-trash delete"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                  حذف
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </>
      ),
      allowOverflow: true,
      button: true,
      width: "56px",
    },
  ];

  return (
    <>
      <div className="table-wrap">
        <div className="card">
          <Col xl={6} md={12} xs={12}>
            <div className="card-head">
              <div>
                <h4>جميع المديرين</h4>
                <p>يعرض هذا الجدول جميع المديرين</p>
              </div>
            </div>
          </Col>
          <div className="card-body">
            <DataTable
              columns={columns}
              data={filteredItems}
              defaultSortField="name"
              // selectableRows
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
