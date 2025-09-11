import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { CFForSingleCoreLaidDirectInTheGround } from "./MvData";

const B19 = ({
  spacing,
  setSpacing,
  availableGroups,
  setAvailableGroups,
  selectedGroup,
  setSelectedGroup,
  CFFResult,
  setCFFResult,
}) => {
  const handleSpacingChange = (event, newValue) => {
    const selectedSpacing = newValue;
    setSpacing(selectedSpacing);

    const validGroups = Object.keys(
      CFForSingleCoreLaidDirectInTheGround
    ).filter(
      (group) =>
        CFForSingleCoreLaidDirectInTheGround[group][selectedSpacing] !== null
    );

    setAvailableGroups(validGroups);
    setSelectedGroup(null); // reset selected group on spacing change
  };

  const handleGroupChange = (event, newValue) => {
    setSelectedGroup(newValue);
  };

  // Set CFFResult when spacing and group are selected
  useEffect(() => {
    if (spacing && selectedGroup) {
      const result =
        CFForSingleCoreLaidDirectInTheGround[selectedGroup]?.[spacing] || "N/A";
      setCFFResult(result);
    } else {
      setCFFResult(null);
    }
  }, [spacing, selectedGroup]);

  // Populate available groups if spacing is already selected (e.g. on mount)
  useEffect(() => {
    if (spacing && (!availableGroups || availableGroups.length === 0)) {
      const validGroups = Object.keys(
        CFForSingleCoreLaidDirectInTheGround
      ).filter(
        (group) => CFForSingleCoreLaidDirectInTheGround[group][spacing] !== null
      );
      setAvailableGroups(validGroups);
    }
  }, [spacing]);

  // Optionally ensure the selected group always appears in dropdown
  const displayGroups =
    selectedGroup && !availableGroups.includes(selectedGroup)
      ? [selectedGroup, ...availableGroups]
      : availableGroups;

  return (
    <>
      <h3>Correction Factor (k2)</h3>

      <label htmlFor="spacing" className="field-label">
        Cable spacing :
      </label>
      <Select
        value={spacing}
        onChange={handleSpacingChange}
        placeholder="Cable spacing"
        className="field-select"
        indicator={<ChevronDown />}
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
      >
        <Option value="" disabled>
          Select Spacing
        </Option>
        <Option value="Touching">Touching</Option>
        <Option value="200 mm">200 mm</Option>
        <Option value="400 mm">400 mm</Option>
        <Option value="600 mm">600 mm</Option>
        <Option value="800 mm">800 mm</Option>
      </Select>

      <label
        htmlFor="group"
        className="field-label"
        style={{ marginTop: "1rem" }}
      >
        Number of cables in group :
      </label>
      <Select
        placeholder="Number of cables in group"
        className="field-select"
        indicator={<ChevronDown />}
        onChange={handleGroupChange}
        value={String(selectedGroup)}
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
        disabled={!availableGroups || availableGroups.length === 0}
      >
        {displayGroups?.map((group) => (
          <Option key={group} value={group}>
            {group}
          </Option>
        ))}
      </Select>

      {CFFResult && (
        <p className="result-container" style={{ marginTop: "1rem" }}>
          Grouping Factor: {CFFResult}
        </p>
      )}
    </>
  );
};

export default B19;
