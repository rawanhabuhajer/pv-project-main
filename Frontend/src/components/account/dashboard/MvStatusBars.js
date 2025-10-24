import React, { useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import { useSelector } from "react-redux";

const MvStatusBars = () => {
  const { mvCategoriesStatusStatsLoading, mvCategoriesStatusStats } =
    useSelector((state) => state.dashboard);

  const chartData = useMemo(() => {
    return [
      {
        label: "Pending",
        value: Number(mvCategoriesStatusStats?.statusCounts?.pending || 0),
      },
      {
        label: "In progress",
        value: Number(mvCategoriesStatusStats?.statusCounts?.inProgress || 0),
      },
      {
        label: "Completed",
        value: Number(mvCategoriesStatusStats?.statusCounts?.completed || 0),
      },
    ];
  }, [mvCategoriesStatusStats]);

  const chartOptions = useMemo(() => {
    return {
      data: chartData,
      series: [
        {
          type: "bar",
          xKey: "label",
          yKey: "value",
          yName: "Status",
          cornerRadius: 10,
          itemStyler: ({ datum }) => {
            if (datum.label === "Pending")
              return { fill: "#8200ff", stroke: "#8200ff" };
            if (datum.label === "In progress")
              return { fill: "#181e2e", stroke: "#181e2e" };
            if (datum.label === "Completed")
              return { fill: "#2465ed", stroke: "#2465ed" };
            return { fill: "#ccc", stroke: "#ccc" };
          },
        },
      ],
      legend: { enabled: false },
      axes: [
        {
          type: "category",
          position: "bottom",
          label: { fontSize: 12 },
          gridLine: {
            enabled: true,
            style: [{ stroke: "#c4c4c4", lineDash: [4, 4] }],
          },
          line: { width: 0 },
          tick: { width: 0 },
        },
        {
          type: "number",
          label: {
            fontSize: 12,
            formatter: ({ value }) => value.toLocaleString(),
          },
          gridLine: {
            style: [{ stroke: "#c4c4c4", lineDash: [4, 4] }],
          },
          line: { width: 0 },
          tick: { width: 0 },
        },
      ],
    };
  }, [chartData]);

  if (mvCategoriesStatusStatsLoading) {
    return <div>Loading status data...</div>;
  }

  return (
    <div className="charts-wrapper">
      <div className="chart-title">MV Cable Projects</div>
      <div className="legend-wrapper">
        {/* <div className="legend-single">projects count</div> */}
      </div>
      <div style={{ height: 300 }}>
        <AgCharts options={chartOptions} />
      </div>
    </div>
  );
};

export default MvStatusBars;
