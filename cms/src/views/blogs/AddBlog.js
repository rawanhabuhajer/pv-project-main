import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import server from "api/server";
import imageUpload from "../../assets/svgs/imageUpload.svg";
import { EditorComponent } from "components/shared/FormComponents";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "store/actions";
import toast from "react-hot-toast";

const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState({
    preview: null,
    path: null,
  });
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

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

  const onSubmit = (data) => {
    if (
      selectedImage?.preview === null ||
      selectedImage === undefined ||
      selectedTags?.length === 0
    ) {
      toast.error("جميع العناصر مطلوبة ");
      return;
    }
    data.imageUrl = selectedImage?.path || "";
    data.content = description;
    data.tags = selectedTags.map((tag) => tag.value);
    dispatch(
      addBlog({
        data,
        toast,
        navigate,
      })
    );
  };

  return (
    <>
      <div className="acc-form">
        <div className="card">
          <div className="card-head">
            <h4>
              <FormattedMessage id="addBlog" />
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col xl={10} md={12}>
                <Row>
                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>صورة المدونة</h5>
                      <div>
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
                            {!selectedImage && "يرجي اختيار صورة المدونة"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>عنوان المدونة</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="عنوان المدونة"
                          {...register("title", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.title?.type === "required" &&
                          "يرجي ادخال عنوان المدونة"}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div className="form-group required">
                      <h5>الكاتب</h5>
                      <div>
                        <input
                          type="text"
                          className="form-control form-outline"
                          placeholder="الكاتب"
                          {...register("author", { required: true })}
                        />
                      </div>
                      <p className="error-hint">
                        {errors?.author?.type === "required" &&
                          "يرجي ادخال اسم الكاتب"}
                      </p>
                    </div>
                  </Col>

                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>محتوي المدونة</h5>
                      <div>
                        <EditorComponent
                          name="description"
                          setData={setDescription}
                        />
                      </div>
                      <p className="error-hint">
                        {!description && "يرجي ادخال محتوي المدونة"}
                      </p>
                    </div>
                  </Col>

                  <Col lg={12} xs={12}>
                    <div className="form-group required">
                      <h5>الكلمات الدلالية</h5>
                      <div>
                        <CreatableSelect
                          isRtl={true}
                          isSearchable={true}
                          className="select-form"
                          classNamePrefix="select"
                          isMulti={true}
                          options={
                            selectedTags?.map((keyword) => ({
                              value: keyword?.value,
                              label: keyword?.value,
                            })) || []
                          }
                          onChange={(selected) => {
                            setSelectedTags(
                              selected.map((selected) => selected)
                            );
                          }}
                          value={selectedTags}
                          placeholder="اكتب الكلمات الدلالية ثم اضغط على Enter"
                          isClearable={false}
                        />
                      </div>
                      <p className="error-hint">
                        {selectedTags?.length < 1 &&
                          " يرجي اختيار الكلمات الدلالية"}
                      </p>
                    </div>
                  </Col>

                  <Col lg={12} xs={12}>
                    <div className="seo-wrap">
                      <Row>
                        <Col lg={12} xs={12}>
                          <div className="form-group required">
                            <h5>Meta Title</h5>
                            <div>
                              <input
                                type="text"
                                className="form-control form-outline"
                                placeholder="Meta Title"
                                {...register("metaTitle", { required: true })}
                              />
                            </div>
                            <p className="error-hint">
                              {errors?.metaTitle?.type === "required" &&
                                "يرجي ادخال  Meta Title"}
                            </p>
                          </div>
                        </Col>
                        <Col lg={12} xs={12}>
                          <div className="form-group required">
                            <h5>Meta description</h5>
                            <div>
                              <textarea
                                className="form-control form-outline"
                                placeholder="Meta description"
                                {...register("metaDescription", {
                                  required: true,
                                })}
                              ></textarea>
                            </div>
                            <p className="error-hint">
                              {errors?.metaDescription?.type === "required" &&
                                "يرجي ادخال Meta description"}
                            </p>
                          </div>
                        </Col>
                        <Col lg={6} xs={12}>
                          <div className="form-group required">
                            <h5>Canonical Tag</h5>
                            <div>
                              <input
                                type="text"
                                className="form-control form-outline"
                                placeholder="Canonical Tag"
                                {...register("canonicalTag", {
                                  required: true,
                                })}
                              />
                            </div>
                            <p className="error-hint">
                              {errors?.canonicalTag?.type === "required" &&
                                "يرجي ادخال Canonical Tag"}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
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

export default AddBlog;
