import React from "react";
import styles from "./styles/style.module.scss";
// import Logo from "../../assets/images/stripe.png";
import Image from "next/future/image";
import Logo2 from "../../assets/images/true.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper";
import "swiper/css/grid";
import Logo from "./assets/logo.png";
const index = () => {
  const items = [
    {
      id: 1,
      image: Logo,
      name: "Hotjar",
      description: "Eyewear manufacturer",
    },
    {
      id: 2,
      image: Logo,
      name: "Rollbar",
      description: "Eyewear manufacturer",
    },
    {
      id: 3,
      image: Logo,
      name: "Monday",
      description: "Eyewear manufacturer",
    },
    {
      id: 4,
      image: Logo,
      name: "User Testing",
      description: "Eyewear manufacturer",
    },
    {
      id: 5,
      image: Logo,
      name: "Monday",
      description: "Eyewear manufacturer",
    },
    {
      id: 6,
      image: Logo,
      name: "User Testing",
      description: "Eyewear manufacturer",
    },
    {
      id: 7,
      image: Logo,
      name: "Monday",
      description: "Eyewear manufacturer",
    },
    {
      id: 8,
      image: Logo,
      name: "User Testing",
      description: "Eyewear manufacturer",
    },
    {
      id: 9,
      image: Logo,
      name: "Monday",
      description: "Eyewear manufacturer",
    },
    {
      id: 10,
      image: Logo,
      name: "User Testing",
      description: "Eyewear manufacturer",
    },
    {
      id: 11,
      image: Logo,
      name: "Monday",
      description: "Eyewear manufacturer",
    },
    {
      id: 12,
      image: Logo,
      name: "User Testing",
      description: "Eyewear manufacturer",
    },
    // Add more items as needed
  ];
  const renderPartners = items?.map((item, index) => (
    <SwiperSlide key={index}>
      <div className={styles["single-item"]}>
        <div className={styles["img-wrapper"]}>
          <Image src={item?.image} width={120} height={120} />
        </div>
        {/* <span className={styles["text"]}>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </span> */}
      </div>
    </SwiperSlide>
  ));
  return (
    <div
      className={styles["clients-section"]}
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="200"
    >
      {/* <h3>Trusted by Leading Organizations</h3> */}
      <h5>
      Trusted by Leading Organizations
        {/* <br></br> customization, and control. */}
      </h5>
      <Swiper
        className="client-swiper"
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={8}
        loop={true}

        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3000}
        freeMode={true}
        grabCursor={false}
        allowTouchMove={false}
      >
        {renderPartners}
      </Swiper>
    </div>
  );
};

export default index;
