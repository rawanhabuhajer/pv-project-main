import React from "react";
import styles from "./styles/style.module.scss";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { requestHelp } from "@/store/actions";
import toast from "react-hot-toast";
import { useState } from "react";

const Index = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [details, setDetails] = useState("");

  const maxCharacters = 250;
  const handleInputChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxCharacters) {
      setDetails(newText);
    }
  };

  const onSubmit = (formData) => {
    dispatch(
      requestHelp({
        formData: {
          ...formData,
          inquiriesAndSuggestionsEnum: 1,
        },
        toast,
        formatMessage,
        reset,
        setDetails,
      })
    );
  };

  return (
    <div className={styles["help-wrapper"]}>
      <div className="help-inner">
        <h4 className="form-title">للاستفسارات</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-wrapper-block">
            <div className="form-group flex">
              <label className="form-label">الاسم الكامل</label>
              <div>
                <input
                  type="text"
                  className={
                    errors?.fullName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  {...register("fullName", { required: true })}
                />
                {errors?.fullName && <p className="error">هذا الحقل مطلوب</p>}
              </div>
            </div>
            <div className="form-group flex">
              <label className="form-label">اسم العائلة</label>
              <div>
                <input
                  type="text"
                  className={
                    errors?.familyName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  {...register("familyName", { required: true })}
                />
                {errors?.familyName && <p className="error">هذا الحقل مطلوب</p>}
              </div>
            </div>
            <div className="form-group flex">
              <label className="form-label">البريد الإلكتروني</label>
              <div>
                <input
                  type="email"
                  className={
                    errors?.email ? "form-control is-invalid" : "form-control"
                  }
                  {...register("email", { required: true })}
                  onKeyUp={(e) => {
                    // check if email is valid
                    if (
                      e.target.value &&
                      !e.target.value.match(
                        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                      )
                    ) {
                      e.target.classList.add("is-invalid");
                    } else {
                      e.target.classList.remove("is-invalid");
                    }
                  }}
                />
                {errors?.email && <p className="error">هذا الحقل مطلوب</p>}
              </div>
            </div>
            <div className="form-group flex">
              <label className="form-label">الموضوع</label>
              <div>
                <input
                  type="text"
                  className={
                    errors?.subject ? "form-control is-invalid" : "form-control"
                  }
                  {...register("subject", { required: true })}
                />
                {errors?.subject && <p className="error">هذا الحقل مطلوب</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">التفاصيل</label>
              <div>
                <textarea
                  className={
                    errors?.details && details?.length < 1
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  {...register("details", { required: true })}
                  value={details}
                  onChange={handleInputChange}
                ></textarea>
                <div className="justify-content-between d-flex">
                  {errors?.details && details?.length < 1 && (
                    <p className="error">هذا الحقل مطلوب</p>
                  )}
                  <p className="hint">
                    {maxCharacters - details.length} حرف متبقي
                  </p>
                </div>
              </div>
            </div>

            <div className="form-group has-btn">
              <button type="submit" className="btn">
                إرسال
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
