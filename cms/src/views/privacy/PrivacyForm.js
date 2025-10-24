import server from "api/server";
import { EditorComponent } from "components/shared/FormComponents";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PrivacyForm = ({ lang, data, description, setDescription, slug }) => {
  const {
    handleSubmit,

    control,
  } = useForm();

  useEffect(() => {
    setDescription(data?.description);
  }, [data, setDescription]);

  const onSubmit = async (formData) => {
    formData.description = description;

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
        <h4>سياسة الخصوصية</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xl={8} md={12}>
            <Row>
              <Col lg={12} xs={12}>
                <div className="form-group ">
                  <h5>محتوى الصفحة</h5>

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
              </Col>

              <Col lg={4} xs={12}>
                <div className="form-group">
                  <button type="submit" className="btn btn-blue">
                    {data?.id ? "تعديل" : "إضافة"}
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

export default PrivacyForm;
