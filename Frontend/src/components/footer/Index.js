import React, { useEffect } from "react";
import styles from "./styles/style.module.scss";
import ArrowIcon from "./assets/images/arrow.svg";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import Logo from "./assets/images/logoLast.svg";
import { FormattedMessage } from "react-intl";

import {
  Instagram,
  Linkedin,
  LogOut,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";

const Index = () => {
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

  return (
    <>
      <div className={styles["footer-section"]}>
        <div className="footer--wrap">
          <div className="footer--top">
            <Row>
              <Col lg={4} md={12}>
                <div className="footer--right">
                  <Logo />
                </div>
              </Col>
              <Col lg={4} md={12}>
                <div className="footer--right">
                  <div className="footer--links">
                    <ul>
                    
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
                </div>
              </Col>
              <Col lg={4} md={12}>
                <div className="footer--newsletter">
                  <div className="footer--social">
                    <Link href={`/`}>
                      <a>
                        <Linkedin color="#fff" />
                      </a>
                    </Link>
                  </div>
                  <div className="footer--social">
                    <Link href={`mailto:${"oili"}`}>
                      <a>
                        <Mail color="#fff" />
                      </a>
                    </Link>
                  </div>
                  <div className="footer--social">
                    <Link href={`tel:${"09909"}`}>
                      <a>
                        <Phone color="#fff" />
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="footer--bottom"></div>
        </div>
      </div>
      <button onClick={scrolly} className="scrollTop" type="button">
        <ArrowIcon />
      </button>
    </>
  );
};

export default Index;
