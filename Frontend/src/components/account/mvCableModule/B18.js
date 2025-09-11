import React, { useEffect } from "react";
import styles from "./style.module.scss";
import Select, { selectClasses } from "@mui/joy/Select";
import { ChevronUp } from "lucide-react";
import Option from "@mui/joy/Option";
import { CFForThreeCoreLaidDirectInTheGround } from "./MvData";

const B18 = ({
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

    const validGroups = Object.keys(CFForThreeCoreLaidDirectInTheGround).filter(
      (group) =>
        CFForThreeCoreLaidDirectInTheGround[group][selectedSpacing] !== null
    );
    setAvailableGroups(validGroups);
    setSelectedGroup(null); // Reset group when spacing changes
  };

  const handleGroupChange = (event, newValue) => {
    setSelectedGroup(newValue);
  };

  useEffect(() => {
    if (spacing && selectedGroup) {
      const result =
        CFForThreeCoreLaidDirectInTheGround[selectedGroup]?.[spacing] || "N/A";
      setCFFResult(result);
    } else {
      setCFFResult(null);
    }
  }, [spacing, selectedGroup]);

  // Populate availableGroups if spacing is already set
  useEffect(() => {
    if (spacing && (!availableGroups || availableGroups.length === 0)) {
      const validGroups = Object.keys(
        CFForThreeCoreLaidDirectInTheGround
      ).filter(
        (group) => CFForThreeCoreLaidDirectInTheGround[group][spacing] !== null
      );
      setAvailableGroups(validGroups);
    }
  }, [spacing]);

  const displayGroups =
    selectedGroup && !availableGroups.includes(selectedGroup)
      ? [selectedGroup, ...availableGroups]
      : availableGroups;

  return (
    <>
      <h3>Correction Factor (k2)</h3>

      <label htmlFor="spacing" className="field-label">
        Cable Spacing:
      </label>
      <Select
        value={spacing}
        onChange={handleSpacingChange}
        placeholder="Cable Spacing"
        className="field-select"
        indicator={<ChevronUp />}
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
          Cable Spacing
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
        Number of Cables in Group:
      </label>
      <Select
        placeholder="Number of Cables in Group"
        className="field-select"
        indicator={<ChevronUp />}
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

export default B18;
