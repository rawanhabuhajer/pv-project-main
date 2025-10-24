import React from "react";
import styles from "./styles/style.module.scss";
// import Logo from "../../assets/images/stripe.png";
import Image from "next/future/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css/grid";

import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
const index = () => {
  const { allCmsHome } = useSelector((state) => state.authentication);

  const partnersData = getSectionData(allCmsHome, "partners");

  const renderPartners = partnersData?.items?.map((item) => (
    <SwiperSlide key={item?.id}>
      <div className={styles["single-item"]}>
        <div className={styles["img-wrapper"]}>
          <Image src={item?.image} width={80} height={80} />
        </div>
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
      <h5>{partnersData?.title}</h5>
      <Swiper
        className="client-swiper"
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={partnersData?.items?.length === 1 ? 1 : 6} // 1 if only 1 item
        loop={partnersData?.items?.length > 1} // only loop if more than 1
        centeredSlides={partnersData?.items?.length === 1} // center if only 1
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3000}
        freeMode={true}
        grabCursor={false}
        allowTouchMove={partnersData?.items?.length > 1} // allow swipe only if multiple
      >
        {renderPartners}
      </Swiper>
    </div>
  );
};

export default index;
