import React, { useEffect, useState } from "react";

import server from "api/server";
import { useLocation } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import FeaturesPVX360Form from "./FeaturesPVX360Form";

const Index = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/")[2];

  const [data, setData] = useState({});
  const [description, setDescription] = useState("");
  const [lang, setLang] = useState("ar");
  const [isActive, setIsActive] = useState(false);
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
              <FeaturesPVX360Form
                lang={lang}
                data={data}
                setData={setData}
                description={description}
                setDescription={setDescription}
                isActive={isActive}
                setIsActive={setIsActive}
                items={items}
                setItems={setItems}
                slug={slug}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

export default Index;
