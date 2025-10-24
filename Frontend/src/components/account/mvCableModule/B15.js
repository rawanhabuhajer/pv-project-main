import React from "react";

import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { CFForConductorB15 } from "./MvData";

const B15 = ({

  resistivitiesspacing,
  setresistivitiesSpacing,
  factor,
  setFactor,
  conductorSize,
}) => {
  const handleSpacingChange = (event, newValue) => {
    setresistivitiesSpacing(newValue);
    if (conductorSize && CFForConductorB15[conductorSize]) {
      setFactor(CFForConductorB15[conductorSize][newValue]);
    }
  };

  return (
    <>
      <h3>Correction Factor (k3)</h3>

      <label htmlFor="spacing" className="field-label">
        Select Spacing:
      </label>
      <Select
        onChange={handleSpacingChange}
        placeholder="soil thermal resistivity"
        indicator={<ChevronDown />}
        value={String(resistivitiesspacing)}
        className="field-select"
        sx={{
          width: 350,
          height: 45,
          backgroundColor: "rgb(249,249,249)",
          fontWeight: 400,
          fontSize: 14,
          borderRadius: 3,
          fontFamily: "Open Sans, sans-serif",
          mt: 1,
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
        disabled={!conductorSize}
      >
        {conductorSize &&
          Object.keys(CFForConductorB15[conductorSize]).map((space) => (
            <Option key={space} value={space}>
              {space}
            </Option>
          ))}
      </Select>

      {factor !== null && (
        <p className="result-container">Correction Factor: {factor}</p>
      )}
    </>
  );
};

export default B15;
