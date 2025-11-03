import React from "react";
import styles from "./styles/style.module.scss";
import Link from "next/link";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
import Image from "next/future/image";
const index = ({ scrollToContact }) => {
  const { allCmsHome } = useSelector((state) => state.authentication);

  const heroData = getSectionData(allCmsHome, "hero");

  return (
    <div className={styles["hero-green-wrapper"]}>
      {/* <div className="blur-cicrle"></div> */}
      <div
        className="text-section"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        {heroData?.title && (
          <div
            dangerouslySetInnerHTML={{ __html: heroData?.title }}
            className="subtitle"
          />
        )}

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: heroData?.description,
          }}
        />

        <div className="button-wrapper">
          <button className="primary-btn" onClick={scrollToContact}>
            Request demo
          </button>
        </div>
        <div
          className="heroImg"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <Image src={heroData?.image} width={1200} height={600} />
        </div>
      </div>
    </div>
  );
};

export default index;
