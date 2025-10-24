import server from "api/server";
import { EditorComponent } from "components/shared/FormComponents";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import imageUpload from "../../../assets/svgs/imageUpload.svg";
import toast from "react-hot-toast";
const Advantages = ({
  lang,
  data,
  selectedImage,
  setSelectedImage,
  description,
  setDescription,
  isActive,
  setIsActive,
  slug,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
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
  }, [reset, data, setSelectedImage, setDescription, setIsActive]);

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
        <h4>بيانات أفضلية تنافسية</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Col xl={8} md={12}>
          <Row>
            {/* Image Upload */}
            <Col lg={12}>
              <div className="form-group required">
                <h5>صورة المقدمة</h5>
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
                    {errors.image?.type === "required" &&
                      "يرجي اختيار صورة المقدمة"}
                  </p>
                </div>
              </div>
            </Col>

            {/* Title Input */}
            <Col lg={12} xs={12}>
              <div className="form-group required">
                <h5>عنوان المقدمة</h5>
                <div>
                  <input
                    type="text"
                    className="form-control form-outline"
                    placeholder="عنوان المقدمة"
                    {...register("title", { required: true })}
                  />
                </div>
                <p className="error-hint">
                  {errors?.title?.type === "required" &&
                    "يرجي ادخال عنوان المقدمة"}
                </p>
              </div>
            </Col>

            {/* Description Editor */}
            <Col lg={12} xs={12}>
              <div className="form-group required">
                <h5>وصف المقدمة</h5>
                <div>
                  <Controller
                    control={control}
                    name="description"
                    render={() => (
                      <EditorComponent
                        name="description"
                        setData={setDescription}
                        initialValue={data?.description}
                      />
                    )}
                  />
                </div>
                <p className="error-hint">
                  {errors?.description?.type === "required" &&
                    "يرجي ادخال وصف المقدمة"}
                </p>
              </div>
            </Col>

            {/* Button Label */}
            <Col lg={6} xs={12}>
              <div className="form-group required">
                <h5>نص الزر</h5>
                <div>
                  <input
                    type="text"
                    className="form-control form-outline"
                    placeholder="نص الزر"
                    {...register("buttonLabel", { required: true })}
                  />
                </div>
                <p className="error-hint">
                  {errors?.buttonLabel?.type === "required" &&
                    "يرجي ادخال النص"}
                </p>
              </div>
            </Col>

            {/* Button URL */}
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
                    "يرجي ادخال الرابط"}
                </p>
              </div>
            </Col>

            {/* Active Switch */}
            <Col lg={12} xs={12}>
              <div className="form-group">
                <h5>الحالة (مفعل / غير مفعل)</h5>
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
  );
};

export default Advantages;
