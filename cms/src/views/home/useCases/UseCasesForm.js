import server from "api/server";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Items from "./Items";
import { EditorComponent } from "components/shared/FormComponents";

const UseCasesForm = ({
  lang,
  data,
  items,
  setItems,
  slug,
  description,
  setDescription,
  isActive,
  setIsActive,
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
      buttonLabel: data?.buttonLabel,
      buttonUrl: data?.buttonUrl,
    });

    setItems(data?.items);

    setDescription(data?.description);

    setIsActive(data?.isActive);
  }, [reset, data, setItems, setDescription, setIsActive]);

  const onSubmit = async (formData) => {
    formData.items = items;
    formData.description = description;
    formData.isActive = isActive;
    try {
      const savedResponse = await server().put(
        `/landingContent/updateSection/${data?._id}`,
        {
          ...formData,
          slug: slug,
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
        <h4>حالات الاستخدام</h4>
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
              <Col lg={12} xs={12}>
                <div className="form-group required">
                  <h5>وصف</h5>
                  <div>
                    <EditorComponent
                      name="description"
                      setData={setDescription}
                      initialValue={data?.description}
                    />
                  </div>
                  <p className="error-hint">
                    {errors?.description?.type === "required" &&
                      "يرجي ادخال  وصف"}
                  </p>
                </div>
              </Col>

              {/* <Col lg={6} xs={12}>
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
              </Col> */}
              {/* 
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
              </Col> */}

              <Col lg={12} xs={12}>
                <Items features={items} setFeatures={setItems} />
              </Col>
              <Col lg={4} xs={12}>
                <div className="form-group">
                  <button type="submit" className="btn btn-blue">
                    {data?._id ? "تعديل" : "اضافة"}
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

export default UseCasesForm;
