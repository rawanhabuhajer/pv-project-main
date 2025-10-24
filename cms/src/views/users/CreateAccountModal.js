import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/svgs/search.svg";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";
import {
  assignCompany,
  createNewAccount,
  getAllCompanies,
  removeAssignedCompany,
} from "store/actions";
const CreateAccountModal = ({
  showCreateAccountModal,
  setShowCreateAccountModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFreeTrial, setIsFreeTrial] = useState(true);
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [companiesPage, setCompaniesPage] = useState(1);
  const [companiesMetadata, setCompaniesMetadata] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const { AllCompanies } = useSelector((state) => state.authentication);
  // const minDate = new Date();
  const minDate = new Date().toISOString().split("T")[0];

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${year}-${month < 10 ? "0" + month : month}-${day}`;
  };

  const onSubmit = (formData) => {
    if (!selectedCompany?.id) {
      return toast.error("يجب اختيار شركة من قائمة الشركات المتاحة");
    }

    const fromDateSub = formatDate(startDate);
    const toDateSub = formatDate(endDate);

    dispatch(
      createNewAccount({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          freeTrial: isFreeTrial,
          companyId: selectedCompany.id,
          fromDateSub,
          toDateSub,
        },
        toast,
        setShowCreateAccountModal,
        dispatch,
      })
    );
  };

  const handleSearch = () => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}/etimad/GetEtimadCompanies?SearchValue=${searchValue}&pageSize=10&pageNumber=${companiesPage}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setCompanies(res?.data?.responseData?.items);
    //     setCompaniesMetadata({
    //       pageIndex: res?.data?.responseData?.pageIndex,
    //       count: res?.data?.responseData?.count,
    //       pageSize: res?.data?.responseData?.pageSize,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setCompaniesPage(1);
    dispatch(
      getAllCompanies({
        SearchValue: searchValue,
        PageNumber: 1,
        PageSize: 10,
      })
    );
  };

  return (
    <Modal
      show={showCreateAccountModal}
      onHide={() => {
        setShowCreateAccountModal(false);
      }}
      centered
      dialogClassName="modal-verify modal-big"
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <p>إضافة مستخدم جديد</p>
        </Modal.Title>
      </Modal.Header>

      <div className="card-body createNewAccount-modal assign-company verify-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xl={12} md={12}>
            <Row>
              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>الاسم الاول</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="الاسم الاول"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.firstName && "يرجي ادخال الاسم الاول"}
                  </p>
                </div>
              </Col>
              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>الاسم الاخير</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="الاسم الاخير"
                      {...register("lastName", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.lastName && "يرجي ادخال الاسم الاخير"}
                  </p>
                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>البريد الالكتروني</h5>
                  <div>
                    <input
                      type="email"
                      className="form-control form-outline"
                      placeholder="البريد الالكتروني"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.email && "يرجي ادخال البريد الالكتروني"}
                  </p>
                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>رقم الهاتف</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="رقم الهاتف"
                      {...register("phone", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.phone && "يرجي ادخال رقم الهاتف"}
                  </p>
                </div>
              </Col>

              <Col lg={12} xs={12}>
                <div className="form-group required">
                  <h5>اسم الشركة</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="بحث عن الشركات"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={!searchValue}
                    >
                      <img src={searchIcon} alt="search" className="search" />
                    </button>
                  </div>{" "}
                  {searchValue && (
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={!searchValue}
                      className="search-costum-btn  "
                    >
                      ابحث
                    </button>
                  )}
                  <p className="error-hint">
                    {errors?.companyName && "يرجي ادخال اسم الشركة"}
                  </p>
                  {AllCompanies?.items?.length > 0 ? (
                    <Col lg={12} md={12}>
                      <div className="form-group">
                        <label className="available-companies">
                          الشركات المتاحة
                        </label>
                        <div className="companies-list">
                          {AllCompanies?.items?.map((company, index) => (
                            <label className="form-check" key={index}>
                              <input
                                type="radio"
                                name="company"
                                onChange={() => setSelectedCompany(company)}
                                checked={selectedCompany?.id === company?.id}
                              />
                              <span>{company?.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="table--pagination ">
                        <PaginationControl
                          page={companiesPage}
                          between={3}
                          total={AllCompanies?.count || 0}
                          limit={10}
                          changePage={(page) => {
                            setCompaniesPage(page);
                            dispatch(
                              getAllCompanies({
                                SearchValue: searchValue,
                                PageNumber: page,
                                PageSize: 10,
                              })
                            );
                          }}
                          ellipsis={2}
                        />
                      </div>
                    </Col>
                  ) : (
                    searchValue &&
                    AllCompanies?.items?.length === 0 && (
                      <Col lg={12}>
                        <div className="form-group">
                          <h6 className="alert alert-warning text-center">
                            لا توجد شركات متاحة
                          </h6>
                        </div>
                      </Col>
                    )
                  )}
                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>تاريخ البداية</h5>
                  <div>
                    {/* <input
                          type="date"
                          className="form-control form-outline"
                          placeholder="تاريخ البداية"
                          {...register("fromDateSub", { required: true })}
                        /> */}
                    <Flatpickr
                      value={startDate}
                      onChange={(date) => {
                        const selectedStartDate = date[0];
                        // Ensure the selected start date is not after the end date
                        if (selectedStartDate > endDate) {
                          setEndDate(selectedStartDate);
                        }
                        setStartDate(selectedStartDate);
                      }}
                      options={{
                        dateFormat: "Y-m-d",
                        minDate: minDate,
                      }}
                      className="form-control form-select"
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.fromDateSub && "يرجي ادخال تاريخ البداية"}
                  </p>
                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>تاريخ النهاية</h5>
                  <div>
                    <Flatpickr
                      value={endDate}
                      onChange={(date) => {
                        const selectedEndDate = date[0];
                        // Ensure the selected end date is not before the start date
                        if (selectedEndDate < startDate) {
                          setStartDate(selectedEndDate);
                        }
                        setEndDate(selectedEndDate);
                      }}
                      options={{
                        dateFormat: "Y-m-d",
                        minDate: startDate, // Set minDate to the selected start date
                      }}
                      className="form-control form-select"
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.toDateSub && "يرجي ادخال تاريخ النهاية"}
                  </p>
                </div>
              </Col>
              <Col lg={12}>
                <p>هل الحساب تجربة مجانية ؟</p>
                <div className="keywordCheck">
                  <div className="form-group">
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toggleFreeTrial"
                          value={true}
                          className="form-checkbox"
                          onChange={(e) => {
                            setIsFreeTrial(true);
                          }}
                          checked={isFreeTrial === true}
                        />

                        <span>
                          <p>نعم</p>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toggleFreeTrial"
                          value={false}
                          className="form-checkbox"
                          onChange={(e) => {
                            setIsFreeTrial(false);
                          }}
                          checked={isFreeTrial === false}
                        />

                        <span>
                          <p>لا</p>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={4} xs={12}>
                <div className="form-group">
                  <button type="submit" className="btn btn-blue editBtn">
                    حفظ
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAccountModal;
