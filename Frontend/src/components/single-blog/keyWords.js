import React from "react";
import { FormattedMessage } from "react-intl";
const keyWords = ({ singleBlog }) => {
  return (
    <>
      <div className="keyWords-wrapper">
        <div className="title">
          <h4>
            <FormattedMessage id="keywords" />
          </h4>
        </div>
        <div className="keywords-section">
          {singleBlog?.tags?.length > 0 ? (
            singleBlog?.tags?.map((keyword, index) => (
              <span key={index}>{keyword?.name}</span>
            ))
          ) : (
            <div className="alert alert-warning text-center">
              <FormattedMessage id="noKeywords" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default keyWords;
