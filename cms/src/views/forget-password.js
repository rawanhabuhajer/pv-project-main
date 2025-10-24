import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgetPassword } from "../store/authentication/actions";
import Loading from "../components/shared/Loader";
import LoginLogo from "../assets/images/new-logo.svg";
import email from "../assets/svgs/email.svg";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    dispatch(forgetPassword({ data, navigate, toast }));
  if (loading) return <Loading />;

  return (
    <>
      <div className="login-wrp">
        <div className="login--inner">
          <div className="login-logo">
            <img src={LoginLogo} alt="" />
          </div>
          <div className="login-data">
            <p>برجاء اضافة البريد الالكتروني لتتمكن من تعديل كلمة المرور</p>
          </div>
          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div>
                  <img src={email} alt="" />
                  <input
                    {...register("email", { required: true })}
                    className="form-control"
                    placeholder="البريد الإلكتروني"
                  />
                </div>
                {errors.email && <p className="error">هذا الحقل مطلوب</p>}
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-blue">
                  ارسال
                </button>
                <p className="back-login">
                  للعودة الى صفحة تسجيل الدخول
                  <NavLink to="/login"> اضغط هنا</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
