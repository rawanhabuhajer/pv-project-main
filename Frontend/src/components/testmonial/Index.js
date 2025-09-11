import React, { useState, useEffect } from "react";
import styles from "./styles/style.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { getSectionData, handleImageLink } from "@/helpers/functions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import Avatar from "./assets/Avatar.svg";
import Image from "next/future/image";
import { User } from "lucide-react";
// import Star from "./assets/star.svg";
const Index = ({ isGradient }) => {
  // const { allCmsHome } = useSelector((state) => state?.cms);
  // const testimonials = getSectionData(allCmsHome, "testimonials");

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
      const mediaQuery = window.matchMedia(query);
      const handler = (event) => setMatches(event.matches);
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }, [query]);

    return matches;
  };
  const isMobile = useMediaQuery("(max-width: 1339px)");

  const renderTestimonials = [1, 2, 3].map((item, index) => (
    <SwiperSlide className="slide-swipper" key={index}>
      <div className={`clients--content--item`}>
        <p className="text">
          The ability to customize agents and integrate with our existing
          systems has made this platform invaluable for our government
          operations.
        </p>
        <div className="author-wr">
          <Avatar />
          <div>
            <p className="auther">{"Michael Johnson"}</p>
            <p className="auther">{"IT Director, Government Agency"}</p>
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
              {/* <h1>آراء عملائنا</h1> */}
              {/* <p>
                نحن فخورون بثقة عملائنا، وسعداء بمشاركتهم تجاربهم معنا. نسعى
                دائمًا لتقديم أفضل الحلول التي تليق بتطلعاتهم وتفوق توقعاتهم.
                هنا بعض مما قالوه عنّا:
              </p> */}
              {/* <div
                dangerouslySetInnerHTML={{ __html: testimonials?.description }}
              /> */}
            </div>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <div className="clients--content">
              <Swiper
                className="swipper-testimonials"
                // onSlideChange={handleSlideChange}
                loop={true}
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
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1.1,
                    // spaceBetween: 15,
                    centeredSlides: true,
                  },
                  375: {
                    slidesPerView: 1.2,
                    // spaceBetween: 15,
                    centeredSlides: true,
                  },
                  768: {
                    slidesPerView: 1.6,
                    spaceBetween: 40,
                    centeredSlides: true,
                  },
                  991: {
                    slidesPerView: 1.6,
                    spaceBetween: 25,
                    centeredSlides: true,
                  },

                  1400: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    centeredSlides: true,
                  },
                  1920: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    centeredSlides: true,
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
