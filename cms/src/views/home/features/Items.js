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
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5>عنوان رئيسي</h5>
                      <input
                        type="text"
                        name="title"
                        className="form-control form-outline"
                        placeholder="عنوان رئيسي"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.title}
                      />
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5>عنوان ثانوي</h5>
                      <input
                        type="text"
                        name="subTitle"
                        className="form-control form-outline"
                        placeholder="عنوان ثانوي"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.subTitle}
                      />
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="form-group">
                      <h5>وصف </h5>
                      <textarea
                        className="form-control form-outline"
                        name="description"
                        placeholder="وصف "
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.description}
                      ></textarea>
                      <input type="hidden" value={v4()} />
                    </div>
                  </Col>
                  <Col lg={6} xs={6}>
                    <div className="form-group">
                      <h5>محتوي الزر</h5>
                      <input
                        type="text"
                        name="buttonLabel"
                        className="form-control form-outline"
                        placeholder="محتوي الزر"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.buttonLabel}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={6}>
                    <div className="form-group">
                      <h5>رابط الزر</h5>
                      <input
                        type="text"
                        name="buttonUrl"
                        className="form-control form-outline"
                        placeholder="رابط الزر"
                        onChange={(e) => handleInputOnChange(e, feature.id)}
                        value={feature?.buttonUrl}
                      />
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
