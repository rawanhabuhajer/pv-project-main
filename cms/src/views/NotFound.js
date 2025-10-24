import React from "react";

const ErrorPage = () => {
  return (
    <>
      {/* <div className="error-outer">
        <h1>Error 404</h1>
      </div> */}
      <section className="page_404">
        <div className="text-center">
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>

          <div className="contant_box_404">
            <h3 className="h2">Look like you are lost</h3>

            <p>the page you are looking for not avaible!</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
