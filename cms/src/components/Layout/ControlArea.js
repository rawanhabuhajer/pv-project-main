import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ControlArea = ({ btnTxt, cardTxt, icon, url }) => {
  useEffect(() => {
    const buttons = document.querySelectorAll('[data-animation="ripple"]');

    [...buttons].forEach((button) => {
      button.onmousedown = function (e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        const w = this.offsetWidth;

        const ripple = document.createElement("span");

        ripple.className = "ripple";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.style.setProperty("--scale", w);

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.parentNode.removeChild(ripple);
        }, 500);
      };
    });
  }, []);

  // Danger Modal

  return (
    <>
      <div className="control-wrp">
        <Row>
          {url && (
            <Col xl={4} md={4} sm={12}>
              <NavLink
                to={url}
                className="btn btn-big btn-blue"
                data-animation="ripple"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4286 6.39286H9.60714V1.57143C9.60714 0.979799 9.12734 0.5 8.53571 0.5H7.46429C6.87266 0.5 6.39286 0.979799 6.39286 1.57143V6.39286H1.57143C0.979799 6.39286 0.5 6.87266 0.5 7.46429V8.53571C0.5 9.12734 0.979799 9.60714 1.57143 9.60714H6.39286V14.4286C6.39286 15.0202 6.87266 15.5 7.46429 15.5H8.53571C9.12734 15.5 9.60714 15.0202 9.60714 14.4286V9.60714H14.4286C15.0202 9.60714 15.5 9.12734 15.5 8.53571V7.46429C15.5 6.87266 15.0202 6.39286 14.4286 6.39286Z"
                    fill="white"
                  />
                </svg>
                {btnTxt}
              </NavLink>
            </Col>
          )}
          <Col xl={url ? 8 : 12} md={url ? 8 : 12} sm={12}>
            <div className="card">
              <h5>
                <img src={icon} width={20} height={20} alt="" />
                {cardTxt}
              </h5>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ControlArea;
