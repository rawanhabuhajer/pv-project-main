import { deleteCompanyFile, uploadBulkFiles } from "@/store/actions";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FormattedMessage, useIntl } from "react-intl";
import Image from "next/future/image";
import UploadIcon from "../../assets/images/settings/add.svg";
import CloseIcon from "../../assets/images/settings/close.svg";
import PdfIcon from "../../assets/images/settings/pdf.svg";
import DocIcon from "../../assets/images/settings/doc.svg";
import ExcelIcon from "../../assets/images/settings/xls.svg";
import PowerPointIcon from "../../assets/images/settings/ppt.svg";
import FileIcon from "../../assets/images/settings/file.svg";
import EyeIcon from "../../assets/images/settings/Eye.svg";
import FilePreviewModal from "./FilePreviewModal";

const FileTypes = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { companyFiles } = useSelector((state) => state.authentication);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFilePreviewModal, setShowFilePreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const handleClose = () => {
    setShowFilePreviewModal(false);
    setSelectedFile({});
  };

  const getFileIcon = (fileType) => {
    const fileName = fileType?.name || fileType?.fileName;
    const fileExtension = fileName ? fileName.split(".").pop() : null;

    if (fileExtension) {
      switch (fileExtension.toLowerCase()) {
        case "pdf":
          return <PdfIcon />;
        case "doc":
        case "docx":
          return <DocIcon />;
        case "xls":
        case "xlsx":
          return <ExcelIcon />;
        case "ppt":
        case "pptx":
          return <PowerPointIcon />;
        default:
          return <FileIcon />;
      }
    }

    return null;
  };

  useEffect(() => {
    setUploadedFiles(companyFiles);
  }, [companyFiles]);

  const onSubmit = () => {
    const formData = new FormData();
    let count = 0;
    uploadedFiles.forEach((file) => {
      if (file?.path && file?.id) {
        formData.append(`file[${count}].file`, file?.path);
        formData.append(`file[${count}].fileTypeId`, file?.id);
        count++;
      }
    });

    if (uploadedFiles.length > 0) {
      dispatch(
        uploadBulkFiles({
          data: formData,
          toast,
          formatMessage,
        })
      );
    }
  };

  return (
    <div className="basic-info">
      <div className="setting-title">
        <h3>
          <FormattedMessage id="basics" />
        </h3>
        <p>
          <FormattedMessage id="automatedOffers" />
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group file-types">
          {companyFiles?.map((fileType, index) => (
            <div className="type" key={index}>
              <div className="file-upload">
                {uploadedFiles[index]?.url ? (
                  <>
                    {fileType?.fileTypeName.toLowerCase() === "شعار" ? (
                      <Image
                        src={uploadedFiles[index]?.url}
                        alt="logo"
                        width={400}
                        height={400}
                      />
                    ) : (
                      <>
                        {getFileIcon(uploadedFiles[1])}
                        {/* <p>{fileType?.fileName}</p> */}
                      </>
                    )}
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        // Remove the file from the uploaded files
                        setUploadedFiles((prev) => {
                          const newFiles = [...prev];
                          newFiles[index] = null;
                          return newFiles;
                        });

                        dispatch(
                          deleteCompanyFile({
                            id: fileType?.fileTypetId,
                            toast,
                            formatMessage,
                            dispatch,
                          })
                        );
                      }}
                    >
                      <CloseIcon fill="#111827" />
                    </button>

                    <button
                      type="button"
                      className="view"
                      onClick={() => {
                        window.open(uploadedFiles[index]?.url, "_blank");
                        // setSelectedFile(uploadedFiles[index]);
                        // setShowFilePreviewModal(true);
                      }}
                    >
                      <EyeIcon fill="#111827" />
                    </button>
                  </>
                ) : (
                  <div>
                    <UploadIcon />
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const maxFileSize = 4 * 1024 * 1024;

                        if (file.size > maxFileSize) {
                          toast.error(<FormattedMessage id="notExceed4MB" />);
                          return;
                        }

                        const image = {
                          url: URL.createObjectURL(file),
                          path: file,
                          name: file?.name,
                          id: fileType?.fileTypetId,
                        };

                        setUploadedFiles((prev) => {
                          const newFiles = [...prev];
                          newFiles[index] = image;
                          return newFiles;
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <h4>{fileType?.fileTypeName}</h4>
            </div>
          ))}
        </div>
        <div className="form-group has-btn">
          <button type="submit" className="btn">
            <FormattedMessage id="save" />
          </button>
        </div>
      </form>

      {/* {showFilePreviewModal && (
        <FilePreviewModal
          showFilePreviewModal={showFilePreviewModal}
          handleClose={handleClose}
          uploadedFiles={companyFiles}
          selectedFile={selectedFile}
        />
      )} */}
    </div>
  );
};

export default FileTypes;
