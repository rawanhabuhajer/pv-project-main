import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { ArrowDownToLine, RefreshCw, X } from "lucide-react";
import { Modal, Spinner, Table } from "react-bootstrap";
import Checkmark from "../assets/images/Checkmark.svg";
import Alertmark from "../assets/images/Alertmark.svg";
import { useSelector } from "react-redux";
import DownloadPdf from "./DownloadPdf";

const InAirResultReportModal = ({
  isInAirResultModalOpen,
  setIsInAirResultModalOpen,
  handleCalculateAutomaticIz,
}) => {
  const { MvSingleProjectsData } = useSelector((state) => state.projects);
  const [mvReportData, setMvReportData] = useState();
  const [downloadPdfStart, setDownloadPdfStart] = useState(false);
  useEffect(() => {
    setMvReportData(MvSingleProjectsData?.category?.details[0]);
  }, [MvSingleProjectsData]);

  const pdfDownloaderRef = useRef();
  const pdfReportRef = useRef(null);

  const handleDownloadClick = () => {
    if (pdfDownloaderRef.current) {
      pdfDownloaderRef.current.generatePDF();
    }
  };
  return (
    <div className={styles["result--modal-wrapper"]}>
      <Modal
        show={isInAirResultModalOpen}
        onHide={() => setIsInAirResultModalOpen(false)}
        size="xl"
        dialogClassName={styles["result--modal-wrapper"]}
        centered
        // backdrop="static"
        keyboard={false}
      >
        <div
          className={`modal--body ${
            downloadPdfStart ? "downloadPdfStart" : ""
          }`}
          id="pdfReport"
        >
          <div className="inner" ref={pdfReportRef}>
            <div className="main-header">
              <div className="title">
                <h3>Report result </h3>
                <p>
                  This report presents the calculated specifications for the MV
                  cables based on the values you entered. It includes detailed
                  performance metrics and compliance checks tailored to your
                  input.
                </p>
              </div>
              <button
                className="close-btn"
                onClick={() => setIsInAirResultModalOpen(false)}
              >
                <X size={24} color="#000" />
              </button>
            </div>
            <div className="content">
              {mvReportData?.Iz >= mvReportData?.inputFactor ? (
                <div className="final-result-wr">
                  <div className="left-side">
                    <Checkmark />
                    <div>
                      <h4>Passed </h4>
                      <p>Iz is greater than or equal to Ib (Iz ≥ Ib)</p>
                    </div>
                  </div>
                  <div className="premium-btn">
                    {mvReportData?.Iz?.toFixed(1)} (Iz) ≥ 
                    {mvReportData?.inputFactor} (Ib)
                  </div>
                </div>
              ) : (
                <div className="final-result-wr notPassed">
                  <div className="left-side ">
                    <Alertmark />
                    <div>
                      <h4>Not passed </h4>
                      <p>Iz is less than Ib (Iz &lt; Ib)</p>
                    </div>
                  </div>
                  <div className="premium-btn">
                    {mvReportData?.Iz?.toFixed(1)} (Iz) &lt;{" "}
                    {mvReportData?.inputFactor} (Ib)
                  </div>
                </div>
              )}
              <div className="mv-settings-wr">
                <h5>Settings selection</h5>
                <div className="setting-wr">
                  <div className="item">
                    <h6>Installation Method</h6>
                    <p>
                      {mvReportData?.installationMethod} /{" "}
                      {mvReportData?.spacingMethod}
                    </p>
                  </div>
                  <div className="item">
                    <h6>Conductors/Cores</h6>
                    <p>
                      {mvReportData?.coreType === "B.2"
                        ? "Single-Core Cables"
                        : "Three-Core Cables"}
                    </p>
                  </div>
                  <div className="item">
                    <h6>Conductor Size</h6>
                    <p>{mvReportData?.conductorSize} mm²</p>
                  </div>
                  <div className="item">
                    <h6>Conductor Type</h6>
                    <p>{mvReportData?.conductorType}</p>
                  </div>
                  <div className="item">
                    <h6>Insulation Type</h6>
                    <p>{mvReportData?.insulationType}</p>
                  </div>
                </div>
              </div>

              <div className="result-table">
                <Table bordered responsive>
                  <tbody>
                    <tr>
                      <td>
                        <div className="table-result-title">
                          k1: Temperature correction factor
                        </div>
                      </td>
                      <td>
                        k1 = {mvReportData?.ambientTemperatureResult} @
                        {mvReportData?.ambientTemperature} °C Ground temperature
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-result-title">
                          k2: Grouping correction factor
                        </div>
                      </td>
                      <td>k2 = {mvReportData?.cableResult}</td>
                    </tr>

                    <tr>
                      <td>
                        <div className="table-result-title">
                          Iz: Corrected current
                        </div>
                      </td>
                      <td>Iz = {mvReportData?.Iz?.toFixed(1)} A</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-result-title">n: Cable runs</div>
                      </td>
                      <td>n = {mvReportData?.cableRuns}</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-result-title">
                          Ic: Current carrying capacity of the cable
                        </div>
                      </td>
                      <td>Ic = {mvReportData?.mvCableValue} A</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-result-title">
                          Ib: Design current
                        </div>
                      </td>
                      <td>Ib = {mvReportData?.inputFactor} A</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* <div className="btns-wrapper">
              <button className="btn" onClick={handleCalculateAutomaticIz}>
                <span>Auto Calculate</span> <RefreshCw size={18} />
              </button>
              <button className="btn primary">
                <span> Download as pdf</span>
                <ArrowDownToLine size={19} />
              </button>

            </div> */}
            </div>
          </div>
          <div className="btns-wrapper">
            <button
              className="btn primary"
              onClick={() => {
                if (downloadPdfStart) return null;
                setDownloadPdfStart(true);
                handleDownloadClick();
              }}
            >
              {downloadPdfStart ? (
                <>
                  <span>Downloading</span>

                  <Spinner animation="border" role="status"></Spinner>
                </>
              ) : (
                <>
                  <span> Download as pdf</span>

                  <ArrowDownToLine size={19} />
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
      <DownloadPdf
        mvCategoryData={MvSingleProjectsData?.category?.details[0]}
        ref={pdfDownloaderRef}
        pdfReportRef={pdfReportRef}
        setDownloadPdfStart={setDownloadPdfStart}
        downloadPdfStart={downloadPdfStart}
      />
    </div>
  );
};

export default InAirResultReportModal;
