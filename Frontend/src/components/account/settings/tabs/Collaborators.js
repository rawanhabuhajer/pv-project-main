import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Popover, Table, Tooltip } from "react-bootstrap";

import UserIcon from "../../assets/images/user.svg";
import TrashIcon from "../../assets/images/trash.svg";
import InfoIcon from "../../assets/images/Info.svg";
import EditIcon from "../../assets/images/settings/edit.svg";
import toast from "react-hot-toast";
import Logo from "../../assets/images/sidebar-icons/new-logo.svg";
import { addCollaborator, deleteCollaborator } from "@/store/actions";
import EditCollaboratorModal from "./EditCollaboratorModal";
import Swal from "sweetalert2";
import { id } from "date-fns/locale";

const Collaborators = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { handleSubmit } = useForm();

  const { roles } = useSelector((state) => state.authentication);
  const { collaborators } = useSelector((state) => state.settings);

  // const [collaborators, setCollaborators] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [displayedCollaborators, setDisplayedCollaborators] = useState(3);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState({});

  const resetInputs = () => {
    setFirstName("");
    setEmail("");
    setRoleId("");
  };

  const submitCollaboratorsData = (data) => {
    data.firstName = firstName;
    data.email = email;
    data.userRoleId = roleId;
    dispatch(
      addCollaborator({
        data,
        toast,
        formatMessage,
        resetInputs,
      })
    );
  };

  const handleDeleteCollaborator = (id) => {
    Swal.fire({
      title: formatMessage({ id: "confirmDeleteParticipant" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#095183",
      cancelButtonColor: "#d33",
      confirmButtonText: formatMessage({ id: "yes" }),
      cancelButtonText: formatMessage({ id: "no" }),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteCollaborator({
            id,
            toast,
            formatMessage,
          })
        );
      }
    });
  };

  const intl = useIntl();
  const selecPermission = intl.formatMessage({ id: "selecPermission" });

  return (
    <div className="basic-info">
      {/* {collaborators?.length > 0 && (
        <div className="collaborators">
          {collaborators?.map((collaborator, index) => {
            if (index < displayedCollaborators) {
              return (
                <OverlayTrigger
                  key={index}
                  overlay={
                    <Popover>
                      <Popover.Header>{collaborator.firstName}</Popover.Header>
                      <Popover.Body>{collaborator.email}</Popover.Body>
                    </Popover>
                  }
                >
                  <div className="collaborator">
                    <Logo fill="#a5a5a5" />
                  </div>
                </OverlayTrigger>
              );
            }
            return null;
          })}
          {collaborators?.length > 3 &&
            displayedCollaborators < collaborators.length && (
              <button
                type="button"
                className="show-more"
                onClick={() => {
                  setDisplayedCollaborators((prevCount) => prevCount + 3);
                }}
              >
                عرض المزيد + {collaborators.length - displayedCollaborators}
              </button>
            )}
        </div>
      )} */}
      <form onSubmit={handleSubmit(submitCollaboratorsData)}>
        <div className="form-wrapper-block">
          <div className="form-group">
            <div className="add-employees">
              <label className="form-label">
                <UserIcon fill="#000" />
                <FormattedMessage id="addParticipants" />
              </label>
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
                      <option value="0">{selecPermission}</option>
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
                            manufactured products rather than go forward
                            alignments. Energistically innovate leveraged
                            paradigms with.
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
              <div className="form-group flex">
                <button
                  type={
                    firstName < 1 || email < 1 || roleId < 1
                      ? "button"
                      : "submit"
                  }
                  className="btn"
                  onClick={() => {
                    if (firstName < 1) {
                      toast.error(<FormattedMessage id="fullNameAlert" />);
                    } else if (email < 1) {
                      toast.error(<FormattedMessage id="emailAlert" />);
                    } else if (email.indexOf("@") === -1) {
                      toast.error(<FormattedMessage id="emailFormatAlert" />);
                    } else if (roleId < 1) {
                      toast.error(<FormattedMessage id="permissionAlert" />);
                    }
                    // else {
                    //   setCollaborators([
                    //     ...collaborators,
                    //     {
                    //       firstName,
                    //       email,
                    //       roleId,
                    //     },
                    //   ]);
                    //   setFirstName("");
                    //   setEmail("");
                    //   setRoleId("");
                    // }
                  }}
                >
                  <FormattedMessage id="add" />
                </button>
              </div>
            </div>
          </div>
          {collaborators?.length > 0 && (
            <div className="form-group">
              <div className="add-employees employees-list">
                <label className="form-label">
                  {" "}
                  <FormattedMessage id="collaborators" />
                </label>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        {" "}
                        <FormattedMessage id="firstName" />
                      </th>
                      <th>
                        <FormattedMessage id="permission" />
                      </th>
                      <th>
                        <FormattedMessage id="email" />{" "}
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {collaborators?.map((collaborator, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {collaborator.firstName} {collaborator.lastName}
                          </td>
                          <td>
                            {roles?.map((role) => {
                              if (role.id == collaborator.userRoleId) {
                                return role.name;
                              }
                            })}
                          </td>
                          <td>{collaborator.email}</td>
                          <td>
                            <div className="actions">
                              <OverlayTrigger
                                overlay={
                                  <Tooltip>
                                    <FormattedMessage id="edit" />{" "}
                                  </Tooltip>
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCollaborator(collaborator);
                                    setShowCollaboratorModal(true);
                                  }}
                                >
                                  <EditIcon />
                                </button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip>
                                    {" "}
                                    <FormattedMessage id="delete" />
                                  </Tooltip>
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeleteCollaborator(collaborator?.id);
                                  }}
                                >
                                  <TrashIcon />
                                </button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </form>

      {showCollaboratorModal && (
        <EditCollaboratorModal
          show={showCollaboratorModal}
          onHide={() => setShowCollaboratorModal(false)}
          selectedCollaborator={selectedCollaborator}
        />
      )}
    </div>
  );
};

export default Collaborators;
