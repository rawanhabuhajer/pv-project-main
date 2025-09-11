import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";

const error = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { status } = router.query;

  return (
    <div className="not-found">
      <div>
        <h1>{status === "500" && formatMessage({ id: "serverError" })}</h1>
        <h2>{status}</h2>
        <div className="footer-link">
          <Link href="/">
            <a className="btn">{formatMessage({ id: "backToHome" })}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default error;
