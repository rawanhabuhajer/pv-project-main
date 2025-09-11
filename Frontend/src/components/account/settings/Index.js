import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
// import BasicInfo from "./tabs/BasicInfo";
// import CompanyInfo from "./tabs/CompanyInfo";
// import Collaborators from "./tabs/Collaborators";
// import FileTypes from "./tabs/FileTypes";
// import ChangePassword from "./tabs/ChangePassword";
// import Notifications from "./tabs/Notifications";
import styles from "./styles/style.module.scss";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
const Index = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    if (router.query.notification === "true") {
      setActiveKey(5);
    }
  }, [router.query]);

  return (
    <>
      <div className={styles["settings-wrapper"]}>
        <Tab.Container
          activeKey={activeKey}
          onSelect={setActiveKey}
          transition={true}
          timeout={1000}
        >
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey={0}>
               hnghn
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey={1}>
                <FormattedMessage id="password" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={2}>
                <FormattedMessage id="companyInformation" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={3}>
                <FormattedMessage id="collaborators" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={4}>
                <FormattedMessage id="basics" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={5}>
                <FormattedMessage id="notifications" />
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey={0}>
              {/* <BasicInfo /> */}gbfb
            </Tab.Pane>
            {/* <Tab.Pane eventKey={1}>
              <ChangePassword />
            </Tab.Pane>
            <Tab.Pane eventKey={2}>
              <CompanyInfo />
            </Tab.Pane>
            <Tab.Pane eventKey={3}>
              <Collaborators />
            </Tab.Pane> */}
            {/* <Tab.Pane eventKey={3}>
              <div className="company-info">
                <h3>وسيلة الدفع </h3>
                <Row>
                  <Col className="d-flex justify-content-start mt-5">
                    <button>أضف بطاقة</button>
                  </Col>
                </Row>

                <div className="pay-card-info">
                  <div className="card-info">
                    <h2>World</h2>
                    <div className="icon">
                      <div>
                        <span>1234 5678 9012 3456</span>
                        <p>VALID THRU</p>
                        <span>01/25</span>
                        <span>MISTER NOBODY</span>
                      </div>
                      <CardColor />
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey={4}>
              <div className="company-info">
                <div className="Bills">
                  <h3>الفواتير </h3>
                  <br />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>رقم الاشتراك</th>
                        <th>القيمة</th>
                        <th>تاريخ الاشتراك</th>
                        <th>تاريخ انتهاء الاشتراك</th>
                        <th>عدد المستخدمين</th>
                        <th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#1234</td>
                        <td>$20.00</td>
                        <td>01/01/2024</td>
                        <td>01/01/2024</td>
                        <td>3</td>
                        <td>
                          <div className="status">مدفوع</div>
                        </td>
                        <td>
                          <DownloadIcon />
                        </td>
                        <td>
                          <Eye />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab.Pane> */}
            {/* <Tab.Pane eventKey={4}>
              <FileTypes />
            </Tab.Pane>
            <Tab.Pane eventKey={5}>
              <Notifications />
            </Tab.Pane> */}
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

export default Index;
