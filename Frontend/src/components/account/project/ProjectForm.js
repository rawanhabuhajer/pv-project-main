import React, { useState } from "react";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/airbnb.css";
const ProjectForm = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title?.trim()) {
      alert("project title is required");
      return;
    }
  
    onSave({ title, description, deadline });
    setTitle("");
    setDescription("");
    setDeadline("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3 className="dialog-title">Create New project</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="dialog-body">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Project Title
              </label>
              <input
                id="title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
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
                placeholder="Describe your project"
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
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectForm;
