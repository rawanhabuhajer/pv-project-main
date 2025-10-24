import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteBlog } from "store/actions";

const DeleteModal = ({ show, setShow, lang }) => {
  const dispatch = useDispatch();
  const handleDeleteModal = () => {
    try {
      dispatch(deleteBlog({ slug: show, setShow, toast, lang }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
      dialogClassName="modal-verify "
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title>حذف المدونة</Modal.Title>
      </Modal.Header>
      <div className="modal-body-inner">
        <Col lg={12}>ها أنت متأكد من رغبتك في حذف المدونة ؟ </Col>

        <Col lg={12}>
          <div>
            <button onClick={handleDeleteModal} className="primary-btn btn">
              حذف المدونة
            </button>
            <button
              onClick={() => {
                setShow(false);
              }}
              className="secondary-btn btn"
            >
              تراجع
            </button>
          </div>
        </Col>
      </div>
    </Modal>
  );
};

export default DeleteModal;
