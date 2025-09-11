import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import Link from "next/link";
import Image from "next/future/image";
import { useSelector } from "react-redux";
import { getSectionData, handleImageLink } from "@/helpers/functions";

const Index = () => {

  return (
    <>
      <div className={styles["about-section"]}>
        <Container>
          <Row>
            <Col lg={6} md={12} sm={12}>
              <div className="rigth-section">
                <h3>{"aboutData?.title"}</h3>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: aboutData?.description,
                  }}
                /> */}
                <Link href={""}>
                  <a className="btn">{"aboutData?.buttonLabel"}</a>
                </Link>
              </div>
            </Col>

            <Col lg={6} md={12} sm={12}>
              <div className="left-section">
                {/* <Image
                  src={handleImageLink(aboutData?.image)}
                  alt=""
                  width={500}
                  height={500}
                /> */}
{/* 
                {aboutStatistics?.items?.length > 0 && (
                  <>
                    <div className="chart-section">
                      <div className="chart-container">
                        <div className="bag-icon">
                          <Image
                            src={aboutStatistics?.items?.[0]?.image}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <h5>{aboutStatistics?.items?.[0]?.title}</h5>
                        <p>{aboutStatistics?.items?.[0]?.subTitle}</p>
                      </div>
                    </div>
                    <div className="number-section">
                      <div className="light-icon">
                        <Image
                          src={aboutStatistics?.items?.[1]?.image}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <p>{aboutStatistics?.items?.[1]?.title}</p>
                        <h5>{aboutStatistics?.items?.[1]?.subTitle}</h5>
                      </div>
                    </div>
                    <div className="person-section">
                      <div className="person-icon">
                        <Image
                          src={aboutStatistics?.items?.[2]?.image}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <h5>{aboutStatistics?.items?.[2]?.title}</h5>
                        <p>{aboutStatistics?.items?.[2]?.subTitle}</p>
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </Col>
          </Row>

          {/* {features?.isActive && features?.items?.length > 0 && (
            <div className="features">
              <Row>
                <Col lg={12} md={12} sm={12}>
                  {features?.items?.map((item, index) => {
                    return (
                      <div
                        className={
                          index !== 0
                            ? "icon-section"
                            : "icon-section first-section"
                        }
                        key={index}
                      >
                        <div className="icon">
                          <Image
                            src={handleImageLink(item?.image)}
                            alt=""
                            width={30}
                            height={30}
                          />
                        </div>
                        <p>{item?.title}</p>
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </div>
          )} */}
{/* 
          {aboutData?.items?.length > 0 && (
            <Row>
              {aboutData?.items?.map((principle, index) => {
                return (
                  <Col lg={4} md={6} sm={12} key={index}>
                    <div className="principles">
                      <Image
                        src={handleImageLink(principle?.image)}
                        alt=""
                        width={100}
                        height={100}
                      />
                      <h3>{principle?.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: principle?.description,
                        }}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          )} */}
        </Container>
      </div>
    </>
  );
};

export default Index;
