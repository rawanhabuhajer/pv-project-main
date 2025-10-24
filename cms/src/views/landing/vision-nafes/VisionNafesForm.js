import server from "api/server";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EditorComponent } from "components/shared/FormComponents";

const VisionPVX360Form = ({
  slug,
  lang,
  data,
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
    control,
  } = useForm();

  useEffect(() => {
    reset({
      title: data?.title,
      buttonLabel: data?.buttonLabel,
      buttonUrl: data?.buttonUrl,
    });

    setDescription(data?.description);

    setIsActive(data?.isActive);

    setItems(data?.items);
  }, [reset, data, setDescription, setIsActive, setItems]);

  const onSubmit = async (formData) => {
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
        <h4> مساعده pxv360 </h4>
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
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { value } }) => (
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
                      "يرجي ادخال وصف "}
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
              <Col lg={12} xs={12}>
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

export default VisionPVX360Form;
