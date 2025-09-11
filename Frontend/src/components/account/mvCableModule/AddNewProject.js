import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Button from "../../components/Button/Button";

import { Modal } from "react-bootstrap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: "15px",
  py: 2,
  px: 3,
};

const AddNewProject = ({
  onclick,
  setProjectDescription,
  setProjectName,
  open,
  setOpen,
  handleClose,
  handleOpen,
  projectDescription,
  projectName,
  onclickCancel,
  subCategoryActive,
  subCategory,
  editIsActive,
  editSub,
}) => {
  return (
    <>
      <button title={"Add project"} onclick={handleOpen} />

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
              {/* <Button title={"Save"} onclick={onclick} /> */}
            </div>
          </form>
        </div>
        {/* </Box> */}
      </Modal>
    </>
  );
};

export default AddNewProject;
