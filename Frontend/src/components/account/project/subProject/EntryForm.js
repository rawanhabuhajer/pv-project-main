import React, { useState } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
//
import { classes as dropdownClasses } from "./DropdownData";
import { ChevronDown } from "lucide-react";
const EntryForm = ({
  onSave,
  tableData,
  handleuMax,
  handleOperationTemp,
  handleCableLength,
  handleImpp,
  handleVmp,
  handlePmax,
  handleChangePVChild,
  handleChangePVClass,
  handleChangePVArea,
}) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !value.trim()) {
      // Show error - would normally use toast here
      alert("Both fields are required");
      return;
    }

    onSave({ name, value });
    setName("");
    setValue("");

    // Show success message - would normally use toast here
    alert("Entry added successfully");
  };

  return (
    <div className="entry-form-card">
      <div className="card-header">
        <h3 className="card-title">Add New Entry</h3>
      </div>
      <div className="card-content">
        <form className="entry-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                P<sub>max</sub> (Wp)
              </label>

              <input
                type="number"
                min={0}
                className="form-input"
                onChange={handlePmax}
                value={tableData?.pvModuleData?.pmax}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                V<sub>mp</sub> (V)
              </label>
              <input
                type="number"
                onChange={handleVmp}
                className="form-input"
                value={tableData?.pvModuleData?.vmp}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                I<sub>mp</sub> (A)
              </label>
              <input
                type="number"
                className="form-input"
                min={0}
                onChange={handleImpp}
                value={tableData?.pvModuleData?.Impp}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                Class Type
              </label>
              <Select
                onChange={handleChangePVClass}
                className="select_container"
                placeholder="Class type"
                indicator={<ChevronDown />}
                value={tableData?.pvModuleData?.classSelectedModule || ""}
                sx={{
                  width: "100%",
                  height: "48px",
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {dropdownClasses?.map((classOption) => (
                  <Option key={classOption.value} value={classOption.value}>
                    {classOption.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                Conductor Type
              </label>
              <Select
                onChange={handleChangePVChild}
                className="select_container"
                placeholder="Conductor type"
                indicator={<ChevronDown />}
                value={tableData?.pvModuleData?.childSelectedModule}
                sx={{
                  width: "100%",
                  height: "48px",
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {tableData?.pvModuleData?.classSelectedModule ? (
                  dropdownClasses
                    ?.find(
                      (classOption) =>
                        classOption.value ===
                        tableData?.pvModuleData?.classSelectedModule
                    )
                    ?.children.map((childOption) => (
                      <Option
                        key={childOption.value}
                        value={childOption.value || ""}
                      >
                        {childOption.label}
                      </Option>
                    ))
                ) : (
                  <Option disabled>{"Select class first"}</Option>
                )}
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                Conductor Size
              </label>
              <Select
                onChange={handleChangePVArea}
                className="select_container"
                placeholder="nominal cross..."
                indicator={<ChevronDown />}
                value={tableData?.pvModuleData?.areaSelectedModule}
                sx={{
                  width: "100%",
                  height: "48px",
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
              >
                {tableData?.pvModuleData?.childSelectedModule ? (
                  dropdownClasses
                    ?.find(
                      (classOption) =>
                        classOption.value ===
                        tableData?.pvModuleData?.classSelectedModule
                    )
                    ?.children.find(
                      (childOption) =>
                        childOption.value ===
                        tableData?.pvModuleData?.childSelectedModule
                    )
                    ?.area.map((areaOption) => (
                      <Option
                        key={areaOption.value}
                        value={areaOption.value || ""}
                      >
                        {areaOption.label} mm²
                      </Option>
                    ))
                ) : (
                  <Option disabled>{"Select conductor type first"}</Option>
                )}
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                Cable Length (m)
              </label>
              <input
                type="number"
                className="form-input"
                min={0}
                onChange={handleCableLength}
                value={tableData?.pvModuleData?.cableLength}
              ></input>
            </div>{" "}
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                Operating Temp. (°C)
              </label>
              <input
                type="number"
                className="form-input"
                min={0}
                onChange={handleOperationTemp}
                defaultValue={0}
                value={tableData?.pvModuleData?.operationTemp}
              ></input>
            </div>{" "}
            <div className="form-group">
              <label htmlFor="value" className="form-label">
                Max Δu%
              </label>
              <input
                type="number"
                className="form-input"
                min={0}
                onChange={handleuMax}
                defaultValue={0}
                value={tableData?.pvModuleData?.uMax}
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EntryForm;
