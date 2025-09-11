import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Bar, Line, PolarArea, Doughnut } from "react-chartjs-2";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import Select from "react-select";
import {
  Chart as ChartJS,
  CategoryScale, // Needed for x-axis (string labels)
  LinearScale, // Needed for y-axis
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DatePicker } from "rsuite";
import {
  getMvProjectsCountByYear,
  getPvProjectsCountByYear,
} from "@/store/actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const AllProjectChart = () => {
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { user } = useSelector((state) => state?.authentication);
  const { pvProjectsCountByYear, mvProjectsCountByYear } = useSelector(
    (state) => state?.dashboard
  );
  const { formatMessage } = useIntl();
  const [tenderActivityId, setTenderActivityId] = useState();
  const [ActivityGroupId, setActivityGroupId] = useState();
  const [selectedYear, setSelectedYear] = useState(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const projectsCountByYearData = monthNames?.map((name, idx) => {
    const pvMonth = pvProjectsCountByYear?.items?.[idx]?.totalProjects || 0;
    const mvMonth = mvProjectsCountByYear?.items?.[idx]?.totalProjects || 0;

    return {
      month: name,
      pvProjectsCount: pvMonth,
      mvProjectsCount: mvMonth,
      allProjectsCount: pvMonth + mvMonth,
    };
  });
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      labels: {
        display: false,
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  const labels = projectsCountByYearData?.map((i) => i.month);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "all projects",
        data: projectsCountByYearData?.map((i) => i.allProjectsCount),
        borderColor: "#020817",

        tension: 0,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "mv projects",
        data: projectsCountByYearData?.map((i) => i.mvProjectsCount),
        borderColor: "#8200FF",
        tension: 0,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "pv projects",
        data: projectsCountByYearData?.map((i) => i.pvProjectsCount),
        borderColor: "#3B82F6",
        tension: 0,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };

  // dynamically generate years
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => {
      const year = currentYear - i;
      return { value: year, label: year.toString() };
    });
  }, []);

  const handleChangeYear = (selected) => {
    dispatch(
      getPvProjectsCountByYear({
        cookies,
        userId: user?.id,
        selectedYear: selected?.value,
      })
    );
    dispatch(
      getMvProjectsCountByYear({
        cookies,
        userId: user?.id,
        selectedYear: selected?.value,
      })
    );
  };
  return (
    <div className="all-projects-chart">
      <div className="header-chart">
        <div className="chart-labels">
          <div className="c-label">
            <div></div> <p>all projects</p>
          </div>
          <div className="c-label">
            <div className="pv"></div> <p>PV projects </p>
          </div>
          <div className="c-label">
            <div className="mv"></div> <p>Mv projects</p>
          </div>
          <div className="c-label"></div>
        </div>
        <div style={{ width: 200 }}>
          <Select
            options={yearOptions}
            value={selectedYear}
            onChange={(selected) => {
              setSelectedYear(selected);
              handleChangeYear(selected);
            }}
            placeholder="Select year"
          />
        </div>
      </div>
      <Line data={lineChartData} options={lineChartOptions} />;
    </div>
  );
};

export default AllProjectChart;
