import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, updateAdmin } from "store/actions";
import toast from "react-hot-toast";
import Loader from "components/shared/Loader";
import showPasswordIcon from "../../assets/svgs/eye.svg";

const EditAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { admin, loading } = useSelector((state) => state.admins);

  const [selectedRoles, setSelectedRoles] = useState();
  const [showPassword, setShowPassword] = useState(false);

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
  useEffect(() => {
    dispatch(getAdmin({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      username: admin?.username,
      email: admin?.email,
      password: admin?.password,
      phoneNumber: admin?.phoneNumber,
    });

    setSelectedRoles(admin?.role);
  }, [admin, reset]);

  const handleCheckboxChange = (roleId) => {
    setSelectedRoles(roleId);
  };

  const onSubmit = (data) => {
    data.userId = id;
    data.role = selectedRoles;

    dispatch(
      updateAdmin({
        data,
        navigate,
        toast,
      })
    );
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="acc-form">
        <div className="card">
          <div className="card-head">
            <h4>تعديل البيانات</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                        {errors?.username && "يرجي ادخال اسم المدير"}
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
                        {errors?.phoneNumber && "يرجي ادخال رقم الهاتف"}
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
                  <Col lg={12} xs={12}>
                    <div className="permissions">
                      <div className="card-head">
                        <h4>الأدوار</h4>
                      </div>
                      <div className="card-body">
                        {roles.map((role, index) => (
                          <label
                            key={index}
                            style={{ display: "block", marginBottom: "8px" }}
                          >
                            <input
                              type="radio"
                              name="admin-role"
                              value={role.id}
                              checked={selectedRoles === role?.id}
                              onChange={() => handleCheckboxChange(role?.id)}
                            />
                            <span style={{ marginRight: "6px" }}>
                              {role.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} xs={12}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-blue">
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

export default EditAdmin;
