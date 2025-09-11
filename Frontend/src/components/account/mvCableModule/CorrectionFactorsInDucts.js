import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { depthDataInDuct } from "./MvData";

const CorrectionFactorsInDucts = ({
  selectedCore,
  selectedDepth,
  setSelectedDepth,
  selectedConductorSize,
  setSelectedConductorSize,
  correctionFactor,
  setCorrectionFactor,
  conductorSize,
}) => {
  const handleDepthChange = (e, newValue) => {
    setSelectedDepth(newValue);
    setSelectedConductorSize("");
  };


  useEffect(() => {
    if (!selectedDepth) {
      setCorrectionFactor("");
      return;
    }
    if (conductorSize <= 185) {
      setSelectedConductorSize("lessOrEqual185");
    } else {
      setSelectedConductorSize("greaterThan185");
    }
    const factor =
      selectedCore === "B.2" && selectedConductorSize
        ? depthDataInDuct[selectedDepth]?.single[selectedConductorSize]
        : depthDataInDuct[selectedDepth]?.three;
    setCorrectionFactor(factor || null);
  }, [selectedDepth, selectedConductorSize, selectedCore]);

  return (
    <div>
      <h3>Correction Factor (k4)</h3>

      <label htmlFor="spacing" className="field-label">
        Depth of Laying (m) :
      </label>

      <Select
        onChange={handleDepthChange}
        placeholder=" Depth of Laying (m)"
        indicator={<ChevronDown />}
        className="field-select"
        value={selectedDepth}
        sx={{
          width: 350,
          height: 45,
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
        <Option value="">Select Depth</Option>
        {Object.keys(depthDataInDuct).map((depth) => (
          <Option key={depth} value={depth}>
            {depth} m
          </Option>
        ))}
      </Select>

      {correctionFactor && (
        <p className="result-container">
          Depth of laying Factor : {correctionFactor}
        </p>
      )}
    </div>
  );
};

export default CorrectionFactorsInDucts;
