import React, {  useEffect } from "react";
import Select from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { depthDataBuriedCables } from "./MvData";

const CorrectionFactorBuriedCables = ({
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
      setCorrectionFactor();
      return;
    }
    if (conductorSize <= 185) {
      setSelectedConductorSize("lessOrEqual185");
    } else {
      setSelectedConductorSize("greaterThan185");
    }
    const factor =
      selectedCore === "B.2" && selectedConductorSize
        ? depthDataBuriedCables[selectedDepth]?.single[selectedConductorSize]
        : depthDataBuriedCables[selectedDepth]?.three;
    setCorrectionFactor(factor || null);
  }, [selectedDepth, selectedConductorSize, selectedCore]);

  return (
    <div>
      <h3>Correction Factor (k4)</h3>
      <label htmlFor="spacing" className="field-label">
        Depth of Laying (m) :
      </label>

      <Select
        onChange={(e, newValue) => handleDepthChange(e, newValue)}
        placeholder=" Depth of Laying (m)"
        className="field-select"
        indicator={<ChevronDown />}
        value={selectedDepth}
        sx={{
          width: 350,
          height: 45,
          backgroundColor: "rgb(249,249,249)",
          fontWeight: 400,
          fontSize: 14,
          borderRadius: 3,
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        <Option value="">Select Depth</Option>
        {Object.keys(depthDataBuriedCables).map((depth) => (
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

export default CorrectionFactorBuriedCables;
