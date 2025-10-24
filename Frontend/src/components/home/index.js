import React, { useEffect } from "react";
import styles from "./styles/style.module.scss";
import Hero from "../hero/index";
import Footer from "../footer/Index";
import Clients from "../clients/index";
import Features from "../features/index";
import Header from "../header/Index";
import Tools from "../tools/index";
import { Container } from "react-bootstrap";
import Testimonials from "../testmonial/Index";
import BlurCursor from "../BlurCursor";
import ContactUs from "../contact-us/Index";
import { useDispatch, useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
import { getAllCmsHome } from "@/store/actions";
const index = () => {
  const dispatch = useDispatch();
  const { allCmsHome } = useSelector((state) => state.authentication);

  const heroData = getSectionData(allCmsHome, "hero");
  const partnersData = getSectionData(allCmsHome, "partners");
  const featuresData = getSectionData(allCmsHome, "features");
  const useCasesData = getSectionData(allCmsHome, "use-cases");
  const clientsData = getSectionData(allCmsHome, "testimonials");
  // const blogHeaderData = getSectionData(allCmsHome, "blogs");
  // const FrequentlyAskedQuestionsData = getSectionData(
  //   allCmsHome,
  //   "FrequentlyAskedQuestions"
  // );
  useEffect(() => {
    dispatch(getAllCmsHome({ cookies: {} }));
  }, []);

  return (
    <div className={styles["home-wrapper"]}>
      <BlurCursor />
      <div className="header">
        <Header />
      </div>

      {heroData?.isActive && <Hero />}
      {partnersData?.isActive && <Clients />}
      {useCasesData?.isActive && <Tools />}
      {featuresData?.isActive && (
        <Container>
          <Features />
        </Container>
      )}

      {clientsData?.isActive && (
        <Container>
          <Testimonials />
        </Container>
      )}
      {/* {blogHeaderData?.isActive && <Blogs />}
      {FrequentlyAskedQuestionsData?.isActive && <FaqNafes />} */}

      <Container>
        <ContactUs />
      </Container>

      <Footer />
    </div>
  );
};

export default index;
