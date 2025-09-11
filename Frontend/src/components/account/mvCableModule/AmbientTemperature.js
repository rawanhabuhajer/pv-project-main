import React, { useEffect } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
//
import Option from "@mui/joy/Option";
import { ChevronDown } from "lucide-react";

const AmbientTemperature = ({
  ambientTemperature,
  setAmbientTemperature,
  ambientTemperatureResult,
  setAmbientTemperatureResult,
}) => {
  const ambientTemperatureOptions = [
    { label: "20", value: 20, ambientTemperatureResult: 1.08 },
    { label: "25", value: 25, ambientTemperatureResult: 1.04 },
    { label: "30", value: 30, ambientTemperatureResult: 1 },
    { label: "35", value: 35, ambientTemperatureResult: 0.96 },
    { label: "40", value: 40, ambientTemperatureResult: 0.91 },
    { label: "45", value: 45, ambientTemperatureResult: 0.87 },
    { label: "50", value: 50, ambientTemperatureResult: 0.82 },
    { label: "55", value: 55, ambientTemperatureResult: 0.76 },
    { label: "60", value: 60, ambientTemperatureResult: 0.71 },
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
      <h3>Ambient temperature [°C]</h3>
      <div>
        <label htmlFor="spacing" className="field-label">Ambient Temperature [°C] :</label>
        <Select
          onChange={(event, value) => setAmbientTemperature(value)}
          className="field-select"
          placeholder="Ambient Temperature [°C]"
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
          Ambient Temperature Factor : {ambientTemperatureResult}
        </div>
      )}
    </div>
  );
};

export default AmbientTemperature;
