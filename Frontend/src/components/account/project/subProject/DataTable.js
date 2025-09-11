import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
// import Select from "react-select";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
//
// import min from "../../assets/min2.svg";
// import plus from "../../assets/plus2.svg";
// import Dropdown from "../dropdown/Dropdown";
// import hideIcon from "../../assets/hide.svg";
// import Select, { selectClasses } from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
//
import { classes as dropdownClasses } from "./DropdownData";
// import { useLocation } from "react-router-dom";
// import DownloadIcon from "./d.svg";
import { Nav, Tab } from "react-bootstrap";
// import DownloadPdf from "./DownloadPdf";
import { v4 } from "uuid";
// import DownloadPdfNew from "./DownloadPdfNew";
import { PaginationControl } from "react-bootstrap-pagination-control";
import {
  Minus,
  Plus,
  ChevronDown,
  CirclePlus,
  CircleMinus,
  ArrowDownToLine,
} from "lucide-react";
import DownloadPdfNew from "./DownloadPdfNew";
const DataTable = ({
  handleUpateSubCategory,
  operationTemp,
  setOperationTemp,
  tableData,
  setTableData,
  title,
  description,
  page,
  setPage,
  count,
  getSubCategoriesApi,
  subprojectId,
}) => {
  const [area, setArea] = useState();
  const [addNew, setAddNew] = useState();
  const [areaPvSelected, setAreaPvSelected] = useState();
  const [childOptions, setChildOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const pdfDownloaderRef = useRef();

  const addInverterBelow = (index) => {
    const newInverter = {
      id: v4(),
      strings: [
        {
          id: v4(),
        },
      ],
    };

    const updatedInverters = [
      ...tableData?.inverterData?.slice(0, index + 1),
      newInverter,
      ...tableData?.inverterData?.slice(index + 1),
    ];
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedInverters,
    }));
  };

  // Remove an inverter
  const removeInverter = (index) => {
    setTableData((prev) => ({
      ...prev,
      inverterData: prev.inverterData.filter((_, i) => i !== index),
    }));
  };

  // Add a string to a specific inverter
  const addStringBelow = (inverterIndex, stringIndex) => {
    const invertersRender = tableData?.inverterData;
    const updatedInverters = [...invertersRender];
    const previousItem =
      invertersRender[inverterIndex].strings[stringIndex - 1];

    const newString = {
      id: v4(),
      classSelected: "",
      childSelected: "",
      areaSelected: null,
      conductorCableLength: null,
      seriesModule: null,
      r20: null,
      kt: null,
      rTempreture: null,
      uTempreture: null,
      uMaxLength: null,
      ploss: null,
      plossTemp: null,
      nominalPower: null,
    };

    const strings = updatedInverters[inverterIndex].strings;

    updatedInverters[inverterIndex].strings = [
      ...strings?.slice(0, stringIndex + 1),
      newString,
      ...strings?.slice(stringIndex + 1),
    ];

    setTableData((prev) => ({
      ...prev,
      inverterData: updatedInverters,
    }));
  };

  // Remove a string from a specific inverter
  const removeString = (inverterIndex, stringIndex) => {
    const invertersRender = tableData?.inverterData;
    const updatedInverters = [...invertersRender];
    updatedInverters[inverterIndex].strings = updatedInverters[
      inverterIndex
    ]?.strings?.filter((_, i) => i !== stringIndex);

    // Update the state while keeping the other properties of tableData intact
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedInverters,
    }));
  };

  useEffect(() => {
    setTableData((prevTableData) => {
      if (!prevTableData || !prevTableData?.inverterData) {
        console.warn("Invalid tableData state");
        return prevTableData; // Prevent overwriting with undefined
      }

      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter?.strings?.map((string) => {
            const r20 = string?.r20 || null;
            const Kt = string?.kt || null;

            const rtemp = r20 && Kt ? (r20 * 1) / (Kt * 1000) : null;

            return {
              ...string,
              rTempreture: rtemp, // Only update rTempreture
            };
          });

          return {
            ...inverter,
            strings: updatedStrings,
          };
        }
      );

      return {
        ...prevTableData,
        inverterData: updatedInverterData,
      };
    });
  }, [operationTemp, area]);

  // Kt CALCULATIONS DEPEND ON CONDUCTOR TYPE
  useEffect(() => {
    setTableData((prevTableData) => {
      if (!prevTableData || !prevTableData?.inverterData) {
        console.warn("Invalid tableData state");
        return prevTableData; // Prevent overwriting with undefined
      }

      const updatedInverterData = prevTableData.inverterData.map((inverter) => {
        const updatedStrings = inverter?.strings?.map((string) => {
          let Kt = null;

          if (string.childSelected === "AL") {
            Kt = 1 / (1 + 0.00403 * (operationTemp - 20)) / 1000;
          } else if (
            string.childSelected === "CU (Metal-Coated)" ||
            string.childSelected === "CU (Plain)"
          ) {
            Kt = 1 / (1 + 0.00393 * (operationTemp - 20)) / 1000;
          }

          const rtemp =
            string.r20 && Kt ? (string.r20 * 1) / (Kt * 1000) : null;

          const cableLength = prevTableData?.pvModuleData?.cableLength || 0;
          const pmax = prevTableData?.pvModuleData?.pmax || 0;
          const uMax = prevTableData?.pvModuleData?.uMax || 0;
          const Impp = prevTableData?.pvModuleData?.Impp || 0;
          const SM = string?.seriesModule || 0;
          const vmp = prevTableData?.pvModuleData?.vmp || 0;

          const uTempreture =
            ((2 * rtemp * cableLength * Impp * SM) / 10 +
              (2 * string.rTempreture * string.conductorCableLength * Impp) /
                10) /
            (SM * vmp);

          const uMaxLength =
            (uMax * SM * vmp - (2 * rtemp * cableLength * Impp * SM) / 10) *
            (10 / (2 * string.rTempreture * Impp));

          const ploss = (uTempreture / 100) * SM * pmax;
          const nominalPower = (pmax * SM) / 1000;
          const plossTemp = (ploss * 100) / (SM * pmax);

          return {
            ...string,
            kt: Kt || null,
            rTempreture: rtemp,
            uMaxLength: uMaxLength < 0 ? 0 : uMaxLength,
            uTempreture,
            ploss,
            plossTemp,
            nominalPower,
          };
        });

        return {
          ...inverter,
          strings: updatedStrings,
        };
      });

      return {
        ...prevTableData,
        inverterData: updatedInverterData,
      };
    });
  }, [operationTemp, addNew, area]);

  // Reset AREA associatedValue
  // useEffect(() => {
  //   const selectedArea = areaOptions.find(
  //     (areaOption) => areaOption.value === areaPvSelected
  //   );
  // }, [areaOptions, areaPvSelected]);

  // // CHANGE CLASS TYPE VLAUE
  const handleChange = (event, newValue, inverterIndex, stringIndex) => {
    const newData = tableData?.inverterData;
    const updatedData = [...newData];
    const stringToUpdate = updatedData[inverterIndex].strings[stringIndex];

    stringToUpdate.classSelected = newValue;
    stringToUpdate.childSelected = "";
    stringToUpdate.r20 = null;
    stringToUpdate.uMaxLength = null;
    stringToUpdate.ploss = null;
    stringToUpdate.plossTemp = null;
    stringToUpdate.rTempreture = null;
    stringToUpdate.uTempreture = null;
    stringToUpdate.areaSelected = null;
    stringToUpdate.conductorCableLength = null;

    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));
  };

  // // CHANGE CONDUCTOR TYPE VALUE
  const handleChangeChild = (event, newValue, inverterIndex, stringIndex) => {
    const newData = tableData?.inverterData;
    const updatedData = [...newData];
    const stringToUpdate = updatedData[inverterIndex].strings[stringIndex];

    stringToUpdate.childSelected = newValue;
    stringToUpdate.areaSelected = null;
    stringToUpdate.r20 = null;
    stringToUpdate.uMaxLength = null;
    stringToUpdate.ploss = null;
    stringToUpdate.plossTemp = null;
    stringToUpdate.rTempreture = null;
    stringToUpdate.uTempreture = null;
    stringToUpdate.areaSelected = null;
    stringToUpdate.conductorCableLength = null;
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));
    setAddNew(true);
  };

  // // CHANGE CONDUCTOR AREA VALUE
  const handleChangeArea = (event, newValue, inverterIndex, stringIndex) => {
    const newData = tableData?.inverterData;
    const updatedData = [...newData];
    const stringToUpdate = updatedData[inverterIndex].strings[stringIndex];

    stringToUpdate.areaSelected = newValue;
    const associatedValue = dropdownClasses
      .find((classOption) => classOption.value === stringToUpdate.classSelected)
      ?.children.find(
        (childOption) => childOption.value === stringToUpdate.childSelected
      )
      ?.area.find(
        (areaOption) => areaOption.value === newValue
      )?.associatedValue;

    stringToUpdate.r20 = associatedValue || "";
    stringToUpdate.uMaxLength = null;
    stringToUpdate.ploss = null;
    stringToUpdate.plossTemp = null;
    stringToUpdate.rTempreture = null;
    stringToUpdate.uTempreture = null;
    stringToUpdate.conductorCableLength = null;
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));
    setArea(updatedData);
  };

  // CABLE LENGTH TABLE
  const handleCableInputChange = (inverterIndex, stringIndex, key, value) => {
    const newData = tableData?.inverterData || [];
    const updatedData = [...newData];
    const stringToUpdate = updatedData[inverterIndex]?.strings[stringIndex];

    if (!stringToUpdate) return; // Safeguard against invalid data

    // Update the key in the correct string
    stringToUpdate[key] = parseFloat(value) || 0;

    // Extract relevant values with defaults
    const cableLength = parseFloat(tableData?.pvModuleData?.cableLength) || 0;
    const pmax = parseFloat(tableData?.pvModuleData?.pmax) || 0;
    const uMax = parseFloat(tableData?.pvModuleData?.uMax) || 0;
    const Impp = parseFloat(tableData?.pvModuleData?.Impp) || 0;
    const vmp = parseFloat(tableData?.pvModuleData?.vmp) || 0;

    const SM = parseFloat(stringToUpdate.seriesModule) || 0;
    const r20 = parseFloat(stringToUpdate.r20) || 0;
    const Kt = parseFloat(stringToUpdate.kt) || 1; // Avoid division by zero with default

    // Calculate `rTempreture`
    const rTempreture = r20 / (Kt * 1000) || 0;
    stringToUpdate.rTempreture = rTempreture;

    // Determine `KtModule` based on `childSelectedModule`
    const childSelectedModule = stringToUpdate?.childSelectedModule || "";
    const operationTemp =
      parseFloat(tableData?.pvModuleData?.operationTemp) || 0;
    let KtModule = 1; // Default fallback to prevent NaN

    if (childSelectedModule === "AL") {
      KtModule = 1 / (1 + 0.00403 * (operationTemp - 20)) / 1000;
    } else if (
      childSelectedModule === "CU (Metal-Coated)" ||
      childSelectedModule === "CU (Plain)"
    ) {
      KtModule = 1 / (1 + 0.00393 * (operationTemp - 20)) / 1000;
    }

    const r20Module = parseFloat(tableData?.pvModuleData?.r20Module) || 0;
    const rTempretureModule = r20Module / (KtModule * 1000) || 0;

    // Calculate `uTempreture`
    const uTempreture =
      ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
        (2 * rTempreture * value * Impp) / 10) /
      (SM * vmp || 1); // Avoid division by zero
    stringToUpdate.uTempreture = uTempreture;

    // Calculate `uMaxLength`
    const uMaxLength =
      (uMax * SM * vmp -
        (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
      (10 / (2 * rTempreture * Impp || 1)); // Avoid division by zero
    stringToUpdate.uMaxLength = uMaxLength < 0 ? 0 : uMaxLength;

    // Calculate power losses
    const ploss = (uTempreture / 100) * SM * pmax || 0;
    stringToUpdate.ploss = ploss;

    const nominalPower = (pmax * SM) / 1000 || 0;
    stringToUpdate.nominalPower = nominalPower;

    const plossTemp = (ploss * 100) / (SM * pmax || 1); // Avoid division by zero
    stringToUpdate.plossTemp = plossTemp;

    const inverterCount = updatedData[inverterIndex]?.inverterCount || 1;
    const stringCount = stringToUpdate?.stringCount || 1;

    const numberOfModules = inverterCount * stringCount * SM;
    const pLossTotal = inverterCount * stringCount * ploss;
    const cabelsQuantity = inverterCount * stringCount * value;

    stringToUpdate.numberOfModules = numberOfModules;
    stringToUpdate.pLossTotal = pLossTotal;
    stringToUpdate.cabelsQuantity = cabelsQuantity;

    // Update table data
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));

    setAddNew(true);
  };

  // CHANGE SERIES MODULE VALUE

  const handleSMChange = (inverterIndex, stringIndex, key, value) => {
    if (!value || isNaN(value)) return; // Prevent invalid input

    const updatedData = JSON.parse(
      JSON.stringify(tableData?.inverterData || [])
    );
    const stringToUpdate = updatedData[inverterIndex]?.strings[stringIndex];
    stringToUpdate[key] = parseFloat(value);

    // Get data from PV module
    const {
      cableLength = 0,
      pmax = 0,
      uMax = 0,
      Impp = 0,
      vmp = 0,
    } = tableData?.pvModuleData || {};

    // Calculate dependent properties
    const { r20 = 0, kt = 0 } = stringToUpdate || {};
    const rTempreture = r20 && kt ? (r20 * 1) / (kt * 1000) : 0;

    const SM = parseFloat(value) || 0;
    const uTempreture =
      SM > 0
        ? (2 * rTempreture * cableLength * Impp * SM) / 10 / (SM * vmp)
        : 0;
    const uMaxLength =
      uMax * SM * vmp > 0
        ? (uMax * SM * vmp - (2 * rTempreture * cableLength * Impp * SM) / 10) *
          (10 / (2 * rTempreture * Impp))
        : 0;
    const ploss = uTempreture > 0 ? (uTempreture / 100) * SM * pmax : 0;
    const nominalPower = (pmax * SM) / 1000;
    const plossTemp = ploss > 0 ? (ploss * 100) / (SM * pmax) : 0;
    const inverterCount = updatedData[inverterIndex]?.inverterCount || 1;
    const stringCount = stringToUpdate?.stringCount || 1;
    const quantity = stringToUpdate?.conductorCableLength || 1;

    const numberOfModules = inverterCount * stringCount * value;
    const pLossTotal = inverterCount * stringCount * ploss;
    const cabelsQuantity = inverterCount * stringCount * quantity;

    // Update string data
    Object.assign(stringToUpdate, {
      rTempreture,
      uTempreture,
      uMaxLength: Math.max(0, uMaxLength),
      ploss,
      plossTemp,
      nominalPower,
      numberOfModules,
      pLossTotal,
      cabelsQuantity,
    });

    // Update table data
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));
    setAddNew(true);
  };

  const handleInverterCount = (inverterIndex, key, value) => {
    if (!value || isNaN(value)) return; // Prevent invalid input

    // Deep clone inverterData to avoid mutating state directly
    const updatedData = JSON.parse(
      JSON.stringify(tableData?.inverterData || [])
    );

    const inverterToUpdate = updatedData[inverterIndex];
    inverterToUpdate[key] = parseFloat(value); // Update inverterCount

    // Calculate numberOfModules for each string in the inverter
    inverterToUpdate.strings = inverterToUpdate?.strings?.map((string) => {
      const stringCount = string.stringCount || 1;
      const seriesModule = string.seriesModule || 0;
      const ploss = string.ploss || 0;
      const quantity = string.conductorCableLength || 0;

      // Calculate numberOfModules only if values are valid
      const numberOfModules = value * stringCount * seriesModule;
      const pLossTotal = value * stringCount * ploss;
      const cabelsQuantity = value * stringCount * quantity;

      return {
        ...string,
        numberOfModules: isNaN(numberOfModules) ? null : numberOfModules,
        pLossTotal: isNaN(pLossTotal) ? null : pLossTotal,
        cabelsQuantity: isNaN(cabelsQuantity) ? null : cabelsQuantity,
      };
    });

    // Update state with modified inverter data
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));

    setAddNew(true);
  };

  const handleStringCount = (inverterIndex, stringIndex, key, value) => {
    if (!value || isNaN(value)) return; // Prevent invalid input

    // Deep clone inverterData to avoid mutating state directly
    const updatedData = JSON.parse(
      JSON.stringify(tableData?.inverterData || [])
    );

    // Access the specific string to update
    const stringToUpdate = updatedData[inverterIndex]?.strings[stringIndex];
    stringToUpdate[key] = parseFloat(value); // Update stringCount

    // Extract values for calculations
    const stringCount = value || 1;
    const seriesModule = stringToUpdate.seriesModule || 0;
    const ploss = stringToUpdate.ploss || 0;
    const quantity = stringToUpdate.conductorCableLength || 0;
    const inverterCount = updatedData[inverterIndex]?.inverterCount || 1; // Default to 1 if not set

    // Calculate additional properties
    const numberOfModules = inverterCount * stringCount * seriesModule;
    const pLossTotal = inverterCount * stringCount * ploss;
    const cabelsQuantity = inverterCount * stringCount * quantity;

    // Update calculated values in the string
    stringToUpdate.numberOfModules = isNaN(numberOfModules)
      ? null
      : numberOfModules;
    stringToUpdate.pLossTotal = isNaN(pLossTotal) ? null : pLossTotal;
    stringToUpdate.cabelsQuantity = isNaN(cabelsQuantity)
      ? null
      : cabelsQuantity;

    // Update state with modified inverter data
    setTableData((prev) => ({
      ...prev,
      inverterData: updatedData,
    }));

    setAddNew(true);
  };

  const tableRef = useRef(null);

  const handleDownloadClick = () => {
    if (pdfDownloaderRef.current) {
      pdfDownloaderRef.current.exportToPDF();
    }
  };

  const sModuleSum = tableData?.inverterData
    ?.flatMap((inverter) => inverter?.strings || [])
    .reduce((sum, item) => sum + (item.seriesModule ?? 0), 0);

  const TotalCapacity = (sModuleSum * tableData?.pvModuleData?.pmax) / 1000;
  const sumPloss = tableData?.inverterData
    ?.flatMap((inverter) => inverter?.strings || [])
    .reduce((sum, item) => sum + (item.numberOfModules ?? 0), 0);
  const TotalPloss = sumPloss / (TotalCapacity * 10);

  const summedConductorCableLengths = {};

  tableData?.inverterData?.forEach((inverter) => {
    // Loop over inverterData
    inverter?.strings?.forEach((row) => {
      // Loop over each inverter's strings array
      if (!summedConductorCableLengths[row.classSelected]) {
        summedConductorCableLengths[row.classSelected] = {};
      }
      if (!summedConductorCableLengths[row.classSelected][row.childSelected]) {
        summedConductorCableLengths[row.classSelected][row.childSelected] = {};
      }
      if (
        !summedConductorCableLengths[row?.classSelected][row?.childSelected][
          row?.areaSelected
        ]
      ) {
        summedConductorCableLengths[row.classSelected][row.childSelected][
          row.areaSelected
        ] = 0;
      }

      summedConductorCableLengths[row.classSelected][row.childSelected][
        row.areaSelected
      ] += row.conductorCableLength ?? 0;
    });
  });

  const summedConductorCableLengthsArray = [];

  Object.keys(summedConductorCableLengths).forEach((classSelected) => {
    Object.keys(summedConductorCableLengths[classSelected]).forEach(
      (childSelected) => {
        Object.keys(
          summedConductorCableLengths[classSelected][childSelected]
        ).forEach((areaSelected) => {
          const summedConductorCableLength =
            summedConductorCableLengths[classSelected][childSelected][
              areaSelected
            ];
          summedConductorCableLengthsArray.push({
            classSelected,
            childSelected,
            areaSelected,
            summedConductorCableLength,
          });
        });
      }
    );
  });

  return (
    <div className="data-table-card">
      <div className="card-header">
        <h3 className="card-title">Subproject Data</h3>
        <div className="btn-side">
          <button className="primaryBtn bgFree" onClick={handleDownloadClick}>
            Downlaod report <ArrowDownToLine size={16} />
          </button>
          <button className="secondaryBtn" onClick={handleUpateSubCategory}>
            Save{" "}
          </button>
        </div>
      </div>
      <div className="card-content">
        <Table className="data-table" responsive>
          <thead className="table-header">
            <tr className="bg-gray-200">
              <th className="header ">Inverter X</th>
              <th className=" header">String X</th>
              <th className="header">
                <div>Class type</div>
              </th>
              <th className="header">
                <div>Conductor type</div>
              </th>
              <th className="header">
                <div>Conductor size</div>
              </th>
              <th className="header">
                <div>Cable Length (m)</div>
              </th>
              <th className="header">
                <div>Series Modules</div>
              </th>
              <th className="header">
                <div>R (Ω/km)</div>
              </th>
              <th className="header">
                <div>Δu%</div>
              </th>
              <th className="header">
                <div>Max Length (m)</div>
              </th>
              <th className="header">
                <div>Nominal Power (kWp)</div>
              </th>
              <th className="header">
                <div>
                  P<sub>Loss</sub>(W)
                </div>
              </th>
              <th className="header">
                <div>Number of modules</div>
              </th>
              {/* <th className="header">
                      <div>
                        P<sub>Loss total</sub>(W)
                      </div>
                    </th>
                    <th className="header">
                      <div>Quantity</div>
                    </th> */}
            </tr>
          </thead>

          <tbody className="table-body">
            {tableData && tableData?.inverterData?.length > 0
              ? tableData?.inverterData?.map((inverter, inverterIndex) => (
                  <React.Fragment key={inverter?.id}>
                    <tr>
                      <td
                        className=" text-center"
                        rowSpan={inverter?.strings?.length + 2}
                      >
                        <input
                          type="number"
                          className="form-input string-inverter-input"
                          onChange={(e) =>
                            handleInverterCount(
                              inverterIndex,
                              "inverterCount",
                              e.target.value
                            )
                          }
                          min={1}
                          value={inverter?.inverterCount || 1}
                        ></input>
                        <div className="action-btn-wrapper">
                          <button
                            className="icon"
                            onClick={() => removeInverter(inverterIndex)}
                            disabled={tableData?.inverterData?.length === 1}
                          >
                            <CircleMinus size={22} color="#F82E5E" />
                          </button>

                          <button
                            className="icon"
                            onClick={() => addInverterBelow(inverterIndex)}
                          >
                            <CirclePlus size={22} color="#14804A" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {inverter?.strings?.map((string, stringIndex) => (
                      <tr key={string?.id}>
                        <td className="border border-gray-300  text-center">
                          <input
                            type="number"
                            className="form-input string-inverter-input"
                            onChange={(e) =>
                              handleStringCount(
                                inverterIndex,
                                stringIndex,
                                "stringCount",
                                e.target.value
                              )
                            }
                            min={1}
                            value={string?.stringCount || 1}
                          ></input>
                          <div className="action-btn-wrapper">
                            <button
                              className="icon"
                              onClick={() =>
                                removeString(inverterIndex, stringIndex)
                              }
                              disabled={inverter?.strings?.length === 1} // Disable if only one string
                            >
                              <CircleMinus size={22} color="#F82E5E" />
                            </button>
                            <button
                              className="icon"
                              onClick={() =>
                                addStringBelow(inverterIndex, stringIndex)
                              }
                            >
                              <CirclePlus size={22} color="#14804A" />
                            </button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div className="child-dropdown__container">
                            <Select
                              key={string.id}
                              onChange={(event, newValue) =>
                                handleChange(
                                  event,
                                  newValue,
                                  inverterIndex,
                                  stringIndex
                                )
                              }
                              className="select_container"
                              placeholder="Class type"
                              indicator={<ChevronDown />}
                              value={string?.classSelected || ""}
                              sx={{
                                width: "100%",
                                height: 35,
                                backgroundColor: "rgb(249,249,249)",
                                fontWeight: 400,
                                fontSize: 14,
                                borderRadius: 3,
                                textTransform: "lowercase",
                                fontFamily: "Open Sans, sans-serif",
                                [`& .${selectClasses.indicator}`]: {
                                  transition: "0.2s",
                                  [`&.${selectClasses.expanded}`]: {
                                    transform: "rotate(-180deg)",
                                  },
                                },
                              }}
                            >
                              {dropdownClasses.map((classOption) => (
                                <Option
                                  key={classOption.value}
                                  value={classOption.value}
                                >
                                  {classOption.label}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </td>

                        <td className="align-middle">
                          <div className="child-dropdown__container">
                            <Select
                              onChange={(event, newValue) =>
                                handleChangeChild(
                                  event,
                                  newValue,
                                  inverterIndex,
                                  stringIndex
                                )
                              }
                              className="select_container"
                              placeholder="Conductor type"
                              indicator={<ChevronDown />}
                              value={string.childSelected}
                              sx={{
                                width: "100%",
                                height: 35,
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
                              {string.classSelected ? (
                                dropdownClasses
                                  .find(
                                    (classOption) =>
                                      classOption.value === string.classSelected
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
                        </td>
                        <td className="align-middle">
                          <div className="area-dropdown__container">
                            <Select
                              onChange={(event, newValue) =>
                                handleChangeArea(
                                  event,
                                  newValue,
                                  inverterIndex,
                                  stringIndex
                                )
                              }
                              className="select_container"
                              placeholder="nominal cross"
                              indicator={<ChevronDown />}
                              value={string?.areaSelected || ""}
                              sx={{
                                width: "100%",
                                height: 35,
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
                              {string?.childSelected ? (
                                dropdownClasses
                                  .find(
                                    (classOption) =>
                                      classOption.value ===
                                      string?.classSelected
                                  )
                                  ?.children.find(
                                    (childOption) =>
                                      childOption.value ===
                                      string?.childSelected
                                  )
                                  ?.area.map((areaOption) => (
                                    <Option
                                      key={areaOption?.value}
                                      value={areaOption?.value || ""}
                                    >
                                      {areaOption?.label} mm²
                                    </Option>
                                  ))
                              ) : (
                                <Option disabled>
                                  {"Select conductor type first"}
                                </Option>
                              )}
                            </Select>
                          </div>
                        </td>

                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            min={string?.areaSelected ? 1 : 0}
                            onChange={(e) =>
                              handleCableInputChange(
                                inverterIndex,
                                stringIndex,
                                "conductorCableLength",
                                e.target.value
                              )
                            }
                            value={string?.conductorCableLength || ""}
                          ></input>
                        </td>
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            min={0}
                            onChange={(e) =>
                              handleSMChange(
                                inverterIndex,
                                stringIndex,
                                "seriesModule",
                                e.target.value
                              )
                            }
                            value={string?.seriesModule || ""}
                          />
                        </td>
                        {string?.rTempreture && string?.operationTemp ? (
                          <td className="align-middle">
                            <input
                              className="form-input numbersInput"
                              type="number"
                              readOnly
                              value={string?.rTempreture?.toFixed(2) || ""}
                            ></input>
                          </td>
                        ) : (
                          <td className="align-middle">
                            <input
                              className="form-input numbersInput"
                              type="number"
                              readOnly
                              value={string?.rTempreture?.toFixed(2) || ""}
                            ></input>
                          </td>
                        )}
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            readOnly
                            value={string?.uTempreture?.toFixed(2) || ""}
                          ></input>
                        </td>

                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            readOnly
                            value={
                              string?.uMaxLength?.toFixed(2) < 0
                                ? 0
                                : string?.uMaxLength?.toFixed(2)
                            }
                          ></input>
                        </td>
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            readOnly
                            value={string?.nominalPower?.toFixed(2) || ""}
                          ></input>
                        </td>
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            readOnly
                            value={string?.ploss?.toFixed(2) || ""}
                          ></input>
                        </td>
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-input numbersInput"
                            readOnly
                            value={string?.numberOfModules?.toFixed(2) || ""}
                          ></input>
                        </td>
                        {/* <td className="align-middle">
                                  <input
                                    type="number"
                                    readOnly
                                    value={string?.pLossTotal?.toFixed(2) || ""}
                                  ></input>
                                </td>
                                <td className="align-middle">
                                  <input
                                    type="number"
                                    readOnly
                                    value={
                                      string?.cabelsQuantity?.toFixed(2) || ""
                                    }
                                  ></input>
                                </td> */}
                      </tr>
                    ))}
                    <tr></tr>
                  </React.Fragment>
                ))
              : ""}
          </tbody>
        </Table>
        {/* <div className="table--pagination">
          <PaginationControl
            page={1}
            between={3}
            total={43}
            limit={10}
            changePage={(page) => {
              setPage(page);
            }}
            ellipsis={2}
          />
        </div> */}
        <DownloadPdfNew
          ref={pdfDownloaderRef}
          tableData={tableData}
          title={title}
          description={description}
          subprojectId={subprojectId}
        />
      </div>
    </div>
  );
};

export default DataTable;
