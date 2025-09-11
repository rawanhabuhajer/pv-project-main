import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import Logo from "./assets/images/new-logo.svg";
import Arrow from "./assets/images/arrow-left.svg";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { postUserRegister, registerUser } from "@/store/actions";
import { parseCookies } from "nookies";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// import ar from "react-phone-input-2/lang/ar.json";
import { getSectionData, handleImageLink } from "@/helpers/functions";
import Image from "next/future/image";
import phoneLengthsData from "./phoneNumber.json";
import Eye from "./assets/images/eye.svg";
import { useRouter } from "next/router";

const Index = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const cookies = parseCookies();
  const { locale } = useRouter();

  const [phoneIncorrect, setPhoneIncorrect] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleMatchPassword = () => {
    const newPassword = document.querySelector("#newPassword");
    const confirmPassword = document.querySelector("#confirmNewPassword");
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("كلمة المرور غير متطابقة");
    } else {
      confirmPassword.setCustomValidity("");
    }
  };

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
        formatMessage({ id: "passwordRestrections" })
      );
    } else if (!containsUppercase) {
      newPassword.setCustomValidity(formatMessage({ id: "passwordUppercase" }));
    } else if (!containsSpecialChar) {
      newPassword.setCustomValidity(
        formatMessage({ id: "passwordSpecialChar" })
      );
    } else if (newPassword.value.length < 8) {
      newPassword.setCustomValidity(formatMessage({ id: "passwordLength" }));
    } else {
      newPassword.setCustomValidity("");
    }
  };

  const onSubmit = (formData) => {
    if (!privacyChecked) {
      toast.error(
        formatMessage({ id: "agreeTo" }) +
          " " +
          formatMessage({ id: "privacyPolicy" })
      );
      return;
    }

    if (!selectedPhone) {
      toast.error(formatMessage({ id: "phoneNumberRequired" }));
      return;
    }

    formData.phoneNumber = selectedPhone;
    formData.agreeTerms = privacyChecked;

    dispatch(
      postUserRegister({
        formData,
        cookies,
        toast,
        reset,
        formatMessage,
      })
    );
  };

  return (
    <>
      <div className={styles["account-setup-section"]}>
        <Row>
          <Col lg={4} md={12}>
            <div className="account-setup-banner">
              <div className="gen-back">
                <Link href="/">
                  <a>
                    <Arrow />
                    <span>
                      <FormattedMessage id="back" />
                    </span>
                  </a>
                </Link>
              </div>
              <Link href="/">
                <a>
                  <Logo fill="#095183" width={120} />
                </a>
              </Link>
              <div className="login-banner__text">
                <h3>{"registerData?.title"}</h3>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: registerData?.description,
                  }}
                /> */}rrrrrrr
              </div>
            </div>
          </Col>
          <Col lg={8} md={12}>
            <div className="account-setup-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="account-setup-form__header">
                  <h4>
                    <FormattedMessage id="createAccount" />
                  </h4>
                </div>
                <div className="account-setup-form__body">
                  <div className="form-step form-step-1">
                    <div className="form-group flex">
                      <label className="form-label">
                        <FormattedMessage id="companyName" />
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            formatMessage({ id: "companyName" }) + "*"
                          }
                          {...register("companyName", { required: true })}
                        />
                        {errors.companyName && (
                          <p className="error">
                            <FormattedMessage id="companyNameRequired" />
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">
                        <FormattedMessage id="fullName" />
                      </label>
                      <div className="paswword-holder">
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={
                              formatMessage({ id: "fullName" }) + "*"
                            }
                            {...register("username", { required: true })}
                          />
                          {errors?.firstName && (
                            <p className="error">
                              <FormattedMessage id="firstNameRequired" />
                            </p>
                          )}
                        </div>
                        {/* <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={
                              formatMessage({ id: "lastName" }) + "*"
                            }
                            {...register("lastName", { required: true })}
                          />
                          {errors?.lastName && (
                            <p className="error">
                              <FormattedMessage id="lastNameRequired" />
                            </p>
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">
                        <FormattedMessage id="email" />
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={formatMessage({ id: "email" }) + "*"}
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
                          {...register("email", { required: true })}
                        />

                        {errors?.email && (
                          <p className="error">
                            <FormattedMessage id="emailRequired" />
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">
                        <FormattedMessage id="password" />
                      </label>
                      <div className="paswword-holder">
                        <div>
                          <input
                            type={showPassword.password ? "text" : "password"}
                            className="form-control"
                            id="newPassword"
                            {...register("password", { required: true })}
                            onChange={(e) => {
                              handleMatchPassword(e.target.value);
                              handlePasswordCharacter(e.target.value);
                            }}
                            placeholder={
                              formatMessage({ id: "password" }) + "*"
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                password: !showPassword.password,
                              })
                            }
                            className={
                              showPassword.password
                                ? "show-password active"
                                : "show-password"
                            }
                          >
                            <Eye />
                          </button>
                        </div>
                        <div>
                          <input
                            type={
                              showPassword.confirmPassword ? "text" : "password"
                            }
                            className="form-control"
                            id="confirmNewPassword"
                            {...register("confirmedPassword", {
                              required: true,
                            })}
                            onChange={(e) =>
                              handleMatchPassword(e.target.value)
                            }
                            placeholder={
                              formatMessage({ id: "confirmPassword" }) + "*"
                            }
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
                        </div>
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">
                        <FormattedMessage id="phoneNumber" />
                      </label>

                      <div>
                        <PhoneInput
                          country={"sa"}
                          countryCodeEditable={false}
                          value={selectedPhone}
                          onChange={(phone, country) => {
                            setSelectedPhone(phone);
                            const countryCode = country.dialCode;
                            const selectedCountry = country.countryCode;
                            const phoneNumberLengths = phoneLengthsData;

                            if (
                              phone.length - countryCode.length !==
                              phoneNumberLengths[selectedCountry]
                            ) {
                              setPhoneIncorrect(
                                `Invalid ${country.name} phone number length`
                              );
                            } else {
                              setPhoneIncorrect(null);
                            }
                          }}
                          placeholder={
                            formatMessage({ id: "phoneNumber" }) + "*"
                          }
                          enableSearch={true}
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          inputclassName="form-control"
                          alwaysDefaultMask={true}
                          searchNotFound={formatMessage({
                            id: "searchNotFound",
                          })}
                          searchPlaceholder={
                            formatMessage({ id: "searchPlaceholder" }) + "*"
                          }
                          localization={locale}
                          isValid={(value, country) => {
                            if (value.match(/12345/)) {
                              return (
                                "Invalid value: " + value + ", " + country.name
                              );
                            } else if (value.match(/1234/)) {
                              return false;
                            }
                            return true;
                          }}
                        />

                        {selectedPhone?.length < 10 ? (
                          <p className="error">
                            <FormattedMessage id="phoneNumberRequired" />
                          </p>
                        ) : (
                          phoneIncorrect && (
                            <p className="error">{phoneIncorrect}</p>
                          )
                        )}
                      </div>
                    </div>
                    <div className="form-group privacy-confirm">
                      <div className="form-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => {
                              setPrivacyChecked(!privacyChecked);
                            }}
                            checked={privacyChecked}
                          />
                          <span>
                            <FormattedMessage id="agreeToTerms" />
                            <Link href="/privacy-policy">
                              <a target="_blank">
                                <FormattedMessage id="header.privacyPolicy" />
                              </a>
                            </Link>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="account-setup-form__footer">
                  <button className="btn" type="submit">
                    <FormattedMessage id="createAccount" />
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Index;
