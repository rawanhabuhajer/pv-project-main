import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleSearchParamsChange } from "../../helpers/functions";

const BootyPagination = ({ metadata }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let { count, pageIndex, pageSize } = metadata || {};

  pageIndex = parseInt(pageIndex) || 1;

  const onChangePage = (clickedPage, pageSize) => {
    const search = Object.fromEntries([...searchParams]);
    const params = {};
    if (clickedPage) params["pageIndex"] = clickedPage;
    if (pageSize) params["pageSize"] = pageSize;
    const newSearch = handleSearchParamsChange(search, params);
    navigate(window.location.pathname + newSearch, { replace: false });
  };

  const handleBackButtonClick = () => {
    onChangePage(pageIndex - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(pageIndex + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(count, pageSize);
  const pageItems = toPages(pages);
  const nextDisabled = pageIndex === pageItems.length;
  const previosDisabled = pageIndex === 1;

  function getNumberOfPages(count, limit) {
    return Math.ceil(count / limit);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 0; i < pages; i++) {
      results.push(i + 1);
    }

    return results;
  }

  const getSelectedLimit = () => {
    const url = new URLSearchParams(searchParams);
    return url.get("pageSize") || pageSize;
  };

  const renderPageNumbers = () => {
    const total = pageItems.length;

    if (total <= 4) {
      return pageItems.map((pageItem) => (
        <li
          key={pageItem}
          className={pageItem === pageIndex ? "page-item active" : "page-item"}
        >
          <button
            className="page-link"
            onClick={handlePageNumber}
            value={pageItem}
          >
            {pageItem}
          </button>
        </li>
      ));
    }

    let pagesToRender = pageItems.slice(0, 4);

    if (pageIndex > 4) {
      if (pageIndex < total - 2) {
        pagesToRender = pageItems.slice(pageIndex - 3, pageIndex + 2);
      } else {
        pagesToRender = pageItems.slice(total - 4, total);
      }
    }

    return pagesToRender.map((pageItem, index) => (
      <li
        key={pageItem}
        className={pageItem === pageIndex ? "page-item active" : "page-item"}
      >
        <button
          className="page-link"
          onClick={handlePageNumber}
          value={pageItem}
        >
          {pageItem}
        </button>
      </li>
    ));
  };

  return (
    <div className="d-flex justify-content-end align-items-center gap-2   ">
      <nav className="table-pager">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link prev-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              السابق
            </button>
          </li>
          {renderPageNumbers()}
          <li className="page-item">
            <button
              className="page-link nxt-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              التالي
            </button>
          </li>
        </ul>
      </nav>
      <div className="table-select">
        <select
          onChange={(e) => onChangePage("", e.target.value)}
          value={getSelectedLimit() || "10"}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default BootyPagination;
