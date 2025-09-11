import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { ArrowDownToLine, RefreshCw, X } from "lucide-react";
import { Modal, Spinner, Table } from "react-bootstrap";
import Checkmark from "../assets/images/Checkmark.svg";
import Alertmark from "../assets/images/Alertmark.svg";
import { useSelector } from "react-redux";
import DownloadPdf from "./DownloadPdf";
const ResultModal = ({
  isResultModalOpen,
  setIsResultModalOpen,
  handleCalculateAutomaticIz,
}) => {
  const { MvSingleProjectsData } = useSelector((state) => state.projects);
  const [mvReportData, setMvReportData] = useState();
  const [downloadPdfStart, setDownloadPdfStart] = useState(false);
  useEffect(() => {
    setMvReportData(MvSingleProjectsData?.category?.details[0]);
  }, [MvSingleProjectsData, isResultModalOpen]);
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
        show={isResultModalOpen}
        onHide={() => setIsResultModalOpen(false)}
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
        >
          <div id="pdfReport" ref={pdfReportRef}>
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
                onClick={() => setIsResultModalOpen(false)}
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
                    <p>Buried directly in the ground/ Flat spaced</p>
                  </div>
                  <div className="item">
                    <h6>Conductors/Cores</h6>
                    <p>Single-Core Cables</p>
                  </div>
                  <div className="item">
                    <h6>Conductor Size</h6>
                    <p>240 mm²</p>
                  </div>
                  <div className="item">
                    <h6>Conductor Type</h6>
                    <p>Copper</p>
                  </div>
                  <div className="item">
                    <h6>Insulation Type</h6>
                    <p>XLPE</p>
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
                      <td>k2 = {mvReportData?.CFFResult}</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-result-title">
                          k3: Soil thermal resistivity correction factor
                        </div>
                      </td>
                      <td>
                        k3 = {mvReportData?.factor} @
                        {mvReportData?.resistivitiesspacing} [K·m/W]
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="table-result-title">
                          k4: Depths of laying correction factor
                        </div>
                      </td>
                      <td>
                        k4 = {mvReportData?.correctionFactor} @
                        {mvReportData?.selectedDepth} m
                      </td>
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
      />
    </div>
  );
};

export default ResultModal;
