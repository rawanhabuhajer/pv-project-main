import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "store/actions";
import toast from "react-hot-toast";
import showPasswordIcon from "../../assets/svgs/eye.svg";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
const AddAdmin = () => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const minDate = new Date();
  const minDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const roles = [
    {
      id: "superAdmin",
      name: "Super admin",
    },
    {
      id: "admin",
      name: "Admin",
    },
  ];

  const [selectedRoles, setSelectedRoles] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${year}-${month < 10 ? "0" + month : month}-${day}`;
  };

  const onSubmit = (data) => {
    data.role = selectedRoles;

    data.verificationStart = formatDate(startDate);
    data.verificationEnd = formatDate(endDate);

    dispatch(
      addAdmin({
        data,
        toast,
        reset,
        setEndDate,
        setStartDate,
      })
    );
  };

  return (
    <>
      <div className="acc-form">
        <div className="card">
          <div className="card-head">
            <h4>اضافة مدير جديد</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col xl={10} md={12}>
                <Row>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>اسم المدير</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="اسم المدير"
                          {...register("username", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.username?.type === "required" &&
                          "يرجي ادخال اسم المدير"}
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
                        {errors?.email?.type === "required" &&
                          "يرجي ادخال البريد الالكتروني"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>رقم الهانف</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="رقم الهاتف"
                          {...register("phoneNumber", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.phoneNumber?.type === "required" &&
                          "يرجي ادخال رقم الهاتف"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>كلمة المرور</h5>
                      <div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control form-outline"
                          placeholder="كلمة المرور"
                          {...register("password", { required: true })}
                        />
                        <button
                          type="button"
                          className={
                            showPassword
                              ? "show-password-btn active"
                              : "show-password-btn"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <img src={showPasswordIcon} alt="show password" />
                        </button>
                      </div>
                      <p className="error-hint">
                        {errors?.password && "يرجي ادخال كلمة المرور"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>تاريخ البداية</h5>
                      <div>
                        <Flatpickr
                          value={startDate}
                          onChange={(date) => {
                            const selectedStartDate = date[0];

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
                        {errors?.verificationStart &&
                          "يرجي ادخال تاريخ البداية"}
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

                            if (selectedEndDate < startDate) {
                              setStartDate(selectedEndDate);
                            }
                            setEndDate(selectedEndDate);
                          }}
                          options={{
                            dateFormat: "Y-m-d",
                            minDate: startDate,
                          }}
                          className="form-control form-select"
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.verificationEnd && "يرجي ادخال تاريخ النهاية"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="permissions">
                      <div className="card-head">
                        <h4>الأدوار</h4>
                      </div>
                      <div className="card-body">
                        {roles?.map((role, index) => (
                          <label key={index}>
                            <input
                              type="radio"
                              name="role"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRoles(role?.id);
                                } else {
                                  setSelectedRoles(selectedRoles === role?.id);
                                }
                              }}
                            />
                            <span>{role?.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} xs={12}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-blue">
                        اضافة
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
