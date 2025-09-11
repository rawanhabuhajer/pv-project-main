import React, { useEffect, useState } from "react";
import { Row, Col, Table, Spinner } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import Logo from "./assets/images/new-logo.svg";
import Arrow from "./assets/images/arrow-left.svg";
import Link from "next/link";
import Select from "react-select";
import Close from "./assets/images/close.svg";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import {
  checkEmailExist,
  getKeyWords,
  postUserRegister,
} from "@/store/actions";
import CreatableSelect from "react-select/creatable";
import UserIcon from "./assets/images/user.svg";
import TrashIcon from "./assets/images/trash.svg";
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
import phoneLengthsData from "./phoneNumber.json";
import Eye from "./assets/images/eye.svg";

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

  const { areas, activities, keywords } = useSelector(
    (state) => state.settings
  );
  const { roles } = useSelector((state) => state.authentication);
  const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  const registerData = getSectionData(allCmsHome, "register");
  const stepsContent = getSectionData(allCmsHome, "steps");
  const [phoneIncorrect, setPhoneIncorrect] = useState(null);
  const [show, setShow] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchActivities, setSearchActivities] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [competitionsCount, setCompetitionsCount] = useState({});
  const [priceRange, setPriceRange] = useState({});
  const [employeesCount, setEmployeesCount] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [url, setUrl] = useState("");
  const [previousParticipation, setPreviousParticipation] = useState(null);
  const [previousWin, setPreviousWin] = useState(null);
  const [companyName, setCompanyName] = useState("");
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
    employeesCount: false,
    selectedActivities: false,
    selectedKeywords: false,
    selectedRegions: false,
    competitionsCount: false,
    priceRange: false,
    previousParticipation: false,
    previousWin: false,
  });
  const [collaboratorErrors, setCollaboratorErrors] = useState({
    firstName: false,
    email: false,
    roleId: false,
  });
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (keywords?.length > 1) setSelectedKeywords(keywords);
  }, [keywords]);
  const validateUrl = () => {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (url.match(urlPattern)) {
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  };

  const handleClick = () => {
    validateUrl();

    if (isValidUrl) {
      dispatch(
        getKeyWords({
          cookies,
          url: handleUrl(url),
        })
      );
    } else {
      toast.error("يرجي ادخال رابط صحيح", {
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    if (activities?.length > 0) {
      setFilteredActivities(activities);
    }
  }, [activities]);

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
        "كلمة المرور يجب أن تحتوي علر حرف كبير ورمز خاص و ألا تقل عن 8 أحرف"
      );
    } else if (!containsUppercase) {
      newPassword.setCustomValidity("كلمة المرور يجب أن تحتوي على حرف كبير");
    } else if (!containsSpecialChar) {
      newPassword.setCustomValidity("كلمة المرور يجب أن تحتوي على رمز خاص");
    } else if (newPassword.value.length < 8) {
      newPassword.setCustomValidity(formatMessage({ id: "passwordLength" }));
    } else {
      newPassword.setCustomValidity("");
    }
  };

  const onSubmit = (formData) => {
    formData.companyName = companyName;
    formData.areas = selectedRegions?.map((region) => {
      return {
        id: region.value,
      };
    });
    formData.activities = selectedActivities?.map((activity) => {
      return {
        id: activity.id,
      };
    });
    formData.maximumTendersParticipation = competitionsCount?.value;
    formData.priceRange = priceRange?.value;
    formData.employees = employeesCount?.value;
    formData.keywords = selectedKeywords?.map((keyword) => keyword.value);
    formData.collaborators = collaborators;
    formData.previousParticipation = previousParticipation;
    formData.previousWin = previousWin;
    formData.firstName = userFirstName;
    formData.lastName = userLastName;
    formData.email = userEmail;
    formData.phoneNumber = selectedPhone;

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="account-setup-form__header">
                  <h3>
                    {stepsContent?.items?.map((item, index) => {
                      return (
                        formStep === index + 1 && (
                          <span key={index}>{item.title}</span>
                        )
                      );
                    })}
                    <span>{formStep} / 5</span>
                  </h3>
                  <div className="account-setup-form__progress-bar">
                    <div
                      className="account-setup-form__progress-bar__fill"
                      style={{ width: `${(formStep / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="account-setup-form__back">
                    {formStep > 1 && (
                      <button
                        onClick={() => setFormStep(formStep - 1)}
                        type="button"
                      >
                        <Arrow />
                      </button>
                    )}
                  </div>
                </div>
                <div className="account-setup-form__body">
                  {/* {formStep === 0 && (
                    <div className="form-step form-step-1">
                      <div className="form-group flex">
                        <label className="form-label">اسم الشركة</label>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="اسم الشركة"
                            {...register("companyName", { required: true })}
                          />
                          {errors.companyName && (
                            <p className="error">يجب إدخال اسم الشركة</p>
                          )}
                        </div>
                      </div>
                      <div className="form-group flex">
                        <label className="form-label">الاسم الكامل</label>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="الاسم الكامل"
                            {...register("fullName", { required: true })}
                          />
                          {errors?.fullName && (
                            <p className="error">يجب إدخال الاسم الكامل</p>
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
                        <div className="paswword-holder">
                          <div>
                            <input
                              type={showPassword.password ? "text" : "password"}
                              className={
                                errors?.password
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              {...register("password", { required: true })}
                              id="newPassword"
                              onChange={(e) => {
                                handleMatchPassword(e.target.value);
                                handlePasswordCharacter(e.target.value);
                              }}
                              placeholder="كلمة المرور"
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
                                showPassword.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              className={
                                errors?.confirmPassword
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              {...register("confirmPassword", {
                                required: true,
                              })}
                              id="confirmNewPassword"
                              onChange={(e) =>
                                handleMatchPassword(e.target.value)
                              }
                              placeholder="تأكيد كلمة المرور"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  confirmPassword:
                                    !showPassword.confirmPassword,
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
                                  "Invalid value: " +
                                  value +
                                  ", " +
                                  country.name
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
                  )} */}
                  {formStep === 1 && (
                    <div className="form-step form-step-1">
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
                          {inputErrors?.lastName &&
                            userLastName?.length < 3 && (
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
                        <label className="form-label">رقم الهاتف</label>
                        {/* <div>
                          <PhoneInput
                            country={"sa"}
                            countryCodeEditable={false}
                            value={selectedPhone}
                            onChange={(phone) => setSelectedPhone(phone)}
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
                                  "Invalid value: " +
                                  value +
                                  ", " +
                                  country.name
                                );
                              } else if (value.match(/1234/)) {
                                return false;
                              } else {
                                return true;
                              }
                            }}
                          />
                          {inputErrors?.phone && selectedPhone?.length < 10 && (
                            <p className="error">يجب إدخال رقم الهاتف</p>
                          )}
                        </div> */}
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
                                  "Invalid value: " +
                                  value +
                                  ", " +
                                  country.name
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
                  )}
                  {formStep === 2 && (
                    <div className="form-step form-step-2">
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
                      <div className="form-group">
                        <label className="form-label">
                          عدد الموظفين في الشركة
                        </label>
                        <div>
                          <Select
                            isRtl={true}
                            options={[
                              {
                                value: 25,
                                label: "0-25",
                              },
                              {
                                value: 50,
                                label: "26-50",
                              },
                              {
                                value: 100,
                                label: "50-100",
                              },
                              {
                                value: 200,
                                label: "100-200",
                              },
                            ]}
                            placeholder="اختر عدد الموظفين في الشركة"
                            className="form-control select-form"
                            classNamePrefix="select"
                            onChange={(selected) => {
                              setEmployeesCount(selected);
                            }}
                            value={employeesCount}
                          />
                          {inputErrors?.employeesCount &&
                            !employeesCount?.value && (
                              <p className="error">
                                يجب إختيار عدد الموظفين في الشركة
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="add-employees">
                          <label className="form-label">
                            <UserIcon />
                            أضف مشاركين
                          </label>
                          <div className="form-group flex">
                            <label className="form-label">الاسم الكامل</label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="الاسم الكامل"
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                }}
                                value={firstName}
                              />
                              {collaboratorErrors?.firstName &&
                                firstName?.length < 3 && (
                                  <p className="error">
                                    يجب إدخال الاسم الكامل
                                  </p>
                                )}
                            </div>
                          </div>

                          <div className="form-group flex">
                            <label className="form-label">
                              البريد الالكتروني
                            </label>
                            <div>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="البريد الالكتروني"
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                value={email}
                              />
                              {collaboratorErrors?.email &&
                                !email?.match(
                                  /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                                ) && (
                                  <p className="error">
                                    يجب إدخال بريد الكتروني صحيح
                                  </p>
                                )}
                            </div>
                          </div>

                          <div className="form-group flex">
                            <label className="form-label">الصلاحيات</label>
                            <div>
                              <select
                                className="form-control form-select"
                                onChange={(e) => {
                                  setRoleId(e.target.value);
                                }}
                                value={roleId}
                              >
                                <option value="0">اختر الصلاحية</option>
                                {roles?.map((role, index) => {
                                  return (
                                    <option key={index} value={role.id}>
                                      {role.name}
                                    </option>
                                  );
                                })}
                              </select>
                              {collaboratorErrors?.roleId && !roleId && (
                                <p className="error">يجب إختيار الصلاحية</p>
                              )}
                            </div>
                          </div>
                          <div className="form-group flex">
                            <button
                              type="button"
                              className="btn"
                              onClick={() => {
                                if (!firstName) {
                                  setCollaboratorErrors({
                                    firstName: true,
                                    email: false,
                                    roleId: false,
                                  });
                                } else if (
                                  !email ||
                                  !email?.match(
                                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                                  )
                                ) {
                                  setCollaboratorErrors({
                                    email: true,
                                    firstName: false,
                                    roleId: false,
                                  });
                                } else if (!roleId) {
                                  setCollaboratorErrors({
                                    roleId: true,
                                    email: false,
                                    firstName: false,
                                  });
                                } else {
                                  setCollaborators([
                                    ...collaborators,
                                    {
                                      firstName,
                                      email,
                                      roleId,
                                    },
                                  ]);
                                  setFirstName("");
                                  setEmail("");
                                  setRoleId("");
                                  setCollaboratorErrors({
                                    firstName: false,
                                    email: false,
                                    roleId: false,
                                  });
                                }
                              }}
                            >
                              أضف
                            </button>
                          </div>
                        </div>
                      </div>
                      {collaborators?.length > 0 && (
                        <div className="form-group">
                          <div className="add-employees employees-list">
                            <label className="form-label">المشاركين</label>
                            <Table responsive>
                              <thead>
                                <tr>
                                  <th>اسم المشارك</th>
                                  <th>الصلاحية</th>
                                  <th>البريد الالكتروني</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {collaborators.map((collaborator, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        {collaborator.firstName}{" "}
                                        {collaborator.lastName}
                                      </td>
                                      <td>
                                        {roles?.map((role) => {
                                          if (role.id == collaborator.roleId) {
                                            return role.name;
                                          }
                                        })}
                                      </td>
                                      <td>{collaborator.email}</td>
                                      <td>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setCollaborators(
                                              collaborators.filter(
                                                (item) =>
                                                  item.email !==
                                                  collaborator.email
                                              )
                                            );
                                          }}
                                        >
                                          <TrashIcon />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {formStep === 3 && (
                    <div className="form-step form-step-3">
                      <div className="form-group">
                        <label className="form-label">النشاطات المستهدفة</label>
                        <div>
                          <div className="search-activities">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="بحث"
                              onChange={(e) => {
                                setSearchActivities(e.target.value);
                                setFilteredActivities(
                                  activities.filter((activity) =>
                                    activity.name
                                      .toLowerCase()
                                      .includes(e.target.value.toLowerCase())
                                  )
                                );
                              }}
                              value={searchActivities}
                            />
                          </div>
                          {filteredActivities?.length > 0 ? (
                            <div className="selected-regions">
                              {filteredActivities?.map((activity, index) => (
                                <label
                                  key={index}
                                  className={
                                    selectedActivities.includes(activity)
                                      ? "selected-region"
                                      : ""
                                  }
                                  title={activity?.name}
                                  onClick={() => {
                                    //toggle selected activity from the list
                                    if (selectedActivities.includes(activity)) {
                                      setSelectedActivities(
                                        selectedActivities.filter(
                                          (selectedActivity) =>
                                            selectedActivity !== activity
                                        )
                                      );
                                    } else {
                                      setSelectedActivities([
                                        ...selectedActivities,
                                        activity,
                                      ]);
                                    }
                                  }}
                                >
                                  {activity?.name}
                                </label>
                              )) || []}
                            </div>
                          ) : (
                            <div className="alert alert-warning text-center">
                              <h5>لا يوجد انشطة</h5>
                            </div>
                          )}
                          {inputErrors?.selectedActivities &&
                            selectedActivities?.length < 1 && (
                              <p className="error">
                                يجب إختيار نشاط واحد على الأقل
                              </p>
                            )}
                        </div>
                      </div>
                      {/* <div className="form-group flex">
                        <label className="form-label">
                          الموقع الالكتروني للشركة
                        </label>
                        <div className="url-holder">
                          <div>
                            <input
                              type="text"
                              className={`form-control ${
                                isValidUrl ? "" : "is-invalid"
                              }`}
                              value={url}
                              onChange={(e) => {
                                setUrl(e.target.value);
                                // validateUrl();
                              }}
                            />
                            <button
                              type="button"
                              className="btn"
                              disabled={!isValidUrl || !url}
                              onClick={handleClick}
                              // onClick={() => {
                              //   if (isValidUrl) {
                              //     dispatch(
                              //       getKeyWords({
                              //         cookies,
                              //         url: handleUrl(url),
                              //       })
                              //     );
                              //   } else {
                              //     toast.error("يرجي ادخال رابط صحيح", {
                              //       duration: 4000,
                              //     });
                              //   }
                              // }}
                            >
                              تحقق
                            </button>
                          </div>
                          {!isValidUrl && (
                            <p className="error">يرجي ادخال رابط صحيح</p>
                          )}
                        </div>
                      </div> */}
                      <div className="form-group">
                        <label className="form-label">الكلمات الدلالية</label>

                        <div>
                          <CreatableSelect
                            isRtl={true}
                            isSearchable={true}
                            className="form-control select-form keywords-select"
                            classNamePrefix="select"
                            isMulti={true}
                            options={
                              selectedKeywords?.map((keyword) => ({
                                value: keyword?.value,
                                label: keyword?.value,
                              })) || []
                            }
                            onChange={(selected) => {
                              setSelectedKeywords(
                                selected.map((selected) => selected)
                              );
                            }}
                            value={selectedKeywords}
                            placeholder="اكتب الكلمات الدلالية ثم اضغط على Enter"
                            isClearable={false}
                          />
                          {inputErrors?.selectedKeywords &&
                            selectedKeywords?.length < 1 && (
                              <p className="error">
                                يجب اضافة كلمة دلالية واحدة علي الأقل
                              </p>
                            )}
                        </div>
                      </div>
                      {selectedKeywords?.length > 0 && (
                        <div className="form-group">
                          <div className="selected-regions">
                            {selectedKeywords?.map((keyword, index) => (
                              <label key={index}>
                                {keyword?.label}
                                <button
                                  onClick={() => {
                                    setSelectedKeywords(
                                      selectedKeywords.filter(
                                        (item) => item !== keyword?.value
                                      )
                                    );
                                  }}
                                  type="button"
                                >
                                  <Close />
                                </button>
                              </label>
                            )) || []}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {formStep === 4 && (
                    <div className="form-step form-step-2">
                      <div className="form-group flex">
                        <label className="form-label">المناطق</label>
                        <div>
                          <Select
                            isRtl={true}
                            isSearchable={false}
                            className="form-control select-form"
                            classNamePrefix="select"
                            isMulti={true}
                            options={[
                              {
                                value: null,
                                label: "كل المناطق",
                              },
                              ...(areas?.map((area) => ({
                                value: area.id,
                                label: area.name,
                              })) || []),
                            ]}
                            onChange={(selected) => {
                              if (
                                selected
                                  ?.map((item) => item.value)
                                  .includes(null)
                              ) {
                                setSelectedRegions(
                                  areas?.map((area) => ({
                                    value: area.id,
                                    label: area.name,
                                  }))
                                );
                              } else {
                                setSelectedRegions(selected);
                              }
                            }}
                            value={selectedRegions}
                            placeholder="اختر المناطق"
                          />
                          {inputErrors?.selectedRegions &&
                            selectedRegions?.length < 1 && (
                              <p className="error">
                                يجب إختيار منطقة علي الاقل
                              </p>
                            )}
                        </div>
                      </div>
                      {selectedRegions.length > 0 && (
                        <div className="form-group">
                          <div className="selected-regions">
                            {selectedRegions.map((region, index) => (
                              <label key={index}>
                                {region.label}
                                <button
                                  onClick={() => {
                                    setSelectedRegions(
                                      selectedRegions.filter(
                                        (item) => item.value !== region.value
                                      )
                                    );
                                  }}
                                  type="button"
                                >
                                  <Close />
                                </button>
                              </label>
                            )) || []}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {formStep === 5 && (
                    <div className="form-step form-step-1">
                      <div className="form-group">
                        <label className="form-label">
                          ما هو الحد الأقصى لعدد المنافسات التي يمكن للشركة
                          المشاركة فيها في وقت واحد؟
                        </label>
                        <div>
                          <Select
                            isRtl={true}
                            options={[
                              {
                                value: 4,
                                label: "0-4",
                              },
                              {
                                value: 10,
                                label: "5-10",
                              },
                              {
                                value: 100,
                                label: "> 10",
                              },
                            ]}
                            placeholder="اختر الحد الأقصى لعدد المنافسات"
                            className="form-control select-form"
                            classNamePrefix="select"
                            onChange={(selected) => {
                              setCompetitionsCount(selected);
                            }}
                            value={competitionsCount}
                          />
                          {inputErrors?.competitionsCount &&
                            !competitionsCount?.value && (
                              <p className="error">
                                يرجي اختيار الحد الأقصى لعدد المنافسات
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          نطاق أسعار وثائق المنافسة
                        </label>
                        <div>
                          <Select
                            isRtl={true}
                            options={[
                              {
                                value: 1000,
                                label: "أقل من 1000",
                              },
                              {
                                value: 2000,
                                label: "أقل من 2000",
                              },
                              {
                                value: 4000,
                                label: "أقل من 4000",
                              },
                              {
                                value: 10000,
                                label: "أقل من 10000",
                              },
                            ]}
                            placeholder="اختر نطاق أسعار وثائق المنافسة"
                            className="form-control select-form"
                            classNamePrefix="select"
                            onChange={(selected) => {
                              setPriceRange(selected);
                            }}
                            value={priceRange}
                          />
                          {inputErrors?.priceRange && !priceRange?.value && (
                            <p className="error">
                              يجب إختيار نطاق أسعار وثائق المنافسة
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="form-group flex has-boolean">
                        <label className="form-label">
                          هل نافست على عطاءات باستخدام منصة اعتماد سابقا؟
                        </label>
                        <div>
                          <div className="form-checkbox">
                            <label>
                              <input
                                type="radio"
                                onChange={() => {
                                  setPreviousParticipation(true);
                                }}
                                name="previousParticipation"
                                checked={
                                  previousParticipation === true ? true : false
                                }
                              />
                              <span>نعم</span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                onChange={() => {
                                  setPreviousParticipation(false);
                                }}
                                name="previousParticipation"
                                checked={
                                  previousParticipation === false ? true : false
                                }
                              />
                              <span>لا</span>
                            </label>
                          </div>
                          {inputErrors?.previousParticipation &&
                            previousParticipation === null && (
                              <p className="error">يرجي اختيار نعم او لا !</p>
                            )}
                        </div>
                      </div>
                      <div className="form-group flex has-boolean">
                        <label className="form-label">
                          هل ربحت عطاءات باستخدام منصة اعتماد؟
                        </label>
                        <div>
                          <div className="form-checkbox">
                            <label>
                              <input
                                type="radio"
                                onChange={() => {
                                  setPreviousWin(true);
                                }}
                                name="previousWin"
                                checked={previousWin === true ? true : false}
                              />
                              <span>نعم</span>
                            </label>
                            <label>
                              <input
                                type="radio"
                                onChange={() => {
                                  setPreviousWin(false);
                                }}
                                name="previousWin"
                                checked={previousWin === false ? true : false}
                              />
                              <span>لا</span>
                            </label>
                          </div>
                          {inputErrors?.previousWin && previousWin === null && (
                            <p className="error">يرجي اختيار نعم او لا !</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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
                      } else if (formStep === 2) {
                        if (!companyName) {
                          toast.error("يجب إدخال اسم الشركة", {
                            duration: 4000,
                          });

                          setInputErrors({
                            companyName: true,
                            employeesCount: false,
                          });
                        } else if (!employeesCount || !employeesCount?.value) {
                          toast.error("يجب إختيار عدد الموظفين", {
                            duration: 4000,
                          });

                          setInputErrors({
                            employeesCount: true,
                            companyName: false,
                          });
                        } else {
                          setFormStep(formStep + 1);
                        }
                      } else if (formStep === 3) {
                        if (selectedActivities?.length < 1) {
                          toast.error("يجب إختيار النشاطات المستهدفة", {
                            duration: 4000,
                          });

                          setInputErrors({
                            selectedActivities: true,
                            selectedKeywords: false,
                          });
                        } else if (selectedKeywords?.length < 1) {
                          toast.error("يجب اضافة الكلمات الدلالية", {
                            duration: 4000,
                          });

                          setInputErrors({
                            selectedKeywords: true,
                            selectedActivities: false,
                          });
                        } else {
                          setFormStep(formStep + 1);
                        }
                      } else if (formStep === 4) {
                        if (selectedRegions?.length < 1) {
                          toast.error("يجب إختيار المناطق", {
                            duration: 4000,
                          });

                          setInputErrors({
                            selectedRegions: true,
                          });
                        } else {
                          setFormStep(formStep + 1);
                        }
                      } else if (formStep === 5) {
                        if (!competitionsCount || !competitionsCount?.value) {
                          toast.error("يجب إختيار الحد الأقصى لعدد المنافسات", {
                            duration: 4000,
                          });

                          setInputErrors({
                            competitionsCount: true,
                            priceRange: false,
                            previousParticipation: false,
                            previousWin: false,
                          });
                        } else if (!priceRange || !priceRange?.value) {
                          toast.error("يجب إختيار نطاق أسعار وثائق المنافسة", {
                            duration: 4000,
                          });

                          setInputErrors({
                            priceRange: true,
                            competitionsCount: false,
                            previousParticipation: false,
                            previousWin: false,
                          });
                        } else if (previousParticipation === null) {
                          toast.error("يرجي اختيار نعم او لا !", {
                            duration: 4000,
                          });

                          setInputErrors({
                            previousParticipation: true,
                            priceRange: false,
                            competitionsCount: false,
                            previousWin: false,
                          });
                        } else if (previousWin === null) {
                          toast.error("يرجي اختيار نعم او لا !", {
                            duration: 4000,
                          });

                          setInputErrors({
                            previousWin: true,
                            priceRange: false,
                            competitionsCount: false,
                            previousParticipation: false,
                          });
                        } else {
                          setButtonLoading(true);
                          handleSubmit(onSubmit)();
                        }
                      }
                    }}
                    type="button"
                    disabled={buttonLoading}
                  >
                    {formStep === 5 ? (
                      buttonLoading ? (
                        <Spinner animation="border" />
                      ) : (
                        "تسجيل"
                      )
                    ) : (
                      "التالي"
                    )}
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
