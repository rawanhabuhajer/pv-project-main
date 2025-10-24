import ControlArea from "components/Layout/ControlArea";
import React from "react";
import Table from "./Table";
import adminsIcon from "assets/svgs/admins.svg";
import { useSelector } from "react-redux";
import BootyPagination from "components/shared/Pagination";
const Index = () => {
  const { admins, metadata } = useSelector((state) => state.admins);

  return (
    <>
      <div className="users-wrap">
        <ControlArea
          btnTxt="اضافة مدير جديد"
          cardTxt="المديرين"
          icon={adminsIcon}
          url="/admins/add"
        />
        <Table admins={admins} />
        {metadata?.count > 8 && <BootyPagination metadata={metadata} />}
      </div>
    </>
  );
};

export default Index;
