import React from "react";

import { Line } from "rc-progress";

import { Rows2Icon } from "lucide-react";
import { useSelector } from "react-redux";

const StatsCards = () => {
  const { categoriesStatusStats, mvCategoriesStatusStats } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="stats-grid">
      <div className="single-item">
        <div className="card-top">
          <h5>PV Cable Projects Analytics</h5>
          <Rows2Icon size={16} />
        </div>
        <span>Your progress</span>
        <div className="card-middle">
          <div className="status">completed</div>
          <span>
            {categoriesStatusStats?.statusCounts?.completed || 0} /{" "}
            {categoriesStatusStats?.totalCategories || 0}
          </span>
        </div>
        <Line
          percent={categoriesStatusStats?.statusPercentages?.completed}
          trailColor="#e2e8f0"
          strokeColor={"#020817"}
          strokeWidth={1.5}
          trailWidth={1.5}
        />
        <div className="percent">
          {categoriesStatusStats?.statusPercentages?.completed !== undefined
            ? `${Number(
                categoriesStatusStats?.statusPercentages?.completed
              ).toFixed(0)}%`
            : "0%"}
        </div>
      </div>
      <div className="single-item">
        <div className="card-top">
          <h5> MV Cable Projects Analytics</h5>
          <Rows2Icon size={16} />
        </div>
        <span>Your progress</span>
        <div className="card-middle">
          <div></div>
          <span>
            {" "}
            {mvCategoriesStatusStats?.statusCounts?.completed || 0} /{" "}
            {mvCategoriesStatusStats?.totalCategories}
          </span>
        </div>
        <Line
          percent={mvCategoriesStatusStats?.statusPercentages?.completed || 0}
          trailColor="#E1D5F2"
          strokeColor="#6770f7"
          strokeWidth={1.5}
          trailWidth={1.5}
        />
        <div className="percent">
          {" "}
          {mvCategoriesStatusStats?.statusPercentages?.completed !== undefined
            ? `${Number(
                mvCategoriesStatusStats?.statusPercentages?.completed
              ).toFixed(0)}%`
            : "0%"}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
