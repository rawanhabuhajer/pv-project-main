import React, { useMemo, useState } from "react";

import { Col, Dropdown, Row, Table as TableBoots } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteUser, getUsers, unVerifyUser } from "store/actions";

import Filter from "components/shared/Filter";
import VerifyModal from "./VerifyModal";

import dotsImg from "../../assets/svgs/dots.svg";
import editIcon from "../../assets/svgs/edit.svg";
import deleteIcon from "../../assets/svgs/delete.svg";
import deActiveIcon from "../../assets/svgs/deActive.svg";

import resetIcon from "../../assets/svgs/reset.svg";
import sortIcon from "../../assets/svgs/sort.svg";

const Table = ({
  users,
  page,
  pageSize,
  selectedDate,
  logedInDate,
  isFreeTrial,
  setSelectedDate,
  isExternalUser,
  setIsFreeTrial,
  IsVerified,
  setIsVerified,
  setCompanyName,
  CompanyName,
  SearchValue,
  setSearchValue,
  setPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [filterText, setFilterText] = useState("");
  const [companyText, setCompanyText] = useState("");

  const [searchParams] = useSearchParams();
  const search = Object.fromEntries([...searchParams]);

  const handleSearch = () => {
    dispatch(
      getUsers({
        pageNumber: page,
        pageSize: pageSize,
        SearchValue: SearchValue || "",
        IsVerified: IsVerified,
      })
    );
  };

  const handleFilterTextChange = (e) => {
    const newFilterText = e.target.value;
    setPage(1);
    setSearchValue(newFilterText);
  };

  const handleCompanyTextChange = (e) => {
    const newCompanyText = e.target.value;
    setPage(1);
    setCompanyName(newCompanyText);
  };

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      setSearchValue("");
      setFilterText("");
      setCompanyText("");

      dispatch(
        getUsers({
          pageNumber: 1,
          pageSize: 10,
          SearchValue: "",
          IsVerified: null,
        })
      );
    };

    return (
      <div className="header-action-wrapper">
        <Filter
          onFilter={handleFilterTextChange}
          onClear={handleClear}
          filterText={filterText}
          placeholder="بحث عن مستخدم"
          setSearchValue={setSearchValue}
          SearchValue={SearchValue}
          onclick={handleSearch}
        />
        <Filter
          placeholder="بحث عن شركة"
          onFilter={handleCompanyTextChange}
          filterText={companyText}
          onClear={handleClear}
        />
        <div className="actions-wrapper">
          <Dropdown>
            <Dropdown.Toggle>
              <div className="actions-icon">
                <img src={sortIcon} alt="sort" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <p className="title">ترتيب النتائج حسب :</p>
              <div className="allFilters-wrapper">
                <div className="filter-wrapper">
                  <p className="filter-title">تاريخ التسجيل</p>
                  <div>
                    {[
                      {
                        label: "تاريخ التسجيل الأحدث",
                        value: "true",
                      },
                      {
                        label: "تاريخ التسجيل الأقدم",
                        value: "false",
                      },
                    ].map((date, index) => (
                      <div className="form-group" key={index}>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="IsDesJoiningDate"
                              value={date?.value}
                              className="form-checkbox"
                              checked={selectedDate === date.value}
                              onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setPage(1);
                                dispatch(
                                  getUsers({
                                    pageNumber: 1,
                                    pageSize: pageSize,
                                    SearchValue: SearchValue || "",
                                    CompanyName: CompanyName || "",
                                    IsDesJoiningDate: e.target.value,
                                    IsFreeTrial: isFreeTrial,
                                    IsExternal: isExternalUser,
                                    IsDesLastLogin: logedInDate,
                                    IsVerified: IsVerified,
                                  })
                                );
                              }}
                            />

                            <span>
                              <p>{date?.label}</p>
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="filter-wrapper">
                  <p className="filter-title">تجربة مجانية</p>
                  <div>
                    {[
                      {
                        label: "نعم",
                        value: "true",
                      },
                      {
                        label: "لا",
                        value: "false",
                      },
                    ].map((date, index) => (
                      <div className="form-group" key={index}>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="isFreeTrial"
                              value={date?.value}
                              className="form-checkbox"
                              checked={isFreeTrial === date.value}
                              onChange={(e) => {
                                setIsFreeTrial(e.target.value);
                                setPage(1);
                                dispatch(
                                  getUsers({
                                    pageNumber: 1,
                                    pageSize: pageSize,
                                    SearchValue: SearchValue || "",
                                    CompanyName: CompanyName || "",
                                    IsFreeTrial: e.target.value,
                                    IsExternal: isExternalUser,
                                    IsDesLastLogin: logedInDate,
                                    IsDesJoiningDate: selectedDate,
                                    IsVerified: IsVerified,
                                  })
                                );
                              }}
                            />

                            <span>
                              <p>{date?.label}</p>
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="filter-wrapper">
                  <p className="filter-title">التفعيل</p>
                  <div>
                    {[
                      {
                        label: "مفعل",
                        value: "true",
                      },
                      {
                        label: "غير مفعل",
                        value: "false",
                      },
                    ].map((date, index) => (
                      <div className="form-group" key={index}>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="IsVerified"
                              value={date?.value}
                              className="form-checkbox"
                              checked={IsVerified === date.value}
                              onChange={(e) => {
                                setIsVerified(e.target.value);
                                setPage(1);
                                dispatch(
                                  getUsers({
                                    pageNumber: 1,
                                    pageSize: pageSize,
                                    SearchValue: SearchValue || "",
                                    CompanyName: CompanyName || "",
                                    IsFreeTrial: isFreeTrial,
                                    IsExternal: isExternalUser,
                                    IsDesLastLogin: logedInDate,
                                    IsDesJoiningDate: selectedDate,
                                    IsVerified: e.target.value,
                                  })
                                );
                              }}
                            />

                            <span>
                              <p>{date?.label}</p>
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="filter-wrapper">
                <button
                  className="reset-btn"
                  onClick={() => {
                    setSelectedDate("");
                    setIsFreeTrial("");
                    setIsVerified("");
                    setPage(1);
                    dispatch(
                      getUsers({
                        pageNumber: 1,
                        pageSize: pageSize,
                        SearchValue: SearchValue || "",
                        CompanyName: CompanyName || "",
                      })
                    );
                  }}
                >
                  إعادة تعيين
                </button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button
          onClick={() => {
            handleClear();
            setSelectedDate("");

            setIsFreeTrial("");

            setIsVerified("");
            setPage(1);
            dispatch(
              getUsers({
                pageNumber: 1,
                pageSize: pageSize,
                SearchValue: "",
                CompanyName: "",
              })
            );
          }}
          className="reset-btn-header"
        >
          <img src={resetIcon} alt="" />
        </button>
      </div>
    );
  }, [filterText, search, navigate]);

  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      dispatch(
        deleteUser({
          id,
          toast,
          dispatch,
          search,
          SearchValue,
          CompanyName,
          page,
          pageSize,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeActivate = async (row) => {
    try {
      dispatch(
        unVerifyUser({
          id: row?._id,
          toast,
          dispatch,
          page,
          pageSize,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (userRow) => {
    setSelectedUser(userRow);
    setShow(true);
  };

  const columns = [
    { name: "الإسم" },
    { name: "الشركة " },
    { name: "البريد الإلكتروني" },
    { name: "الموبايل" },
    { name: "الحالة" },
    { name: "تاريخ التسجيل" },
    { name: "اعدادت" },
  ];

  const usersData = users?.map((item, index) => (
    <tr key={index}>
      <td>{item?.username}</td>
      <td>{item?.companyName}</td>
      <td>{item?.email}</td>
      <td>{item?.phoneNumber}</td>
      <td>
        {item?.isVerified ? (
          "مفعل"
        ) : (
          <button className="btn btn-blue" onClick={() => handleShow(item)}>
            تفعيل
          </button>
        )}
      </td>
      <td>
        {item?.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
      </td>
      <td>
        <div className="global-dropdown">
          <Dropdown>
            <Dropdown.Toggle>
              <img src={dotsImg} alt="remove" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleEdit(item?._id)}>
                <i className="info">
                  <img src={editIcon} alt="edit" />
                </i>
                تعديل
              </Dropdown.Item>
              {item?.isVerified && (
                <Dropdown.Item onClick={() => handleDeActivate(item)}>
                  <i className="delete">
                    <img src={deActiveIcon} alt="deActivate" />
                  </i>
                  إلغاء التفعيل
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => handleDelete(item?._id)}>
                <i className="delete">
                  <img src={deleteIcon} alt="delete" />
                </i>
                حذف
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <Row>
        <Col lg={12}></Col>
      </Row>
      <div className="table-wrap">
        <div className="card">
          <Col xl={6} md={12} xs={12}>
            <div className="card-head">
              <div>
                <h4>
                  <FormattedMessage id="users" />
                </h4>
                <p>
                  يعرض هذا الجدول <FormattedMessage id="users" />
                </p>
              </div>
            </div>
          </Col>
          <div className="card-body">
            {subHeaderComponent}
            <TableBoots
              responsive
              striped
              bordered
              hover
              className="custom-table text-center align-middle"
            >
              <thead className="table-dark">
                {columns?.map((head, index) => (
                  <th key={index}>{head?.name}</th>
                ))}
              </thead>
              <tbody>{usersData}</tbody>
            </TableBoots>
          </div>
        </div>
      </div>
      {show && (
        <VerifyModal
          show={show}
          setShow={setShow}
          selectedUser={selectedUser}
          search={search}
          page={page}
          pageSize={pageSize}
          SearchValue={SearchValue}
          CompanyName={CompanyName}
          selectedDate={selectedDate}
          logedInDate={logedInDate}
          isFreeTrial={isFreeTrial}
          isExternalUser={isExternalUser}
          IsVerified={true}
        />
      )}
    </>
  );
};

export default Table;
