import React, { useEffect } from "react";

import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { SingleCoreInstallation } from "./MvData";

const SingleCoreReductionTable = ({
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
    setCableInstallationType(spacingMethod);
    const installationData = SingleCoreInstallation[cableInstallationType];
    const methodData = installationData ? installationData[cableMethod] : null;
    const traysLaddersData = methodData ? methodData[traysLadders] : null;
    const circuitsData = traysLaddersData ? traysLaddersData[circuits] : null;

    if (circuitsData !== undefined) {
      setCableResult(circuitsData);
    } else if (circuits && circuitsData === undefined) {
      setCableResult("Data not available");
    }
  }, [
    cableInstallationType,
    cableMethod,
    traysLadders,
    circuits,
    spacingMethod,
  ]);

  return (
    <div className="singleCable-wrapper">
      <h3>Grouping Factor</h3>

      <label htmlFor="spacing" className="field-label">
        Method of Installation :
      </label>
      <Select
        onChange={(e, newValue) => setCableMethod(newValue)}
        className="field-select"
        placeholder="Method of Installation"
        indicator={<ChevronDown />}
        value={cableMethod}
        disabled={!cableInstallationType}
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
        {cableInstallationType &&
          Object.keys(SingleCoreInstallation[cableInstallationType] || {}).map(
            (Type) => (
              <Option key={Type} value={Type}>
                {Type}
              </Option>
            )
          )}
      </Select>

      <label
        htmlFor="spacing"
        className="field-label"
        style={{ marginTop: "1rem" }}
      >
        Cable spacing :
      </label>
      <Select
        onChange={(e, newValue) => setTraysLadders(newValue)}
        className="field-select"
        placeholder="Cable spacing "
        indicator={<ChevronDown />}
        value={traysLadders}
        disabled={!cableMethod}
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
        {cableMethod &&
          Object.keys(
            SingleCoreInstallation[cableInstallationType]?.[cableMethod] || {}
          ).map((trays) => (
            <Option key={trays} value={trays}>
              {trays}
            </Option>
          ))}
      </Select>

      <label
        htmlFor="spacing"
        className="field-label"
        style={{ marginTop: "1rem" }}
      >
        Number of 3-Phase Circuits :
      </label>
      <Select
        onChange={(e, newValue) => setCircuits(newValue)}
        className="field-select"
        placeholder="Number of 3-Phase Circuits"
        indicator={<ChevronDown />}
        value={circuits}
        disabled={!traysLadders}
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
        {traysLadders &&
          Object.keys(
            SingleCoreInstallation[cableInstallationType]?.[cableMethod]?.[
              traysLadders
            ] || {}
          ).map((circuit) => (
            <Option key={circuit} value={circuit}>
              {circuit}
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

export default SingleCoreReductionTable;
