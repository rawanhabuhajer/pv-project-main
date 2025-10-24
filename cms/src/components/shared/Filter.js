import { Key, Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Filter = ({
  filterText,
  onFilter,
  onClear,
  placeholder,
  SearchValue,
  setSearchValue,
  onclick,
}) => {
  const navigate = useNavigate();

  const handleClear = () => {
    onClear();
    navigate("");
  };

  return (
    <>
      <div className="filter-wrp">
        <div className="form-group">
          <input
            id="search"
            type="text"
            placeholder={placeholder}
            value={SearchValue}
            onChange={onFilter}
            className="form-control"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onclick();
              }
            }}
          />
          {SearchValue?.length > 0 && (
            <button className="clear-btn" onClick={handleClear}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#adadadff"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          )}
          <span onClick={onclick} style={{ cursor: "pointer" }}>
            {SearchValue ? (
              <Search color="#2465ed" size={18} />
            ) : (
              <Search color="#adadadff" size={18} />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Filter;
