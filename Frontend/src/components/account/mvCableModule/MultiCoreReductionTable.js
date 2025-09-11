import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { MethodOfInstallation } from "./MvData";
const MultiCoreReductionTable = ({
  spacingMethod,
  cableMethod,
  setCableMethod,
  cableInstallationType,
  setCableInstallationType,
  traysLadders,
  setTraysLadders,
  circuits,
  setCircuits,
  cableResult,
  setCableResult,
}) => {
  useEffect(() => {
    if (cableMethod && cableInstallationType && traysLadders && circuits) {
      const installationMethod = MethodOfInstallation[cableMethod];
      if (installationMethod) {
        const installationType = installationMethod[cableInstallationType];
        if (installationType) {
          const trayCount = installationType[traysLadders];
          if (trayCount) {
            const selectedResult = trayCount[circuits] ?? "No value available";
            setCableResult(selectedResult);
          } else {
            setCableResult("No value available");
          }
        } else {
          setCableResult("No value available");
        }
      } else {
        setCableResult("No value available");
      }
    }
  }, [
    cableMethod,
    cableInstallationType,
    traysLadders,
    circuits,
    spacingMethod,
  ]);

  return (
    <div className="MultiCable-wrapper">
      <h3>Grouping Factor</h3>

      <label htmlFor="spacing" className="field-label">
        Method of Installation :
      </label>
      <Select
        onChange={(e, value) => {
          setCircuits();
          setTraysLadders();
          setCableMethod(value);
        }}
        className="field-select"
        placeholder="Method of Installation"
        indicator={<ChevronDown />}
        value={cableMethod}
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
        {Object.keys(MethodOfInstallation).map((methodOption) => (
          <Option key={methodOption} value={methodOption}>
            {methodOption}
          </Option>
        ))}
      </Select>
      <label htmlFor="spacing" className="field-label" style={{ marginTop: "1rem" }}>
        Cable spacing :
      </label>
      <Select
        onChange={(e, value) => setCableInstallationType(value)}
        className="field-select"
        placeholder="Cable spacing"
        indicator={<ChevronDown />}
        value={cableInstallationType}
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
        {cableMethod &&
          Object.keys(MethodOfInstallation[cableMethod]).map((typeOption) => (
            <Option key={typeOption} value={typeOption}>
              {typeOption}
            </Option>
          ))}
      </Select>
      <label htmlFor="spacing" className="field-label" style={{ marginTop: "1rem" }}>
        Number of trays or ladders :
      </label>
      <Select
        onChange={(e, value) => setTraysLadders(value)}
        className="field-select"
        placeholder="Number of trays or ladders"
        indicator={<ChevronDown />}
        value={traysLadders}
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
        {cableMethod &&
          cableInstallationType &&
          Object.keys(
            MethodOfInstallation[cableMethod][cableInstallationType]
          ).map((trayOption) => (
            <Option key={trayOption} value={trayOption}>
              {trayOption}
            </Option>
          ))}
      </Select>
      <label htmlFor="spacing" className="field-label" style={{ marginTop: "1rem" }}>
        Number of cables per trays or ladders :
      </label>
      <Select
        onChange={(e, value) => setCircuits(value)}
        className="field-select"
        placeholder="Number of cables per trays or ladders"
        indicator={<ChevronDown />}
        value={circuits}
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
        {cableMethod &&
          cableInstallationType &&
          traysLadders &&
          Object.keys(
            MethodOfInstallation[cableMethod][cableInstallationType][
              traysLadders
            ]
          ).map((cableOption) => (
            <Option key={cableOption} value={cableOption}>
              {cableOption}
            </Option>
          ))}
      </Select>
      {cableResult !== null && (
        <p className="result-container">
          Grouping Factor Result: {cableResult}
        </p>
      )}
    </div>
  );
};

export default MultiCoreReductionTable;
