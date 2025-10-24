import server from "api/server";
import React, { useState } from "react";
import imageUpload from "../../assets/svgs/imageUpload.svg";
import removeImg from "../../assets/svgs/close.svg";

const ImageUpdate = ({ item, features, setFeatures }) => {
  const [selectedImage, setSelectedImage] = useState({
    preview: null,
    path: "",
  });

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

      const newFeatures = features.map((feature) => {
        if (feature.id === item.id) {
          feature.icon = data.responseData.path;
        }
        return feature;
      });

      setFeatures(() => newFeatures);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage("");
  };

  return (
    <div className="form-group required">
      <h5>ايقونة</h5>

      <div className="image-uploader image-contain">
        <div className="img-pat">
          <img src={imageUpload} width={46} height={46} alt="" />
        </div>
        <label>
          {selectedImage && (
            <div>
              <img
                src={
                  selectedImage && selectedImage.preview
                    ? URL.createObjectURL(selectedImage.preview)
                    : item?.icon
                }
                width={160}
                height={160}
                alt=""
              />
              <button className="removeImg" onClick={removeSelectedImage}>
                <img src={removeImg} alt="" />
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
