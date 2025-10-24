import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo2.svg";
import Link from "next/link";
import { forgetPassword } from "@/store/actions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Arrow from "./assets/images/arrow-left.svg";
import { FormattedMessage, useIntl } from "react-intl";

const Index = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  // const forgetData = getSectionData(allCmsHome, "forget-password");

  const onSubmit = (formData) => {
    dispatch(
      forgetPassword({
        formData,
        toast,
        reset,
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
                  <Logo fill="#111827" width={120} />
                  {/* )} */}
                </a>
              </Link>
              <div className="login-banner__text">
                <h3>{"Forgot Something ? We’ve Got You"}</h3>
                <p>Get Back In, Quick and Easy </p>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12}>
            <div className="login-form">
              <div className="login-form__header">
                <h3>
                  <FormattedMessage id="forgetPassword" /> !
                </h3>
              </div>
              <div className="login-form__body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col lg={12}>
                      <div className="form-group">
                        <label>
                          <FormattedMessage id="Email" />*
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={formatMessage({ id: "Enter email" })}
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
                          <span className="error">
                            <FormattedMessage id="emailRequired" />
                          </span>
                        )}
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="form-group">
                        <button type="submit" className="btn">
                          <FormattedMessage id="send" />
                        </button>
                        <p className="form-group__register">
                          <FormattedMessage id="backToLogin" />{" "}
                          <Link href="/login">
                            <a>
                              <FormattedMessage id="clickHere" />
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
