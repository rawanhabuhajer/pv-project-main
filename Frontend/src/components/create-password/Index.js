import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPassword } from "@/store/actions";

import { parseCookies } from "nookies";
import { useIntl } from "react-intl";
import { getSectionData, handleImageLink } from "@/helpers/functions";

import Image from "next/future/image";
import Logo from "../../assets/images/logo2.svg";
import { useRouter } from "next/router";

const Index = () => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { email, userId } = router.query;

  const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  const innerData = getSectionData(allCmsHome, "request-demo");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { handleSubmit } = useForm();

  const resetInputs = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const onSubmit = (formData) => {
    formData.accountId = userId;
    formData.password = password;

    dispatch(
      createPassword({
        formData,
        cookies,
        resetInputs,
        toast,
        formatMessage,
      })
    );
  };

  return (
    <>
      <div className={styles["request-demo-section"]}>
        <Container>
          <Row>
            <Col lg={8} md={12}>
              <div className="demo-form">
                <div className="form-title">
                  <h3>يرجي تغير كلمة المرور</h3>
                  <p>
                    انت مسجل لدينا بهذا البريد الالكتروني
                    <span>{email}sss</span>
                  </p>
                </div>
                <div className="form-body">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col lg={12} md={12}>
                        <div className="form-group">
                          <input
                            type="password"
                            placeholder="كلمة المرور الجديدة"
                            className={
                              password.length < 6 && password.length > 0
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          {password.length < 6 && password.length > 0 && (
                            <p className="text-danger">
                              كلمة المرور يجب ان تكون اكثر من 6 احرف
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col lg={12} md={12}>
                        <div className="form-group">
                          <input
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            className={
                              confirmPassword !== password &&
                              confirmPassword.length > 0
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          {confirmPassword !== password &&
                            confirmPassword.length > 0 && (
                              <p className="text-danger">
                                كلمة المرور غير متطابقة
                              </p>
                            )}
                        </div>
                      </Col>

                      <Col lg={12} md={12}>
                        <div className="form-group has-btn">
                          <button type="submit" className="btn">
                            حفظ
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="fallback-image">
                {allCmsFooter?.logo ? (
                  <Image
                    src={handleImageLink(allCmsFooter?.logo)}
                    alt=""
                    width={200}
                    height={200}
                  />
                ) : (
                  <Logo fill="#ddd" width={300} />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Index;
