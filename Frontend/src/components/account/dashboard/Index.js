import React, { useEffect } from "react";
import styles from "./styles/style.module.scss";
import ArrowIcon from "../assets/images/newImages/arrowLeft.svg";
import { Line, Circle } from "rc-progress";
import { FormattedMessage } from "react-intl";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  LayoutDashboard,
  Rows2Icon,
  Timer,
} from "lucide-react";
import AllProjectChart from "./AllProjectChart";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import {
  getCategoriesStatusStats,
  getLatestProjects,
  getMvCategoriesStatusStats,
  getMvProjectsCountByYear,
  getNearDeadlineProjects,
  getPvProjectsCountByYear,
} from "@/store/actions";
import StatsCards from "./StatsCards";
import { Col, Row } from "react-bootstrap";
import NearDeadlineList from "./NearDeadlineList";
import LateseProjects from "./LateseProjects";
import PvStatusBars from "./PvStatusBars";
import LatestAddedProjects from "./LatestAddedProjects";
const Index = () => {
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (user?.id) {
      dispatch(
        getNearDeadlineProjects({
          cookies,
          userId: user?.id,
        })
      );
      dispatch(
        getCategoriesStatusStats({
          cookies,
          userId: user?.id,
        })
      );
      dispatch(
        getMvCategoriesStatusStats({
          cookies,
          userId: user?.id,
        })
      );
      dispatch(
        getLatestProjects({
          cookies,
          userId: user?.id,
        })
      );
      dispatch(
        getPvProjectsCountByYear({
          cookies,
          userId: user?.id,
          selectedYear: "2025",
        })
      );
      dispatch(
        getMvProjectsCountByYear({
          cookies,
          userId: user?.id,
          selectedYear: "2025",
        })
      );
    }
  }, [user?.id]);

  const getGreetingId = () => {
    const hours = new Date().getHours();
    return hours < 12 ? "Good morning" : "Good afternoon";
  };

  return (
    <div className={styles["dashboard-wrapper"]}>
      <div className="header">
        <div className="text">
          <LayoutDashboard />
          <h1>Dashboard</h1>
        </div>
        <div className="name-section">
          <div className="name-text">
            <h3>{user?.username || "username"}</h3>
            <p>{user?.role || "role"}</p>
          </div>{" "}
          <div className="avatar">
            {user?.username
              ?.split(" ")
              .filter(Boolean)
              .map((part) => part.charAt(0).toUpperCase())
              .filter(
                (_, index, arr) => index === 0 || index === arr.length - 1
              )
              .join("")}
          </div>
        </div>
      </div>

      <div className="main">
        <div className="welcome-banner">
          <h2>
            <FormattedMessage id={getGreetingId()} />,{" "}
            <strong>{user?.username}</strong>! <span className="emoji">🌞</span>
          </h2>
          <p>Welcome to PVX360 !</p>
          <p>
            We’re excited to have you on board. Let’s power your journey to PV
            projects designing tools with professional and international
            standards driven insights
          </p>
        </div>
        <Row>
          <Col lg={8}>
            <StatsCards />
            <LatestAddedProjects />
            <LateseProjects />
          </Col>
          <Col lg={4}>
            <NearDeadlineList />
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <h3>Projects count by year</h3>
            <AllProjectChart />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
