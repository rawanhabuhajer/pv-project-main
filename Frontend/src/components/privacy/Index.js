import { getSectionData } from "@/helpers/functions";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/style.module.scss";
import BlurCursor from "../BlurCursor";
import Header from "../header/Index";
import { getAllCmsHome } from "@/store/actions";
const Index = () => {
  const { allCmsHome } = useSelector((state) => state.authentication);
  const privacy = getSectionData(allCmsHome, "privacy");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCmsHome({ cookies: {} }));
  }, []);
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
