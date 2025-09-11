import React, { useEffect } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  LayoutDashboard,
  Rows2Icon,
  Timer,
} from "lucide-react";
import PvStatusBars from "./PvStatusBars";
import { Nav, Tab } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import MvStatusBars from "./MvStatusBars";

const LateseProjects = () => {
  return (
    <div className="LateseProjects">
      {" "}
      <div className="LateseProjects-header">
        <h3>Projects count by status</h3>
        {/* <div className="selectedIems-container">
          <label>
            <input
              type="radio"
              name="yearlyTender"
              onChange={(e) => {
                setSelectedStatus(null);
                setPage(1);
                dispatch(
                  getTendersAssignedToBooklet({
                    cookies,
                    pageNumber: 1,
                    pageSize: 10,
                    userId: user?.id,
                    status: null,
                    tenderName: tenderSearch,
                    childNames: filterSelectedCollaborators,
                    isNewLastOfferPresentationDate:
                      isNewLastOfferPresentationDate,
                  })
                );
              }}
              // checked={selectedStatus === null}
              value="all"
            />
            <span className="single-tab">
              <FormattedMessage id="all" />
            </span>
          </label>
          {status?.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="yearlyTender"
                  // onChange={(e) => {}}
                  // checked={selectedStatus === item?.value}
                  // value={item?.value}
                />
                <span className="single-tab">{"item?.label"}</span>
              </label>
            );
          })}
        </div> */}
      </div>
      <div className="features-stat-grid chartsGrid">
        <PvStatusBars />
        <MvStatusBars />
      </div>
    </div>
  );
};

export default LateseProjects;
