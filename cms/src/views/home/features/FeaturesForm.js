import server from "api/server";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Items from "./Items";
import imageUpload from "../../../assets/svgs/imageUpload.svg";
const FeaturesForm = ({
  lang,
  data,
  items,
  setItems,
  slug,
  isActive,
  setIsActive,
  selectedImage,
  setSelectedImage,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      title: data?.title,
      description: data?.description,
    });

    setItems(data?.items);

    setIsActive(data?.isActive);
  }, [reset, data, setSelectedImage, setItems, setIsActive]);

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
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const onSubmit = async (formData) => {
    formData.items = items;
    formData.isActive = isActive;
    if (selectedImage?.preview !== undefined)
      formData.image = selectedImage?.path || "";
    try {
      const savedResponse = await server().put(
        `/landingContent/updateSection/${data?._id}`,
        {
          ...formData,
          slug: slug,
          id: data.id,
          subTitle: data.subTitle,
          sectionId: data.sectionId,
          lang,
        }
      );

      if (savedResponse.data.responseData) {
        toast.success("تم تعديل البيانات بنجاح");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  };

  return (
    <div className="card">
      <div className="card-head">
        <h4>المميزات</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xxl={8} lg={12} md={12}>
            <Row>
              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>عنوان رئيسي</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="عنوان رئيسي"
                      {...register("title", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.title?.type === "required" &&
                      "يرجي ادخال  عنوان رئيسي"}
                  </p>
                </div>
              </Col>
              <Col lg={6} xs={12}>
                <div className="form-group">
                  <h5> الحالة (مفعل / غير مفعل)</h5>

                  <div className="theme-switcher">
                    <input
                      type="checkbox"
                      id="themeSwitcher"
                      checked={isActive}
                      onChange={() => setIsActive(!isActive)}
                    />
                    <label htmlFor="themeSwitcher"></label>
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-group required">
                  <h5>صورة جانبية</h5>
                  <div className="image-uploader image-contain">
                    <div className="img-pat">
                      <img src={imageUpload} width={46} height={46} alt="" />
                    </div>
                    <label>
                      {selectedImage && (
                        <div>
                          <img
                            src={selectedImage?.path}
                            width={160}
                            height={160}
                            alt=""
                          />
                          <button
                            className="removeImg"
                            onClick={removeSelectedImage}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              fill="currentColor"
                              className="bi bi-x-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      <input
                        accept="image/*"
                        type="file"
                        onChange={imageChange}
                      />
                    </label>

                    <p className="error-hint">
                      {errors.image?.type === "required" && "يرجي اختيار صورة "}
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={12} xs={12}>
                <div className="form-group required">
                  <h5>وصف</h5>
                  <div>
                    <textarea
                      type="text"
                      className="form-control form-outline"
                      placeholder="وصف"
                      {...register("description", { required: true })}
                    ></textarea>
                  </div>
                  <p className="error-hint">
                    {errors?.description?.type === "required" &&
                      "يرجي ادخال  وصف"}
                  </p>
                </div>
              </Col>
              <Col lg={12} xs={12}>
                <Items features={items} setFeatures={setItems} />
              </Col>
              <Col lg={4} xs={12}>
                <div className="form-group">
                  <button type="submit" className="btn btn-blue">
                    {data?.id ? "تعديل" : "اضافة"}
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </form>
      </div>
    </div>
  );
};

export default FeaturesForm;
