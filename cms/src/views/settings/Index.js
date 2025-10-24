import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";

import server from "api/server";
import imageUpload from "../../assets/svgs/imageUpload.svg";

import toast from "react-hot-toast";
import Items from "./Items";

const Index = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState({
    preview: null,
    path: null,
  });
  const [cmsSocial, setCmsSocial] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onStart = async () => {
    const pageData = await server().get(`/Cms/GetAllCmsFooter`);
    setData(pageData.data.section || {});
    setCmsSocial(pageData?.data?.responseData?.cmsSocial || []);
  };

  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    reset({
      copyRight: data?.copyRight,
      copyRightEn: data?.copyRightEn,
      email: data?.email,
      phone: data?.phone,
      cmsSocial: data?.cmsSocial,
    });

    setSelectedImage({
      preview: data?.logo,
      path: data?.logo,
    });

    setCmsSocial(data?.cmsSocial);
  }, [reset, data]);

  const onSubmit = async (formData) => {
    if (selectedImage?.preview !== undefined)
      formData.logo = selectedImage?.path || "";
    formData.cmsSocial = cmsSocial;

    try {
      const savedResponse = await server().put(`/Cms/EditCmsFooterBySlugName`, {
        ...formData,
        slug: "copyRightEn",
        id: data.id,
        sectionId: data.sectionId,
      });

      if (savedResponse.data.responseData) {
        toast.success("تم تعديل البيانات بنجاح");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  };

  return (
    <>
      <div className="acc-form">
        <div className="card">
          <div className="card-head">
            <h4>بيانات الموقع</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col xl={8} md={12}>
                <Row>
                  <Col lg={12}>
                    <div className="form-group required">
                      <h5>شعار الموقع</h5>
                      <div className="image-uploader image-contain">
                        <div className="img-pat">
                          <img
                            src={imageUpload}
                            width={46}
                            height={46}
                            alt=""
                          />
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
                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>البريد الالكتروني</h5>
                      <div>
                        <input
                          type="email"
                          className="form-control form-outline"
                          placeholder="البريد الالكتروني"
                          {...register("email", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.email?.type === "required" &&
                          "يرجي ادخال البريد الالكتروني"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>الهاتف</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="الهاتف"
                          {...register("phone", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.phone?.type === "required" &&
                          "يرجي ادخال الهاتف"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>حقوق الموقع بالعربية</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="حقوق الموقع بالعربية"
                          {...register("copyRight", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.copyRight?.type === "required" &&
                          "يرجي ادخال حقوق  الموقع بالعربية"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>حقوق الموقع بالانجليزية</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="حقوق الموقع بالانجليزية"
                          {...register("copyRightEn", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.copyRight?.type === "required" &&
                          "يرجي ادخال حقوق  الموقع بالانجليزية"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={12} xs={12}>
                    <Items
                      features={cmsSocial}
                      setFeatures={setCmsSocial}
                      register={register}
                    />
                  </Col>

                  <Col lg={4} xs={12}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-blue">
                        اضافة
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
