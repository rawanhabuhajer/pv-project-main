
import React, { useState } from "react";

const SubprojectForm = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title?.trim()) {
      // Show error - would normally use toast here
      alert("Subproject title is required");
      return;
    }

    onSave({ title, description });
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3 className="dialog-title">Create New Subproject</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="dialog-body">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Subproject Title
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
              Create Subproject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubprojectForm;
