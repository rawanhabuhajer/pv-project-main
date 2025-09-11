import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const blogsCategories = () => {
  const { categories } = useSelector((state) => state.blogs);

  return (
    <>
      <div className="categories-wrapper">
        <div className="title">
          <h4>
            <FormattedMessage id="categories" />
          </h4>
        </div>
        {categories?.map((category, index) => (
          <div className="section" key={index}>
            <div className="rigth-side">
              <h2>{category?.name}</h2>
            </div>

            <div className="left-side">
              <p>{category?.blogsCount}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default blogsCategories;
