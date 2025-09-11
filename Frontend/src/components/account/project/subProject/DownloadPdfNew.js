import React, { forwardRef, useImperativeHandle } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { PvLogo } from "./Logo";
import QRCode from "qrcode";

const DownloadPdfNew = forwardRef((props, ref) => {
  const sModuleSum = props?.tableData?.inverterData
    ?.flatMap((inverter) => inverter.strings || [])
    .reduce((sum, item) => sum + (item?.numberOfModules ?? 0), 0);

  const TotalCapacity =
    (sModuleSum * props?.tableData?.pvModuleData?.pmax) / 1000;

  const sumPloss = props?.tableData?.inverterData
    ?.flatMap((inverter) => inverter.strings || [])
    .reduce((sum, item) => sum + (item?.pLossTotal ?? 0), 0);

  const TotalPloss = sumPloss / (TotalCapacity * 10);

  const exportToPDF = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const addHeader = (doc) => {
      doc.addImage(PvLogo, "PNG", 5, 8, 20, 5);
      doc.setFontSize(10);
      doc.text("pvxperts.com", 28, 13);

      const pageWidth = doc.internal.pageSize.getWidth() - 20;

      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`${currentDate}`, pageWidth, 13);
    };

    const addFooter = (doc) => {
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFontSize(10);
      doc.text(
        "All equations and calculations comply with IEC standard",
        5,
        pageHeight - 10
      );
    };

    const originalAddPage = doc.addPage;
    doc.addPage = function () {
      originalAddPage.apply(this, arguments);
      addHeader(this);
      addFooter(this);
    };

    addHeader(doc);
    addFooter(doc);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("PV String Sizing Report", 5, 28);

    const projectTableData = [
      ["Project Name:", props?.title],
      ["Project Description:", props?.description],
    ];

    const projectTableOptions = {
      startY: 35,
      styles: { fontSize: 12, fillColor: "#fff" },
      columnStyles: {
        0: { cellWidth: 50, fillColor: "#fff" },
        1: { fillColor: "#fff" },
      },
      headStyles: { fontSize: 14, fontStyle: "bold", fillColor: "#fff" },
      margin: { top: 20, right: 5, bottom: 70, left: 5 },
    };

    doc.autoTable({ body: projectTableData, ...projectTableOptions });

    const currentUrl = `http://localhost:3000/download/${props?.subprojectId}`;
    const qrDataUrl = await QRCode.toDataURL(currentUrl);
    const pageWidthQr = doc.internal.pageSize.getWidth();
    const qrWidth = 30;
    const qrX = pageWidthQr - qrWidth - 5;
    doc.addImage(qrDataUrl, "PNG", qrX, 22, qrWidth, qrWidth);

    // Optional: Add a table

    const finalY = doc.previousAutoTable.finalY;
    const pageWidth = doc.internal.pageSize.getWidth() - 6;

    doc.setLineWidth(0.1);
    doc.line(3, finalY + 2, pageWidth, finalY + 2);

    const pvRows = [
      [
        "Pmax :",
        ` ${props?.tableData?.pvModuleData?.pmax} Wp`,
        "Vmp :",
        `${props?.tableData?.pvModuleData?.vmp} V`,
        "Imp :",
        ` ${props?.tableData?.pvModuleData?.Impp} A`,
      ],
      [
        "Conductor class :",
        props?.tableData?.pvModuleData?.classSelectedModule,
        "Conductor type :",
        props?.tableData?.pvModuleData?.childSelectedModule,
        "Conductor size :",
        `${props?.tableData?.pvModuleData?.areaSelectedModule} mm2`,
      ],

      [
        "Cable length :",
        `${props?.tableData?.pvModuleData?.cableLength} m`,
        "Operating temprature :",
        `${props?.tableData?.pvModuleData?.operationTemp} °C`,
        "Maximum VD% :",
        `${props?.tableData?.pvModuleData?.uMax} % `,
      ],
    ];

    const pvTableOptions = {
      startY: finalY + 25,
      styles: { fontSize: 10, lineWidth: 0, lineColor: [0, 0, 0] },
      columnStyles: {
        0: {
          halign: "left",
          fontSize: 10,
          borderRight: "1px solid #000",
        },
        1: {
          halign: "left",
          fontSize: 10,
          borderRight: "1px solid #000",
        },
        2: { cellWidth: 41, halign: "left", fontSize: 10 },
        3: {
          halign: "left",
          fontSize: 10,
          borderRight: "1px solid #000",
        },
        4: {
          halign: "left",
          fontSize: 10,
          borderRight: "1px solid #000",
        },
        5: { halign: "left", fontSize: 10 },
      },
      headStyles: { fontSize: 10, halign: "center", fillColor: "#ffff" },
      margin: { top: 0, right: 5, bottom: 20, left: 5 },
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("input :", 5, doc.previousAutoTable.finalY + 10);
    doc.setFontSize(12);
    doc.text("PV Module Parameters:", 5, doc.previousAutoTable.finalY + 20);
    doc.autoTable({ body: pvRows, ...pvTableOptions });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("outputs :", 5, doc.previousAutoTable.finalY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("- Results :", 5, doc.previousAutoTable.finalY + 20);

    const Resultscolumns = [
      "Number of modules",
      "Total capacity",
      "Power losses",
      "Total power losses",
    ];
    const ResultsRows = [
      [
        `${sModuleSum} modules`,
        `${TotalCapacity} kWp`,
        `${sumPloss.toFixed(2)} W`,
        `${TotalPloss.toFixed(2)} %`,
      ],
    ];
    autoTable(doc, {
      head: [Resultscolumns],
      body: ResultsRows,
      startY: doc.previousAutoTable.finalY + 25,
      styles: { fontSize: 10, lineWidth: 0.1, lineColor: [0, 0, 0] },
      columnStyles: {
        0: { halign: "center", fontSize: 10 },
        1: { halign: "center", fontSize: 10 },
        2: { halign: "center", fontSize: 10 },
        3: { halign: "center", fontSize: 10 },
      },
      headStyles: { fontSize: 10, halign: "center", fillColor: "#546672" },
      margin: { top: 30, right: 5, bottom: 20, left: 5 },
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("- BOQ :", 5, doc.previousAutoTable.finalY + 10);

    const summedConductorCableLengths = {};

    props?.tableData.inverterData?.forEach((inverter) => {
      inverter.strings?.forEach((row) => {
        const classKey = row.classSelected;
        const childKey = row.childSelected;
        const areaKey = row.areaSelected;

        const inverterCount = inverter.inverterCount ?? 1; // default to 1 if missing
        const stringCount = row.stringCount ?? 1; // default to 1 if missing
        const cableLength = row.conductorCableLength ?? 0;

        const multipliedLength = cableLength * inverterCount * stringCount;

        if (!summedConductorCableLengths[classKey]) {
          summedConductorCableLengths[classKey] = {};
        }

        if (!summedConductorCableLengths[classKey][childKey]) {
          summedConductorCableLengths[classKey][childKey] = {};
        }

        if (!summedConductorCableLengths[classKey][childKey][areaKey]) {
          summedConductorCableLengths[classKey][childKey][areaKey] = 0;
        }

        summedConductorCableLengths[classKey][childKey][areaKey] +=
          multipliedLength;
      });
    });

    // Convert to array
    const summedConductorCableLengthsArray = [];

    Object.keys(summedConductorCableLengths).forEach((classSelected) => {
      Object.keys(summedConductorCableLengths[classSelected]).forEach(
        (childSelected) => {
          Object.keys(
            summedConductorCableLengths[classSelected][childSelected]
          ).forEach((areaSelected) => {
            const totalLength =
              summedConductorCableLengths[classSelected][childSelected][
                areaSelected
              ];
            summedConductorCableLengthsArray.push({
              classSelected,
              childSelected,
              areaSelected,
              totalConductorCableLength: totalLength,
            });
          });
        }
      );
    });
    const bqRows = [];
    // Push to bqRows
    summedConductorCableLengthsArray.forEach((row) => {
      const rowData = [
        row.classSelected,
        row.childSelected,
        row.areaSelected,
        row.totalConductorCableLength,
      ];
      bqRows.push(rowData);
    });

    const bqcolumns = [
      "Conductor class ",
      "Conductor type",
      "Conductor size (mm2)",
      "Quantity (m)",
    ];

    autoTable(doc, {
      head: [bqcolumns],
      body: bqRows,
      startY: doc.previousAutoTable.finalY + 15,
      styles: { fontSize: 10, lineWidth: 0.1, lineColor: [0, 0, 0] },
      columnStyles: {
        0: { halign: "center", fontSize: 10 },
        1: { halign: "center", fontSize: 10 },
        2: { halign: "center", fontSize: 10 },
        3: { halign: "center", fontSize: 10 },
      },
      headStyles: { fontSize: 10, halign: "center", fillColor: "#546672" },
      margin: { top: 20, right: 5, bottom: 20, left: 5 },
    });

    doc.addPage();

    const columns = [
      "Inverter X",
      "String X",
      "Class",
      "Conductor type",
      "Size (mm2)",
      "L. (m)",
      "S.Mod.",
      "R   (Ohm/k.m)",
      "VD %",
      "Max. L.    (m)",
      "P (kWp)",
      "P Loss (W)",
    ];
    const rows = [];

    props?.tableData?.inverterData?.forEach((inverter) => {
      inverter.strings?.forEach((row, index) => {
        const rowData = [];

        // Only add the "Inverter X" cell in the first row (with rowSpan)
        if (index === 0) {
          rowData.push({
            content: inverter.inverterCount || 1,
            rowSpan: inverter.strings.length,
            styles: { valign: "middle", halign: "center" },
          });
        }

        // Then push the rest of the row's data (always)
        rowData.push(
          row.stringCount ?? 1,
          row.classSelected ?? "",
          row.childSelected ?? "",
          row.areaSelected ?? "",
          row.conductorCableLength ?? "",
          row.seriesModule ?? "",
          row.rTempreture?.toFixed(2) ?? "",
          row.uTempreture?.toFixed(2) ?? "",
          row.uMaxLength?.toFixed(2) ?? "",
          row.nominalPower?.toFixed(2) ?? "",
          row.ploss?.toFixed(2) ?? ""
        );

        rows.push(rowData);
      });
    });

    let startY = 20;
    autoTable(doc, {
      head: [columns],
      body: rows,
      headStyles: {
        fontSize: 9,
        halign: "center",
        minCellHeight: 15,
        valign: "middle",
        fillColor: "#546672",
      },
      styles: {
        fontSize: 9,
        width: "100%",
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: {
          // cellWidth: 10,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        1: {
          // cellWidth: 10,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        2: {
          // cellWidth: 15,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        3: {
          cellWidth: 20,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        4: {
          // cellWidth: 15,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        5: {
          // cellWidth: 15,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        6: {
          // cellWidth: 15,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        7: {
          // cellWidth: 23,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        8: {
          // cellWidth: 15,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        9: {
          // cellWidth: 22,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        10: {
          // cellWidth: 20,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
        11: {
          // cellWidth: 20,
          halign: "center",
          valign: "middle",
          minCellHeight: 11,
        },
      },
      margin: { top: 20, right: 5, bottom: 70, left: 5 },
      startY: startY,
    });

    doc.save(`${props?.title || "project"}.pdf`);
    props?.setIsDownloadStart(false);
  };
  useImperativeHandle(ref, () => ({
    exportToPDF,
  }));

  return null;
});

export default DownloadPdfNew;
