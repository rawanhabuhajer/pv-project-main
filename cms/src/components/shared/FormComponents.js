import React from "react";
// import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Editor } from "@tinymce/tinymce-react";

// export function Form({ defaultValues, children, onSubmit }) {
//   const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {Array.isArray(children)
//         ? children.map((child) => {
//           return child.props.name
//             ? React.createElement(child.type, {
//               ...{
//                 ...child.props,
//                 register,
//                 key: child.props.name,
//                 errors: errors
//               }
//             })
//             : child;
//         })
//         : children}
//     </form>
//   );
// }

export function Input({
  langId = "",
  register,
  name = "",
  errors,
  type = "text",
  rules = { required: true },
  hint = null,
  ...rest
}) {
  const nameWithoutLocale = name.split(".").at(0);
  const locale = name.split(".").length >= 2 ? name.split(".").at(-1) : "";

  return (
    <div className={`form-group ${rules?.required && "required"}`}>
      {langId && (
        <div className="input-head-wrapper">
          <h5 className={hint && "hint-included"}>
            <FormattedMessage id={langId} />

            {locale === "ar" && (
              <>
                {" "}
                (<FormattedMessage id={"arabic-language"} />){" "}
              </>
            )}
            {locale === "en" && (
              <>
                {" "}
                (<FormattedMessage id={"english-language"} />){" "}
              </>
            )}
          </h5>
          {hint && <span className="input-hint">( {hint} )</span>}
        </div>
      )}
      <div>
        <input
          type={type}
          className="form-control form-outline"
          {...register(name, { ...rules })}
          {...rest}
        />
      </div>
      <p className="error-hint">
        {locale !== ""
          ? errors?.[nameWithoutLocale]?.[locale]?.type === "required" && (
              <FormattedMessage id={"requiredField"} />
            )
          : errors?.[nameWithoutLocale]?.type === "required" && (
              <FormattedMessage id={"requiredField"} />
            )}
      </p>
    </div>
  );
}

export function Textarea({ langId = "", register, name, errors, ...rest }) {
  const nameWithoutLocale = name.split(".").at(0);
  const locale = name.split(".").length >= 2 ? name.split(".").at(-1) : "";

  return (
    <div className="form-group required">
      {langId && (
        <h5>
          <FormattedMessage id={langId} />

          {locale === "ar" && (
            <>
              {" "}
              (<FormattedMessage id={"arabic-language"} />){" "}
            </>
          )}
          {locale === "en" && (
            <>
              {" "}
              (<FormattedMessage id={"english-language"} />){" "}
            </>
          )}
        </h5>
      )}
      <div>
        <textarea
          type="text"
          className="form-control form-outline"
          {...register(name, { required: true })}
          {...rest}
        ></textarea>
      </div>
      <p className="error-hint">
        {locale !== ""
          ? errors?.[nameWithoutLocale]?.[locale]?.type === "required" && (
              <FormattedMessage id={"requiredField"} />
            )
          : errors?.[nameWithoutLocale]?.type === "required" && (
              <FormattedMessage id={"requiredField"} />
            )}
      </p>
    </div>
  );
}

export function EditorComponent({
  initialValue = "",
  locale = "",
  name,
  setData,
}) {
  return (
    <Editor
      initialValue={initialValue}
      onChange={(e, editor) => {
        const data = editor.getContent();
        setData((prevState) => {
          if (locale) {
            return { ...prevState, [locale]: data };
          }

          return data;
        });
      }}
      tinymceScriptSrc="https://cdn.tiny.cloud/1/79o7syv3yp7akgk8i8muwaagrm0r79shw0sxufbm19mh3m0i/tinymce/5-stable/tinymce.min.js"
      init={{
        plugins:
          "print paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        menubar: "file edit view insert format tools table help",
        toolbar:
          "customInsertButton | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen print | insertfile image media link table | ltr rtl | language",
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        mobile: {
          menubar: true,
        },
        directionality: "rtl",
        language: `${locale}`,
        height: 400,
        image_caption: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "wrap",
        contextmenu: "link image imagetools table",
        content_style: "body {font - size:14px}",
        setup: function (editor) {
          editor.ui.registry.addButton("customInsertButton", {
            text: "custom Button",
            onAction: function (_) {
              editor.insertContent(
                `&nbsp;<a href="" class="btn" style="    background: linear-gradient(
                148deg,#1d5cd1,#0ba1d8 84%);
              color: #fff;
              padding: 10px 20px;
              border-radius: 50px;
              display: inline-block;
              cursor: pointer;
              text-decoration: none;">my button!</a>&nbsp;`
              );
            },
          });
        },
      }}
    />
  );
}
