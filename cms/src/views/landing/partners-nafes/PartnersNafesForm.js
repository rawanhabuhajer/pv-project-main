import server from "api/server";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/svgs/imageUpload.svg";
import toast from "react-hot-toast";
import Items from "./Items";

const PartnersPVX360Form = ({
  slug,
  lang,
  data,
  selectedImage,
  setSelectedImage,
  description,
  setDescription,
  isActive,
  setIsActive,
  items,
  setItems,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      title: data?.title,
      buttonLabel: data?.buttonLabel,
      buttonUrl: data?.buttonUrl,
    });

    setSelectedImage({
      preview: data?.image,
      path: data?.image,
    });

    setDescription(data?.description);

    setIsActive(data?.isActive);

    setItems(data?.items);
  }, [reset, data, setSelectedImage, setDescription, setIsActive, setItems]);

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
    setSelectedImage(null);
  };

  const onSubmit = async (formData) => {
    if (selectedImage?.preview !== undefined)
      formData.image = selectedImage?.path || "";
    formData.description = description;
    formData.isActive = isActive;
    formData.items = items;

    try {
      const savedResponse = await server().put(
        `/landingContent/updateSection/${data?._id}`,
        {
          ...formData,
          slug: slug,
          id: data.id,
          items: data.items,
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
        <h4> شركاء المنصة </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xxl={8} lg={12} md={12}>
            <Row>
              <Col lg={12}>
                <div className="form-group required">
                  <h5>صورة الخلفية</h5>
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
                      {...register("isActive")}
                    />
                    <label htmlFor="themeSwitcher"></label>
                  </div>
                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>محتوي الزر</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="محتوي الزر"
                      {...register("buttonLabel", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.buttonLabel?.type === "required" &&
                      "يرجي ادخال محتوي الزر"}
                  </p>
                </div>
              </Col>

              <Col lg={6} xs={12}>
                <div className="form-group required">
                  <h5>رابط الزر</h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="رابط الزر"
                      {...register("buttonUrl", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.buttonUrl?.type === "required" &&
                      "يرجي ادخال رابط الزر"}
                  </p>
                </div>
              </Col>

              <Col lg={12} xs={12}>
                <Items features={items} setFeatures={setItems} />
              </Col>
              <Col lg={4} xs={12}>
                <div className="form-group">
                  <button type="submit" className="btn btn-blue">
                    {data._id ? "تعديل" : "اضافة"}
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

export default PartnersPVX360Form;
