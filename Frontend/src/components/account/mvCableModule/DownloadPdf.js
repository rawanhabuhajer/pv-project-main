import React, { forwardRef, useImperativeHandle } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Logo } from "./Images";
import QRCode from "qrcode";
const DownloadPdf = forwardRef((props, ref) => {
  const generatePDF = async () => {
    try {
      if (typeof props.setDownloadingPdf === "function") {
        props.setDownloadingPdf(true);
      }

      const pdf = new jsPDF("p", "pt", "a4");

      // Add header to the PDF
      const addHeader = (pdfInstance) => {
        pdfInstance.addImage(Logo, "PNG", 15, 15, 45, 15);
        pdfInstance.setFontSize(10);
        pdfInstance.text("pvxperts.com", 75, 30);

        const currentDate = new Date().toLocaleDateString();
        pdfInstance.setFontSize(10);
        pdfInstance.text(`${currentDate}`, 530, 38);
      };

      const addFooter = (doc) => {
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text(
          "All equations and calculations comply with IEC standard",
          10,
          pageHeight - 10
        );
      };

      // Add watermark to all pages

      // Override addPage to include header and watermark
      const originalAddPage = pdf.addPage;
      pdf.addPage = function () {
        originalAddPage.apply(this, arguments);
        addHeader(this);
        addFooter(this);
      };
      addHeader(pdf);
      addFooter(pdf);

      pdf.setFontSize(11);
      pdf.text("MV Cable Report", 15, 65);

      const projectTableData = [
        ["Project Name:", "title"],
        ["Project Description:", "description"],
      ];

      const projectTableOptions = {
        startY: 80,
        styles: { fontSize: 10, fillColor: "#fff" },
        columnStyles: {
          0: { cellWidth: 120, fillColor: "#fff" },
          1: { fillColor: "#fff" },
        },
        headStyles: { fontSize: 14, fontStyle: "bold", fillColor: "#fff" },
        margin: { top: 20, right: 20, bottom: 70, left: 10 },
      };

      pdf.autoTable({ body: projectTableData, ...projectTableOptions });

      const finalY = pdf.previousAutoTable.finalY;

      const currentUrl = window.location.href;
      const qrDataUrl = await QRCode.toDataURL(currentUrl);
      const pageWidthQr = pdf.internal.pageSize.getWidth();
      const qrWidth = 50;
      const qrX = pageWidthQr - qrWidth - 15;

      pdf.addImage(qrDataUrl, "PNG", qrX, 70, qrWidth, qrWidth);
      pdf.setLineWidth(0.1);
      pdf.line(10, finalY + 2, 580, finalY + 2);
      // /////////////////////////////////////////////////////////////

      const periodChartPromise = html2canvas(props.pdfReportRef.current).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = pageWidth - 30;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          const xPosition = (pageWidth - imgWidth) / 2;
          const yPosition = pdf.lastAutoTable.finalY + 15;

          pdf.addImage(
            imgData,
            "PNG",
            xPosition,
            yPosition,
            imgWidth,
            imgHeight
          );
        }
      );

      // Save the PDF after the promise resolves
      periodChartPromise.then(() => {
        pdf.save("document.pdf");
        props.setDownloadPdfStart(false);
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      if (typeof props.setDownloadingPdf === "function") {
        props.setDownloadingPdf(false);
        props.setDownloadPdfStart(false);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    generatePDF,
  }));

  return <div></div>;
});

export default DownloadPdf;
