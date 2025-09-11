import React from "react";

import CloseIcon from "@/assets/images/close.svg";
import Image from "next/future/image";
import server from "@/api/server";
import { parseCookies } from "nookies";

const MultiImagesUploader = ({ images, setImages, maxLengthOfImages }) => {
  const cookies = parseCookies();

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();

      // max 5 images
      if (images.length >= maxLengthOfImages) {
        alert("Maximum 5 images allowed");
        return;
      } else {
        formData.append("file", e.target.files[0]);
        const { data } = await server({ cookies }).post(
          "/Content/Upload",
          formData
        );
        setImages([...images, data?.responseData?.fullPath]);
      }
    }
  };

  return (
    <>
      <label className="multi-uploader">
        <input type="file" multiple accept="image/*" onChange={imageChange} />

        <div className="txt">
          {/* <UploadIcon /> */}
          {/* <p>
            Drag & Drop files or <b>Browse</b>
          </p> */}
        </div>
        {/* <p className="uploader-hint">
          You can upload up to 5 images. Each image should be less than 5MB.
        </p> */}
      </label>
      {images?.length > 0 && (
        <div className="thumbs">
          {images?.map((imageSrc, index) => {
            return (
              <div className="thumb" key={index}>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    setImages(images.filter((img) => img !== imageSrc));
                  }}
                >
                  <CloseIcon fill="#fff" />
                </button>
                <Image
                  src={imageSrc?.imageUrl ? imageSrc?.imageUrl : imageSrc}
                  width={2000}
                  height={2000}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MultiImagesUploader;
