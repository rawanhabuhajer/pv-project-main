import { getSectionData } from "@/helpers/functions";
import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./styles/style.module.scss";
import BlurCursor from "../BlurCursor";
import Header from '../header/Index'
const Index = () => {
  const { allCmsHome } = useSelector((state) => state.authentication);
  const privacy = getSectionData(allCmsHome, "privacy");


  return (
    <>
      <div className={styles["privacy-section"]}>
        <BlurCursor />
        <Header />
        <Container>
          <div
            className="privacy-inner"
            dangerouslySetInnerHTML={{
              __html: privacy?.description,
            }}
          />
        </Container>
      </div>
    </>
  );
};

export default Index;
