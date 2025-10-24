import React from "react";
import removeImg from "../../../assets/svgs/close.svg";
import ImageUpdate from "./ImageUpdate";
import { Col, Row } from "react-bootstrap";
import { v4 } from "uuid";

const Items = ({ features, setFeatures }) => {
  const removeFeature = (featureId) => {
    const newFeatures = features.filter(
      (feature, index) => feature.id !== featureId
    );
    setFeatures(() => newFeatures);
  };

  const addFeature = () => {
    const newFeature = {
      image: "",
      subTitle: "",
      buttonLabel: "",
      buttonUrl: "",
      sectionId: 0,
      id: v4(),
    };
    const newFeatures = [...(features || []), newFeature];
    setFeatures(() => newFeatures);
  };

  return (
    <div className="form-group branches features">
      <h5>
        العناصر
        <button
          type="button"
          className="btn btn-green"
          onClick={() => {
            addFeature();
          }}
        >
          إضافة عنصر جديد
        </button>
      </h5>
      <Row>
        {features?.map((feature, index) => {
          return (
            <Col xxl={4} lg={4} md={6} xs={12} key={index}>
              <div key={feature.id} className="add-multi-component">
                <button
                  type="button"
                  onClick={() => removeFeature(feature.id)}
                  className="removeImg"
                >
                  <img src={removeImg} alt="" />
                </button>
                <Row>
                  <Col lg={12}>
                    <ImageUpdate
                      item={feature}
                      features={features}
                      setFeatures={setFeatures}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Items;
