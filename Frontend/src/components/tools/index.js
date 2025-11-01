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
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
const index = () => {
  const { allCmsHome } = useSelector((state) => state.authentication);
  const featuresData = getSectionData(allCmsHome, "features");

  return (
    <div className={styles["tools-section"]}>
      <Container>
        <span>{featuresData?.description}</span>
        <br></br>
        <h3>{featuresData?.title}</h3>
        <div className="tools-wrapper">
          {featuresData?.items.map((item, index) => (
            <Row
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
              key={index}
            >
              {(index + 1) % 2 === 0 ? (
                <>
                  <Col lg={6}>
                    <div className={`text-section right-side`}>
                      <h5>{item?.title}</h5>
                      <p>{item?.subTitle}</p>

                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                        className="subtitle"
                      />
                    </div>
                  </Col>{" "}
                  <Col lg={6}>
                    <Image src={item?.image} alt="" width={500} height={500} />
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={6}>
                    <Image src={item?.image} alt="" width={500} height={500} />
                  </Col>
                  <Col lg={6}>
                    <div className={`text-section `}>
                      <h5>{item?.title}</h5>
                      <p>{item?.subTitle}</p>

                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                        className="subtitle"
                      />
                    </div>
                  </Col>
                </>
              )}
            </Row>
          ))}
        </div>{" "}
      </Container>
    </div>
  );
};

export default index;
