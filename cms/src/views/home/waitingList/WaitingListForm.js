import server from "api/server";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Items from "./Items";

const WaitingListForm = ({ lang, data, slug, items, setItems }) => {
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
    });

    setItems(data?.items);
  }, [reset, data, setItems]);

  const onSubmit = async (formData) => {
    formData.items = items;
    try {
      const savedResponse = await server().put(
        `/landingContent/updateSection/${data?._id}`,
        {
          ...formData,
          slug: slug,
          id: data.id,
          items: items,
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
        <h4>محتوي قائمة الانتظار</h4>
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

export default WaitingListForm;
