import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// import ar from "react-phone-input-2/lang/ar.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { requestDemo } from "@/store/actions";

import { parseCookies } from "nookies";
import { FormattedMessage, useIntl } from "react-intl";
import { getSectionData, handleImageLink } from "@/helpers/functions";

import Image from "next/future/image";
import Logo from "./assets/images/new-logo.svg";
import { useRouter } from "next/router";

const Index = () => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { locale } = useRouter();

  const { allCmsHome, allCmsFooter } = useSelector((state) => state?.cms);
  const requestData = getSectionData(allCmsHome, "request-demo");
  const testimonials = getSectionData(allCmsHome, "testimonials");

  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedPhone, setSelectedPhone] = useState("");

  const resetInputs = () => {
    reset();
    setSelectedPhone("");
  };

  const onSubmit = (formData) => {
    if (selectedPhone) {
      formData.phone = selectedPhone;
      dispatch(
        requestDemo({
          formData,
          cookies,
          resetInputs,
          toast,
          formatMessage,
        })
      );

      fbq("track", "RequestDemoClicked");
    } else {
      toast.error(formatMessage({ id: "phoneNumberRequired" }));
      return;
    }
  };

  return (
    <>
      <div className={styles["request-demo-section"]}>
        <Container>
          <Row>
            <Col lg={6} md={12}>
              <div className="demo-form">
                <div className="form-title">
                  <h3>{requestData?.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: requestData?.description,
                    }}
                  />
                </div>
                <div className="form-body">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col lg={6} md={12}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder={formatMessage({ id: "name" }) + "*"}
                            className={
                              errors?.name
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            {...register("name", { required: true })}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={12}>
                        <div className="form-group">
                          <input
                            type="email"
                            placeholder={formatMessage({ id: "email" }) + "*"}
                            className={
                              errors?.email
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            {...register("email", { required: true })}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={12}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder={
                              formatMessage({ id: "companyName" }) + "*"
                            }
                            className={
                              errors?.companyName
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            {...register("companyName", { required: true })}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={12}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder={
                              formatMessage({ id: "jobTitle" }) + "*"
                            }
                            className={
                              errors?.jobTitle
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            {...register("jobTitle", { required: true })}
                          />
                        </div>
                      </Col>
                      <Col lg={12} md={12}>
                        <div className="form-group">
                          <PhoneInput
                            country={"sa"}
                            value={selectedPhone}
                            onChange={(phone) => setSelectedPhone(phone)}
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
                            searchPlaceholder={formatMessage({
                              id: "searchPlaceholder",
                            })}
                            localization={locale}
                          />
                        </div>
                      </Col>
                      <Col lg={12} md={12}>
                        <div className="form-group">
                          <input
                            type="number"
                            placeholder={
                              formatMessage({ id: "numberOfEmployees" }) + "*"
                            }
                            className={
                              errors?.employees
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            {...register("employees", { required: true })}
                          />
                        </div>
                      </Col>
                      <Col lg={12} md={12}>
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              {...register("hasEtimadAccount", {
                                required: true,
                              })}
                            />
                            <span>
                              {formatMessage({ id: "hasEtimadAccount" })}*
                            </span>
                          </label>
                        </div>
                      </Col>
                      <Col lg={12} md={12}>
                        <div className="form-group has-btn">
                          <button type="submit" className="btn">
                            <FormattedMessage id="send" />
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
            {testimonials?.isActive && testimonials?.items?.length > 0 ? (
              <Col lg={6} md={12}>
                <div className="demo-swiper">
                  <Swiper
                    slidesPerView={1}
                    loop={false}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      dynamicBullets: true,
                      clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                  >
                    {testimonials?.items?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="demo-quote">
                          <p>{item.description}</p>
                          <h4>{item.title}</h4>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Col>
            ) : (
              <Col lg={6} md={12}>
                <div className="fallback-image">
                  {allCmsFooter?.logo ? (
                    <Image
                      src={handleImageLink(allCmsFooter?.logo)}
                      alt=""
                      width={300}
                      height={300}
                    />
                  ) : (
                    <Logo fill="#ddd" width={300} />
                  )}
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Index;
