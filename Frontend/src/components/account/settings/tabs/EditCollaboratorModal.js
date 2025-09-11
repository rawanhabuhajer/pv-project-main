import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import styles from "../styles/style.module.scss";
import InfoIcon from "../../assets/images/Info.svg";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editCollaborator } from "@/store/actions";
import { FormattedMessage, useIntl } from "react-intl";
import toast from "react-hot-toast";

const EditCollaboratorModal = ({ show, onHide, selectedCollaborator }) => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const { roles } = useSelector((state) => state.authentication);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    if (selectedCollaborator) {
      setFirstName(selectedCollaborator?.firstName);
      setEmail(selectedCollaborator?.email);
      setRoleId(
        selectedCollaborator?.roleId || selectedCollaborator?.userRoleId || ""
      );
    }
  }, [selectedCollaborator]);

  const onSubmit = (data) => {
    data.firstName = firstName;
    data.email = email;
    data.userRoleId = roleId;
    data.id = selectedCollaborator?.id;

    dispatch(
      editCollaborator({
        data,
        formatMessage,
        toast,
        onHide,
      })
    );
  };

  const intl = useIntl();
  const selecPermission = intl.formatMessage({ id: "selecPermission" });

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      dialogClassName={styles["edit-colloborator-modal"]}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="editParticipantData" />
        </Modal.Title>
      </Modal.Header>
      <div className="edit-colloborator-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group flex">
            <label className="form-label">
              {" "}
              <FormattedMessage id="fullName" />
            </label>
            <div>
              <input
                type="text"
                className="form-control name-input"
                placeholder={formatMessage({ id: "fullName" })}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                required
              />
            </div>
          </div>

          <div className="form-group flex">
            <label className="form-label">
              {" "}
              <FormattedMessage id="email" />
            </label>
            <div>
              <input
                type="email"
                className="form-control"
                placeholder={formatMessage({ id: "email" })}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
              />
            </div>
          </div>

          <div className="form-group flex">
            <label className="form-label">
              {" "}
              <FormattedMessage id="permissions" />
            </label>
            <div className="role-inner">
              <div>
                <select
                  className="form-control form-select"
                  onChange={(e) => {
                    setRoleId(e.target.value);
                  }}
                  value={roleId}
                  required
                >
                  <option value="0"> {selecPermission}</option>
                  {roles?.map((role, index) => {
                    return (
                      <option key={index} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
                <OverlayTrigger
                  overlay={
                    <Popover>
                      <Popover.Body>
                        Objectively expedite tactical resources rather than
                        highly efficient action items. Quickly evolve timely
                        manufactured products rather than go forward alignments.
                        Energistically innovate leveraged paradigms with.
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <button type="button" className="info-icon">
                    <InfoIcon fill="#095183" />
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="form-group has-btn">
            <button
              type={
                firstName < 1 || email < 1 || roleId < 1 ? "button" : "submit"
              }
              className="btn"
              onClick={() => {
                if (firstName < 1) {
                  toast.error(formatMessage({ id: "fullNameAlert" }));
                } else if (email < 1) {
                  toast.error(formatMessage({ id: "emailAlert" }));
                } else if (email.indexOf("@") === -1) {
                  toast.error(formatMessage({ id: "emailFormatAlert" }));
                } else if (roleId < 1) {
                  toast.error(formatMessage({ id: "permissionAlert" }));
                }
              }}
            >
              <FormattedMessage id="save" />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCollaboratorModal;
