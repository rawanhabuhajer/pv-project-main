import React from "react";

import { Modal } from "react-bootstrap";

const AddNewProject = ({
  onclick,
  setProjectDescription,
  setProjectName,
  open,
  handleClose,
  handleOpen,
  projectDescription,
  projectName,
  onclickCancel,

  subCategory,
}) => {
  return (
    <>
      <button title={"Add project"} onClick={handleOpen} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
        <div className="cardWrapper3">
          <form>
            <div className="cardWrapper4">
              <div className="cardWrapper5">
                {subCategory == true ? (
                  <label>subcategory Name :</label>
                ) : (
                  <label>Project Name :</label>
                )}

                <input
                  type="text"
                  name="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="cardWrapper5">
                <label>Description :</label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
            </div>
            <br></br>
            <div className="btns">
              <button
                onClick={onclick}
                disabled={!projectDescription || !projectName}
                className="save-btn"
              >
                save
              </button>
              <button onClick={onclickCancel} className="c-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddNewProject;
