import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { verifyUser } from "store/actions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const VerifyModal = ({
  show,
  setShow,
  selectedUser,
  page,
  pageSize,
  SearchValue,
  IsVerified,
}) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const resetInputs = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        resetInputs();
        setShow(false);
      }}
      centered
      dialogClassName="modal-verify"
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title>تفعيل المستخدم </Modal.Title>
      </Modal.Header>
      <div className="verify-body">
        <Row>
          <Col lg={6} md={12}>
            <div className="form-group">
              <label>تاريخ البداية</label>
              <Flatpickr
                value={startDate}
                onChange={(date) => setStartDate(date[0])}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: new Date().toISOString().split("T")[0],
                }}
                className="form-control"
              />
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="form-group">
              <label>تاريخ النهاية</label>
              <Flatpickr
                value={endDate}
                onChange={(date) => setEndDate(date[0])}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: startDate,
                }}
                className="form-control"
              />
            </div>
          </Col>

          <Col lg={12}>
            <div className="form-group">
              <button
                className="btn btn-blue"
                onClick={() => {
                  dispatch(
                    verifyUser({
                      id: selectedUser?._id,
                      data: {
                        startDate: startDate,
                        endDate: endDate,
                      },
                      toast,
                      dispatch,
                      page,
                      pageSize,
                      resetInputs,
                    })
                  );
                  setShow(false);
                }}
              >
                تفعيل
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default VerifyModal;
