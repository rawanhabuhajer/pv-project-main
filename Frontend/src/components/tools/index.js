import React from "react";
import Bg1 from "../../assets/images/toolbg1.png";
import Bg2 from "../../assets/images/b2.png";
import Bg5 from "../../assets/images/b5.png";
import Feture1 from "./assets/f1.svg";
import Image from "next/future/image";
import styles from "./styles/style.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Feather } from "lucide-react";
import Link from "next/link";
const index = () => {
  return (
    <div className={styles["tools-section"]}>
      <Container>
        <span>Unlimited users with role-based access control</span>
        <br></br>
        <h3>Featured Our Tools</h3>
        <div className="tools-wrapper">
          <Row data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <Col lg={6}>
              <Feture1 />
            </Col>
            <Col lg={6}>
              <div className="text-section">
                <h5>Custom Enterprise Pricing</h5>
                <p>
                  We offer tailored pricing packages for enterprises and
                  government agencies based on your specific needs and scale.
                </p>
                <ul>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Unlimited users with
                    role-based access control
                  </li>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Enterprise-grade security
                    and compliance
                  </li>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Access to all LLM models
                  </li>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Customizable knowledge
                    base size
                  </li>
                </ul>
                <Link href={"/"}>
                  <a>{"Learn more"}</a>
                </Link>
              </div>
            </Col>
          </Row>
          <Row data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <Col lg={6}>
              <div className="text-section right-side">
                <h5>Custom Enterprise Pricing</h5>
                <p>
                  We offer tailored pricing packages for enterprises and
                  government agencies based on your specific needs and scale.
                </p>
                <ul>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Unlimited users with
                    role-based access control
                  </li>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Enterprise-grade security
                    and compliance
                  </li>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Access to all LLM models
                  </li>
                  <li>
                    <Feather color="#2465ED" /> &nbsp; Customizable knowledge
                    base size
                  </li>
                </ul>
                <Link href={"/"}>
                  <a>{"Learn more"}</a>
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <Feture1 />
            </Col>
          </Row>
        </div>{" "}
      </Container>
    </div>
  );
};

export default index;
