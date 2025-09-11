import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = (props) => {
  return (
    <>
      <div className={props.loading ? " loader-big fired" : "loader-big"}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
};

export default Loading;
