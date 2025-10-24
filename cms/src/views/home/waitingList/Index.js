import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";

import server from "api/server";
import { useLocation } from "react-router-dom";
import WaitingListForm from "./WaitingListForm";
const Index = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];

  const [data, setData] = useState({});
  const [lang, setLang] = useState("ar");
  const [items, setItems] = useState([]);

  const onStart = async () => {
    const pageData = await server().get(
      `/landingContent/GetCmsSectionBySlugName/${slug}`
    );
    setData(pageData.data.section || {});
  };

  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <>
      <div className="acc-form mini-tabs">
        <Tab.Container defaultActiveKey={0} transition={true} timeout={1000}>
          <Tab.Content>
            <Tab.Pane eventKey={0}>
              <WaitingListForm
                lang={lang}
                data={data}
                slug={slug}
                items={items}
                setItems={setItems}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

export default Index;
