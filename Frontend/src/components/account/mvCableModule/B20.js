import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronDown } from "lucide-react";
import Option from "@mui/joy/Option";
import { CFForThreeCoreInSingleWayDucts } from "./MvData";

const B20 = ({
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

    const validGroups = Object.keys(CFForThreeCoreInSingleWayDucts).filter(
      (group) => CFForThreeCoreInSingleWayDucts[group][selectedSpacing] !== null
    );
    setAvailableGroups(validGroups);
    setSelectedGroup(null); // Reset group on spacing change
  };

  const handleGroupChange = (event, newValue) => {
    setSelectedGroup(newValue);
  };

  // Update result whenever spacing and group are selected
  useEffect(() => {
    if (spacing && selectedGroup) {
      const result =
        CFForThreeCoreInSingleWayDucts[selectedGroup]?.[spacing] || "N/A";
      setCFFResult(result);
    } else {
      setCFFResult(null);
    }
  }, [spacing, selectedGroup]);

  // Auto-fetch available groups if spacing was already selected
  useEffect(() => {
    if (spacing && (!availableGroups || availableGroups.length === 0)) {
      const validGroups = Object.keys(CFForThreeCoreInSingleWayDucts).filter(
        (group) => CFForThreeCoreInSingleWayDucts[group][spacing] !== null
      );
      setAvailableGroups(validGroups);
    }
  }, [spacing]);

  // Ensure selected group is visible if not in filtered list
  const displayGroups =
    selectedGroup && !availableGroups.includes(selectedGroup)
      ? [selectedGroup, ...availableGroups]
      : availableGroups;

  return (
    <>
      <h3>Correction Factor (k2)</h3>

      <label htmlFor="spacing" className="field-label">
        Cable Spacing :
      </label>
      <Select
        value={spacing}
        onChange={handleSpacingChange}
        placeholder="Cable Spacing"
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
        Select Number of Cables in Group:
      </label>
      <Select
        placeholder="Select Number of Cables"
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
        disabled={!availableGroups || availableGroups.length <= 0}
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

export default B20;
