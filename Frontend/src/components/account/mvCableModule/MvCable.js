import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";

import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import axios from "axios";
import {
  ChevronRight,
  ChevronLeft,
  Calculator,
  Zap,
  Cable,
  Settings,
} from "lucide-react";

// import { useParams } from "react-router-dom";
// import UseAuthContext from "../../hooks/UseAuthContext";
import { cableData, conductorSizes, SingleCoreInstallation } from "./MvData";
// import { ToastContainer, toast } from "react-toastify";
import AmbientTemperature from "./AmbientTemperature";
import MultiCoreReductionTable from "./MultiCoreReductionTable";
import SingleCoreReductionTable from "./SingleCoreReductionTable";
import AmbientTemperature2 from "./AmbientTemperature2";
import CorrectionFactorsInDucts from "./CorrectionFactorsInDucts";
import CorrectionFactorBuriedCables from "./CorrectionFactorBuriedCables";
import Table from "react-bootstrap/Table";
import B14 from "./B14";
import B15 from "./B15";
import B16 from "./B16";
import B17 from "./B17";
import B18 from "./B18";
import B19 from "./B19";
import B20 from "./B20";
import B21 from "./B21";

// import tableIcon from "../../assets/table.svg";
// import tableIcon from "../../assets/reportIcon.svg";
// import downloadIcon from "../../assets/print.svg";
import DownloadIcon from "./d.svg";
import DownloadPdf from "./DownloadPdf";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getSingleProjectDataById } from "@/store/actions";
import { parseCookies } from "nookies";
const MvCable = () => {
  // const { mvCategoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  const router = useRouter();
  const mvCategoryId = router?.query.account[2];
  const dispatch = useDispatch();
  const {
    MvProjectsMeta,
    MvProjectsLoading,
    MvProjects,
    MvSingleProjectsData,
  } = useSelector((state) => state.projects);
  const cookies = parseCookies();

  const [coreType, setCoreType] = useState("");
  const [conductorType, setConductorType] = useState("");
  const [insulationType, setInsulationType] = useState("");
  const [installationMethod, setInstallationMethod] = useState("");
  const [spacingMethod, setSpacingMethod] = useState("");
  const [conductorSize, setConductorSize] = useState(0);
  const [mvCableValue, setMvCableValue] = useState();
  const [step, setStep] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [inputFactor, setinputFactor] = useState();
  const [cableRuns, setCableRuns] = useState();
  const [sumResult, setSumResult] = useState();
  const [categoryData, setCategoryData] = useState();
  const [mvCategoryData, setMvCategoryData] = useState();

  const [ambientTemperature, setAmbientTemperature] = useState();
  const [ambientTemperatureResult, setAmbientTemperatureResult] = useState();

  // b19 b21 b18 b20 step3
  const [spacing, setSpacing] = useState(null);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [CFFResult, setCFFResult] = useState(null);

  // b14 b15  b16 b17 step4
  const [cableCount, setCableCount] = useState();
  const [resistivitiesspacing, setresistivitiesSpacing] = useState("");
  const [factor, setFactor] = useState();

  // CorrectionFactorBuriedCables CorrectionFactorBuriedCables step5
  const [selectedDepth, setSelectedDepth] = useState("");
  const [selectedConductorSize, setSelectedConductorSize] = useState("");
  const [correctionFactor, setCorrectionFactor] = useState();

  // single multi cables
  const [cableMethod, setCableMethod] = useState("");
  const [cableInstallationType, setCableInstallationType] = useState("");
  const [traysLadders, setTraysLadders] = useState();
  const [circuits, setCircuits] = useState();
  const [cableResult, setCableResult] = useState();

  const pdfDownloaderRef = useRef();
  const pdfReportRef = useRef(null);

  const handleCoreTypeChange = (event, value) => setCoreType(value);
  const handleConductorTypeChange = (event, value) => setConductorType(value);
  const handleInsulationTypeChange = (event, value) => setInsulationType(value);
  const handleInstallationMethodChange = (event, value) => {
    setInstallationMethod(value);
    if (value === "In Air") {
      setAmbientTemperature();
      setAmbientTemperatureResult();
      setSpacing(null);
      setAvailableGroups([]);
      setSelectedGroup(null);
      setCFFResult(null);
      setCableCount();
      setresistivitiesSpacing("");
      setFactor();
      setSelectedDepth("");
      setSelectedConductorSize("");
      setCorrectionFactor();
    } else {
      setCableMethod("");
      setCableInstallationType("");
      setTraysLadders();
      setCircuits();
      setCableResult();
    }
  };
  const handleSpacingMethodChange = (event, value) => {
    setSpacingMethod(value);
    if (value === "In air") {
      setAmbientTemperature();
      setAmbientTemperatureResult();
      setSpacing(null);
      setAvailableGroups([]);
      setSelectedGroup(null);
      setCFFResult(null);
      setCableCount();
      setresistivitiesSpacing("");
      setFactor();
      setSelectedDepth("");
      setSelectedConductorSize("");
      setCorrectionFactor();
    } else {
      setCableMethod("");
      setCableInstallationType("");
      setTraysLadders();
      setCircuits();
      setCableResult();
    }
  };
  const handleConductorSizeChange = (event, value) => setConductorSize(value);

  const getTableValue = () => {
    const key = `Table ${coreType} ${conductorType} ${insulationType} ${installationMethod} ${spacingMethod}`;
    const selectedTable = cableData[key];

    const sizeIndex = conductorSizes.indexOf(Number(conductorSize));

    setMvCableValue(selectedTable[sizeIndex]);
  };

  useEffect(() => {
    if (
      coreType &&
      conductorType &&
      insulationType &&
      installationMethod &&
      spacingMethod &&
      conductorSize &&
      cableData
    ) {
      const key = `Table ${coreType} ${conductorType} ${insulationType} ${installationMethod} ${spacingMethod}`;
      const selectedTable = cableData[key];

      if (selectedTable) {
        const sizeIndex = conductorSizes?.indexOf(Number(conductorSize));
        if (sizeIndex !== -1) {
          setMvCableValue(selectedTable[sizeIndex]);
        }
      }
    }
  }, [
    coreType,
    conductorType,
    insulationType,
    installationMethod,
    spacingMethod,
    conductorSize,
    cableData,
  ]);

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Ensure categoryData is structured as expected
      const response = await axios.patch(
        `http://localhost:8000/api/mvCategories/singlecategory/${mvCategoryId}`,
        {
          details: categoryData,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Category updated successfully");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response?.data?.message || "Failed to update category");
    }
  };

  useEffect(() => {
    dispatch(
      getSingleProjectDataById({
        mvCategoryId: mvCategoryId,
        cookies,
      })
    );
  }, [mvCategoryId]);

  useEffect(() => {
    setMvCategoryData(MvSingleProjectsData);
    setCategoryData(MvSingleProjectsData?.category?.details[0]);
    setCoreType(MvSingleProjectsData?.category?.details[0]?.coreType);
    setConductorType(MvSingleProjectsData?.category?.details[0]?.conductorType);
    setInsulationType(
      MvSingleProjectsData?.category?.details[0]?.insulationType
    );
    setInstallationMethod(
      MvSingleProjectsData?.category?.details[0]?.installationMethod
    );
    setSpacingMethod(MvSingleProjectsData?.category?.details[0]?.spacingMethod);
    setConductorSize(MvSingleProjectsData?.category?.details[0]?.conductorSize);
    setMvCableValue(MvSingleProjectsData?.category?.details[0]?.mvCableValue);
    setinputFactor(MvSingleProjectsData?.category?.details[0]?.inputFactor);
    setCableRuns(MvSingleProjectsData?.category?.details[0]?.cableRuns);
    setAmbientTemperature(
      MvSingleProjectsData?.category?.details[0]?.ambientTemperature
    );
    setAmbientTemperatureResult(
      MvSingleProjectsData?.category?.details[0]?.ambientTemperatureResult
    );
    // b19 b21 b18 b20 step3
    setSpacing(MvSingleProjectsData?.category?.details[0]?.spacing);
    setAvailableGroups(
      MvSingleProjectsData?.category?.details[0]?.availableGroups
    );
    setSelectedGroup(MvSingleProjectsData?.category?.details[0]?.selectedGroup);
    setCFFResult(MvSingleProjectsData?.category?.details[0]?.CFFResult);
    // b14 b15  b16 b17 step4
    setCableCount(MvSingleProjectsData?.category?.details[0]?.cableCount);
    setresistivitiesSpacing(
      MvSingleProjectsData?.category?.details[0]?.resistivitiesspacing
    );
    setFactor(MvSingleProjectsData?.category?.details[0]?.factor);
    // CorrectionFactorBuriedCables CorrectionFactorBuriedCables step5
    setSelectedDepth(MvSingleProjectsData?.category?.details[0]?.selectedDepth);
    setSelectedConductorSize(
      MvSingleProjectsData?.category?.details[0]?.selectedConductorSize
    );
    setCorrectionFactor(
      MvSingleProjectsData?.category?.details[0]?.correctionFactor
    );
    // single multi cables
    setCableMethod(MvSingleProjectsData?.category?.details[0]?.cableMethod);
    setCableInstallationType(
      MvSingleProjectsData?.category?.details[0]?.cableInstallationType
    );
    setTraysLadders(MvSingleProjectsData?.category?.details[0]?.traysLadders);
    setCircuits(MvSingleProjectsData?.category?.details[0]?.circuits);
    setCableResult(MvSingleProjectsData?.category?.details[0]?.cableResult);
  }, [MvSingleProjectsData]);

  useEffect(() => {
    if (tableData?.length > 0) {
      setStep(6);
    }
  }, [tableData]);
  const handleDownloadClick = () => {
    if (pdfDownloaderRef.current) {
      pdfDownloaderRef.current.generatePDF();
    }
  };

  const Iz =
    (mvCableValue *
      ambientTemperatureResult *
      CFFResult *
      factor *
      correctionFactor) /
    cableRuns;

  const IzAir =
    (mvCableValue * ambientTemperatureResult * cableResult) / cableRuns;

  // console.log(
  //   mvCableValue,
  //   ambientTemperatureResult,
  //   CFFResult,
  //   factor,
  //   correctionFactor,
  //   cableRuns
  // );
  return (
    <div className={styles["mvCable-wrapper"]}>
      <div className="hero-actions">
        <h1>{mvCategoryData?.name} </h1>
      </div>
   
      <div className="categories-container">
        <div className="content">
          <div className={`stepper-wrapper `}>
            {(installationMethod && installationMethod === "In Air") ||
            (spacingMethod && spacingMethod === "In air") ? (
              <div className="stepper air">
                <ul>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    <li
                      className={`${
                        step === 1 ? "active" : step > 1 ? "done" : ""
                      }`}
                    >
                      1
                    </li>

                    {/* <span>table 1</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    <li
                      className={`${
                        step === 2 ? "active" : step > 2 ? "done" : ""
                      }`}
                    >
                      2
                    </li>{" "}
                    {/* <span>table 2</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(3);
                    }}
                  >
                    <li
                      className={`${
                        step === 3 ? "active" : step > 3 ? "done" : ""
                      }`}
                    >
                      3
                    </li>{" "}
                    {/* <span>table 3</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(4);
                    }}
                  >
                    <li
                      className={`${
                        step === 4 ? "active" : step > 4 ? "done" : ""
                      }`}
                    >
                      4
                    </li>{" "}
                    {/* <span>table 3</span> */}
                  </div>
                </ul>
                <div
                  className="progress air"
                  style={{ height: `${(step - 1) * 100}px`, "--step": step }}
                ></div>
              </div>
            ) : (
              <div className="stepper">
                <ul>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    <li
                      className={`${
                        step === 1 ? "active" : step > 1 ? "done" : ""
                      }`}
                    >
                      1
                    </li>

                    {/* <span>table 1</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    <li
                      className={`${
                        step === 2 ? "active" : step > 2 ? "done" : ""
                      }`}
                    >
                      2
                    </li>{" "}
                    {/* <span>table 2</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(3);
                    }}
                  >
                    <li
                      className={`${
                        step === 3 ? "active" : step > 3 ? "done" : ""
                      }`}
                    >
                      3
                    </li>{" "}
                    {/* <span>table 3</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(4);
                    }}
                  >
                    <li
                      className={`${
                        step === 4 ? "active" : step > 4 ? "done" : ""
                      }`}
                    >
                      4
                    </li>{" "}
                    {/* <span>table 4</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(5);
                    }}
                  >
                    <li
                      className={`${
                        step === 5 ? "active" : step > 5 ? "done" : ""
                      }`}
                    >
                      5
                    </li>{" "}
                    {/* <span>table 5</span> */}
                  </div>
                  <div
                    className="single-step"
                    onClick={() => {
                      setStep(6);
                    }}
                  >
                    <li
                      className={`${
                        step === 6 ? "active" : step > 6 ? "done" : ""
                      }`}
                    >
                      6
                    </li>{" "}
                    {/* <span>table 6</span> */}
                  </div>
                </ul>
                <div
                  className="progress"
                  style={{ height: `${(step - 1) * 100}px`, "--step": step }}
                ></div>
              </div>
            )}
          </div>
          <div className={`progressBar `}>
            <div className="btn-actions">
              {(installationMethod !== "In Air" &&
                spacingMethod !== "In air") ||
              (coreType === "B.2" && installationMethod === "In Air") ||
              (coreType === "B.6" && spacingMethod === "In air") ? (
                step < (coreType === "B.2" || coreType === "B.6" ? 4 : 6) ? (
                  // <button onClick={() => setStep(coreType === "B.2" ? 4 : 6)}>
                  //   <img src={tableIcon} width={20} /> <p>Report data</p>
                  // </button>
                  ""
                ) : (
                  // <button onClick={handleDownloadClick}>
                  //   <img src={downloadIcon} width={20} /> <p>Print report</p>

                  // </button>
                  <button
                    onClick={handleDownloadClick}
                    style={{
                      background: "#F9F9FB66",

                      border: "none",
                      marginLeft: "10px",
                      fontWeight: 500,
                      fontSize: 16,
                      textTransform: "none",
                      border: "1px solid rgba(206, 206, 223, 0.35)",
                      color: "#333",
                      padding: "10px 28px",
                      borderRadius: "5px",
                    }}
                  >
                    Download &nbsp;
                    <img src={DownloadIcon} width={18} alt="Download" />
                  </button>
                )
              ) : null}
            </div>

            {step === 1 && (
              <div className="step-wrap">
                <div className="title-wrapper">
                  <h3>Cable Current Carrying Capacity (Ic)</h3>
                </div>
                <div className="inputs-wrapper">
                  <div>
                    <label htmlFor="spacing">Design Current (Ib) :</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Design Current (Ib)"
                      value={inputFactor}
                      onChange={(e) => {
                        setinputFactor(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="spacing">Cable Runs (n) :</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Cable Runs (n)"
                      value={cableRuns}
                      onChange={(e) => {
                        setCableRuns(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="spacing">Conductors/Cores :</label>
                    <Select
                      onChange={handleCoreTypeChange}
                      className="select_container"
                      placeholder="Conductors/Cores"
                      indicator={<ChevronDown />}
                      value={coreType}
                      sx={{
                        height: 50,
                        backgroundColor: "rgb(249,249,249)",
                        fontWeight: 400,
                        fontSize: 14,
                        borderRadius: 3,
                        fontFamily: "Open Sans, sans-serif",
                        [`& .${selectClasses.indicator}`]: {
                          transition: "0.2s",
                          [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                          },
                        },
                      }}
                    >
                      <Option value="B.2">Single-Core Cables</Option>
                      <Option value="B.6">Three-Core Cables</Option>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="spacing">Conductor Type :</label>
                    <Select
                      onChange={handleConductorTypeChange}
                      className="select_container"
                      placeholder="Conductor Type"
                      indicator={<ChevronDown />}
                      value={conductorType}
                      sx={{
                        height: 50,
                        backgroundColor: "rgb(249,249,249)",
                        fontWeight: 400,
                        fontSize: 14,
                        borderRadius: 3,
                        fontFamily: "Open Sans, sans-serif",
                        [`& .${selectClasses.indicator}`]: {
                          transition: "0.2s",
                          [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                          },
                        },
                      }}
                    >
                      <Option value="Copper">Copper</Option>
                      <Option value="Aluminum">Aluminum</Option>
                    </Select>{" "}
                  </div>
                  <div>
                    <label htmlFor="spacing">Insulation Type :</label>
                    <Select
                      onChange={handleInsulationTypeChange}
                      className="select_container"
                      placeholder="Insulation Type"
                      indicator={<ChevronDown />}
                      value={insulationType}
                      sx={{
                        height: 50,
                        backgroundColor: "rgb(249,249,249)",
                        fontWeight: 400,
                        fontSize: 14,
                        borderRadius: 3,
                        fontFamily: "Open Sans, sans-serif",
                        [`& .${selectClasses.indicator}`]: {
                          transition: "0.2s",
                          [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                          },
                        },
                      }}
                    >
                      <Option value="XLPE">XLPE</Option>
                      <Option value="EPR">EPR</Option>
                    </Select>
                  </div>
                  {coreType === "B.2" ? (
                    <div>
                      <label htmlFor="spacing">Installation Method:</label>
                      <Select
                        onChange={handleInstallationMethodChange}
                        className="select_container"
                        placeholder="Installation Method"
                        indicator={<ChevronDown />}
                        value={installationMethod}
                        sx={{
                          height: 50,
                          backgroundColor: "rgb(249,249,249)",
                          fontWeight: 400,
                          fontSize: 14,
                          borderRadius: 3,
                          fontFamily: "Open Sans, sans-serif",
                          [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                              transform: "rotate(-180deg)",
                            },
                          },
                        }}
                      >
                        <Option value="Buried directly in the ground">
                          Buried directly in the ground
                        </Option>
                        <Option value="In single-way ducts">
                          In single-way ducts
                        </Option>
                        <Option value="In Air">In Air</Option>
                      </Select>
                    </div>
                  ) : coreType === "B.6" ? (
                    <div>
                      <label htmlFor="spacing">Cable Formation:</label>
                      <Select
                        onChange={handleInstallationMethodChange}
                        className="select_container"
                        placeholder="Cable Formation"
                        indicator={<ChevronDown />}
                        value={installationMethod}
                        sx={{
                          height: 50,
                          backgroundColor: "rgb(249,249,249)",
                          fontWeight: 400,
                          fontSize: 14,
                          borderRadius: 3,
                          fontFamily: "Open Sans, sans-serif",
                          [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                              transform: "rotate(-180deg)",
                            },
                          },
                        }}
                      >
                        <Option value="Unarmoured">Unarmoured</Option>
                        <Option value="Armoured">Armoured</Option>
                      </Select>
                    </div>
                  ) : null}
                  {installationMethod &&
                  installationMethod === "Buried directly in the ground" ? (
                    <div>
                      <label htmlFor="spacing">Cable Formation:</label>
                      <Select
                        onChange={handleSpacingMethodChange}
                        className="select_container"
                        placeholder="Cable Formation"
                        indicator={<ChevronDown />}
                        value={spacingMethod}
                        sx={{
                          height: 50,
                          backgroundColor: "rgb(249,249,249)",
                          fontWeight: 400,
                          fontSize: 14,
                          borderRadius: 3,
                          fontFamily: "Open Sans, sans-serif",
                          [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                              transform: "rotate(-180deg)",
                            },
                          },
                        }}
                      >
                        <Option value="Flat spaced">Flat spaced</Option>
                        <Option value="Trefoil">Trefoil</Option>
                      </Select>
                    </div>
                  ) : installationMethod &&
                    installationMethod === "In single-way ducts" ? (
                    <div>
                      <label htmlFor="spacing">Cable Formation:</label>
                      <Select
                        onChange={handleSpacingMethodChange}
                        className="select_container"
                        placeholder="Cable Formation"
                        indicator={<ChevronDown />}
                        value={spacingMethod}
                        sx={{
                          height: 50,
                          backgroundColor: "rgb(249,249,249)",
                          fontWeight: 400,
                          fontSize: 14,
                          borderRadius: 3,
                          fontFamily: "Open Sans, sans-serif",
                          [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                              transform: "rotate(-180deg)",
                            },
                          },
                        }}
                      >
                        <Option value="Trefoil ducts">Trefoil ducts</Option>
                        <Option value="Flat touching ducts">
                          Flat touching ducts
                        </Option>
                      </Select>
                    </div>
                  ) : installationMethod && installationMethod === "In Air" ? (
                    <div>
                      <label htmlFor="spacing">Cable Formation:</label>
                      <Select
                        onChange={handleSpacingMethodChange}
                        className="select_container"
                        placeholder="Cable Formation"
                        indicator={<ChevronDown />}
                        value={spacingMethod}
                        sx={{
                          height: 50,
                          backgroundColor: "rgb(249,249,249)",
                          fontWeight: 400,
                          fontSize: 14,
                          borderRadius: 3,
                          fontFamily: "Open Sans, sans-serif",
                          [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                              transform: "rotate(-180deg)",
                            },
                          },
                        }}
                      >
                        <Option value="Trefoil">Trefoil</Option>
                        <Option value="Flat spaced">Flat spaced</Option>
                        <Option value="Flat touching">Flat touching</Option>
                      </Select>
                    </div>
                  ) : (installationMethod &&
                      installationMethod === "Unarmoured") ||
                    installationMethod === "Armoured" ? (
                    <div>
                      <label htmlFor="spacing">Installation method :</label>
                      <Select
                        onChange={handleSpacingMethodChange}
                         className="select_container"
                        placeholder="Installation method"
                        indicator={<ChevronDown />}
                        value={spacingMethod}
                        sx={{
                          height: 50,
                          backgroundColor: "rgb(249,249,249)",
                          fontWeight: 400,
                          fontSize: 14,
                          borderRadius: 3,
                          fontFamily: "Open Sans, sans-serif",
                          [`& .${selectClasses.indicator}`]: {
                            transition: "0.2s",
                            [`&.${selectClasses.expanded}`]: {
                              transform: "rotate(-180deg)",
                            },
                          },
                        }}
                      >
                        <Option value="Buried direct in ground">
                          Buried direct in ground
                        </Option>
                        <Option value="In a buried duct">
                          In a buried duct
                        </Option>
                        <Option value="In air">In air</Option>
                      </Select>
                    </div>
                  ) : null}
                  <div>
                    <label htmlFor="spacing">Conductor size:</label>
                    <Select
                      onChange={handleConductorSizeChange}
                      className="select_container"
                      placeholder="Conductor size"
                      indicator={<ChevronDown />}
                      value={conductorSize}
                      sx={{
                        height: 50,
                        backgroundColor: "rgb(249,249,249)",
                        fontWeight: 400,
                        fontSize: 14,
                        borderRadius: 3,
                        fontFamily: "Open Sans, sans-serif",
                        [`& .${selectClasses.indicator}`]: {
                          transition: "0.2s",
                          [`&.${selectClasses.expanded}`]: {
                            transform: "rotate(-180deg)",
                          },
                        },
                      }}
                    >
                      {conductorSizes?.map((size) => (
                        <Option key={size} value={size}>
                          {size}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                {mvCableValue && (
                  <h1 className="result-text"> Ic = &nbsp; {mvCableValue} A</h1>
                )}
              </div>
            )}
            {step === 2 && (
              <>
                {coreType &&
                coreType === "B.2" &&
                installationMethod === "In Air" ? (
                  <div className="step-wrap">
                    <AmbientTemperature
                      ambientTemperature={ambientTemperature}
                      setAmbientTemperature={setAmbientTemperature}
                      ambientTemperatureResult={ambientTemperatureResult}
                      setAmbientTemperatureResult={setAmbientTemperatureResult}
                    />
                  </div>
                ) : coreType &&
                  coreType === "B.6" &&
                  spacingMethod === "In air" ? (
                  <div className="step-wrap">
                    <AmbientTemperature
                      ambientTemperature={ambientTemperature}
                      setAmbientTemperature={setAmbientTemperature}
                      ambientTemperatureResult={ambientTemperatureResult}
                      setAmbientTemperatureResult={setAmbientTemperatureResult}
                    />
                  </div>
                ) : null}
              </>
            )}

            {step === 2 &&
              coreType &&
              coreType === "B.2" &&
              installationMethod !== "In Air" && (
                <div className="step-wrap">
                  <AmbientTemperature2
                    ambientTemperature={ambientTemperature}
                    setAmbientTemperature={setAmbientTemperature}
                    ambientTemperatureResult={ambientTemperatureResult}
                    setAmbientTemperatureResult={setAmbientTemperatureResult}
                  />
                </div>
              )}
            {step === 2 && coreType === "B.6" && spacingMethod !== "In air" && (
              <div className="step-wrap">
                <>
                  <AmbientTemperature2
                    ambientTemperature={ambientTemperature}
                    setAmbientTemperature={setAmbientTemperature}
                    ambientTemperatureResult={ambientTemperatureResult}
                    setAmbientTemperatureResult={setAmbientTemperatureResult}
                  />
                </>
              </div>
            )}
            {step === 3 && (
              <>
                {coreType &&
                coreType === "B.2" &&
                installationMethod === "In Air" ? (
                  <div className="step-wrap">
                    <SingleCoreReductionTable
                      spacingMethod={spacingMethod}
                      cableMethod={cableMethod}
                      setCableMethod={setCableMethod}
                      cableInstallationType={cableInstallationType}
                      setCableInstallationType={setCableInstallationType}
                      traysLadders={traysLadders}
                      setTraysLadders={setTraysLadders}
                      circuits={circuits}
                      setCircuits={setCircuits}
                      cableResult={cableResult}
                      setCableResult={setCableResult}
                    />
                  </div>
                ) : coreType &&
                  coreType === "B.6" &&
                  spacingMethod === "In air" ? (
                  <div className="step-wrap">
                    <MultiCoreReductionTable
                      spacingMethod={spacingMethod}
                      cableMethod={cableMethod}
                      setCableMethod={setCableMethod}
                      cableInstallationType={cableInstallationType}
                      setCableInstallationType={setCableInstallationType}
                      traysLadders={traysLadders}
                      setTraysLadders={setTraysLadders}
                      circuits={circuits}
                      setCircuits={setCircuits}
                      cableResult={cableResult}
                      setCableResult={setCableResult}
                    />
                  </div>
                ) : null}
              </>
            )}
            {step === 3 && coreType && coreType === "B.2" && (
              <div className="step-wrap">
                {installationMethod === "Buried directly in the ground" && (
                  <B19
                    spacing={spacing}
                    setSpacing={setSpacing}
                    availableGroups={availableGroups}
                    setAvailableGroups={setAvailableGroups}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    CFFResult={CFFResult}
                    setCFFResult={setCFFResult}
                  />
                )}
                {installationMethod === "In single-way ducts" && (
                  <B21
                    spacing={spacing}
                    setSpacing={setSpacing}
                    availableGroups={availableGroups}
                    setAvailableGroups={setAvailableGroups}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    CFFResult={CFFResult}
                    setCFFResult={setCFFResult}
                  />
                )}
              </div>
            )}
            {step === 3 && coreType && coreType === "B.6" && (
              <div className="step-wrap">
                {spacingMethod === "Buried direct in ground" && (
                  <B18
                    spacing={spacing}
                    setSpacing={setSpacing}
                    availableGroups={availableGroups}
                    setAvailableGroups={setAvailableGroups}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    CFFResult={CFFResult}
                    setCFFResult={setCFFResult}
                  />
                )}
                {spacingMethod === "In a buried duct" && (
                  <B20
                    spacing={spacing}
                    setSpacing={setSpacing}
                    availableGroups={availableGroups}
                    setAvailableGroups={setAvailableGroups}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    CFFResult={CFFResult}
                    setCFFResult={setCFFResult}
                  />
                )}
              </div>
            )}
            {step === 4 && coreType && coreType === "B.2" && (
              <div className="step-wrap">
                {installationMethod === "Buried directly in the ground" && (
                  <B14
                    cableCount={cableCount}
                    setCableCount={setCableCount}
                    resistivitiesspacing={resistivitiesspacing}
                    setresistivitiesSpacing={setresistivitiesSpacing}
                    factor={factor}
                    setFactor={setFactor}
                    conductorSize={conductorSize}
                  />
                )}
                {installationMethod === "In single-way ducts" && (
                  <B15
                    cableCount={cableCount}
                    setCableCount={setCableCount}
                    resistivitiesspacing={resistivitiesspacing}
                    setresistivitiesSpacing={setresistivitiesSpacing}
                    factor={factor}
                    setFactor={setFactor}
                    conductorSize={conductorSize}
                  />
                )}
              </div>
            )}
            {step === 4 && coreType && coreType === "B.6" && (
              <div className="step-wrap">
                {spacingMethod === "Buried direct in ground" && (
                  <B16
                    cableCount={cableCount}
                    setCableCount={setCableCount}
                    resistivitiesspacing={resistivitiesspacing}
                    setresistivitiesSpacing={setresistivitiesSpacing}
                    factor={factor}
                    setFactor={setFactor}
                    conductorSize={conductorSize}
                  />
                )}
                {spacingMethod === "In a buried duct" && (
                  <B17
                    cableCount={cableCount}
                    setCableCount={setCableCount}
                    resistivitiesspacing={resistivitiesspacing}
                    setresistivitiesSpacing={setresistivitiesSpacing}
                    factor={factor}
                    setFactor={setFactor}
                    conductorSize={conductorSize}
                  />
                )}
              </div>
            )}
            {step === 5 && coreType && coreType === "B.2" && (
              <div className="step-wrap">
                {installationMethod === "Buried directly in the ground" && (
                  <CorrectionFactorBuriedCables
                    selectedCore={coreType}
                    selectedDepth={selectedDepth}
                    setSelectedDepth={setSelectedDepth}
                    selectedConductorSize={selectedConductorSize}
                    setSelectedConductorSize={setSelectedConductorSize}
                    setCorrectionFactor={setCorrectionFactor}
                    correctionFactor={correctionFactor}
                    conductorSize={conductorSize}
                  />
                )}
                {installationMethod === "In single-way ducts" && (
                  <CorrectionFactorsInDucts
                    selectedCore={coreType}
                    selectedDepth={selectedDepth}
                    setSelectedDepth={setSelectedDepth}
                    selectedConductorSize={selectedConductorSize}
                    setSelectedConductorSize={setSelectedConductorSize}
                    setCorrectionFactor={setCorrectionFactor}
                    correctionFactor={correctionFactor}
                    conductorSize={conductorSize}
                  />
                )}
              </div>
            )}
            {step === 5 && coreType && coreType === "B.6" && (
              <div className="step-wrap">
                {spacingMethod === "Buried direct in ground" && (
                  <CorrectionFactorBuriedCables
                    selectedCore={coreType}
                    selectedDepth={selectedDepth}
                    setSelectedDepth={setSelectedDepth}
                    selectedConductorSize={selectedConductorSize}
                    setSelectedConductorSize={setSelectedConductorSize}
                    setCorrectionFactor={setCorrectionFactor}
                    correctionFactor={correctionFactor}
                    conductorSize={conductorSize}
                  />
                )}
                {spacingMethod === "In a buried duct" && (
                  <CorrectionFactorsInDucts
                    selectedCore={coreType}
                    selectedDepth={selectedDepth}
                    setSelectedDepth={setSelectedDepth}
                    selectedConductorSize={selectedConductorSize}
                    setSelectedConductorSize={setSelectedConductorSize}
                    setCorrectionFactor={setCorrectionFactor}
                    correctionFactor={correctionFactor}
                    conductorSize={conductorSize}
                  />
                )}
              </div>
            )}
            {step === 6 ? (
              installationMethod !== "In Air" && spacingMethod !== "In air" ? (
                <div className="table-container">
                  <h3>Report result:</h3>
                  <div className="pdf" id="pdfReport" ref={pdfReportRef}>
                    <ul>
                      <li>
                        <p>Installation Method:</p>
                        <p>
                          {installationMethod} / {spacingMethod}
                        </p>
                      </li>
                      <li>
                        <p>Conductors/Cores:</p>
                        <p>
                          {coreType === "B.2"
                            ? "Single-Core Cables"
                            : "Three-Core Cables"}
                        </p>
                      </li>
                      <li>
                        <p>Conductor Size:</p>
                        <p>{conductorSize} mm²</p>
                      </li>
                      <li>
                        <p>Conductor Type:</p>
                        <p>{conductorType}</p>
                      </li>
                      <li>
                        <p>Insulation Type:</p>
                        <p>{insulationType}</p>
                      </li>
                      <li className="equations">
                        <h5>Iz = (Ic * k1 * k2 * k3 * k4) / n</h5>
                        <h5>Now:</h5>
                      </li>
                      <li>
                        <p>k1: Temperature correction factor</p>
                        <p>
                          k1 = {ambientTemperatureResult} @{ambientTemperature}{" "}
                          °C Ground temperature
                        </p>
                      </li>
                      <li>
                        <p>k2: Grouping correction factor</p>
                        <p>k2 = {CFFResult}</p>
                      </li>
                      <li>
                        <p>k3: Soil thermal resistivity correction factor</p>
                        <p>
                          k3 = {factor} @{resistivitiesspacing} [K·m/W]
                        </p>
                      </li>
                      <li>
                        <p>k4: Depths of laying correction factor</p>
                        <p>
                          k4 = {correctionFactor} @{selectedDepth} m
                        </p>
                      </li>
                      <li>
                        <p>n: Cable runs</p>
                        <p>n = {cableRuns}</p>
                      </li>
                      <li>
                        <p>Iz: Corrected current</p>
                        <p>Iz = {Iz} A</p>
                      </li>
                      <li>
                        <p>Ic: Current carrying capacity of the cable</p>
                        <p>Ic = {mvCableValue} A</p>
                      </li>
                      <li>
                        <p>Ib: Design current</p>
                        <p>Ib = {inputFactor} A</p>
                      </li>
                    </ul>
                    <div className="result-note">
                      <p>Iz Should be greater than or equal to Ib (Iz ≥ Ib)</p>
                      <div
                        className={`result ${
                          Iz >= inputFactor ? "approved" : "not-approved"
                        }`}
                      >
                        {Iz >= inputFactor ? (
                          <h6>
                            {Iz?.toFixed(1)} (Iz) ≥ {inputFactor} (Ib)
                          </h6>
                        ) : (
                          <h6>
                            {Iz?.toFixed(1)} (Iz) ≤ {inputFactor} (Ib)
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            ) : step === 4 ? (
              (coreType === "B.2" && installationMethod === "In Air") ||
              (coreType === "B.6" && spacingMethod === "In air") ? (
                <div className="table-container">
                  <h3>Report result:</h3>
                  <div className="pdf" id="pdfReport" ref={pdfReportRef}>
                    <ul>
                      <li>
                        <p>Installation Method:</p>
                        <p>
                          {installationMethod} / {spacingMethod}
                        </p>
                      </li>
                      <li>
                        <p>Conductors/Cores:</p>
                        <p>
                          {coreType === "B.2"
                            ? "Single-Core Cables"
                            : "Three-Core Cables"}
                        </p>
                      </li>
                      <li>
                        <p>Conductor Size:</p>
                        <p>{conductorSize} mm²</p>
                      </li>
                      <li>
                        <p>Conductor Type:</p>
                        <p>{conductorType}</p>
                      </li>
                      <li>
                        <p>Insulation Type:</p>
                        <p>{insulationType}</p>
                      </li>
                      <li className="equations">
                        <h5>Iz = (Ic * k1 * k2) / n</h5>
                        <h5>Now:</h5>
                      </li>
                      <li>
                        <p>k1: Temperature correction factor</p>
                        <p>
                          k1 = {ambientTemperatureResult} @{ambientTemperature}{" "}
                          °C Ground temperature
                        </p>
                      </li>
                      <li>
                        <p>k2: Grouping correction factor</p>
                        <p>k2 = {cableResult}</p>
                      </li>
                      <li>
                        <p>n: Cable runs</p>
                        <p>n = {cableRuns}</p>
                      </li>
                      <li>
                        <p>Iz: Corrected current</p>
                        <p>Iz = {IzAir} A</p>
                      </li>
                      <li>
                        <p>Ic: Current carrying capacity of the cable</p>
                        <p>Ic = {mvCableValue} A</p>
                      </li>
                      <li>
                        <p>Ib: Design current</p>
                        <p>Ib = {inputFactor} A</p>
                      </li>
                    </ul>
                    <div className="result-note">
                      <p>Iz Should be greater than or equal to Ib (Iz ≥ Ib)</p>
                      <div
                        className={`result ${
                          IzAir >= inputFactor ? "approved" : "not-approved"
                        }`}
                      >
                        {IzAir >= inputFactor ? (
                          <h6>
                            {IzAir?.toFixed(1)} (Iz) ≥ {inputFactor} (Ib)
                          </h6>
                        ) : (
                          <h6>
                            {IzAir?.toFixed(1)} (Iz) ≤ {inputFactor} (Ib)
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            ) : null}

            <br></br>
            <div className="btn-container">
              <>
                {/* Case: Not "In Air" */}
                {(coreType === "B.2" && installationMethod !== "In Air") ||
                (coreType === "B.6" && spacingMethod !== "In air") ? (
                  <>
                    {step > 1 && step <= 6 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="button-wrapper prev"
                      >
                        Prev
                      </button>
                    )}
                    {step === 5 ? (
                      <button
                        onClick={() => {
                          setStep(step + 1);
                          setCategoryData({
                            coreType,
                            conductorType,
                            insulationType,
                            installationMethod,
                            spacingMethod,
                            conductorSize,
                            mvCableValue,
                            inputFactor: Number(inputFactor),
                            cableRuns: Number(cableRuns),
                            ambientTemperature,
                            ambientTemperatureResult,

                            // b19 b21 b18 b20 step3
                            spacing,
                            selectedGroup,
                            CFFResult,
                            availableGroups: availableGroups,
                            // b14 b15  b16 b17 step4
                            cableCount,
                            resistivitiesspacing,
                            factor,

                            // CorrectionFactorBuriedCables CorrectionFactorBuriedCables step5
                            selectedDepth,
                            selectedConductorSize,
                            correctionFactor,

                            // single multi cables
                            cableMethod,
                            cableInstallationType,
                            traysLadders,
                            circuits,
                            cableResult,
                          });
                        }}
                        className="button-wrapper next"
                        disabled={!correctionFactor}
                      >
                        See result
                      </button>
                    ) : step <= 5 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="button-wrapper next"
                        disabled={
                          (step === 1 && !mvCableValue) ||
                          (step === 2 && !ambientTemperatureResult) ||
                          (step === 3 && !CFFResult) ||
                          (step === 4 && !factor)
                        }
                      >
                        Next
                      </button>
                    ) : step === 6 ? (
                      <button
                        onClick={handleUpdateCategory}
                        className="button-wrapper"
                      >
                        Save
                      </button>
                    ) : null}
                  </>
                ) : (
                  <>
                    {step > 1 && step <= 4 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="button-wrapper prev"
                      >
                        Prev
                      </button>
                    )}
                    {step === 3 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="button-wrapper next"
                        disabled={!cableResult}
                      >
                        See result
                      </button>
                    ) : step <= 3 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="button-wrapper next"
                        disabled={
                          (step === 1 && !mvCableValue) ||
                          (step === 2 && !ambientTemperatureResult) ||
                          (step === 3 && !cableResult)
                        }
                      >
                        Next
                      </button>
                    ) : step === 4 ? (
                      <button
                        onClick={handleUpdateCategory}
                        className="button-wrapper"
                      >
                        Save
                      </button>
                    ) : null}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      <DownloadPdf
        mvCategoryData={categoryData}
        ref={pdfDownloaderRef}
        pdfReportRef={pdfReportRef}
      />
    </div>
  );
};

export default MvCable;
