import React from "react";
import { useState, useEffect } from "react";
import EntryForm from "./EntryForm";
import DataTable from "./DataTable";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/style.module.scss";
import { Nav, Tab } from "react-bootstrap";
import axios from "axios";
import { v4 } from "uuid";
import { useRef } from "react";
import { classes as dropdownClasses } from "./DropdownData";
import { editSubProjectDataById, getSubProjectDataById } from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import { ArrowDownToLine } from "lucide-react";
import DownloadPdfNew from "./DownloadPdfNew";
const SubprojectDataPage = () => {
  const [isDownloadStart, setIsDownloadStart] = useState(false);
  const router = useRouter();
  const projectId = router.query.account[2];
  const subprojectId = router.query.account[4];

  const dispatch = useDispatch();

  const cookies = parseCookies();

  const { pvSubProjectsData } = useSelector((state) => state.projects);

  const [operationTemp, setOperationTemp] = useState(0);
  const [cableSize, setCableSize] = useState();
  const [cableLength, setCableLength] = useState();
  const [vmp, setVmp] = useState();
  const [Impp, setImpp] = useState();
  const [Pmax, setPmax] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [area, setArea] = useState();
  const [addNew, setAddNew] = useState();
  const [areaPvSelected, setAreaPvSelected] = useState();
  const [childOptions, setChildOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const pdfDownloaderRef = useRef();

  const [tableData, setTableData] = useState({
    name: "",
    description: "",
    pvModuleData: {
      Impp: null,
      vmp: null,
      pmax: null,
      cableLength: null,
      operationTemp: null,
      classSelectedModule: "",
      childSelectedModule: "",
      areaSelectedModule: null,
      r20Module: null,
      rTempretureModule: null,
      uMax: null,
    },
    inverterData: [
      {
        id: v4(),
        inverterCount: 1,
        strings: [
          {
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
            numberOfModules: null,
            pLossTotal: null,
            cabelsQuantity: null,

            stringCount: 1,
          },
        ],
      },
    ],
  });

  useEffect(() => {
    dispatch(
      getSubProjectDataById({
        cookies,
        pageNumber: 1,
        pageSize: 10,
        subProjectId: subprojectId,
        toast,
      })
    );
  }, [subprojectId]);

  useEffect(() => {
    if (pvSubProjectsData?.subcategory?.data[0].inverterData?.length > 0) {
      setTableData(pvSubProjectsData?.subcategory?.data[0]);
    }
  }, [pvSubProjectsData]);

  const handleUpateSubCategory = async () => {
    dispatch(
      editSubProjectDataById({
        cookies,
        subProjectId: subprojectId,
        toast,
        data: tableData,
      })
    );
  };

  useEffect(() => {
    setTableData((prevTableData) => {
      if (!prevTableData || !prevTableData?.inverterData) {
        console.warn("Invalid tableData state");
        return prevTableData; // Prevent overwriting with undefined
      }

      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter.strings.map((string) => {
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

      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
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
        }
      );

      return {
        ...prevTableData,
        inverterData: updatedInverterData,
      };
    });
  }, [operationTemp, addNew, area]);

  const handleOperationTemp = (e) => {
    const newOperationTemp = parseFloat(e.target.value);
    setOperationTemp(newOperationTemp);

    let KtModule;

    const r20Module = tableData?.pvModuleData?.r20Module || 0;
    const cableLength = tableData?.pvModuleData?.cableLength || 0;
    const Impp = tableData?.pvModuleData?.Impp || 0;
    const vmp = tableData?.pvModuleData?.vmp || 0;
    const uMax = tableData?.pvModuleData?.uMax || 0;
    const pmax = tableData?.pvModuleData?.pmax || 0;

    const childSelectedModule =
      tableData?.pvModuleData?.childSelectedModule || "AL";

    if (childSelectedModule === "AL") {
      KtModule = 1 / (1 + 0.00403 * (newOperationTemp - 20)) / 1000;
    } else if (
      childSelectedModule === "CU (Metal-Coated)" ||
      childSelectedModule === "CU (Plain)"
    ) {
      KtModule = 1 / (1 + 0.00393 * (newOperationTemp - 20)) / 1000;
    }

    const rTempretureModule =
      r20Module && KtModule ? (r20Module * 1) / (KtModule * 1000) : 0;

    setTableData((prevTableData) => {
      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter?.strings?.map((string) => {
            const r20 = string?.r20 || 0;
            const SM = string?.seriesModule || 0;
            const conductorCableLength = string?.conductorCableLength || 0;
            const childSelected = string?.childSelected || "AL";

            // Kt and KtModule calculations
            let Kt;
            if (childSelected === "AL") {
              Kt = 1 / (1 + 0.00403 * (newOperationTemp - 20)) / 1000;
            } else if (
              childSelected === "CU (Metal-Coated)" ||
              childSelected === "CU (Plain)"
            ) {
              Kt = 1 / (1 + 0.00393 * (newOperationTemp - 20)) / 1000;
            }

            // Resistance temperature calculations
            const rTempreture = (r20 * 1) / (Kt * 1000);

            // Voltage and power loss calculations
            const uTempreture =
              ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
                (2 * rTempreture * conductorCableLength * Impp) / 10) /
              (SM * vmp);

            const uMaxLength =
              (uMax * SM * vmp -
                (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
              (10 / (2 * rTempreture * Impp));

            const finalUMaxLength = uMaxLength < 0 ? 0 : uMaxLength;

            const ploss = (uTempreture / 100) * SM * pmax;
            const nominalPower = (pmax * SM) / 1000;
            const plossTemp = (ploss * 100) / (SM * pmax);

            // Update the string data with calculated values
            return {
              ...string,
              rTempreture: rTempreture,
              uTempreture: uTempreture,
              ploss: ploss,
              plossTemp: plossTemp,
              uMaxLength: finalUMaxLength,
              nominalPower: nominalPower,
            };
          });

          // Return updated inverter data with updated strings
          return {
            ...inverter,
            strings: updatedStrings,
          };
        }
      );

      // Return updated tableData with updated inverterData
      return {
        ...prevTableData,

        pvModuleData: {
          ...prevTableData?.pvModuleData,
          rTempretureModule,
          operationTemp: newOperationTemp,
        },

        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  const handleVmp = (e) => {
    const newVmp = parseFloat(e.target.value);

    setTableData((prevTableData) => {
      // Clone the tableData and inverterData to ensure immutability
      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter?.strings?.map((string) => {
            const SM = string?.seriesModule || 0;
            const rTempreture = string?.rTempreture || 0;
            const conductorCableLength = string?.conductorCableLength || 0;

            // Get the KtModule value based on operationTemp and childSelectedModule
            let KtModule = null;
            if (prevTableData?.pvModuleData?.childSelectedModule === "AL") {
              KtModule =
                1 /
                (1 +
                  0.00403 * (prevTableData?.pvModuleData?.operationTemp - 20)) /
                1000;
            } else if (
              prevTableData?.pvModuleData?.childSelectedModule ===
                "CU (Metal-Coated)" ||
              prevTableData?.pvModuleData?.childSelectedModule === "CU (Plain)"
            ) {
              KtModule =
                1 /
                (1 +
                  0.00393 * (prevTableData?.pvModuleData?.operationTemp - 20)) /
                1000;
            }

            const r20Module = prevTableData?.pvModuleData?.r20Module || 0;
            const rTempretureModule =
              KtModule !== null ? (r20Module * 1) / (KtModule * 1000) : 0;

            const Impp = prevTableData?.pvModuleData?.Impp || 0;
            const pmax = prevTableData?.pvModuleData?.pmax || 0;
            const uMax = prevTableData?.pvModuleData?.uMax || 0;
            const cableLength = prevTableData?.pvModuleData?.cableLength || 0;

            // Perform calculations for uTempreture, uMaxLength, ploss, and nominalPower
            const uTempreture =
              ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
                (2 * rTempreture * conductorCableLength * Impp) / 10) /
              (SM * newVmp);

            const uMaxLength =
              (uMax * SM * newVmp -
                (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
              (10 / (2 * rTempreture * Impp));

            const ploss = (uTempreture / 100) * SM * pmax;
            const nominalPower = (pmax * SM) / 1000;
            const plossTemp = (ploss * 100) / (SM * pmax);

            // Update the string data with calculated values
            return {
              ...string,
              uTempreture: uTempreture,
              ploss: ploss,
              plossTemp: plossTemp,
              uMaxLength: uMaxLength < 0 ? 0 : uMaxLength,
              nominalPower: nominalPower,
            };
          });

          // Return updated inverter data with updated strings
          return {
            ...inverter,
            strings: updatedStrings,
          };
        }
      );

      // Return updated tableData with updated inverterData
      return {
        ...prevTableData,

        pvModuleData: {
          ...prevTableData?.pvModuleData,
          vmp: newVmp,
        },

        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  const handlePmax = (e) => {
    const pmax = parseFloat(e.target.value);

    setTableData((prevTableData) => {
      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter?.strings?.map((string) => {
            const SM = string?.seriesModule || 0;
            const rTempreture = string?.rTempreture || 0;
            const conductorCableLength = string?.conductorCableLength || 0;

            const vmp = prevTableData?.pvModuleData?.vmp || 0;
            const uMax = prevTableData?.pvModuleData?.uMax || 0;
            const cableLength = prevTableData?.pvModuleData?.cableLength || 0;
            const Impp = prevTableData?.pvModuleData?.Impp || 0;

            const childSelectedModule =
              prevTableData?.pvModuleData?.childSelectedModule || "AL";
            let KtModule;

            if (childSelectedModule === "AL") {
              KtModule =
                1 /
                (1 +
                  0.00403 * (prevTableData?.pvModuleData?.operationTemp - 20)) /
                1000;
            } else if (
              childSelectedModule === "CU (Metal-Coated)" ||
              childSelectedModule === "CU (Plain)"
            ) {
              KtModule =
                1 /
                (1 +
                  0.00393 * (prevTableData?.pvModuleData?.operationTemp - 20)) /
                1000;
            }

            const r20Module = prevTableData?.pvModuleData?.r20Module || 0;
            const rTempretureModule =
              KtModule !== null ? (r20Module * 1) / (KtModule * 1000) : 0;

            const uTempreture =
              ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
                (2 * rTempreture * conductorCableLength * Impp) / 10) /
              (SM * vmp);

            const uMaxLength =
              (uMax * SM * vmp -
                (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
              (10 / (2 * rTempreture * Impp));

            const finalUMaxLength = uMaxLength < 0 ? 0 : uMaxLength;

            const ploss = (uTempreture / 100) * SM * pmax;
            const nominalPower = (pmax * SM) / 1000;
            const plossTemp = (ploss * 100) / (SM * pmax);

            return {
              ...string,
              pmax: pmax,
              uTempreture: uTempreture,
              ploss: ploss,
              plossTemp: plossTemp,
              uMaxLength: finalUMaxLength,
              nominalPower: nominalPower,
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
        pvModuleData: {
          ...prevTableData?.pvModuleData,
          pmax: pmax,
        },
        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  const handleImpp = (e) => {
    const Impp = parseFloat(e.target.value);

    setTableData((prevTableData) => {
      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter?.strings?.map((string) => {
            const SM = string.seriesModule || 0;
            const rTempreture = string.rTempreture || 0;
            const conductorCableLength = string.conductorCableLength || 0;

            let KtModule = null;
            if (prevTableData?.pvModuleData.childSelectedModule === "AL") {
              KtModule =
                1 /
                (1 +
                  0.00403 * (prevTableData?.pvModuleData.operationTemp - 20)) /
                1000;
            } else if (
              prevTableData?.pvModuleData.childSelectedModule ===
                "CU (Metal-Coated)" ||
              prevTableData?.pvModuleData.childSelectedModule === "CU (Plain)"
            ) {
              KtModule =
                1 /
                (1 +
                  0.00393 * (prevTableData?.pvModuleData.operationTemp - 20)) /
                1000;
            }

            const r20Module = prevTableData?.pvModuleData.r20Module || 0;
            const rTempretureModule =
              KtModule !== null ? (r20Module * 1) / (KtModule * 1000) : 0;

            const vmp = prevTableData?.pvModuleData.vmp || 0;
            const pmax = prevTableData?.pvModuleData.pmax || 0;
            const cableLength = prevTableData?.pvModuleData.cableLength || 0;
            const uMax = prevTableData?.pvModuleData.uMax || 0;

            const uTempreture =
              ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
                (2 * rTempreture * conductorCableLength * Impp) / 10) /
              (SM * vmp);

            const uMaxLength =
              (uMax * SM * vmp -
                (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
              (10 / (2 * rTempreture * Impp));

            const ploss = (uTempreture / 100) * SM * pmax;
            const nominalPower = (pmax * SM) / 1000;
            const plossTemp = (ploss * 100) / (SM * pmax);

            return {
              ...string,
              Impp: Impp,
              uTempreture: uTempreture,
              ploss: ploss,
              plossTemp: plossTemp,
              uMaxLength: uMaxLength < 0 ? 0 : uMaxLength,
              nominalPower: nominalPower,
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
        pvModuleData: {
          ...prevTableData?.pvModuleData,
          Impp: Impp,
        },
        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  const handleCableLength = (e) => {
    const cableLength = parseFloat(e.target.value) || 0;

    setTableData((prevData) => {
      const updatedPvModuleData = {
        ...prevData.pvModuleData,
        cableLength,
      };

      const updatedInverterData = prevData?.inverterData?.map((inverter) => ({
        ...inverter,
        strings: inverter?.strings?.map((string) => {
          const SM = string.seriesModule || 0;
          const rTempreture = string.rTempreture || 0;
          const conductorCableLength = string.conductorCableLength || 0;
          const operationTemp = updatedPvModuleData.operationTemp || 20;

          let KtModule = null;
          if (updatedPvModuleData.childSelectedModule === "AL") {
            KtModule = 1 / (1 + 0.00403 * (operationTemp - 20)) / 1000;
          } else if (
            updatedPvModuleData.childSelectedModule === "CU (Metal-Coated)" ||
            updatedPvModuleData.childSelectedModule === "CU (Plain)"
          ) {
            KtModule = 1 / (1 + 0.00393 * (operationTemp - 20)) / 1000;
          }

          const r20Module = updatedPvModuleData.r20Module || 0;
          const rTempretureModule =
            KtModule !== null ? (r20Module * 1) / (KtModule * 1000) : 0;

          const Impp = updatedPvModuleData.Impp || 0;
          const vmp = updatedPvModuleData.vmp || 0;
          const pmax = updatedPvModuleData.pmax || 0;
          const uMax = updatedPvModuleData.uMax || 0;

          const uTempreture =
            ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
              (2 * rTempreture * conductorCableLength * Impp) / 10) /
            (SM * vmp);

          const uMaxLength =
            (uMax * SM * vmp -
              (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
            (10 / (2 * rTempreture * Impp));

          const ploss = (uTempreture / 100) * SM * pmax;
          const nominalPower = (pmax * SM) / 1000;
          const plossTemp = (ploss * 100) / (SM * pmax);

          return {
            ...string,
            cableLength,
            uTempreture,
            uMaxLength: uMaxLength < 0 ? 0 : uMaxLength,
            ploss,
            plossTemp,
            nominalPower,
          };
        }),
      }));

      return {
        ...prevData,
        pvModuleData: updatedPvModuleData,
        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  const handleuMax = (e) => {
    const uMax = parseFloat(e.target.value);

    setTableData((prevTableData) => {
      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => {
          const updatedStrings = inverter.strings.map((string) => {
            const SM = string.seriesModule || 0;
            const rTempreture = string.rTempreture || 0;
            const conductorCableLength = string?.conductorCableLength || 0;

            let KtModule = null;
            if (prevTableData?.pvModuleData?.childSelectedModule === "AL") {
              KtModule =
                1 /
                (1 +
                  0.00403 * (prevTableData?.pvModuleData?.operationTemp - 20)) /
                1000;
            } else if (
              prevTableData?.pvModuleData.childSelectedModule ===
                "CU (Metal-Coated)" ||
              prevTableData?.pvModuleData.childSelectedModule === "CU (Plain)"
            ) {
              KtModule =
                1 /
                (1 +
                  0.00393 * (prevTableData?.pvModuleData?.operationTemp - 20)) /
                1000;
            }

            const r20Module = prevTableData?.pvModuleData?.r20Module || 0;
            const rTempretureModule =
              KtModule !== null ? (r20Module * 1) / (KtModule * 1000) : 0;

            const Impp = prevTableData?.pvModuleData?.Impp || 0;
            const pmax = prevTableData?.pvModuleData?.pmax || 0;
            const vmp = prevTableData?.pvModuleData?.vmp || 0;
            const cableLength = prevTableData?.pvModuleData?.cableLength || 0;

            const uTempreture =
              ((2 * rTempretureModule * cableLength * Impp * SM) / 10 +
                (2 * rTempreture * conductorCableLength * Impp) / 10) /
              (SM * vmp);

            const uMaxLength =
              (uMax * SM * vmp -
                (2 * rTempretureModule * cableLength * Impp * SM) / 10) *
              (10 / (2 * rTempreture * Impp));

            const ploss = (uTempreture / 100) * SM * pmax;
            const nominalPower = (pmax * SM) / 1000;
            const plossTemp = (ploss * 100) / (SM * pmax);

            return {
              ...string,
              uMax: uMax,
              uMaxLength: uMaxLength < 0 ? 0 : uMaxLength,
              uTempreture: uTempreture,
              ploss: ploss,
              plossTemp: plossTemp,
              nominalPower: nominalPower,
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
        pvModuleData: {
          ...prevTableData?.pvModuleData,
          uMax: uMax,
        },
        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  // TRACKING SELECT CLASS
  const handleChangePVClass = (event, newValue) => {
    const classSelectedModule = newValue;
    const selectedClass = dropdownClasses.find(
      (classOption) => classOption.value === newValue
    );
    setChildOptions(selectedClass ? selectedClass.children : []);
    setAddNew(true);

    // Update the state correctly with the updated tableData
    setTableData((prevTableData) => ({
      ...prevTableData,
      pvModuleData: {
        ...prevTableData?.pvModuleData,
        classSelectedModule: classSelectedModule, // Update the specific field
      },
    }));
  };

  // TRACKING SELECT CONDUCTOR TYPE
  const handleChangePVChild = (event, newValue) => {
    const childSelectedModule = newValue;
    const selectedChild = childOptions?.find(
      (childOption) => childOption.value === newValue
    );
    setAreaOptions(selectedChild ? selectedChild.area : []);

    setTableData((prevTableData) => ({
      ...prevTableData,
      pvModuleData: {
        ...prevTableData?.pvModuleData,
        childSelectedModule: childSelectedModule, // Update the specific field
      },
    }));

    setAddNew(true);
  };

  // TRACKING SELECT CONDUCTOR AREA
  const handleChangePVArea = (event, newValue) => {
    setAreaPvSelected(newValue);
    const areaSelectedModule = newValue;

    setTableData((prevTableData) => {
      // Calculate shared values for pvModuleData
      const childSelectedModule =
        prevTableData?.pvModuleData?.childSelectedModule;

      const r20Module = dropdownClasses
        .find(
          (classOption) =>
            classOption.value ===
            prevTableData?.pvModuleData?.classSelectedModule
        )
        ?.children.find(
          (childOption) =>
            childOption.value ===
            prevTableData?.pvModuleData?.childSelectedModule
        )
        ?.area.find(
          (areaOption) => areaOption.value === areaSelectedModule
        )?.associatedValue;

      const newOperationTemp = prevTableData?.pvModuleData?.operationTemp;

      let Kt;
      if (childSelectedModule === "AL") {
        Kt = 1 / (1 + 0.00403 * (newOperationTemp - 20)) / 1000;
      } else if (
        childSelectedModule === "CU (Metal-Coated)" ||
        childSelectedModule === "CU (Plain)"
      ) {
        Kt = 1 / (1 + 0.00393 * (newOperationTemp - 20)) / 1000;
      }
      const rtemp = (r20Module * 1) / (Kt * 1000) || null;

      // Update pvModuleData
      const updatedPvModuleData = {
        ...prevTableData?.pvModuleData,
        areaSelectedModule,
        rTempretureModule: rtemp,
        r20Module: r20Module,
      };

      // Update inverterData
      const updatedInverterData = prevTableData?.inverterData?.map(
        (inverter) => ({
          ...inverter,
          strings: inverter.strings.map((rowData) => {
            const cableLength = prevTableData?.pvModuleData?.cableLength || 0;
            const pmax = prevTableData?.pvModuleData?.pmax || 0;
            const uMax = prevTableData?.pvModuleData?.uMax || 0;
            const Impp = prevTableData?.pvModuleData?.Impp || 0;
            const SM = rowData?.seriesModule || 0;
            const vmp = prevTableData?.pvModuleData?.vmp || 0;
            const rTempreture = parseFloat(rowData?.rTempreture || 0);
            const conductorCableLength = rowData?.conductorCableLength || 0;

            // Calculations for inverter data
            const uTempreture =
              ((2 * rtemp * cableLength * Impp * SM) / 10 +
                (2 * rTempreture * conductorCableLength * Impp) / 10) /
              (SM * vmp);

            const uMaxLength =
              (uMax * SM * vmp - (2 * rtemp * cableLength * Impp * SM) / 10) *
              (10 / (2 * rTempreture * Impp));

            const ploss = (uTempreture / 100) * SM * pmax;
            const nominalPower = (pmax * SM) / 1000;
            const plossTemp = (ploss * 100) / (SM * pmax);

            return {
              ...rowData,
              uMaxLength: uMaxLength < 0 ? 0 : uMaxLength,
              uTempreture,
              ploss,
              plossTemp,
              nominalPower,
            };
          }),
        })
      );

      return {
        ...prevTableData,
        pvModuleData: updatedPvModuleData,
        inverterData: updatedInverterData,
      };
    });

    setAddNew(true);
  };

  const handleDownloadClick = () => {
    if (pdfDownloaderRef.current) {
      pdfDownloaderRef.current.exportToPDF();
    }
  };

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
        !summedConductorCableLengths[row.classSelected][row.childSelected][
          row.areaSelected
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
    <div className={styles["SubprojectDataPage-wrapper"]}>
      <Tab.Container defaultActiveKey={0} transition={true} timeout={1000}>
        <div className="page-header">
          <div className="title-header">
            <div>
              <div className="breadcrumb">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => router?.push(`/account/projects/${projectId}`)}
                >
                  {" "}
                  {pvSubProjectsData?.categoryName || ""}{" "}
                </div>{" "}
                / {pvSubProjectsData?.subcategory?.name || ""}
              </div>
              <h1 className="page-title">Manage Inputs</h1>

              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey={0}>Table</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={1}>PV Settings</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="btn-side">
            <button className="primaryBtn bgFree" onClick={handleDownloadClick}>
              Downlaod Report
              {isDownloadStart ? (
                <div
                  className="spinner-border text-secondary"
                  role="status"
                ></div>
              ) : (
                <ArrowDownToLine size={16} />
              )}
            </button>
            <button className="secondaryBtn" onClick={handleUpateSubCategory}>
              Save{" "}
            </button>
          </div>
        </div>

        <div className="content-container">
          <Tab.Content>
            <Tab.Pane eventKey={1}>
              <EntryForm
                //  onSave={handleAddEntry}
                tableData={tableData}
                handleuMax={handleuMax}
                handleOperationTemp={handleOperationTemp}
                handleCableLength={handleCableLength}
                handleImpp={handleImpp}
                handleVmp={handleVmp}
                handlePmax={handlePmax}
                handleChangePVChild={handleChangePVChild}
                handleChangePVClass={handleChangePVClass}
                handleChangePVArea={handleChangePVArea}
              />
            </Tab.Pane>
            <Tab.Pane eventKey={0}>
              <DataTable
                Impp={Impp}
                vmp={vmp}
                cableSize={cableSize}
                cableLength={cableLength}
                operationTemp={operationTemp}
                tableData={tableData}
                setTableData={setTableData}
                setImpp={setImpp}
                setOperationTemp={setOperationTemp}
                setCableLength={setCableLength}
                setVmp={setVmp}
                setCableSize={setCableSize}
                Pmax={Pmax}
                setPmax={setPmax}
                handleUpateSubCategory={handleUpateSubCategory}
                title={title}
                description={description}
                page={page}
                setPage={setPage}
                subprojectId={subprojectId}
                setIsDownloadStart={setIsDownloadStart}
              />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
      <DownloadPdfNew
        ref={pdfDownloaderRef}
        tableData={tableData}
        title={pvSubProjectsData?.subcategory?.name}
        description={pvSubProjectsData?.subcategory?.description}
        subprojectId={subprojectId}
        setIsDownloadStart={setIsDownloadStart}
      />
    </div>
  );
};

export default SubprojectDataPage;
