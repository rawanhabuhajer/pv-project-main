import styles from "./styles/style.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Feather } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { sendConatctMessage } from "@/store/actions";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { useDispatch } from "react-redux";

const Index = () => {
  const cookies = parseCookies();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendConatctMessage({
        cookies,
        toast,
        data: userData,
        setUserData,
      })
    );
  };
  return (
    <div className={styles["tools-wrapper"]}>
      <Row data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
        <Col lg={6}>
          <div className="text-section">
            <h3>Contact Us</h3>
            <p>
              We’re here to assist you. Please reach out with any questions,
              feedback, or inquiries, and our team will respond promptly to
              ensure you receive the support you need.
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <h5>Contact Our Team</h5>
              <p>
                Fill out the form below to discuss your organization's needs and
                receive a custom quote.
              </p>

              <div className="form-group flex">
                <div className="form-field">
                  <label className="field-label">First name :</label>
                  <input
                    type="text"
                    name="firstName"
                    className="field-input"
                    placeholder="John"
                    value={userData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Last name :</label>
                  <input
                    type="text"
                    name="lastName"
                    className="field-input"
                    placeholder="Doe"
                    value={userData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-field">
                  <label className="field-label">Email :</label>
                  <input
                    type="email"
                    name="email"
                    className="field-input"
                    placeholder="john.doe@email.com"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-field">
                  <label className="field-label">Company/Organization :</label>
                  <input
                    type="text"
                    name="companyName"
                    className="field-input"
                    placeholder="Acme Inc."
                    value={userData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-field">
                  <label className="field-label">How can we help?</label>
                  <textarea
                    name="message"
                    className="field-input"
                    placeholder="Tell us about your specific requirements and use cases..."
                    value={userData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="gradientBtn">
                Request information
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
