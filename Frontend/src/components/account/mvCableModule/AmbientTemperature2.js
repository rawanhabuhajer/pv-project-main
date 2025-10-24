import React, { useEffect } from "react";

import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { ChevronDown } from "lucide-react";

const AmbientTemperature2 = ({
  ambientTemperature,
  setAmbientTemperature,
  ambientTemperatureResult,
  setAmbientTemperatureResult,
}) => {
  const ambientTemperatureOptions = [
    { label: "10", value: 10, ambientTemperatureResult: 1.07 },
    { label: "15", value: 15, ambientTemperatureResult: 1.04 },
    { label: "20", value: 20, ambientTemperatureResult: 1 },
    { label: "25", value: 25, ambientTemperatureResult: 0.96 },
    { label: "30", value: 30, ambientTemperatureResult: 0.93 },
    { label: "35", value: 35, ambientTemperatureResult: 0.89 },
    { label: "40", value: 40, ambientTemperatureResult: 0.85 },
    { label: "45", value: 45, ambientTemperatureResult: 0.8 },
    { label: "50", value: 50, ambientTemperatureResult: 0.76 },
  ];

  useEffect(() => {
    if (ambientTemperature) {
      const selectedOption = ambientTemperatureOptions.find(
        (option) => option.value === ambientTemperature
      );
      setAmbientTemperatureResult(
        selectedOption ? selectedOption.ambientTemperatureResult : null
      );
    }
  }, [ambientTemperature]);

  return (
    <div className="ambientTemperature-wrapper">
      <h3>Correction Factor (k1)</h3>
      <div>
        <label htmlFor="spacing">Ground Temperature [°C] :</label>
        <Select
          onChange={(event, value) => setAmbientTemperature(value)}
          className="field-select"
          placeholder="Ground Temperature [°C]"
          indicator={<ChevronDown />}
          value={ambientTemperature}
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
          {ambientTemperatureOptions.length > 0 ? (
            ambientTemperatureOptions.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))
          ) : (
            <Option value={0}>There is no value</Option>
          )}
        </Select>
      </div>
      {ambientTemperature && (
        <div className="result-container">
          {" "}
          Temperature Factor : {ambientTemperatureResult}
        </div>
      )}
    </div>
  );
};

export default AmbientTemperature2;
