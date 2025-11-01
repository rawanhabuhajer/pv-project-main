import { getSectionData } from "@/helpers/functions";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/style.module.scss";
import { getAllCmsHome } from "@/store/actions";
import Header from "../header/Index";
const Index = () => {
  const { allCmsHome } = useSelector((state) => state.authentication);
  const terms = getSectionData(allCmsHome, "terms-and-conditions");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCmsHome({ cookies: {} }));
  }, []);
  return (
    <>
      <div className={styles["privacy-section"]}>
        <Header />
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
