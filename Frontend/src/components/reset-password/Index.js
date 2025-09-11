import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo2.svg";
import Link from "next/link";
import { resetPassword } from "@/store/actions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Eye from "./assets/images/eye.svg";
import Image from "next/future/image";
import { getSectionData, handleImageLink } from "@/helpers/functions";
import Arrow from "./assets/images/arrow-left.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
const Index = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const router = useRouter();
  const token = router?.query.id;
  // const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  // const resetData = getSectionData(allCmsHome, "reset-password");

  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const submitForm = (formData) => {
    const newPassword = formData.password
    console.log(token);
    dispatch(resetPassword({ newPassword, token }));
  };
  return (
    <>
      <div className={styles["login-section"]}>
        <Row>
          <Col lg={4} md={12}>
            <div className="login-banner">
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
                  {/* {allCmsFooter?.logo ? (
                    <Image
                      src={handleImageLink(allCmsFooter?.logo)}
                      alt=""
                      width={300}
                      height={300}
                    />
                  ) : ( */}
                  <Logo/>
                  {/* )} */}
                </a>
              </Link>
              <div className="login-banner__text">
                <h3>{"resetData?.title"}</h3>
                {/* <p
                  dangerouslySetInnerHTML={{ __html: resetData?.description }}
                /> */}
              </div>
            </div>
          </Col>
          <Col lg={8} md={12}>
            <div className="login-form">
              <div className="login-form__header">
                <h3>
                  <FormattedMessage id="resetPassword" /> !
                </h3>
              </div>
              <div className="login-form__body">
                <form onSubmit={handleSubmit(submitForm)}>
                  <Row>
                    <Col lg={12}>
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="password" />*
                        </label>
                        <div>
                          <input
                            type={showPassword?.password ? "text" : "password"}
                            className="form-control"
                            placeholder={formatMessage({ id: "enterPassword" })}
                            {...register("password", {
                              required: formatMessage({ id: "requiredField" }),
                              minLength: {
                                value: 8,
                                message: formatMessage({
                                  id: "passwordLength",
                                }),
                              },
                              pattern: {
                                value:
                                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                                message: formatMessage({
                                  id: "passwordPattern",
                                }),
                              },
                            })}
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
                              showPassword?.password
                                ? "show-password active"
                                : "show-password"
                            }
                          >
                            <Eye />
                          </button>
                        </div>

                        {errors.password && (
                          <span className="error">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="form-group">
                        <button type="submit" className="btn">
                          <FormattedMessage id="send" />
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Index;
