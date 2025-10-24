import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  toggleFreeTrial,
  toggleUserLoginMultiDevices,
  updateUser,
} from "store/actions";
import toast from "react-hot-toast";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { singleUser } = useSelector((state) => state.authentication);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const minDate = new Date();
  const minDate = startDate
    ? startDate
    : new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch(getUser({ id }));
  }, [dispatch, id]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${year}-${month < 10 ? "0" + month : month}-${day}`;
  };

  useEffect(() => {
    reset({
      username: singleUser?.username,

      email: singleUser?.email,
      phoneNumber: singleUser?.phoneNumber,
      companyName: singleUser?.companyName,
    });

    setStartDate(formatDate(singleUser?.verificationStart));
    setEndDate(formatDate(singleUser?.verificationEnd));
  }, [reset, singleUser]);

  const onSubmit = (data) => {
    data.id = id;
    data.verificationStart = formatDate(startDate);
    data.verificationEnd = formatDate(endDate);

    dispatch(
      updateUser({
        data,
        toast,
        navigate,
      })
    );
  };

  return (
    <>
      <div className="acc-form">
        <div className="main-breadcrumb">
          <ul>
            <li>
              <NavLink to="/">لوحة التحكم</NavLink>
            </li>
            <li>
              <NavLink to="/users">المستخدمين</NavLink>
            </li>
            <li>تعديل المستخدم</li>
          </ul>
        </div>
        <div className="card">
          <div className="card-head">
            <h4>
              <FormattedMessage id="editUser" />
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col xl={10} md={12}>
                <Row>
                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>الاسم الكامل</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="الاسم الكامل"
                          {...register("username", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.username && "يرجي ادخال الاسم الكامل"}
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
                          {...register("phoneNumber", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.phoneNumber && "يرجي ادخال رقم الهاتف"}
                      </p>
                    </div>
                  </Col>

                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>اسم الشركة</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="اسم الشركة"
                          {...register("companyName", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.companyName && "يرجي ادخال اسم الشركة"}
                      </p>
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
                          {...register("verificationStart", { required: true })}
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
                        {errors?.verificationEnd && "يرجي ادخال تاريخ النهاية"}
                      </p>
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
        </div>
      </div>
    </>
  );
};

export default Edit;
