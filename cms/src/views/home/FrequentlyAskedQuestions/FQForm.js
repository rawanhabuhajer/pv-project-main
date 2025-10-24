import server from "api/server";
import { EditorComponent } from "components/shared/FormComponents";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/svgs/imageUpload.svg";
import toast from "react-hot-toast";
import Items from "./Items";

const FQForm = ({
  lang,
  data,
  selectedImage,
  setSelectedImage,
  description,
  setDescription,
  items,
  setItems,
  slug,
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
    });

    setItems(data?.items);
  }, [reset, data, setSelectedImage, setDescription, setItems]);

  const onSubmit = async (formData) => {
    formData.items = items;
    if (selectedImage?.preview !== undefined)
      formData.image = selectedImage?.path || "";
    formData.description = description;

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
        <h4>محتوى الأسئلة الشائعة</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xxl={8} lg={12} md={12}>
            <Row>
              <Col lg={12} xs={12}>
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
export default FQForm;
