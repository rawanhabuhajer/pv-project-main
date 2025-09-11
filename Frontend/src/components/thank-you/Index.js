import React from "react";
import styles from "./styles/style.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";

const Index = () => {
  return (
    <>
      <div className={styles["thank-you-wrapper"]}>
        <h1>{"thankYouData?.title"}</h1>
        <p>{"thankYouData?.description"}</p>

        <Link href={"/"}>
          <a className="btn">{"thankYouData?.buttonLabel" || ""}</a>
        </Link>
      </div>
    </>
  );
};

export default Index;
