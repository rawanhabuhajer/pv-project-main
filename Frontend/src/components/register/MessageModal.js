import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./styles/style.module.scss";
import Link from "next/link";

const MessageModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      dialogClassName={styles["message-modal"]}
      centered
      backdrop="static"
      keyboard={false}
    >
      <p>
        تم إرسال رسالة تأكيد بالبريد الإلكتروني يرجى فتح البريد الإلكتروني
        والنقر على الرابط لتفعيل حسابك.
      </p>
      <Link href="/instructions">
        <a className="btn">معلومات اكثر</a>
      </Link>
    </Modal>
  );
};

export default MessageModal;
