import React from "react";
import removeImg from "../../assets/svgs/close.svg";
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
      icon: "",
      url: "",
      isActive: false,
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

  const handleCheckboxChange = (e, id) => {
    const { checked } = e.target;

    const newFeaturesArray = features.map((feature) => {
      if (feature.id !== id) return feature;
      return { ...feature, isActive: checked };
    });

    setFeatures(newFeaturesArray);
  };

  return (
    <div className="form-group branches features">
      <h5>
        وسائل التواصل الاجتماعي
        <button
          type="button"
          className="btn btn-green"
          onClick={() => {
            addFeature();
          }}
        >
          إضافة وسيلة جديدة
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
                  <Col lg={12}>
                    <ImageUpdate
                      item={feature}
                      features={features}
                      setFeatures={setFeatures}
                    />
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5>رابط التواصل</h5>
                      <input
                        type="text"
                        name="url"
                        className="form-control form-outline"
                        placeholder="رابط التواصل"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.url}
                      />
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5> (مفعل / غير مفعل)</h5>

                      <div className="theme-switcher">
                        <input
                          type="checkbox"
                          id={`themeSwitcher-${feature.id}`}
                          name="isActive"
                          checked={feature.isActive}
                          onChange={(e) => handleCheckboxChange(e, feature.id)}
                        />
                        <label htmlFor={`themeSwitcher-${feature.id}`}></label>
                      </div>
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
