import React from "react";
import Image from "next/future/image";
import CloseIcon from "@/assets/images/close.svg";
import PlaceHolderImage from "@/assets/images/no-image.png";
import UploadIcon from "../account/assets/images/settings/add.svg";

const ImageUpload = ({ selectedImage, setSelectedImage, defaultImage }) => {
  const imageChange = async (e) => {
    const file = e.target.files[0];
    const image = {
      preview: URL.createObjectURL(file),
      path: file,
    };

    setSelectedImage(image);
  };

  const removeSelectedImage = () => {
    setSelectedImage({
      preview: null,
      path: "",
    });
  };

  return (
    <div className="image-uploader">
      <div className="img-pat">
        {defaultImage ? (
          <Image src={defaultImage} alt="image" width={42} height={42} />
        ) : (
          // <UploadIcon />
          <UploadIcon />
        )}
      </div>
      <label>
        {selectedImage?.preview && (
          <>
            <Image
              src={selectedImage?.preview || PlaceHolderImage}
              alt="image"
              width={400}
              height={400}
            />
            <button
              className="removeImg"
              onClick={removeSelectedImage}
              type="button"
            >
              <CloseIcon />
            </button>
          </>
        )}

        <input accept="image/*" type="file" onChange={imageChange} />
      </label>
    </div>
  );
};

export default ImageUpload;
