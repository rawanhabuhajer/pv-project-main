import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo2.svg";
import Eye from "./assets/images/eye.svg";
import Link from "next/link";
import { postUserLogin } from "@/store/actions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { getSectionData, handleImageLink } from "@/helpers/functions";
import Image from "next/future/image";
import ArrowIcon from "./assets/images/arrow-left.svg";
import { parseCookies } from "nookies";

const Index = () => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  const { user } = useSelector((state) => state?.authentication);
  // const loginData = getSectionData(allCmsHome, "login");

  const [showPassword, setShowPassword] = useState(false);

  const getTotalClicks = () => {
    const tendersClicks =
      JSON.parse(localStorage.getItem("tendersClicks")) || [];
    const totalClicks = tendersClicks.reduce(
      (sum, tender) => sum + tender.count,
      0
    );
    return totalClicks;
  };

  const onSubmit = (formData) => {
    const totalClicks = getTotalClicks();
    dispatch(
      postUserLogin({
        cookies,
        AccountId: user?.id,
        totalClicks: totalClicks,
        formData,
        reset,
        toast,
        formatMessage,
        dispatch,
      })
    );
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
                    <ArrowIcon />
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
                  <Logo fill="#095183" width={120} />
                  {/* )} */}
                </a>
              </Link>
              <div className="login-banner__text">
                <h3>{"loginData?.title"}</h3>
                {/* <p
                  dangerouslySetInnerHTML={{ __html: loginData?.description }}
                /> */}
                <p>gfg</p>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12}>
            <div className="login-form">
              <div className="login-form__header">
                <h3>
                  <FormattedMessage id="login" />
                </h3>
                <p>
                  <FormattedMessage id="welcomeAgain" />
                </p>
              </div>
              <div className="login-form__body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg={12}>
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="email" />*
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={formatMessage({
                            id: "enterEmail",
                          })}
                          {...register("email", { required: true })}
                        />
                        {errors.email && (
                          <p className="error">
                            <FormattedMessage id="emailRequired" />
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="password" />*
                        </label>
                        <div>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder={formatMessage({ id: "enterPassword" })}
                            {...register("password", { required: true })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={
                              showPassword
                                ? "show-password active"
                                : "show-password"
                            }
                          >
                            <Eye />
                          </button>
                        </div>
                        {errors.password && (
                          <p className="error">
                            <FormattedMessage id="passwordRequired" />
                          </p>
                        )}
                        <div className="form-group__links">
                          <Link href="/forget-password">
                            <a>
                              <FormattedMessage id="forgetPassword" />
                            </a>
                          </Link>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="form-group">
                        <button type="submit" className="btn">
                          <FormattedMessage id="login" />
                        </button>
                        <p className="form-group__register">
                          <FormattedMessage id="noAccount" />{" "}
                          <Link href="/register">
                            <a>
                              <FormattedMessage id="register" />
                            </a>
                          </Link>
                        </p>
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
