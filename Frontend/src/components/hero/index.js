import React from "react";
import styles from "./styles/style.module.scss";
import Image from "next/future/image";
import HeroImage from "../header/assets/images/hero1.png";
import { Container } from "react-bootstrap";
import Link from "next/link";
import Header from "../header/Index";
import TrueIcon from "../../assets/images/true.svg";
import HeroImg from "./assets/heroImg.svg";
const index = () => {
  return (
    <div className={styles["hero-green-wrapper"]}>
      {/* <div className="blur-cicrle"></div> */}
      <div className="text-section"  data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200">
        <h1>
          Secure AI Conversations for <br></br>
          <span>Enterprise & Government</span>
        </h1>
        {/* <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: introContent?.description,
                }}
              /> */}
        <p>
          Unlock the power of AI with enterprise-grade security, customizable{" "}
          <br></br>
          agents, and comprehensive knowledge management.
        </p>

        <div className="button-wrapper">
          <Link href={"/"}>
            <a>{"Request demo"}</a>
          </Link>
          <Link href={"/"}>
            <a>{"Learn more"}</a>
          </Link>
        </div>
        <div className="heroImg"  data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200">
          <HeroImg />
        </div>
      </div>
    </div>
  );
};

export default index;
