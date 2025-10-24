import server from "api/server";
import React, { useState } from "react";
import imageUpload from "../../../assets/svgs/imageUpload.svg";
import removeImg from "../../../assets/svgs/close.svg";

const ImageUpdate = ({ item, features, setFeatures }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      const { data } = await server().post(
        "/landingContent/uploadImage",
        formData
      );

      setSelectedImage({
        preview: e.target.files[0],
        path: data.responseData.path,
      });

      const newFeatures = features?.map((feature) => {
        if (feature.id === item.id) {
          feature.image = data.responseData.path;
        }
        return feature;
      });

      setFeatures(() => newFeatures);
    }
  };

  const removeSelectedImage = (e) => {
    e.preventDefault();
    setSelectedImage(null);

    // also reset the feature's image to ""
    const newFeatures = features?.map((feature) => {
      if (feature.id === item.id) {
        feature.image = "";
      }
      return feature;
    });
    setFeatures(() => newFeatures);
  };

  const hasImage =
    (selectedImage && selectedImage.preview) ||
    (item?.image && item.image.trim() !== "");

  return (
    <div className="form-group required">
      <h5>صورة العنصر</h5>

      <div className="image-uploader image-contain">
        <div className="img-pat">
          <img src={imageUpload} width={46} height={46} alt="" />
        </div>
        <label>
          {hasImage && (
            <div>
              <img
                src={
                  selectedImage?.preview
                    ? URL.createObjectURL(selectedImage.preview)
                    : item?.image
                }
                width={160}
                height={160}
                alt=""
              />
              <button className="removeImg" onClick={removeSelectedImage}>
                <img src={removeImg} alt="remove" />
              </button>
            </div>
          )}
          <input accept="image/*" type="file" onChange={imageChange} />
        </label>
      </div>
    </div>
  );
};

export default ImageUpdate;
