import { editMvProjects, editPvProjects } from "@/store/actions";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
const ProjectUpdateForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { user } = useSelector((state) => state.authentication);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (isOpen?._id) {
      setTitle(isOpen?.name);
      setDescription(isOpen?.description);
      setDeadline(isOpen?.deadline);
    }
  }, [isOpen?._id]);

  if (!isOpen?._id) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title?.trim()) {
      toast.error("project title is required");
      return;
    }
    if (!description?.trim()) {
      toast.error("project descriptions is required");
      return;
    }

    if (!deadline) {
      toast.error("project deadline is required");
      return;
    }
    dispatch(
      editMvProjects({
        mvCategoryId: isOpen?._id,
        cookies,
        toast,
        dispatch,
        userId: user?.id,
        data: {
          name: title,
          description: description,
          deadline: deadline,
        },
      })
    );

    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3 className="dialog-title">Edit project details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="dialog-body">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Project title
              </label>
              <input
                id="title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter subproject title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Project Deadline
              </label>
              <Flatpickr
                onChange={(date) => {
                  setDeadline(date[0]);
                }}
                options={{
                  dateFormat: "Y-m-d",
                  minDate: new Date(
                    new Date().setDate(new Date().getDate() - 1)
                  ),
                }}
                className="form-control form-select flatpickr-input"
                placeholder="Select date"
                value={deadline}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your subproject"
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="dialog-footer">
            <button
              type="button"
              className="button button-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              save project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUpdateForm;
