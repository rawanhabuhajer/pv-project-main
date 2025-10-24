import ControlArea from "components/Layout/ControlArea";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import blogIcon from "assets/svgs/blog.svg";
import { useDispatch } from "react-redux";
import { getBlogs } from "store/blogs/actions";
import { Nav, Tab } from "react-bootstrap";
const Index = () => {
  const dispatch = useDispatch();

  const [lang, setLang] = useState("ar");

  useEffect(() => {
    dispatch(getBlogs({ lang }));
  }, [dispatch, lang]);

  return (
    <>
      <div className="users-wrap">
        <ControlArea
          btnTxt="اضافة مدونة"
          cardTxt="المدونات"
          icon={blogIcon}
          url="/blogs/add"
        />
        <div className="mini-tabs">
          <Tab.Container defaultActiveKey={0} transition={true} timeout={1000}>
            <Tab.Content>
              <Tab.Pane eventKey={0}>
                <Table lang={lang} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default Index;
