import { editProjectSubById, editPvProjects } from "@/store/actions";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const SubCategoryUpdate = ({ isOpen, onClose, subproject, projectId }) => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { user } = useSelector((state) => state.authentication);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(subproject?.name || "");
    setDescription(subproject?.description || "");
  }, [subproject]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title?.trim()) {
      toast.error("project title is required");
      return;
    }
    if (!description?.trim()) {
      toast.error("project description is required");
      return;
    }

    dispatch(
      editProjectSubById({
        subProjectId: subproject?._id,
        projectId,
        cookies,
        toast,
        dispatch,
        userId: user?.id,
        data: {
          name: title,
          description,
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

export default SubCategoryUpdate;
