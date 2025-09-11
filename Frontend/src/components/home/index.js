import React from "react";
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
import ContactUs from '../contact-us/Index'
const index = () => {
  return (
    <div className={styles["home-wrapper"]}>
      <BlurCursor />
      <div className="header">
        <Header />
      </div>

      <Hero />

      <Clients />
      <Container>
        <Features />
      </Container>
      <Tools />

      <Container>
        <Testimonials />
      </Container>
      <Container>
      <ContactUs />
      </Container>
   
      <Footer />
    </div>
  );
};

export default index;
