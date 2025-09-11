import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { resistivitiesDirectBuriedSingleCore } from "./MvData";
import { ChevronDown } from "lucide-react";

const B14 = ({
  cableCount,
  setCableCount,
  resistivitiesspacing,
  setresistivitiesSpacing,
  factor,
  setFactor,
  conductorSize,
}) => {

  const handleSpacingChange = (event, newValue) => {
    setresistivitiesSpacing(newValue);
    if (conductorSize && resistivitiesDirectBuriedSingleCore[conductorSize]) {
      setFactor(resistivitiesDirectBuriedSingleCore[conductorSize][newValue]);
    }
  };

  return (
    <div>
      <h3>Correction Factor (k3)</h3>

      <label htmlFor="spacing" className="field-label">
        Soil thermal resistivity [K.m/W] :
      </label>
      <Select
        onChange={handleSpacingChange}
        placeholder="Soil thermal resistivity [K.m/W]"
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
          Object.keys(resistivitiesDirectBuriedSingleCore[conductorSize]).map(
            (space) => (
              <Option key={space} value={space}>
                {space}
              </Option>
            )
          )}
      </Select>

      {factor !== null && (
        <p className="result-container">
          Soil thermal resistivity Factor: {factor || 0}
        </p>
      )}
    </div>
  );
};

export default B14;
