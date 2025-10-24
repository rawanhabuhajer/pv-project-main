import React from "react";
import styles from "./styles/style.module.scss";

import { Feather } from "lucide-react";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
const index = () => {
  const { allCmsHome } = useSelector((state) => state.authentication);
  const useCasesData = getSectionData(allCmsHome, "use-cases");

  return (
    <div className={styles["features-section"]}>
      <h3>
        <span>{useCasesData?.title}</span>
      </h3>
      <h5 dangerouslySetInnerHTML={{ __html: useCasesData?.description }}></h5>
      <div className="features-items">
        {useCasesData?.items?.map((item) => (
          <div
            className="single-item"
            key={item?._id}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="img">
              <Feather color="#fff" />
            </div>
            <h6>{item?.title}</h6>

            <p>{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
