import React, { useEffect } from "react";
import styles from "./styles/style.module.scss";
import ArrowIcon from "./assets/images/arrow.svg";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/future/image";
import { handleImageLink } from "@/helpers/functions";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import toast from "react-hot-toast";
import { subscribe } from "@/store/actions";
import { useRouter } from "next/router";

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { locale } = useRouter();



  useEffect(() => {
    const scrollProcess = () => {
      let scrollPos = 700;
      const ScrollBtn = document?.querySelector(".scrollTop");
      function checkPosition() {
        let windowY = window.scrollY || 0;
        if (windowY > scrollPos) {
          // Scrolling UP
          ScrollBtn.classList.add("active");
        } else {
          // Scrolling DOWN
          ScrollBtn.classList.remove("active");
        }
        // scrollPos = windowY;
      }
      window.addEventListener("scroll", checkPosition);
    };

    scrollProcess();
  });

  const scrolly = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const renderSocialLinks = allCmsFooter?.cmsSocial?.map((item, index) => {
  //   if (item?.isActive)
  //     return (
  //       <Link href={item?.url} key={index}>
  //         <a target="_blank">
  //           <Image
  //             src={handleImageLink(item?.icon)}
  //             width={25}
  //             height={25}
  //             alt=""
  //           />
  //         </a>
  //       </Link>
  //     );
  // });

  const onSubmit = (data) => {
    fbq("track", "NewsletterClicked");
    dispatch(
      subscribe({
        email: data.email,
        toast,
        formatMessage,
        reset,
      })
    );
  };

  return (
    <>
      <div className={styles["footer-section"]}>
   
          <div className="footer--wrap">
            <div className="footer--top">
              <Row>
                <Col lg={4} md={12}>
                  <div className="footer--right">
                    <div className="footer--links">
                      <ul>
                        <li>
                          <Link href="/about">
                            <a>
                              <FormattedMessage id="header.about" />
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/privacy-policy">
                            <a>
                              <FormattedMessage id="header.privacyPolicy" />
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/terms-and-conditions">
                            <a>
                              <FormattedMessage id="header.termsAndConditions" />
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="footer-contacts">
                      <ul>
                        <li>
                          <Link href={`tel:${"09909"}`}>
                            <a>{"098878"}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`mailto:${"oili"}`}>
                            <a>{"email"}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={12}>
                  <div className="footer--newsletter">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder={formatMessage({
                            id: "footer.enterEmail",
                          })}
                          className="form-control"
                          {...register("email", { required: true })}
                        />
                        <button type="submit" className="btn">
                          <FormattedMessage id="footer.subscribe" />
                        </button>
                      </div>
                      {errors?.email && (
                        <p className="error">
                          <FormattedMessage id="footer.emailRequired" />
                        </p>
                      )}
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="footer--bottom">
              <div className="footer--social">pvxperts</div>

              <div className="footer--rights">
                gngnhng
              </div>
            </div>
          </div>
   
      </div>
      <button onClick={scrolly} className="scrollTop" type="button">
        <ArrowIcon />
      </button>
    </>
  );
};

export default Index;
