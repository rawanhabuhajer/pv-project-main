import { getSectionData } from "@/helpers/functions";
import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./styles/style.module.scss";

const Index = () => {
  const { allCmsHome } = useSelector((state) => state?.cms);
  const terms = getSectionData(allCmsHome, "terms-and-conditions");

  return (
    <>
      <div className={styles["privacy-section"]}>
        <Container>
          <div
            className="privacy-inner"
            dangerouslySetInnerHTML={{
              __html: terms?.description,
            }}
          />
        </Container>
      </div>
    </>
  );
};

export default Index;
