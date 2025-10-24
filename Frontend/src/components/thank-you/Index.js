import React from "react";
import styles from "./styles/style.module.scss";
import Link from "next/link";


const Index = () => {
  return (
    <>
      <div className={styles["thank-you-wrapper"]}>
        <h1>{"Thanks for Joining! Let’s Explore Together"}</h1>
        <p>
          {
            "Thank you for registering! Your account is currently pending approval. Once an admin verifies your account, you will be able to log in and access the platform."
          }
        </p>

        <Link href={"/login"}>
          <a className="btn">{"Login page" || ""}</a>
        </Link>
      </div>
    </>
  );
};

export default Index;
