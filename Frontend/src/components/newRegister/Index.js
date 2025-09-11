import React, { useEffect, useState } from "react";
import { Row, Col, Table, Spinner } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import Logo from "./assets/images/new-logo.svg";
import Arrow from "./assets/images/arrow-left.svg";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import {
  checkEmailExist,
  getKeyWords,
  postUserRegister,
} from "@/store/actions";

import { parseCookies } from "nookies";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ar from "react-phone-input-2/lang/ar.json";
import MessageModal from "./MessageModal";
import {
  getSectionData,
  handleImageLink,
  handleUrl,
} from "@/helpers/functions";
import Image from "next/future/image";
import { useRouter } from "next/router";
import phoneLengthsData from "./phoneNumber.json";

const Index = () => {
  const { handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const cookies = parseCookies();
  const router = useRouter();

  const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  const registerData = getSectionData(allCmsHome, "register");

  const [phoneIncorrect, setPhoneIncorrect] = useState(null);
  const [show, setShow] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [inputErrors, setInputErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    companyName: false,
    password: false,
    confirmPassword: false,
  });
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClose = () => setShow(false);

  const onSubmit = (formData) => {
    formData.companyName = companyName;
    formData.firstName = userFirstName;
    formData.lastName = userLastName;
    formData.email = userEmail;
    formData.phoneNumber = selectedPhone;
    formData.password = password;
    formData.confirmPassword = confirmPassword;

    dispatch(
      postUserRegister({
        formData,
        cookies,
        toast,
        reset,
        formatMessage,
        dispatch,
        setShow,
        setButtonLoading,
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
                    <span>رجوع للرئيسية</span>
                  </a>
                </Link>
              </div>
              <Link href="/">
                <a>
                  {allCmsFooter?.logo ? (
                    <Image
                      src={handleImageLink(allCmsFooter?.logo)}
                      alt=""
                      width={300}
                      height={300}
                    />
                  ) : (
                    <Logo fill="#095183" width={120} />
                  )}
                </a>
              </Link>
              <div className="login-banner__text">
                <h3>{registerData?.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: registerData?.description,
                  }}
                />
              </div>
            </div>
          </Col>
          <Col lg={8} md={12}>
            <div className="account-setup-form">
              <h3>معلومات الحساب</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="account-setup-form__body">
                  <div className="form-step form-step-1">
                    <div className="form-group flex">
                      <label className="form-label">اسم الشركة</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="اسم الشركة"
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                          }}
                          value={companyName}
                        />
                        {inputErrors?.companyName &&
                          companyName?.length < 3 && (
                            <p className="error">يجب إدخال اسم الشركة</p>
                          )}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">الاسم الأول</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="الاسم الأول"
                          onChange={(e) => {
                            setUserFirstName(e.target.value);
                          }}
                          value={userFirstName}
                        />
                        {inputErrors?.firstName &&
                          userFirstName?.length < 3 && (
                            <p className="error">يجب إدخال الاسم الأول</p>
                          )}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">اسم العائلة</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="اسم العائلة"
                          onChange={(e) => {
                            setUserLastName(e.target.value);
                          }}
                          value={userLastName}
                          required
                        />
                        {inputErrors?.lastName && userLastName?.length < 3 && (
                          <p className="error">يجب إدخال اسم العائلة</p>
                        )}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">البريد الالكتروني</label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="البريد الالكتروني"
                          onChange={(e) => {
                            setUserEmail(e.target.value);
                          }}
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
                          value={userEmail}
                          required
                        />

                        {inputErrors?.email &&
                          !userEmail?.match(
                            /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                          ) && (
                            <p className="error">
                              يجب إدخال بريد الكتروني صحيح
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">كلمة المرور</label>
                      <input
                        type="password"
                        placeholder="كلمة المرور "
                        className={
                          password.length < 6 && password.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {inputErrors?.password &&
                        password.length < 6 &&
                        password.length > 0 && (
                          <p className="error">
                            كلمة المرور يجب ان تكون اكثر من 6 احرف
                          </p>
                        )}
                      <input
                        type="password"
                        placeholder=" تأكيد كلمة المرور "
                        className={
                          confirmPassword.length < 6 &&
                          confirmPassword.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      {inputErrors?.confirmPassword &&
                        confirmPassword.length < 6 &&
                        confirmPassword.length > 0 && (
                          <p className="error">
                            كلمة المرور يجب ان تكون اكثر من 6 احرف
                          </p>
                        )}
                    </div>
                    <div className="form-group flex">
                      <label className="form-label">رقم الهاتف</label>
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
                          placeholder="رقم الجوال*"
                          enableSearch={true}
                          inputProps={{
                            name: "phone",
                            required: true,
                          }}
                          inputclassName="form-control"
                          alwaysDefaultMask={true}
                          searchNotFound="لا يوجد نتائج"
                          searchPlaceholder="بحث"
                          localization={ar}
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
                        {inputErrors?.phone && selectedPhone?.length < 10 && (
                          <p className="error">يجب إدخال رقم الهاتف</p>
                        )}
                        {phoneIncorrect !== null && (
                          <p className="error">يجب إدخال رقم هاتف صحيح</p>
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
                            أوافق على
                            <Link href="/privacy-policy">
                              <a target="_blank">الشروط والأحكام</a>
                            </Link>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="account-setup-form__footer">
                  <button
                    className="btn"
                    onClick={() => {
                      if (formStep === 1) {
                        if (!userFirstName) {
                          toast.error("يجب إدخال الاسم الأول", {
                            duration: 4000,
                          });

                          setInputErrors({
                            firstName: true,
                            lastName: false,
                            email: false,
                            phone: false,
                          });
                        } else if (!companyName) {
                          toast.error("يجب إدخال اسم الشركة", {
                            duration: 4000,
                          });

                          setInputErrors({
                            companyName: true,
                            employeesCount: false,
                          });
                        } else if (!userLastName) {
                          toast.error("يجب إدخال اسم العائلة", {
                            duration: 4000,
                          });
                          setInputErrors({
                            lastName: true,
                            firstName: false,
                            email: false,
                            phone: false,
                          });
                        } else if (
                          !userEmail ||
                          !userEmail?.match(
                            /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                          )
                        ) {
                          toast.error("يجب إدخال بريد الكتروني صحيح ", {
                            duration: 4000,
                          });
                          setInputErrors({
                            email: true,
                            firstName: false,
                            lastName: false,
                            phone: false,
                          });
                        } else if (!selectedPhone || phoneIncorrect) {
                          toast.error("يجب إدخال رقم الهاتف", {
                            duration: 4000,
                          });
                          setInputErrors({
                            phone: true,
                            firstName: false,
                            lastName: false,
                            email: false,
                          });
                        } else if (!privacyChecked) {
                          toast.error("يجب الموافقة على الشروط والأحكام", {
                            duration: 4000,
                          });
                        } else {
                          dispatch(
                            checkEmailExist({
                              formData: {
                                firstName: userFirstName,
                                lastName: userLastName,
                                email: userEmail,
                                phoneNumber: selectedPhone,
                              },
                              toast,
                              setFormStep,
                              cookies,
                            })
                          );
                        }
                      }
                    }}
                    type="button"
                    disabled={buttonLoading}
                  >
                    {buttonLoading ? <Spinner animation="border" /> : "تسجيل"}
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <MessageModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Index;
