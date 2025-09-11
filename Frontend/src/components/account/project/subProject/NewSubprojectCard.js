import React from 'react'

const NewSubprojectCard = ({ onClick }) => {
 return (
    <div className="new-subproject-card" onClick={onClick}>
      <div className="new-card-content">
        <div className="icon-container">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="plus-icon"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <h3 className="new-card-title">Create New Subproject</h3>
        <p className="new-card-description">Click to add a new subproject</p>
      </div>
    </div>
  );
}

export default NewSubprojectCard