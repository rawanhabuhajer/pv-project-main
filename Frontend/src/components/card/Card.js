import React, { useState } from "react";
import "./card.css";
import moment from "moment";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import dotsIcon from "../../assets/3dots.svg";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Dropdown from "react-bootstrap/Dropdown";
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
const Card = ({
  onClick,
  category,
  handleDeleteCategory,
  handleEditCategory,
  setProjectDescription,
  setProjectName,
  projectDescription,
  projectName,
}) => {
  const Date = moment(category.createdAt).format("ll");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => {
    if (category) {
      setProjectName(category.name || "");
      setProjectDescription(category.description || "");
      setOpenEdit(true);
    }
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setProjectDescription("");
    setProjectName("");
  };
  return (
    <div className="card-w">
      {/* <div className="control-icon">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img
              src={dotsIcon}
              width={4}
              alt="Delete"
              style={{ marginLeft: "5px" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}

      <div className="card" >
        <div className="left_wrapper">
          <div className="card-head">
            <h3 className="card__title">{category.name}</h3>
            <div className="control-icon">
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Control">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <img
                        src={dotsIcon}
                        width={4}
                        alt="Delete"
                        style={{ marginLeft: "5px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.12))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleOpen}>
                    <ListItemIcon>
                      <img
                        src={editIcon}
                        width={16}
                        alt="Delete"
                        style={{ marginLeft: "5px" }}
                      />
                    </ListItemIcon>
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDeleteCategory(category._id);
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src={deleteIcon}
                        width={13}
                        alt="Delete"
                        className="deleteicon"
                      />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </div>{" "}
          </div>
          <p className="card__content">{category.description}</p>
          <div className="card__date">{Date}</div>
        </div>
        <div className="card__arrow" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="15"
            width="15"
          >
            <path
              fill="#fff"
              d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
            ></path>
          </svg>
        </div>
      </div>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="cardWrapper4">
            <div className="cardWrapper5">
              <label>subcategory Name :</label>
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
              onClick={() => {
                handleEditCategory(category._id);
                setOpenEdit(false);
              }}
              className="save-btn"
            >
              Edit
            </button>

            <button onClick={handleCloseEdit} className="c-btn">
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Card;
