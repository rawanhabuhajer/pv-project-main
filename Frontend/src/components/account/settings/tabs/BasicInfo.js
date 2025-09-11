import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ar from "react-phone-input-2/lang/ar.json";
import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";

import { editAccountInfo } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";

import SettingIcon from "../../assets/images/settings/settingsIcon.svg";

const BasicInfo = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useSelector((state) => state.authentication);

  const [selectedPhone, setSelectedPhone] = useState("");

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    setSelectedPhone(user.phone);
  }, [user]);

  const submitEditAccountInfo = (data) => {
    data.phone = selectedPhone;
    dispatch(
      editAccountInfo({
        data,
        toast,
        formatMessage,
        dispatch,
      })
    );
  };

  return (
    <div className="basic-info">
      <div className="setting-title">
        <h3>
          <SettingIcon />
          <FormattedMessage id="settings" />
        </h3>
      </div>
      <form onSubmit={handleSubmit(submitEditAccountInfo)}>
        <h4 className="form-title"><FormattedMessage id="personalInformation" /></h4>
        <div className="form-wrapper-block">
          <div className="form-group flex">
            <label className="form-label"><FormattedMessage id="firstName" /></label>
            <div>
              <input
                type="text"
                className={
                  errors?.firstName ? "form-control is-invalid" : "form-control"
                }
                {...register("firstName", { required: true })}
              />
              {errors?.firstName && <p className="error"><FormattedMessage id="requiredField" /></p>}
            </div>
          </div>
          <div className="form-group flex">
            <label className="form-label">
              <FormattedMessage id="lastName" />
            </label>
            <div>
              <input
                type="text"
                className={
                  errors?.lastName ? "form-control is-invalid" : "form-control"
                }
                {...register("lastName", { required: true })}
              />
              {errors?.lastName && <p className="error"><FormattedMessage id="requiredField" /></p>}
            </div>
          </div>
          <div className="form-group flex">
            <label className="form-label">
              <FormattedMessage id="email" />
            </label>
            <div>
              <input
                type="email"
                className={
                  errors?.email ? "form-control is-invalid" : "form-control"
                }
                {...register("email", { required: true })}
                onKeyUp={(e) => {
                  // check if email is valid
                  if (
                    e.target.value &&
                    !e.target.value.match(
                      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                    )
                  ) {
                    e.target.classList.add("is-invalid");
                  } else {
                    e.target.classList.remove("is-invalid");
                  }
                }}
              />
              {errors?.email && <p className="error"><FormattedMessage id="requiredField" /></p>}
            </div>
          </div>
          <div className="form-group flex">
            <label className="form-label">
              <FormattedMessage id="phoneNumber" />
            </label>
            <div>
              <PhoneInput
                country={"sa"}
                value={selectedPhone}
                onChange={(phone) => setSelectedPhone(phone)}
                placeholder="رقم الجوال*"
                enableSearch={true}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                inputclassName={
                  !selectedPhone ? "form-control is-invalid" : "form-control"
                }
                alwaysDefaultMask={true}
                searchNotFound="لا يوجد نتائج"
                searchPlaceholder="بحث"
                localization={ar}
                isValid={(value, country) => {
                  if (value.match(/12345/)) {
                    return "Invalid value: " + value + ", " + country.name;
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
              {!selectedPhone && <p className="error"><FormattedMessage id="requiredField" /></p>}
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

export default BasicInfo;
