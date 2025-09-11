import React from "react";
import { Modal } from "react-bootstrap";
import Image from "next/future/image";
import styles from "../styles/style.module.scss";

const FilePreviewModal = ({
  showFilePreviewModal,
  handleClose,
  uploadedFiles,
  selectedFile,
}) => {
  return (
    <Modal
      show={showFilePreviewModal}
      onHide={handleClose}
      centered
      size="lg"
      dialogClassName={styles["file-preview-modal"]}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {
            uploadedFiles?.find(
              (file) => file?.fileTypetId === selectedFile?.id
            )?.fileTypeName
          }
        </Modal.Title>
      </Modal.Header>
      <div className="file-preview-body">
        {uploadedFiles?.find((file) => file?.fileTypetId === selectedFile?.id)
          ?.url ? (
          <div className="logo-preview">
            <Image
              src={
                uploadedFiles?.find(
                  (file) => file?.fileTypetId === selectedFile?.id
                )?.url
              }
              alt="file"
              width={500}
              height={500}
            />
          </div>
        ) : (
          <div className="logo-preview">
            <Image
              src={URL.createObjectURL(selectedFile?.path)}
              alt="file"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FilePreviewModal;
