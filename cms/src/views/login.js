import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../store/authentication/actions";
import Loading from "../components/shared/Loader";
import LoginLogo from "../assets/images/LogoNew.svg";
import email from "../assets/svgs/email.svg";
import passwordLock from "../assets/svgs/password-lock.svg";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => dispatch(loginUser({ data, navigate, toast }));
  if (loading) return <Loading />;

  return (
    <>
      <div className="login-wrp">
        <div className="login--inner">
          <div className="login-logo">
            <img src={LoginLogo} alt="" />
          </div>
          <div className="login-data">
            <h3>أهلا بعودتك</h3>
            <p>يرجى تسجيل الدخول</p>
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
                <div>
                  <img src={passwordLock} alt="" />
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="form-control"
                    placeholder="كلمة المرور"
                  />
                </div>
                <div className="forget-password">
                  <NavLink to="/forget-password">نسيت كلمة المرور؟</NavLink>
                </div>
                {errors.password && <p className="error">هذا الحقل مطلوب</p>}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-blue">
                  دخول
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
