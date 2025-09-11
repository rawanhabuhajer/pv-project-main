import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/bootstrap.css";
import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";

import { changeAccountPassword } from "@/store/actions";
import { useDispatch } from "react-redux";

import SettingIcon from "../../assets/images/settings/settingsIcon.svg";
import Eye from "../../assets/images/settings/Eye.svg";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleMatchPassword = () => {
    const newPassword = document.querySelector("#newPassword");
    const confirmPassword = document.querySelector("#confirmNewPassword");
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        formatMessage({ id: "passwordNotMatched" })
      );
    } else {
      confirmPassword.setCustomValidity("");
    }
  };

  // const handlePasswordLength = () => {
  //   const newPassword = document.querySelector("#newPassword");
  //   if (newPassword.value.length < 8) {
  //     newPassword.setCustomValidity(formatMessage({ id: "passwordLength" }));
  //   } else {
  //     newPassword.setCustomValidity("");
  //   }
  // };

  const handlePasswordCharacter = () => {
    const newPassword = document.querySelector("#newPassword");
    const uppercaseRegex = /[A-Z]/;
    const containsUppercase = uppercaseRegex.test(newPassword.value);
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const containsSpecialChar = specialCharRegex.test(newPassword.value);
    if (
      !containsUppercase &&
      !containsSpecialChar &&
      newPassword.value.length < 8
    ) {
      newPassword.setCustomValidity(
        formatMessage({
          id: "كلمة المرور يجب أن تحتوي علر حرف كبير ورمز خاص و ألا تقل عن 8 أحرف",
        })
      );
    } else if (!containsUppercase) {
      newPassword.setCustomValidity(
        formatMessage({ id: "كلمة المرور يجب أن تحتوي على حرف كبير" })
      );
    } else if (!containsSpecialChar) {
      newPassword.setCustomValidity(
        formatMessage({ id: "كلمة المرور يجب أن تحتوي على رمز خاص" })
      );
    } else if (newPassword.value.length < 8) {
      newPassword.setCustomValidity(formatMessage({ id: "passwordLength" }));
    } else {
      newPassword.setCustomValidity("");
    }
  };

  const submitChangePassword = (data) => {
    dispatch(
      changeAccountPassword({
        data,
        toast,
        formatMessage,
        reset,
      })
    );
  };
  return (
    <div className="basic-info">
      <div className="setting-title">
        <h3>
          <SettingIcon />
          <FormattedMessage id="resetPassword" />
        </h3>
      </div>

      <form onSubmit={handleSubmit(submitChangePassword)}>
        <h4 className="form-title">
          <FormattedMessage id="resetPassword" />
        </h4>
        <div className="form-wrapper-block">
          <div className="form-group flex">
            <label className="form-label">
              <FormattedMessage id="currentPassword" />
            </label>
            <div>
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                className={
                  errors?.currentPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                {...register("currentPassword", { required: true })}
                id="currentPassword"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    currentPassword: !showPassword.currentPassword,
                  })
                }
                className={
                  showPassword.currentPassword
                    ? "show-password active"
                    : "show-password"
                }
              >
                <Eye />
              </button>
              {errors?.currentPassword && (
                <p className="error">
                  <FormattedMessage id="requiredField" />
                </p>
              )}
            </div>
          </div>
          <div className="form-group flex">
            <label className="form-label">
              <FormattedMessage id="newPassword" />
            </label>
            <div>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                className={
                  errors?.newPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                {...register("newPassword", { required: true })}
                id="newPassword"
                onChange={(e) => {
                  handleMatchPassword(e.target.value);
                  handlePasswordCharacter(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    newPassword: !showPassword.newPassword,
                  })
                }
                className={
                  showPassword.newPassword
                    ? "show-password active"
                    : "show-password"
                }
              >
                <Eye />
              </button>
              {errors?.newPassword && (
                <p className="error">
                  <FormattedMessage id="requiredField" />
                </p>
              )}
            </div>
          </div>
          <div className="form-group flex">
            <label className="form-label">
              <FormattedMessage id="confirmPassword" />{" "}
            </label>
            <div>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                className={
                  errors?.confirmPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                {...register("confirmPassword", { required: true })}
                id="confirmNewPassword"
                onChange={(e) => handleMatchPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
                className={
                  showPassword.confirmPassword
                    ? "show-password active"
                    : "show-password"
                }
              >
                <Eye />
              </button>
              {errors?.confirmPassword && (
                <p className="error">
                  <FormattedMessage id="requiredField" />
                </p>
              )}
            </div>
          </div>

          <div className="form-group has-btn">
            <button type="submit" className="btn">
            <FormattedMessage id="save" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
