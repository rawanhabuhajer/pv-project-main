import React from "react";
import styles from "./styles/style.module.scss";
import FeatureIcon from "../../assets/images/feature.svg";
import { Feather } from "lucide-react";
const index = () => {
  const items = [
    {
      id: 1,
      image: FeatureIcon,
      name: "provides requirements",
      description:
        "seeking to establish, implement, maintain and continually improve aninformation security management system.",
    },
    {
      id: 2,
      image: FeatureIcon,
      name: "provides requirements",
      description:
        "Streamline processes, enhance citizen services, and improve decision-making with secure AI solutions.",
    },
    {
      id: 3,
      image: FeatureIcon,
      name: "provides requirements",
      description:
        "seeking to establish, implement, maintain and continually improve aninformation security management system.",
    },
    {
      id: 4,
      image: FeatureIcon,
      name: "provides requirements",
      description:
        "seeking to establish, implement, maintain and continually improve aninformation security management system.",
    },
    {
      id: 5,
      image: FeatureIcon,
      name: "provides requirements",
      description:
        "seeking to establish, implement, maintain and continually improve aninformation security management system.",
    },
    {
      id: 6,
      image: FeatureIcon,
      name: "provides requirements",
      description:
        "seeking to establish, implement, maintain and continually improve aninformation security management system.",
    },
  ];
  return (
    <div className={styles["features-section"]}>
      <h3>
        <span>What makes us special</span>
      </h3>
      <h5>
        Designed specifically for organizations that demand security,
        <br></br> customization, and control.
      </h5>
      <div className="features-items">
        {items?.map((item, index) => (
          <div
            className="single-item"
            key={item?.id}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="img">
              <Feather color="#fff" />
            </div>
            <h6>provides requirements</h6>

            <p>
              Streamline processes, enhance citizen services, and improve
              decision-making with secure AI solutions.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
