import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import {
  ChevronRight,
  ChevronLeft,
  Calculator,
  Zap,
  Cable,
  Settings,
} from "lucide-react";
import DownloadBtn from "../assets/images/downloadBtn.svg";
import {
  cableData,
  conductorSizes,
  resistivitiesDirectBuriedSingleCore,
  SingleCoreInstallation,
  depthDataBuriedCables,
  depthDataInDuct,
  CFForConductorB15,
  CFForConductorB16,
  CFForConductorB17,
} from "./MvData";
import AmbientTemperature from "./AmbientTemperature";
import MultiCoreReductionTable from "./MultiCoreReductionTable";
import SingleCoreReductionTable from "./SingleCoreReductionTable";
import AmbientTemperature2 from "./AmbientTemperature2";
import CorrectionFactorsInDucts from "./CorrectionFactorsInDucts";
import CorrectionFactorBuriedCables from "./CorrectionFactorBuriedCables";
import B14 from "./B14";
import B15 from "./B15";
import B16 from "./B16";
import B17 from "./B17";
import B18 from "./B18";
import B19 from "./B19";
import B20 from "./B20";
import B21 from "./B21";
import DownloadPdf from "./DownloadPdf";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  editSingleProjectDataById,
  getSingleProjectDataById,
} from "@/store/actions";
import { parseCookies } from "nookies";
import ResultModal from "./ResultModal";
import InAirResultReportModal from "./InAirResultReportModal";
const MvCable = () => {
  // const { mvCategoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.authentication);
  const router = useRouter();
  const mvCategoryId = router?.query.account[2];
  const dispatch = useDispatch();
  const { MvSingleProjectsData } = useSelector((state) => state.projects);
  const cookies = parseCookies();

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isInAirResultModalOpen, setIsInAirResultModalOpen] = useState(false);
  const [isGetReportData, setIsGetReportData] = useState(false);

  const [coreType, setCoreType] = useState("");
  const [conductorType, setConductorType] = useState("");
  const [insulationType, setInsulationType] = useState("");
  const [installationMethod, setInstallationMethod] = useState("");
  const [spacingMethod, setSpacingMethod] = useState("");
  const [conductorSize, setConductorSize] = useState(16);
  const [mvCableValue, setMvCableValue] = useState();
  const [step, setStep] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [inputFactor, setinputFactor] = useState();
  const [cableRuns, setCableRuns] = useState(1);

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
    setConductorSize(
      MvSingleProjectsData?.category?.details[0]?.conductorSize || 16
    );
    setMvCableValue(MvSingleProjectsData?.category?.details[0]?.mvCableValue);
    setinputFactor(MvSingleProjectsData?.category?.details[0]?.inputFactor);
    setCableRuns(MvSingleProjectsData?.category?.details[0]?.cableRuns || 1);
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
  }, [MvSingleProjectsData, mvCategoryId]);

  useEffect(() => {
    if (tableData?.length > 0) {
      setStep(6);
    }
  }, [tableData]);

  const steps = [
    { id: 1, title: "Basic Parameters", icon: Calculator },
    { id: 2, title: "Cable Specifications", icon: Cable },
    { id: 3, title: "Installation Details", icon: Settings },
    { id: 4, title: "Basic Parameters", icon: Calculator },
    { id: 5, title: "Cable Specifications", icon: Cable },
    { id: 6, title: "Installation Details", icon: Settings },
    // { id: 4, title: "Results", icon: Zap },
  ];

  const stepsGround = [
    { id: 1, title: "Basic Parameters", icon: Calculator },
    { id: 2, title: "Cable Specifications", icon: Cable },
    { id: 3, title: "Installation Details", icon: Settings },
    { id: 4, title: "Results", icon: Zap },
  ];

  // const nextStepInAir = () => {
  //   if (step < 3) {
  //     setStep(step + 1);
  //   } else if (step == 3) {
  //     const Iz =
  //       (mvCableValue * ambientTemperatureResult * cableResult) / cableRuns;

  //     const mvData = {
  //       coreType,
  //       conductorType,
  //       insulationType,
  //       installationMethod,
  //       spacingMethod,
  //       conductorSize,
  //       mvCableValue,
  //       inputFactor: Number(inputFactor),
  //       cableRuns: Number(cableRuns),
  //       ambientTemperature,
  //       ambientTemperatureResult,

  //       // b19 b21 b18 b20 step3
  //       spacing,
  //       selectedGroup,
  //       CFFResult,
  //       availableGroups: availableGroups,
  //       // b14 b15  b16 b17 step4
  //       cableCount,
  //       resistivitiesspacing,
  //       factor,

  //       // CorrectionFactorBuriedCables CorrectionFactorBuriedCables step5
  //       selectedDepth,
  //       selectedConductorSize,
  //       correctionFactor,

  //       // single multi cables
  //       cableMethod,
  //       cableInstallationType,
  //       traysLadders,
  //       circuits,
  //       cableResult,

  //       Iz,
  //     };

  //     dispatch(
  //       editSingleProjectDataById({
  //         cookies,
  //         mvCategoryId: mvCategoryId,
  //         details: mvData,
  //         dispatch,
  //       })
  //     );
  //     setIsInAirResultModalOpen(true);
  //     setStep(1);
  //   }
  // };

  const nextStepInAir = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      handleCalculateAutomaticIzInAir();
    }
  };

  const handleCalculateAutomaticIzInAir = () => {
    if (
      !coreType ||
      !conductorType ||
      !insulationType ||
      !installationMethod ||
      !spacingMethod ||
      !conductorSize ||
      !cableData
    ) {
      return;
    }

    const key = `Table ${coreType} ${conductorType} ${insulationType} ${installationMethod} ${spacingMethod}`;
    const selectedTable = cableData[key];
    if (!selectedTable) return;

    let runs = 1;
    const maxRunsLimit = 10000;
    let found = false;
    let bestIndex = -1;
    let finalIz = 0;

    while (!found && runs <= maxRunsLimit) {
      for (let sizeIdx = 0; sizeIdx < conductorSizes?.length; sizeIdx++) {
        const sizeValue = selectedTable[sizeIdx];
        if (sizeValue === undefined || isNaN(sizeValue)) continue;

        // ✅ Fix: Multiply by runs instead of dividing
        const Iz = sizeValue * ambientTemperatureResult * cableResult * runs;

        if (Iz > Number(inputFactor)) {
          bestIndex = sizeIdx;
          finalIz = Iz;
          found = true;
          break;
        }
      }

      if (!found) {
        runs++;
      }
    }
    if (!found || bestIndex === -1) {
      alert(
        "⚠️ Could not find a valid configuration (up to 10000 cable runs tried)."
      );
      return;
    }

    // ✅ Step 1: Update core output values
    const newConductorSize = conductorSizes[bestIndex];
    const newMvCableValue = selectedTable[bestIndex];
    console.log(runs, bestIndex, newConductorSize);
    setConductorSize(newConductorSize);
    setCableRuns(runs);
    setMvCableValue(newMvCableValue);

    // ✅ Step 2: Build mvData payload
    const mvData = {
      coreType,
      conductorType,
      insulationType,
      installationMethod,
      spacingMethod,
      conductorSize: newConductorSize,
      mvCableValue: newMvCableValue,
      inputFactor: Number(inputFactor),
      cableRuns: Number(runs),
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

      Iz: finalIz.toFixed(2),
    };

    dispatch(
      editSingleProjectDataById({
        cookies,
        mvCategoryId: mvCategoryId,
        details: mvData,
        dispatch,
      })
    );
    setIsInAirResultModalOpen(true);
    setStep(1);
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      handleCalculateAutomaticIz();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleOpenReportModal = () => {
    if (installationMethod !== "In Air" && spacingMethod !== "In air") {
      setIsResultModalOpen(true);
    } else if (
      (coreType === "B.2" && installationMethod === "In Air") ||
      (coreType === "B.6" && spacingMethod === "In air")
    ) {
      setIsInAirResultModalOpen(true);
    }
  };
  const handleCalculateAutomaticIz = () => {
    if (
      !coreType ||
      !conductorType ||
      !insulationType ||
      !installationMethod ||
      !spacingMethod ||
      !conductorSize ||
      !cableData
    ) {
      return;
    }

    const key = `Table ${coreType} ${conductorType} ${insulationType} ${installationMethod} ${spacingMethod}`;
    const selectedTable = cableData[key];
    if (!selectedTable) return;

    let runs = 1;
    const maxRunsLimit = 10000;
    let found = false;
    let bestIndex = -1;
    let finalIz = 0;

    const isB2 = coreType === "B.2";
    const isB6 = coreType === "B.6";

    while (!found && runs <= maxRunsLimit) {
      for (let sizeIdx = 0; sizeIdx < conductorSizes?.length; sizeIdx++) {
        const sizeValue = selectedTable[sizeIdx];
        if (sizeValue === undefined || isNaN(sizeValue)) continue;

        const Iz =
          sizeValue *
          ambientTemperatureResult *
          CFFResult *
          factor *
          correctionFactor *
          runs;

        if (Iz > Number(inputFactor)) {
          bestIndex = sizeIdx;
          finalIz = Iz;
          found = true;
          break;
        }
      }

      if (!found) {
        runs++;
      }
    }

    if (!found || bestIndex === -1) {
      alert(
        "⚠️ Could not find a valid configuration (up to 10000 cable runs tried)."
      );
      return;
    }

    // ✅ Step 1: Update core output values
    const newConductorSize = conductorSizes[bestIndex];
    const newMvCableValue = selectedTable[bestIndex];

    setConductorSize(newConductorSize);
    setCableRuns(runs);
    setMvCableValue(newMvCableValue);

    // ✅ Step 2: Set new selectedConductorSize for depth logic
    const newSelectedConductorSize =
      newConductorSize <= 185 ? "lessOrEqual185" : "greaterThan185";
    setSelectedConductorSize(newSelectedConductorSize);

    // ✅ Step 3: Update correctionFactor (k4) based on depth/core/method
    if (selectedDepth) {
      let newCorrectionFactor = null;

      if (
        (installationMethod === "Buried directly in the ground" && isB2) ||
        (spacingMethod === "Buried direct in ground" && isB6)
      ) {
        newCorrectionFactor = isB2
          ? depthDataBuriedCables[selectedDepth]?.single?.[
              newSelectedConductorSize
            ] || null
          : depthDataInDuct[selectedDepth]?.three || null;
      } else if (
        (installationMethod === "In single-way ducts" && isB2) ||
        (spacingMethod === "In a buried duct" && isB6)
      ) {
        newCorrectionFactor = isB2
          ? depthDataInDuct[selectedDepth]?.single?.[
              newSelectedConductorSize
            ] || null
          : depthDataInDuct[selectedDepth]?.three || null;
      }

      setCorrectionFactor(newCorrectionFactor);
    }

    // ✅ Step 4: Update k3 factor based on spacing + size
    const getNewFactor = (size, spacing) => {
      if (installationMethod === "Buried directly in the ground" && isB2) {
        return resistivitiesDirectBuriedSingleCore?.[size]?.[spacing] ?? null;
      } else if (installationMethod === "In single-way ducts" && isB2) {
        return CFForConductorB15?.[size]?.[spacing] ?? null;
      } else if (
        installationMethod === "Buried directly in the ground" &&
        isB6
      ) {
        return CFForConductorB16?.[size]?.[spacing] ?? null;
      } else if (installationMethod === "In single-way ducts" && isB6) {
        return CFForConductorB17?.[size]?.[spacing] ?? null;
      }
      return null;
    };

    if (resistivitiesspacing) {
      const newFactor = getNewFactor(newConductorSize, resistivitiesspacing);
      if (newFactor !== null) setFactor(newFactor);
    }

    const mvData = {
      coreType,
      conductorType,
      insulationType,
      installationMethod,
      spacingMethod,
      conductorSize: newConductorSize,
      mvCableValue: newMvCableValue,
      inputFactor: Number(inputFactor),
      cableRuns: Number(runs),
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
      Iz: finalIz.toFixed(2),
    };

    dispatch(
      editSingleProjectDataById({
        cookies,
        mvCategoryId: mvCategoryId,
        details: mvData,
        dispatch,
      })
    );
    setIsResultModalOpen(true);
    setStep(1);
  };

  return (
    <div className={styles["mvCable-wrapper"]}>
      <div className="hero-actions">
        <h1>{mvCategoryData?.name} </h1>
      </div>
      <div className="background-effects">
        <div className="background-pattern"></div>
        <div className="blur-circle blur-circle-1"></div>
        <div className="blur-circle blur-circle-2"></div>
      </div>
      <div className="categories-container">
        <div className="content">
          <div className="progress-steps">
            {installationMethod === "In Air" || spacingMethod === "In air"
              ? stepsGround?.map((stepAir, index) => (
                  <React.Fragment key={stepAir?.id}>
                    <div
                      className={`progress-step ${
                        step >= stepAir?.id ? "active" : ""
                      }`}
                    >
                      <div
                        className={`step-circle ${
                          step >= stepAir?.id ? "active" : ""
                        }`}
                      >
                        <stepAir.icon size={20} />
                      </div>
                      <span className="step-title">{stepAir?.title}</span>
                    </div>
                    {index < stepsGround?.length - 1 && (
                      <div
                        className={`step-connector ${
                          step > stepAir?.id ? "active" : ""
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))
              : steps?.map((singleStep, index) => (
                  <React.Fragment key={singleStep?.id}>
                    <div
                      className={`progress-step ${
                        step >= singleStep?.id ? "active" : ""
                      }`}
                    >
                      <div
                        className={`step-circle ${
                          step >= singleStep?.id ? "active" : ""
                        }`}
                      >
                        <singleStep.icon size={20} />
                      </div>
                      <span className="step-title">{singleStep?.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`step-connector ${
                          step > singleStep?.id ? "active" : ""
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
          </div>
          <div className="form-card">
            <div className="card-content">
              {step === 1 && (
                <div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="form-step"
                >
                  <div className="step-header">
                    <div></div>
                    <div>
                      <h2>Cable Current Carrying Capacity</h2>
                      <p>Let's start with the basic parameters</p>
                    </div>
                    <button onClick={handleOpenReportModal}>
                      <p> Review Report</p> <DownloadBtn />
                    </button>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label className="field-label" htmlFor="spacing">
                        Design Current (Ib) :
                      </label>
                      <input
                        type="number"
                        className=" field-input"
                        placeholder="Design Current (Ib)"
                        value={inputFactor}
                        onChange={(e) => {
                          setinputFactor(e.target.value);
                        }}
                      />
                    </div>
                    {/* <div className="form-field">
                      <label htmlFor="spacing" className="field-label">
                        Cable Runs (n) :
                      </label>
                      <input
                        type="number"
                        className="field-input"
                        placeholder="Cable Runs (n)"
                        value={cableRuns}
                        onChange={(e) => {
                          setCableRuns(e.target.value);
                        }}
                      />
                    </div> */}
                    <div className="form-field">
                      <label className="field-label" htmlFor="spacing">
                        Conductors/Cores :
                      </label>
                      <Select
                        onChange={handleCoreTypeChange}
                        className="field-select"
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
                    <div className="form-field">
                      {" "}
                      <label className="field-label" htmlFor="spacing">
                        Conductor Type :
                      </label>
                      <Select
                        onChange={handleConductorTypeChange}
                        className="field-select"
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
                    <div className="form-field">
                      <label className="field-label" htmlFor="spacing">
                        Insulation Type :
                      </label>
                      <Select
                        onChange={handleInsulationTypeChange}
                        className="field-select"
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
                      <div className="form-field">
                        <label className="field-label" htmlFor="spacing">
                          Installation Method:
                        </label>
                        <Select
                          onChange={handleInstallationMethodChange}
                          className="field-select"
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
                      <div className="form-field">
                        <label className="field-label" htmlFor="spacing">
                          Cable Formation:
                        </label>
                        <Select
                          onChange={handleInstallationMethodChange}
                          className="field-select"
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
                      <div className="form-field">
                        <label className="field-label" htmlFor="spacing">
                          Cable Formation:
                        </label>
                        <Select
                          onChange={handleSpacingMethodChange}
                          className="field-select"
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
                      <div className="form-field">
                        <label className="field-label" htmlFor="spacing">
                          Cable Formation:
                        </label>
                        <Select
                          onChange={handleSpacingMethodChange}
                          className="field-select"
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
                    ) : installationMethod &&
                      installationMethod === "In Air" ? (
                      <div className="form-field">
                        <label className="field-label" htmlFor="spacing">
                          Cable Formation:
                        </label>
                        <Select
                          onChange={handleSpacingMethodChange}
                          className="field-select"
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
                      <div className="form-field">
                        <label className="field-label" htmlFor="spacing">
                          Installation method :
                        </label>
                        <Select
                          onChange={handleSpacingMethodChange}
                          className="field-select"
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

                    {/* <div className="form-field">
                      {" "}
                      <label className="field-label" htmlFor="spacing">
                        Conductor size:
                      </label>
                      <Select
                        onChange={handleConductorSizeChange}
                        className="field-select"
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
                    </div> */}
                  </div>
                  {mvCableValue && (
                    <h1 className="result-text">
                      {" "}
                      Ic = &nbsp; {mvCableValue} A
                    </h1>
                  )}
                </div>
              )}

              {step === 2 && (
                <div key="step2" className="form-step">
                  <>
                    {coreType &&
                    coreType === "B.2" &&
                    installationMethod === "In Air" ? (
                      <div className="step-wrap">
                        <AmbientTemperature
                          ambientTemperature={ambientTemperature}
                          setAmbientTemperature={setAmbientTemperature}
                          ambientTemperatureResult={ambientTemperatureResult}
                          setAmbientTemperatureResult={
                            setAmbientTemperatureResult
                          }
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
                          setAmbientTemperatureResult={
                            setAmbientTemperatureResult
                          }
                        />
                      </div>
                    ) : null}
                  </>
                  <div className="form-grid"></div>
                </div>
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
              {step === 2 &&
                coreType === "B.6" &&
                spacingMethod !== "In air" && (
                  <div className="step-wrap">
                    <>
                      <AmbientTemperature2
                        ambientTemperature={ambientTemperature}
                        setAmbientTemperature={setAmbientTemperature}
                        ambientTemperatureResult={ambientTemperatureResult}
                        setAmbientTemperatureResult={
                          setAmbientTemperatureResult
                        }
                      />
                    </>
                  </div>
                )}

              {step === 3 && (
                <div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="form-step"
                >
                  <div className="form-grid">
                    <div className="form-field">
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
                              setCableInstallationType={
                                setCableInstallationType
                              }
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
                              setCableInstallationType={
                                setCableInstallationType
                              }
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
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && coreType && coreType === "B.2" && (
                <>
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
                </>
              )}
              {step === 3 && coreType && coreType === "B.6" && (
                <>
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
                </>
              )}

              {step === 4 && coreType && coreType === "B.2" && (
                <div key="step4">
                  <>
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
                  </>
                </div>
              )}
              {step === 4 && coreType && coreType === "B.6" && (
                <>
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
                </>
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

              {step < 6 && (
                <div className="navigation-buttons">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    // variant="ghost"
                    className="nav-btn prev-btn"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="step-indicator">Step {step} of 3</div>
                  {installationMethod !== "In Air" &&
                  spacingMethod !== "In air" ? (
                    <button
                      onClick={nextStep}
                      className="nav-btn next-btn"
                      disabled={
                        (step === 1 && !mvCableValue) ||
                        (step === 2 && !ambientTemperatureResult) ||
                        (step === 3 && !CFFResult) ||
                        (step === 4 && !factor)
                      }
                    >
                      {step === 5 ? "Calculate" : "Next"}
                      <ChevronRight size={16} />
                    </button>
                  ) : (coreType === "B.2" && installationMethod === "In Air") ||
                    (coreType === "B.6" && spacingMethod === "In air") ? (
                    <button
                      onClick={nextStepInAir}
                      className="nav-btn next-btn"
                      disabled={
                        (step === 1 && !mvCableValue) ||
                        (step === 2 && !ambientTemperatureResult) ||
                        (step === 3 && !cableResult)
                      }
                    >
                      {step === 3 ? "Calculate" : "Next"}
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ResultModal
        isResultModalOpen={isResultModalOpen}
        setIsResultModalOpen={setIsResultModalOpen}
        isGetReportData={isGetReportData}
        handleCalculateAutomaticIz={handleCalculateAutomaticIz}
      />
      <InAirResultReportModal
        isInAirResultModalOpen={isInAirResultModalOpen}
        setIsInAirResultModalOpen={setIsInAirResultModalOpen}
        isGetReportData={isGetReportData}
        handleCalculateAutomaticIz={handleCalculateAutomaticIz}
      />
    </div>
  );
};

export default MvCable;
