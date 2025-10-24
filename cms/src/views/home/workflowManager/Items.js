import React from "react";
import removeImg from "../../../assets/svgs/close.svg";
import { Col, Row } from "react-bootstrap";
import { v4 } from "uuid";
import ImageUpdate from "./ImageUpdate";

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

  const handleInputOnChange = (e, id) => {
    const { name, value } = e.target;

    const newFeaturesArray = features.map((feature) => {
      if (feature.id !== id) return feature;
      return { ...feature, [name]: value };
    });

    setFeatures(newFeaturesArray);
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
            <Col xxl={6} lg={6} md={6} xs={12} key={index}>
              <div className="add-multi-component">
                <button
                  type="button"
                  onClick={() => removeFeature(feature.id)}
                  className="removeImg"
                >
                  <img src={removeImg} alt="" />
                </button>
                <Row>
                
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5>مفتاح العنصر</h5>
                      <input
                        type="text"
                        name="title"
                        className="form-control form-outline"
                        placeholder="مفتاح العنصر"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.title}
                      />
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5>محتوى العنصر</h5>
                      <textarea
                        type="text"
                        name="description"
                        className="form-control form-outline"
                        placeholder="محتوى العنصر"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.description}
                      ></textarea>
                    </div>
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
