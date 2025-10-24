import React from "react";
import styles from "./styles/style.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { getSectionData, handleImageLink } from "@/helpers/functions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import { getSectionData } from "@/helpers/functions";
import Image from "next/future/image";
// import Star from "./assets/star.svg";
const Index = () => {
  const { allCmsHome } = useSelector((state) => state?.authentication);
  const testimonials = getSectionData(allCmsHome, "testimonials");

  const renderTestimonials = testimonials?.items?.map((item, index) => (
    <SwiperSlide className="slide-swipper" key={index}>
      <div className={`clients--content--item`}>
        <p className="text">{item?.description}</p>
        <div className="author-wr">
          <Image src={item?.image} width={50} height={50} />
          <div>
            <p className="auther">{item?.title}</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  ));

  return (
    <div
      className={`${styles["testimonials-wrapper"]} `}
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="200"
    >
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="title">
              <h1>
                <span>{"What Do Our Customers Say ?"}</span>
              </h1>
              <h5>
                See what our enterprise and government clients have to <br></br>{" "}
                say about our AI platform.
              </h5>
            </div>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <div className="clients--content">
              <Swiper
                className="swipper-testimonials"
                loop={renderTestimonials?.length > 1} // loop only if more than 1
                modules={[Autoplay, Navigation, Pagination]}
                navigation={{
                  prevEl: ".swiper-button-next",
                  nextEl: ".swiper-button-prev",
                }}
                pagination={{
                  dynamicBullets: true,
                  clickable: true,
                }}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                centeredSlides={renderTestimonials?.length === 1} // center if only 1
                slidesPerView={renderTestimonials?.length === 1 ? 1 : 3} // 1 slide if only 1
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: renderTestimonials?.length === 1 ? 1 : 1.1,
                    centeredSlides: renderTestimonials?.length === 1,
                  },
                  375: {
                    slidesPerView: renderTestimonials?.length === 1 ? 1 : 1.2,
                    centeredSlides: renderTestimonials?.length === 1,
                  },
                  768: {
                    slidesPerView: renderTestimonials?.length === 1 ? 1 : 1.6,
                    spaceBetween: 40,
                    centeredSlides: renderTestimonials?.length === 1,
                  },
                  991: {
                    slidesPerView: renderTestimonials?.length === 1 ? 1 : 1.6,
                    spaceBetween: 25,
                    centeredSlides: renderTestimonials?.length === 1,
                  },
                  1400: {
                    slidesPerView: renderTestimonials?.length === 1 ? 1 : 3,
                    spaceBetween: 40,
                    centeredSlides: renderTestimonials?.length === 1,
                  },
                  1920: {
                    slidesPerView: renderTestimonials?.length === 1 ? 1 : 3,
                    spaceBetween: 40,
                    centeredSlides: renderTestimonials?.length === 1,
                  },
                }}
              >
                {renderTestimonials}
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
