import React from "react";
import styles from "./styles/style.module.scss";
import Link from "next/link";

const Index = () => {
  return (
    <div className={styles["thank-you-wrapper"]}>
      <h1>Password Reset Request Sent Successfully</h1>
      <p>
        We’ve sent a password reset link to your registered email address.{" "}
        <br></br>
        Please check your inbox (and spam or junk folder) and follow the link to
        create a new password.
      </p>
      <button className="btn">
        <Link href="/" className="btn">
          Back to Home
        </Link>
      </button>
    </div>
  );
};

export default Index;
