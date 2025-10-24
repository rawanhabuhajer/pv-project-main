import server from "api/server";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ThankYouForm = ({ lang, data, slug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      title: data?.title,
      description: data?.description,
      buttonLabel: data?.buttonLabel,
      buttonUrl: data?.buttonUrl,
    });
  }, [reset, data]);

  const onSubmit = async (formData) => {
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
        <h4>محتوي شكرا للتسجيل بالموقع</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xl={8} md={12}>
            <Row>
              <Col lg={12} xs={12}>
                <div className="form-group required">
                  <h5>عنوان </h5>
                  <div>
                    <input
                      type="text"
                      className="form-control form-outline"
                      placeholder="عنوان "
                      {...register("title", { required: true })}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.title?.type === "required" && "يرجي ادخال  عنوان "}
                  </p>
                </div>
              </Col>
              <Col lg={12} xs={12}>
                <div className="form-group required">
                  <h5>وصف </h5>
                  <div>
                    <textarea
                      className="form-control form-outline"
                      placeholder="وصف"
                      {...register("description", { required: true })}
                    ></textarea>
                  </div>
                  <p className="error-hint">
                    {errors?.description?.type === "required" &&
                      "يرجي ادخال وصف المقدمة"}
                  </p>
                </div>
              </Col>
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

export default ThankYouForm;
